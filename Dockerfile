FROM node:12
WORKDIR /usr/src/app
ENV PORT 8080
ENV HOST 0.0.0.0
COPY package.json package*.json ./
RUN npm install --only=production
COPY . .
CMD ["npm", "start"]