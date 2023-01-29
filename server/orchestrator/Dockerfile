FROM node:18.12

WORKDIR /usr/local/orchestrator

ENV PORT=4000

COPY package.json package-lock.json /usr/local/orchestrator/

RUN npm i && npm cache clean --force

RUN npm i -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]