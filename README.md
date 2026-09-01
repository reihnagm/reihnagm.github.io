# Personal Portfolio — Dymas Alfin (placeholder)

Website portfolio statis (HTML/CSS/JS murni, tanpa build step), siap di-deploy ke **GitHub Pages**.

## Struktur file
```
index.html   -> semua konten & section (Hero, Work, Service, Experience, Contact)
style.css    -> semua styling
script.js    -> filter tab "Work", menu mobile, tahun footer
```

## Yang perlu lu edit sebelum publish

1. **Nama & role** — di `index.html`, cari `DYMAS` / `ALFIN` dan `UI/UX Designer`, ganti sesuai data lu.
2. **Foto profil** — sekarang masih placeholder kotak abu-abu bertuliskan inisial "DA".
   Ganti di `index.html`:
   ```html
   <div class="photo-frame" aria-hidden="true">DA</div>
   ```
   jadi:
   ```html
   <div class="photo-frame">
     <img src="assets/profile.jpg" alt="Nama Lu">
   </div>
   ```
   lalu tambahkan di `style.css` pada `.photo-frame img { width:100%; height:100%; object-fit:cover; border-radius: var(--radius-md); }`
3. **Proyek portfolio** — ganti judul, tag, dan gradient thumbnail (`.thumb-a` s/d `.thumb-d` di `style.css`) sesuai proyek asli lu. Untuk pakai gambar asli, ganti `<div class="work-thumb thumb-a">` dengan `<img src="assets/project1.jpg" ...>`.
4. **Pengalaman kerja** — edit list di section `#experience`.
5. **Link sosial** — ganti semua `href="https://dribbble.com"` dkk. dengan URL profil asli lu.
6. **Tombol Contact** — ganti `mailto:hello@dymasalfin.com` dengan email lu.
7. **Judul tab & meta description** — di bagian `<head>`.

## Cara publish ke GitHub Pages

1. Buat repo baru di GitHub, misalnya `username.github.io` (kalau mau jadi domain utama) atau nama bebas seperti `portfolio`.
2. Upload/push 3 file ini (`index.html`, `style.css`, `script.js`) ke root repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```
3. Buka repo di GitHub → **Settings → Pages**.
4. Di **Source**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit, situs lu akan live di:
   - `https://USERNAME.github.io/` (kalau nama repo `username.github.io`), atau
   - `https://USERNAME.github.io/REPO/` (kalau nama repo bebas).

## Catatan teknis
- Font pakai Google Fonts (Space Grotesk + Inter), sudah otomatis load lewat CDN — tidak perlu di-download manual.
- Tidak ada dependency/build tool, jadi 100% kompatibel dengan GitHub Pages apa adanya.
- Filter "Work" (All / Real Project / Exploration) sudah interaktif lewat `script.js`, tinggal atur atribut `data-cat` di tiap `.work-card`.
- Responsive dari mobile sampai desktop, termasuk menu hamburger di layar sempit.
