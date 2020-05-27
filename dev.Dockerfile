# Development Dockerfile that works for the backend and frontend
FROM node:12.16

# Set the working directory to /app
WORKDIR /app

ENV NODE_ENV development
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json

RUN npm install

# The backend runs on port 3333 and the node debugger on 3334
EXPOSE 3333 3334

# By default just open an interactive shell
CMD ["sh"]
