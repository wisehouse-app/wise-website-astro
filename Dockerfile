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
RUN npm run build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist


ENV HOST=0.0.0.0

EXPOSE 3000
ENV PORT 3000

CMD node ./dist/server/entry.mjs
