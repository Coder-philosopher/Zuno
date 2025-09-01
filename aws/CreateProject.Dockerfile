FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /var/task

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["handlers/createProjectHandler.js"]