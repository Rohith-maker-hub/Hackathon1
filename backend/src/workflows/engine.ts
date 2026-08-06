import { StateGraph, START, END } from '@langchain/langgraph';
import { supabase } from '../database/supabase';
import { openaiService } from '../services/openai.service';
import { BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';

// Define the state interface for the workflow
interface WorkflowState {
  workflowId: string;
  goal: string;
  tasks: any[];
  researchData: string;
  decision: string;
  executionResult: string;
  finalSummary: string;
  messages: BaseMessage[];
  [key: string]: any;
}

export const runWorkflow = async (workflowId: string) => {
  console.log(`Starting workflow ${workflowId}`);
  
  const { data: workflow, error } = await supabase.from('workflows').select('*').eq('id', workflowId).single();
  if (error || !workflow) throw new Error(`Workflow not found: ${workflowId}`);

  const goal = workflow.description || workflow.name;

  // Agent nodes
  const plannerNode = async (state: WorkflowState) => {
    console.log('[Workflow] Planner Node');
    const prompt = `Break down this goal into actionable steps: ${state.goal}`;
    const result = await openaiService.generateCompletion(prompt, 'You are a Planner agent. Output a JSON list of tasks.');
    const resultStr = result || '';
    return { tasks: [resultStr], messages: [new SystemMessage(resultStr)] };
  };

  const researchNode = async (state: WorkflowState) => {
    console.log('[Workflow] Research Node');
    const prompt = `Research the following tasks: ${JSON.stringify(state.tasks)}`;
    const result = await openaiService.generateCompletion(prompt, 'You are a Research agent.');
    const resultStr = result || '';
    return { researchData: resultStr, messages: [new SystemMessage(resultStr)] };
  };

  const decisionNode = async (state: WorkflowState) => {
    console.log('[Workflow] Decision Node');
    const prompt = `Based on the goal: ${state.goal} and research: ${state.researchData}, make a decision on how to proceed.`;
    const result = await openaiService.generateCompletion(prompt, 'You are a Decision agent.');
    const resultStr = result || '';
    return { decision: resultStr, messages: [new SystemMessage(resultStr)] };
  };

  const executionNode = async (state: WorkflowState) => {
    console.log('[Workflow] Execution Node');
    const prompt = `Execute the plan based on the decision: ${state.decision}`;
    const result = await openaiService.generateCompletion(prompt, 'You are an Execution agent.');
    const resultStr = result || '';
    return { executionResult: resultStr, messages: [new SystemMessage(resultStr)] };
  };

  const summaryNode = async (state: WorkflowState) => {
    console.log('[Workflow] Summary Node');
    const prompt = `Summarize the entire workflow execution: ${state.executionResult}`;
    const result = await openaiService.generateCompletion(prompt, 'You are a Summary agent.');
    const resultStr = result || '';
    return { finalSummary: resultStr, messages: [new SystemMessage(resultStr)] };
  };

  // Build the LangGraph
  const workflowGraph = new StateGraph<any>({
    channels: {
      workflowId: null,
      goal: null,
      tasks: { value: (x: any, y: any) => y, default: () => [] },
      researchData: null,
      decision: null,
      executionResult: null,
      finalSummary: null,
      messages: { value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y), default: () => [] }
    }
  })
    .addNode('planner', plannerNode)
    .addNode('research', researchNode)
    .addNode('decision', decisionNode)
    .addNode('execution', executionNode)
    .addNode('summary', summaryNode)
    
    .addEdge(START, 'planner')
    .addEdge('planner', 'research')
    .addEdge('research', 'decision')
    .addEdge('decision', 'execution')
    .addEdge('execution', 'summary')
    .addEdge('summary', END);

  const app = workflowGraph.compile();
  
  const initialState: any = {
    workflowId,
    goal,
    tasks: [],
    researchData: '',
    decision: '',
    executionResult: '',
    finalSummary: '',
    messages: [new HumanMessage(goal)]
  };

  try {
    const finalState = await app.invoke(initialState);
    
    // Save the final result back to supabase
    await supabase.from('workflows').update({ 
      status: 'completed', 
      result_data: { 
        summary: finalState.finalSummary,
        execution: finalState.executionResult,
        decision: finalState.decision,
        research: finalState.researchData,
        tasks: finalState.tasks
      } 
    }).eq('id', workflowId);
    
    console.log(`Workflow ${workflowId} completed successfully.`);
  } catch (err: any) {
    console.error(`Workflow ${workflowId} failed:`, err);
    await supabase.from('workflows').update({ 
      status: 'failed', 
      result_data: { error: err.message } 
    }).eq('id', workflowId);
  }
};
