import json
import os
import io
import logging
import boto3
from urllib.parse import urlparse
from scrapy.crawler import CrawlerProcess
from scrapy import signals
from scrapy.signalmanager import dispatcher
from your_scrapy_project.spiders.quotes import StructuredSpider  # your spider module

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# --- S3 client (pointing to local MinIO instead of AWS) ---
s3 = boto3.client(
    "s3",
    endpoint_url=os.environ.get("S3_ENDPOINT", "http://localhost:9000"),  # MinIO endpoint
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID", "minioadmin"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY", "minioadmin"),
    region_name="us-east-1"  # arbitrary, MinIO ignores region
)

# --- Lambda client (can keep AWS if you're actually using AWS Lambda) ---
lambda_client = boto3.client("lambda")

def run_spider(start_url):
    """Run the Scrapy spider and return aggregated text."""
    scraped_text_buffer = io.StringIO()

    # Signal handler to collect scraped items
    def crawler_item_handler(item):
        scraped_text_buffer.write("\n\n========== PAGE ==========\n")
        scraped_text_buffer.write(f"URL: {item.get('url', '')}\n")
        scraped_text_buffer.write(f"Title: {item.get('title', '')}\n")
        scraped_text_buffer.write(f"Word Count: {item.get('word_count', 0)}\n")
        scraped_text_buffer.write("----------------------------\n")
        scraped_text_buffer.write(item.get('text', ''))
        scraped_text_buffer.write("\n")

    process = CrawlerProcess({
        "LOG_LEVEL": "ERROR",
        "ROBOTSTXT_OBEY": True,
        "AUTOTHROTTLE_ENABLED": True,
        "DOWNLOAD_DELAY": 0.3,
        "DEPTH_LIMIT": 3,
    })

    dispatcher.connect(crawler_item_handler, signal=signals.item_scraped)
    process.crawl(StructuredSpider, start_url=start_url)
    process.start()
    return scraped_text_buffer.getvalue()

def handler(event, context):
    try:
        project_id = event.get("projectId")
        start_url = event.get("frontendUrl")
        s3_bucket = os.environ.get("S3_BUCKET_NAME")
        embedding_lambda_name = os.environ.get("EMBEDDING_LAMBDA_NAME")

        if not all([project_id, start_url, s3_bucket, embedding_lambda_name]):
            raise ValueError("Missing one or more required parameters or environment variables.")

        logger.info(f"Starting scraping for project: {project_id}, url: {start_url}")

        scraped_text = run_spider(start_url)
        if not scraped_text.strip():
            raise Exception("No content scraped")

        # Upload result to local MinIO (S3-compatible)
        s3_key = f"projects/{project_id}/{start_url}/scraped.txt"
        s3.put_object(
            Bucket=s3_bucket,
            Key=s3_key,
            Body=scraped_text.encode("utf-8"),
            ContentType="text/plain"
        )
        logger.info(f"Uploaded scraped data to s3://{s3_bucket}/{s3_key}")

        # Trigger embedding Lambda (this part still uses AWS Lambda unless you stub it)
        response = lambda_client.invoke(
            FunctionName=embedding_lambda_name,
            InvocationType="Event",
            Payload=json.dumps({
                "projectId": project_id,
                "s3Bucket": s3_bucket,
                "s3Key": s3_key,
            }).encode("utf-8")
        )
        logger.info(f"Triggered embedding Lambda: {embedding_lambda_name}")

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Scraping initiated successfully",
                "s3Bucket": s3_bucket,
                "s3Key": s3_key
            })
        }
    except Exception as e:
        logger.error(f"Scraping failed: {str(e)}", exc_info=True)
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
