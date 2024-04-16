FROM node:lts-alpine AS base
WORKDIR /app

# Use the environment variables
# ARG WISEHOUSE_API_KEY

# Use them in your Dockerfile as needed
ENV WISEHOUSE_API_KEY=$WISEHOUSE_API_KEY


# By copying only the package.json and package-lock.json here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm install --production

FROM base AS build-deps
RUN npm install --production=false

FROM build-deps AS build
COPY . .
COPY .env .env
RUN API_URL=$API_URL WISEHOUSE_API_KEY=$WISEHOUSE_API_KEY npm run build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env .env

ENV HOST=0.0.0.0

EXPOSE 3000
ENV PORT 3000

CMD node ./dist/server/entry.mjs







# # Use an official Node.js runtime as the base image
# FROM node:lts-alpine AS base
# ARG WISEHOUSE_API_KEY
# ARG API_URL
# ENV WISEHOUSE_API_KEY=$WISEHOUSE_API_KEY
# ENV API_URL=$API_URL
# # Set the working directory in the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install project dependencies
# RUN npm install

# # Copy the .env file into the image
# COPY .env .env

# # Copy the rest of the application source code
# COPY . .

# # Build your Astro app
# # RUN API_URL=$API_URL WISEHOUSE_API_KEY=$WISEHOUSE_API_KEY npm run build

# # Expose the port your app will run on (assuming it's 3000)
# EXPOSE 3000

# # Start your Astro app
# # CMD [ "npm", "start" ]
