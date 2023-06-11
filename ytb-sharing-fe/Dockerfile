FROM node:lts
RUN mkdir -p /usr/fe
WORKDIR /usr/fe/
COPY . /usr/fe
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]