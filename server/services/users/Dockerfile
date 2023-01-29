FROM node:18.12

WORKDIR /usr/local/user

ENV PORT=4001

COPY package.json package-lock.json /usr/local/user/

RUN npm i && npm cache clean --force

RUN npm i -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]