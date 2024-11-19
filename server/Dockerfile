FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production


COPY . .

ENV PORT=8080

EXPOSE 8080

RUN npm run build


CMD ["npm", "start"]

