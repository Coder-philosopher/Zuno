# Use the official AWS Lambda Node.js 18 runtime base image
FROM public.ecr.aws/lambda/nodejs:18

# Set working directory inside the container
WORKDIR /var/task

# Copy package.json and package-lock.json first for caching dependencies
COPY package*.json ./

# Install all production dependencies
RUN npm install --production

# Copy the full backend source code into container
COPY . .

# (Optional) Build step if using typescript or transpilers
# RUN npm run build or tsc

# Set the Lambda handler (adjust path and exported handler function if different)
# For a single API Lambda serving all routes, this could be main.js exporting handler
# or an index.js that routes calls internally
CMD [ "aws/main.handler" ]
