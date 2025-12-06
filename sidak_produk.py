#!/usr/bin/env python3
"""
sidak_produk.py

- Baca list URL dari rumah/produk.txt
- Ambil title & og:image
- Jika og:image tidak ada → dianggap produk tidak aktif → hapus URL
- Generate rumah/produk.html
"""
import httpx, re, html, os
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin

INPUT_FILE = "rumah/produk.txt"
OUTPUT_FILE = "rumah/produk.html"
GITHUB_BASE = "https://raw.githubusercontent.com/madi10/MANTANKODE/refs/heads/blogger/rumah/"
UA = "Mozilla/5.0 (TelegramBot)"
MAX_TITLE_LENGTH = 60

def fetch_shopee_meta(url, timeout=20):
    """Ambil title & og:image, kembalikan None jika tidak ada image"""
    try:
        with httpx.Client(follow_redirects=True, timeout=timeout) as client:
            resp = client.get(url, headers={"User-Agent": UA})
        soup = BeautifulSoup(resp.text, "html.parser")
        # ambil title
        title_tag = soup.find("meta", property="og:title") or soup.find("meta", attrs={"name":"og:title"})
        title = title_tag["content"].strip() if title_tag and title_tag.has_attr("content") else (soup.title.string.strip() if soup.title else "")
        # ambil image
        img_tag = soup.find("meta", property="og:image")
        if not img_tag or not img_tag.has_attr("content"):
            return None  # dianggap produk tidak aktif
        img = img_tag["content"].strip()
        if img.startswith("//"): img = "https:" + img
        elif img.startswith("/"): img = urljoin(str(resp.url), img)
        return {"title": title or short_code_from_url(url), "final_url": str(resp.url), "img_src": img}
    except:
        return None  # jika error, anggap tidak aktif

def short_code_from_url(url):
    try:
        p = urlparse(url)
        seg = p.path.rstrip("/").split("/")[-1]
        return re.sub(r'[^A-Za-z0-9_\-]', '', seg) or "img"
    except:
        return "img"

def html_escape(s): return html.escape(s or "", quote=True)

def shorten_title(title, max_len=MAX_TITLE_LENGTH):
    title = title.strip()
    if len(title) <= max_len: return title
    cut = title[:max_len]
    last_space = cut.rfind(' ')
    if last_space > 0: cut = cut[:last_space]
    return cut + "…"

def build_snippet(title, final_url, img_src):
    short_title = shorten_title(title)
    return (
f'<div class="mkSlot">\n'
f'  <a href="{html_escape(final_url)}" target="_blank" rel="nofollow noopener">\n'
f'    <img src="{html_escape(img_src)}" alt="{html_escape(short_title)}" loading="lazy" />\n'
f'    <div class="t">Jual {html_escape(short_title)}</div>\n'
f'  </a>\n'
f'</div>'
    )

def main():
    if not os.path.exists(INPUT_FILE):
        print(f"{INPUT_FILE} tidak ditemukan!")
        return

    valid_urls = []
    snippets = []

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        urls = [line.strip() for line in f if line.strip()]

    for url in urls:
        meta = fetch_shopee_meta(url)
        if meta:  # hanya URL dengan og:image
            snippet = build_snippet(meta["title"], meta["final_url"], meta["img_src"])
            snippets.append(snippet)
            valid_urls.append(url)
        else:
            print(f"[Dihapus] URL dianggap tidak aktif: {url}")

    # tulis kembali hanya URL valid ke produk.txt
    with open(INPUT_FILE, "w", encoding="utf-8") as f:
        for u in valid_urls:
            f.write(u + "\n")

    # tulis HTML
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n\n".join(snippets))

    print(f"Berhasil membuat {len(snippets)} snippet di {OUTPUT_FILE}. URL tanpa gambar dihapus dari {INPUT_FILE}.")

if __name__ == "__main__":
    main()