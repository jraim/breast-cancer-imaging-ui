FROM node:14-alpine3.15

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm i

COPY . .

# start app
CMD ["npm", "run", "start"]
