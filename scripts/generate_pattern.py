#!/usr/bin/env python3
"""Generate pattern variations using BytePlus ModelArk Seedream 5.0 Pro."""

import os
import sys
import json
import base64
import ssl
import mimetypes
import urllib.request
import urllib.error
from pathlib import Path

API_URL = "https://ark.ap-southeast.bytepluses.com/api/v3/images/generations"
MODEL = "dola-seedream-5-0-pro-260628"

def get_api_key():
    key = os.environ.get("MODELARK_API_KEY") or os.environ.get("LAS_API_KEY") or os.environ.get("ARK_API_KEY")
    if key:
        return key
    env_paths = [
        Path(".env"),
        Path("../.env"),
    ]
    for p in env_paths:
        if p.exists():
            for line in p.read_text().splitlines():
                line = line.strip()
                if line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip().strip("'\"")
                if k in ("MODELARK_API_KEY", "LAS_API_KEY", "ARK_API_KEY"):
                    return v
    raise RuntimeError("No ModelArk API key found!")

def image_to_data_url(path: Path) -> str:
    mime_type, _ = mimetypes.guess_type(path.name)
    if not mime_type:
        mime_type = "image/png"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime_type};base64,{b64}"

def download(url: str, output_path: Path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    ctx = ssl._create_unverified_context()
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
        output_path.write_bytes(resp.read())

def generate_image(prompt: str, reference_path: Path, output_path: Path, size="2K", aspect_ratio="16:9"):
    api_key = get_api_key()
    data_url = image_to_data_url(reference_path)
    
    # Try with size and aspect_ratio
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "size": size,
        "response_format": "url",
        "output_format": "png",
        "watermark": False,
        "image": data_url
    }
    if aspect_ratio:
        payload["aspect_ratio"] = aspect_ratio
        
    ctx = ssl._create_unverified_context()
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        },
        method="POST"
    )
    
    print(f"Sending generation request to ModelArk ({MODEL})...")
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=180) as resp:
            data = json.load(resp)
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        # If aspect_ratio causes an issue, try without aspect_ratio but with size="2048x1152"
        print(f"HTTP Error {e.code}: {err_body}")
        if "aspect_ratio" in err_body or e.code == 400:
            print("Retrying with size='2048x1152' without aspect_ratio field...")
            payload.pop("aspect_ratio", None)
            payload["size"] = "2048x1152"
            req2 = urllib.request.Request(
                API_URL,
                data=json.dumps(payload).encode("utf-8"),
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                method="POST"
            )
            with urllib.request.urlopen(req2, context=ctx, timeout=180) as resp2:
                data = json.load(resp2)
        else:
            raise
            
    images = data.get("data", [])
    if not images or not images[0].get("url"):
        raise RuntimeError(f"No image URL in response: {data}")
    
    img_url = images[0]["url"]
    print(f"Downloading generated image to {output_path}...")
    download(img_url, output_path)
    print(f"Successfully saved {output_path}!")
    return output_path

if __name__ == "__main__":
    ref = Path("public/art/loader/mushroom-head.png")
    out = Path("public/patterns/test_pattern_16x9.png")
    prompt = "A seamless minimalist repeating grid pattern in 16:9 horizontal format featuring the exact same hand-drawn black ink characters from the reference image on warm textured paper."
    if ref.exists():
        generate_image(prompt, ref, out)
