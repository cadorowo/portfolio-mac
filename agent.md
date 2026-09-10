# Portfolio Project Guidelines & Agent Directives

> [!IMPORTANT]
> **Language Policy**: This portfolio is strictly in **English**. All user-facing copy, navigation controls, metadata, headings, descriptions, tooltips, and labels must be written in English.
> 
> **Design & Style Policy**:
> - **Sidebar**: The right sidebar must be pure solid black (`#000000`), minimal and editorial.
> - **Color Palette**: Strictly neutral and monochrome (black `#000000`, white `#ffffff`, and neutral grays `#cccccc`, `#888888`, `#1c1c1c`). Do **NOT** use unrequested colors (no gold, yellow, amber, blue, etc.).
> - **Tactile / Cardboard Navigation Buttons on Stage**: Use tactile cardboard-style arrow buttons ("bottoni cartonati") on the stage/desk for forward and backward navigation (off-white/paper card surface `#f6f1e8`, bold dark border `2px solid #14110e`, crisp extruded shadow `box-shadow: 0 4px 0 #000000`, and active press-down feel).
> - **Clean Sidebar Footer**: The right sidebar footer contains only the **"Back to selection"** return button (no duplicate Previous/Next buttons in the sidebar).
> - **No Boxed Item Lists in Sidebar Overview**: Do **NOT** render boxed lists/buttons of items (e.g. "SELECT A RECORD", "SELECTED WORKS", "TABLE OF CONTENTS" button lists) in the right sidebar. The workspace items on the desk are the direct interactive objects.
> - **No Boxed Metadata Cards**: Do **NOT** render boxed metadata tables or cards (e.g. Format / Project / Year boxes). Keep editorial details integrated naturally into titles, kickers, subtitles, or prose.
> - **No Page / Item Counts**: Do **NOT** display numerical page or item counters (e.g. "01 / 04", "Pages 01 - 02 / 04", "4 Releases", etc.) anywhere in the UI. Keep headers purely focused on title, year, category, and editorial metadata.
> - **Typography for Titles**: All headings and main titles (`h1`–`h6`, `.sidebar-title`, `.paper-sheet-main-title`, etc.) must use the handwritten cursive font used for "Home" (`var(--font-title)`: `'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive`).
> - **Standardized Return Link**: The return link must always say **"Back to selection"** across all detail views.

---

# Agente di Ritaglio: Tracce Magazine

Questo documento contiene anche le linee guida operative, le coordinate verificate e i comandi automatizzati per ritagliare e preparare le pagine di **Tracce Magazine** senza residui di bordi bianchi/grigi da scanner.

---

## 1. Obiettivo & Vincoli
- **Zero bordi dello scanner**: eliminare qualsiasi striscia bianca, grigia o di sfondo dello scanner presente attorno alle pagine.
- **Rapporto d'aspetto coerente**: mantenere le proporzioni editoriali standard (formato B5 proporzione ~1:1.414).
- **Nessun bordo o letterbox in visualizzazione**: il layout CSS deve riempire il contenitore a doppia pagina con `object-fit: cover` e sfondo trasparente (`background: transparent`).

---

## 2. Percorsi File
- **Scansioni originali (sorgente)**:
  - `TRACCE/Copertina Front.jpeg` (1903 × 2653 px)
  - `TRACCE/Pag.1.jpeg` (1893 × 2650 px)
  - `TRACCE/Pag 2.jpeg` (1975 × 2739 px)
  - `TRACCE/Pag.3.jpeg` (2004 × 2770 px)
- **Asset ottimizzati per il sito (destinazione)**:
  - `public/art/tracce/Copertina Front-clean.jpg`
  - `public/art/tracce/Pag.1-clean.jpg`
  - `public/art/tracce/Pag 2-clean.jpg`
  - `public/art/tracce/Pag.3-clean.jpg`

---

## 3. Coordinate di Ritaglio Verificate

Ogni immagine proviene da una scansione a letto piano (flatbed). I bordi dello scanner si trovano tipicamente:
- In alto e in basso: riflesso e bordo del coperchio.
- Sul lato esterno: piano di vetro bianco.
- Sul lato interno (costa/dorso): ombra della curvatura della rilegatura.

### Specifiche di ritaglio (sintassi `crop=W:H:X:Y`):

| File | Dimensioni originali | Box di ritaglio (`W:H:X:Y`) | Risoluzione finale | Aspect Ratio | Note |
|---|---|---|---|---|---|
| **Copertina Front** | 1903 × 2653 | `1680:2410:108:135` | 1680 × 2410 | ~0.697 | Taglia il coperchio superiore e il margine destro |
| **Pagina 1** | 1893 × 2650 | `1700:2400:85:120` | 1700 × 2400 | ~0.708 | Taglia la testata e il margine bianco destro dello scanner |
| **Pagina 2** | 1975 × 2739 | `1680:2370:175:160` | 1680 × 2370 | ~0.708 | Taglia il coperchio in alto/basso e il bianco a destra |
| **Pagina 3** | 2004 × 2770 | `1680:2380:215:215` | 1680 × 2380 | ~0.705 | Taglia l'ampia fascia bianca a sinistra dello scanner |

