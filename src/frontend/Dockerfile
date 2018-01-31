FROM node

WORKDIR /srv

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "build"]
