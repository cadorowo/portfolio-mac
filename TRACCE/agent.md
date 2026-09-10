# Agente di Ritaglio: Tracce Magazine

Vedi la documentazione completa e aggiornata in [`../agent.md`](../agent.md).

### Comando Rapido FFmpeg per rigenerare le immagini pulite:

```bash
ffmpeg -y -i "TRACCE/Copertina Front.jpeg" -vf "crop=1680:2410:108:135" -q:v 2 "public/art/tracce/Copertina Front-clean.jpg" && \
ffmpeg -y -i "TRACCE/Pag.1.jpeg" -vf "crop=1700:2400:85:120" -q:v 2 "public/art/tracce/Pag.1-clean.jpg" && \
ffmpeg -y -i "TRACCE/Pag 2.jpeg" -vf "crop=1680:2370:175:160" -q:v 2 "public/art/tracce/Pag 2-clean.jpg" && \
ffmpeg -y -i "TRACCE/Pag.3.jpeg" -vf "crop=1680:2380:215:215" -q:v 2 "public/art/tracce/Pag.3-clean.jpg"
```
