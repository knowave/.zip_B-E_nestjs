FROM node:20-alpine

WORKDIR /app

# COPY package*.json ./
COPY . .

RUN yarn install

RUN yarn build

FROM public.ecr.aws/lambda/nodejs:20

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# CMD ["yarn", "start:prod"]
CMD ["node", "dist/main.js"]