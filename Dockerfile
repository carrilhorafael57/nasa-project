FROM node:lts-alpine

WORKDIR /app
# Copying package.json from the root folder
COPY package*.json ./

# Copying package.json and package-lock from the client folder and then installing these dependencies
COPY client/package*.json client/
RUN npm run install-client --omit=dev

# Copying package.json and package-lock from the server folder and then installing these dependencies
COPY server/package*.json server/
RUN npm run install-server --omit=dev

# Copying client source code and building it
COPY client/ client/
RUN npm run build --prefix client

# Copying server source code
COPY server/ server/
RUN npm i

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000

# If any issues arise using package* try without it