FROM public.ecr.aws/lambda/nodejs:18

# Lambda image expects /var/task
WORKDIR /var/task

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy handler to root of /var/task
COPY . .

# CMD must be module.function
CMD ["handlers/registerHandler.handler"]
