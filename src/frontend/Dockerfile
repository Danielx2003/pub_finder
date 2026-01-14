FROM node:24.12-alpine
 
ENV VITE_API_URL=http://127.0.0.1:8000/

WORKDIR /app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]
