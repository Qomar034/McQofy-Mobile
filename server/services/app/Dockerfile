FROM node:18.12

WORKDIR /usr/local/app

ENV PORT=4002

COPY package.json package-lock.json /usr/local/app/

RUN npm i && npm cache clean --force

RUN npm i -g nodemon

COPY ./ /usr/local/app/

CMD ["npm", "run", "start"]