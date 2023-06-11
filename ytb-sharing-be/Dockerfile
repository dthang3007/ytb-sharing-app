FROM node:lts
RUN mkdir -p /usr/be
WORKDIR /usr/be/
COPY . /usr/be
COPY package*.json ./
COPY prisma ./prisma/
RUN apt-get -qy update && apt-get -qy install openssl
RUN npm install
RUN npm install @prisma/client
COPY . .
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npm run build
EXPOSE 9000
CMD npm run start:prod