# Production Dockerfile that hosts the backend (and compiled frontend)

# First, create a build environment for transpilation
FROM node:12.16 AS build
# Set the working directory to /app
WORKDIR /app
# Copy the source files into the container
COPY ./backend /app/backend
COPY ./common /app/common
COPY ./frontend /app/frontend
COPY ./*.json /app/
# Install node modules (all / development mode)
RUN npm ci
# Transpile and build the app
RUN ./node_modules/.bin/tsc -p . --skipLibCheck
RUN npm run build


# Now, build all over again but this time exclude all the development/build files
FROM node:12.16 
# Set the working directory to /app
WORKDIR /app
# Copy the files we need for deployment into the container:
# Includes the backend files like .yml files and .pug files we need; the .ts files aren't needed
COPY ./backend /app/backend
# Then our transpiled JS files and the frontend static files:
COPY --from=build /app/dist/backend /app/backend
COPY --from=build /app/dist/common /app/common
COPY --from=build /app/frontend/dist /app/frontend/dist
# And package.json needed for node:
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
# Run in production mode by default
ENV NODE_ENV production
# Install all production-required node packages
RUN npm ci --only=production
# The Back & Forth backend server runs on port 3333
EXPOSE 3333
# Run backend/backend-server.js when the container launches
CMD ["node", "backend/backend-server.js"]
