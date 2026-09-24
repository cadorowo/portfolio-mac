#!/usr/bin/env python3
"""Generate 4 pattern variations using BytePlus ModelArk Seedream 5.0 Pro."""

import os
import sys
import json
import base64
import ssl
import mimetypes
import urllib.request
import urllib.error
import time
from pathlib import Path

API_URL = "https://ark.ap-southeast.bytepluses.com/api/v3/images/generations"
MODEL = "dola-seedream-5-0-pro-260628"

REFERENCE_IMAGE_PATH = Path("public/art/loader/mushroom-head.png")
OUTPUT_DIR = Path("public/patterns")

PATTERNS = [
    {
        "id": "pattern_01_minimal_grid",
        "title": "Variante 1: Minimalist Regular Grid Pattern",
        "filename": "pattern_01_minimal_grid.png",
        "prompt": (
            "A seamless repeating horizontal 16:9 minimalist pattern featuring the exact same quirky hand-drawn black ink characters from the reference image. "
            "The five little characters with spotted mushroom caps are arranged in an elegant, evenly spaced regular grid across the wide canvas. "
            "Clean fine black ink linework, minimalist doodle style on warm off-white textured handmade paper background. "
            "Generous balanced negative space, neat rhythmic composition, high resolution, minimalist comic illustration."
        )
    },
    {
        "id": "pattern_02_dense_scatter",
        "title": "Variante 2: Dense Playful Scatter All-Over Pattern",
        "filename": "pattern_02_dense_scatter.png",
        "prompt": (
            "A rich, dense all-over horizontal 16:9 wallpaper scatter pattern featuring the exact same quirky little black ink characters from the reference image. "
            "The spotted mushroom-headed figures are tumbling, dancing, walking, lounging, and interacting at playful angles across the entire widescreen canvas. "
            "Consistent hand-drawn black ink contour lines on warm cream textured vintage paper background. "
            "High density textile repeat motif, joyful indie comic sketchbook wallpaper, whimsical and lively."
        )
    },
    {
        "id": "pattern_03_flowing_waves",
        "title": "Variante 3: Dynamic Undulating Waves & Parades",
        "filename": "pattern_03_flowing_waves.png",
        "prompt": (
            "A dynamic, rhythmic flowing horizontal 16:9 pattern featuring the exact same little black ink characters from the reference image. "
            "The spotted mushroom-headed little characters form graceful undulating horizontal waves and gentle curving parades flowing from left to right across the widescreen canvas. "
            "Delicate black ink brush lines on off-white textured watercolor paper. "
            "Harmonious musical flow, airy spacing between wavy tiers, playful kinetic movement, charming minimalist art."
        )
    },
    {
        "id": "pattern_04_modular_frames",
        "title": "Variante 4: Geometric Modular Tile Grid (Comic Cells)",
        "filename": "pattern_04_modular_frames.png",
        "prompt": (
            "A stylish geometric modular tile pattern in horizontal 16:9 format. "
            "Delicate thin black ink square frames and subtle comic vignette boxes neatly tessellated across the wide canvas. "
            "Inside each cell, exactly one of the quirky black ink characters from the reference image is showcased in a different iconic pose (standing arms crossed, walking smugly, dancing, lying down). "
            "Warm ivory parchment paper texture, minimalist editorial layout, refined contemporary Japanese indie illustration aesthetic."
        )
    }
]

def get_api_key() -> str:
    key = os.environ.get("MODELARK_API_KEY") or os.environ.get("LAS_API_KEY") or os.environ.get("ARK_API_KEY")
    if key:
        return key
    env_file = Path(".env")
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            k = k.strip()
            v = v.strip().strip("'\"")
            if k in ("MODELARK_API_KEY", "LAS_API_KEY", "ARK_API_KEY"):
                return v
    raise RuntimeError("ModelArk API key not found.")

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

def generate_pattern(pattern_info: dict, ref_data_url: str, api_key: str) -> Path:
    out_path = OUTPUT_DIR / pattern_info["filename"]
    print(f"\n==========================================")
    print(f"Generating: {pattern_info['title']}")
    print(f"Target file: {out_path}")
    print(f"==========================================")
    
    payload = {
        "model": MODEL,
        "prompt": pattern_info["prompt"],
        "size": "2K",
        "aspect_ratio": "16:9",
        "response_format": "url",
        "output_format": "png",
        "watermark": False,
        "image": ref_data_url
    }
    
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
    
    start_time = time.time()
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=180) as resp:
            data = json.load(resp)
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
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
            
    elapsed = time.time() - start_time
    print(f"ModelArk generation completed in {elapsed:.1f}s")
    
    images = data.get("data", [])
    if not images or not images[0].get("url"):
        raise RuntimeError(f"No image URL returned: {data}")
        
    img_url = images[0]["url"]
    print(f"Downloading to {out_path}...")
    download(img_url, out_path)
    print(f"Saved: {out_path} ({out_path.stat().st_size} bytes)")
    return out_path

def main():
    api_key = get_api_key()
    print("API Key loaded successfully.")
    print(f"Reading reference image from: {REFERENCE_IMAGE_PATH}")
    if not REFERENCE_IMAGE_PATH.exists():
        raise FileNotFoundError(f"Reference image not found at {REFERENCE_IMAGE_PATH}")
    
    ref_data_url = image_to_data_url(REFERENCE_IMAGE_PATH)
    print(f"Reference image encoded ({len(ref_data_url)} chars).")
    
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    generated_files = []
    for p in PATTERNS:
        out_file = generate_pattern(p, ref_data_url, api_key)
        generated_files.append(out_file)
        
    print("\nAll 4 pattern variants successfully generated!")
    for f in generated_files:
        print(f" - {f}")

if __name__ == "__main__":
    main()
