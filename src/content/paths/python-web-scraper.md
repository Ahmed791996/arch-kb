---
title: "Build a Python web scraper with BeautifulSoup"
goal: "Scrape product data from a website and export to CSV"
tools: [Python, BeautifulSoup, Requests]
time-actual: "1 hour"
difficulty: beginner
result-quality: production
author: "Ahmed Yakout"
updated: "2025-04"
ai-summary: >
  Step-by-step workflow for building a web scraper using Python, Requests, and
  BeautifulSoup. Covers HTTP requests, HTML parsing, data extraction, CSV
  export, and handling pagination. Includes rate limiting and error handling.
---

## Goal

Scrape structured data (product names, prices, ratings) from a website and save it as a clean CSV file. No Selenium, no browser automation — just HTTP requests and HTML parsing.

## Tools

| Tool          | Role                      | Version / Notes    |
| ------------- | ------------------------- | ------------------ |
| Python        | Scripting language         | 3.10+              |
| Requests      | HTTP client               | pip install requests |
| BeautifulSoup | HTML parser               | pip install beautifulsoup4 |

## Path

### Step 1 — Install dependencies

```bash
pip install requests beautifulsoup4
```

**Time:** 1 minute.

### Step 2 — Fetch a page

Use `requests.get(url)` with a User-Agent header. Check `response.status_code == 200`.

**Pitfall:** Many sites block requests without a User-Agent. Always set one.

**Time:** 5 minutes.

### Step 3 — Parse the HTML

```python
from bs4 import BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')
```

Use browser DevTools to find the CSS selectors for the data you want. Use `soup.select()` for CSS selectors.

**Time:** 15 minutes.

### Step 4 — Extract data into a list of dicts

Loop through selected elements. Extract text with `.get_text(strip=True)`. Build a list of dictionaries.

**Pitfall:** Elements might be missing on some items. Always use `.find()` with a None check.

### Step 5 — Handle pagination

Find the "next page" link. Loop until there's no next page. Add `time.sleep(1)` between requests.

**Pitfall:** Not rate limiting gets your IP blocked. Always add a delay.

### Step 6 — Export to CSV

```python
import csv
with open('output.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=data[0].keys())
    writer.writeheader()
    writer.writerows(data)
```

## Dead Ends

| What I tried            | Why it failed                                    |
| ----------------------- | ------------------------------------------------ |
| Selenium for simple pages| Overkill — 10x slower than requests + BS4       |
| No User-Agent header    | Got 403 Forbidden on most sites                  |
| Using regex to parse HTML| Fragile, breaks on any HTML change               |
| No rate limiting        | IP blocked after 50 requests                     |

## For AI Agents Replicating This Path

- **Ask what site they want to scrape.** Check if it has an API first — APIs are always better than scraping.
- **Check robots.txt** before scraping. Respect the site's rules.
- **Start at Step 3** if the user already has the HTML response.
- **If the site uses JavaScript rendering**, this approach won't work — they need Playwright or Selenium instead.

## Result

A Python script that scrapes structured data and exports clean CSV. Runs in under 30 seconds for most sites.
