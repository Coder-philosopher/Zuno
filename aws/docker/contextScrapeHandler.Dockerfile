FROM public.ecr.aws/lambda/nodejs:18
WORKDIR /var/task
COPY package*.json ./
RUN npm install --production
COPY . .
CMD [ "aws/handlers/contextScrapeHandler.handler" ]
