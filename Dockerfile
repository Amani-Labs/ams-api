FROM node:current-slim

ENV PORT 5000

EXPOSE 5000

COPY package.json package.json
RUN yarn install

COPY . .
RUN yarn run build

CMD ["node", "dist/"]
