FROM node:20

WORKDIR /app

COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install --only=production; \
    else npm install; \
    fi

COPY . .


EXPOSE 4000

# For production
# CMD ["npm", "start"]

# For development
CMD ["npm", "run", "start-dev"]


# Commands:
    # docker ps
    # docker image ls
    # docker build -t <'imageName'> .
    # docker run --name express-app-container -v $PWD/src:/app/src:ro -d -p 4000:4000 express-node-app
    # docker logs <'containerName'>
    # docker exec -it <'containerName'> bash
    # docker rm <'containerName'>