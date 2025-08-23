FROM public.ecr.aws/lambda/nodejs:18
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY handlers/embeddingHandler.js handlers/
CMD ["handlers/embeddingHandler.handler"]