---

## 4. Esecuzione del Ritaglio (Comando Diretto FFmpeg)

Per rigenerare tutte le immagini pulite ad alta qualità (`-q:v 2`), eseguire da terminale nella root del progetto:

```bash
ffmpeg -y -i "TRACCE/Copertina Front.jpeg" -vf "crop=1680:2410:108:135" -q:v 2 "public/art/tracce/Copertina Front-clean.jpg" && \
ffmpeg -y -i "TRACCE/Pag.1.jpeg" -vf "crop=1700:2400:85:120" -q:v 2 "public/art/tracce/Pag.1-clean.jpg" && \
ffmpeg -y -i "TRACCE/Pag 2.jpeg" -vf "crop=1680:2370:175:160" -q:v 2 "public/art/tracce/Pag 2-clean.jpg" && \
ffmpeg -y -i "TRACCE/Pag.3.jpeg" -vf "crop=1680:2380:215:215" -q:v 2 "public/art/tracce/Pag.3-clean.jpg"
```

---

## 5. Script Python di Ritaglio e Controllo Qualità

Se si aggiungono nuove pagine o scansioni, utilizzare questo script per ritagliare e verificare che il perimetro non contenga pixel bianchi/grigiastri da scanner:

```python
#!/usr/bin/env python3
import subprocess

crops = {
    'Copertina Front-clean.jpg': ('TRACCE/Copertina Front.jpeg', 108, 135, 1680, 2410),
    'Pag.1-clean.jpg': ('TRACCE/Pag.1.jpeg', 85, 120, 1700, 2400),
    'Pag 2-clean.jpg': ('TRACCE/Pag 2.jpeg', 175, 160, 1680, 2370),
    'Pag.3-clean.jpg': ('TRACCE/Pag.3.jpeg', 215, 215, 1680, 2380),
}

def process_and_verify():
    for name, (src, x, y, w, h) in crops.items():
        dst = f"public/art/tracce/{name}"
        print(f"[*] Elaborazione {name}: {w}x{h} da ({x},{y})...")
        cmd = [
            'ffmpeg', '-y', '-i', src,
            '-vf', f'crop={w}:{h}:{x}:{y}',
            '-q:v', '2', dst
        ]
        subprocess.check_call(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # Ispezione raw perimetro
        raw = subprocess.check_output([
            'ffmpeg', '-v', 'error', '-i', dst,
            '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'
        ])
        top = [raw[i:i+3] for i in range(0, w*3, 3)]
        bot = [raw[(h-1)*w*3 + i : (h-1)*w*3 + i + 3] for i in range(0, w*3, 3)]
        left = [raw[(r*w)*3 : (r*w)*3 + 3] for r in range(h)]
        right = [raw[(r*w + w - 1)*3 : (r*w + w - 1)*3 + 3] for r in range(h)]
        
        print(f"    Top: max avg={max(sum(p)//3 for p in top)}")
        print(f"    Bottom: max avg={max(sum(p)//3 for p in bot)}")
        print(f"    Left: max avg={max(sum(p)//3 for p in left)}")
        print(f"    Right: max avg={max(sum(p)//3 for p in right)}")
        print(f"    -> {name} ritagliato con successo.\n")

if __name__ == '__main__':
    process_and_verify()
```

---

## 6. Regole di Visualizzazione CSS (`app/globals.css`)

Affinché la resa a schermo non reintroduca bordi o fasce vuote:

1. **Doppia pagina (`.magazine-spread`)**:
   ```css
   .magazine-spread {
     display: flex;
     width: min(78vw, calc(min(74vh, 740px) * 1.414), 1080px);
     aspect-ratio: 336 / 238;
     max-height: min(74vh, 740px);
     border-radius: 4px;
     overflow: hidden;
     perspective: 1600px;
     filter: drop-shadow(0 18px 14px rgb(25 18 12 / 35%));
   }
   ```
2. **Singola pagina (`.magazine-page`)**:
   ```css
   .magazine-page {
     width: 50%;
     height: 100%;
     overflow: hidden;
     background: transparent; /* Niente sfondi chiari che possano sbavare */
   }
   .magazine-page img {
     display: block;
     width: 100%;
     height: 100%;
     object-fit: cover; /* Riempe la pagina senza bande laterali o superiori */
   }
   ```
3. **Card Copertina (`.magazine-cover-card`)**:
   ```css
   .magazine-cover-card {
     aspect-ratio: 168 / 241;
     border-radius: 4px;
     overflow: hidden;
     background: transparent;
   }
   .magazine-cover-card img {
     display: block;
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
   ```

---

## 7. Verifica Finale
Dopo aver applicato modifiche:
1. Compilare il progetto con `npm run build` per verificare il prerender delle route.
2. Visitare la route `/tracce-magazine` e verificare visivamente che sia la copertina sia le doppie pagine non presentino alcuna riga o margine bianco.
