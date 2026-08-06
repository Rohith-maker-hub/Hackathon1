FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY dist ./dist
COPY .env ./

EXPOSE 3001

CMD ["npm", "start"]
