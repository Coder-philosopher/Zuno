FROM public.ecr.aws/lambda/python:3.10

WORKDIR /var/task
RUN yum install -y gcc gcc-c++ libffi-devel libxml2-devel libxslt-devel python3-devel
RUN pip install --upgrade pip && pip install scrapy boto3

COPY . .
CMD ["handlers/scrapingHandler.handler"]
