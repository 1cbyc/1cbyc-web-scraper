from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import re
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapeRequest(BaseModel):
    url: str

EMAIL_REGEX = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
PHONE_REGEX = r"\+?\d[\d\s().-]{7,}\d"

async def fetch_page_content(url: str) -> str:
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(url, timeout=30000)
        content = await page.content()
        await browser.close()
        return content

def extract_emails(text: str) -> List[str]:
    return re.findall(EMAIL_REGEX, text)

def extract_phones(text: str) -> List[str]:
    return re.findall(PHONE_REGEX, text)

def extract_links(soup: BeautifulSoup, base_url: str) -> List[str]:
    links = []
    for a in soup.find_all('a', href=True):
        href = a['href']
        if not href.startswith('http'):
            continue
        links.append(href)
    return links

@app.post("/scrape")
async def scrape(request: ScrapeRequest):
    url = request.url.strip()
    if not url.startswith("http"):
        url = "https://" + url
    try:
        html = await fetch_page_content(url)
        soup = BeautifulSoup(html, "html.parser")
        text = soup.get_text()
        emails = list(set(extract_emails(text)))
        phones = list(set(extract_phones(text)))
        links = list(set(extract_links(soup, url)))
        return {
            "success": True,
            "url": url,
            "emails": emails,
            "phones": phones,
            "links": links,
        }
    except Exception as e:
        return {"success": False, "error": str(e)} 