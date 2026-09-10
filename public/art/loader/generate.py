#!/usr/bin/env python3
import base64
import json
import mimetypes
import os
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

ENV_PATH = Path("/Users/cadowo/Library/Mobile Documents/com~apple~CloudDocs/Documents/projects/vibes/video-workflowe/.env")
IMAGE_PATH = Path("/Users/cadowo/Library/Mobile Documents/com~apple~CloudDocs/Documents/projects/vibes/portfolio-mac/public/art/loader/mushroom-head.png")
OUTPUT_MP4 = Path("/Users/cadowo/Library/Mobile Documents/com~apple~CloudDocs/Documents/projects/vibes/portfolio-mac/public/art/loader/mushroom-rotate-square-v3.mp4")

API_BASE = "https://ark.ap-southeast.bytepluses.com/api/v3"

def get_api_key():
    for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("LAS_API_KEY=") or line.startswith("MODELARK_API_KEY="):
            val = line.split("=", 1)[1].strip().strip("'\"")
            return val
    raise RuntimeError("API key not found in .env")

def local_image_data_url(path: Path) -> str:
    mime_type, _ = mimetypes.guess_type(path.name)
    mime_type = mime_type or "image/png"
    return f"data:{mime_type};base64,{base64.b64encode(path.read_bytes()).decode('ascii')}"

def json_request(url: str, payload=None, api_key_str=None, timeout=60):
    headers = {"Authorization": f"Bearer {api_key_str}", "Content-Type": "application/json"}
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(url, data=data, headers=headers, method="POST" if payload is not None else "GET")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as err:
        err_msg = err.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {err.code}: {err_msg}") from err

def download(url: str, destination: Path):
    destination.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "video-workflow/1.0"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        destination.write_bytes(resp.read())

def main():
    api_key_str = get_api_key()
    print(f"API Key loaded (prefix: {api_key_str[:12]}...)")
    
    prompt = (
        "A 360-degree orbital camera shot circling smoothly and continuously around the illustrated mushroom character at constant speed. "
        "The camera moves in a complete 360-degree circle around the subject in one single direction without stopping or reversing: "
        "starting from the front face (0°), orbiting around to show the profile (90°), fully circling behind to show the back of the red polka-dot mushroom cap (180°), "
        "continuing around the other side (270°), and completing the full 360-degree orbit back to the front (360°), then continuing seamlessly into another turn. "
        "Strict rules: Unidirectional continuous 360 rotation only. Absolutely no oscillating, no reversing direction, no swaying left and right. "
        "Subject remains centered. Exact same hand-drawn ink linework, red mushroom cap with black dots, and textured cream paper background."
    )
    
    data_url = local_image_data_url(IMAGE_PATH)
    content = [
        {"type": "text", "text": prompt},
        {"type": "image_url", "image_url": {"url": data_url}, "role": "first_frame"}
    ]
    
    tasks_url = f"{API_BASE}/contents/generations/tasks"
    payload = {
        "model": "dreamina-seedance-2-0-fast-260128",
        "content": content,
        "ratio": "1:1",
        "resolution": "720p",
        "duration": 4
    }
    
    print("Submitting generation task to ModelArk Seedance 2.0 Fast (1:1 square, 4s, 720p, 360 orbital camera)...")
    res = json_request(tasks_url, payload, api_key_str=api_key_str)
    task_id = res.get("id")
    print(f"Task ID: {task_id}")
    
    status_url = f"{tasks_url}/{task_id}"
    start_time = time.time()
    video_url = None
    
    while time.time() - start_time < 300:
        time.sleep(4)
        status_res = json_request(status_url, api_key_str=api_key_str)
        status = status_res.get("status")
        elapsed = int(time.time() - start_time)
        print(f"[{elapsed}s] Task status: {status}")
        
        if status == "succeeded":
            content_res = status_res.get("content", {})
            if isinstance(content_res, dict) and "video_url" in content_res:
                video_url = content_res["video_url"]
            elif "video_url" in status_res:
                video_url = status_res["video_url"]
            elif isinstance(content_res, list):
                for it in content_res:
                    if isinstance(it, dict) and it.get("type") == "video_url":
                        video_url = it.get("video_url", {}).get("url")
            break
        elif status in ("failed", "cancelled"):
            raise RuntimeError(f"Task ended with status: {status}. Detail: {status_res}")
            
    if not video_url:
        raise RuntimeError("No video URL returned")
        
    print(f"Downloading video from {video_url} to {OUTPUT_MP4}...")
    download(video_url, OUTPUT_MP4)
    print(f"Saved MP4: {OUTPUT_MP4} ({OUTPUT_MP4.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
