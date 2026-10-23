# Instrucțiuni pentru agent

Proiect: landing page static. Tot ce construiești stă în `site/`.

## Reguli
- Doar HTML, CSS și JavaScript simplu. Fără build, fără framework, fără librării externe sau CDN.
- Modifici doar fișierele din `site/`. Nu atingi `.github/`, `scripts/`, `package.json` sau `GEMINI.md`.
- Pagina principală rămâne `site/index.html`.
- Conținut în română, cu diacritice complete, dacă issue-ul nu cere altă limbă.
- Nu inventa date de contact, prețuri sau mărturii. Dacă lipsesc, folosește un marcaj clar, de exemplu `[telefon]`.
- Nu pune secrete, chei sau date personale în fișiere.

## Rubrica de design (se verifică pe screenshot-uri)
1. **Responsive:** fără scroll orizontal la 390px, 820px și 1440px.
2. **Contrast:** text lizibil pe fundal (minim 4.5:1 pentru textul normal).
3. **Ierarhie:** un singur `<h1>`, titluri în ordine, un buton principal evident.
4. **Spațiere:** margini și spații consecvente, fără elemente lipite.
5. **Semantică:** `<main>`, `<header>`, `<footer>`, atribut `alt` pe imagini.
6. **Performanță:** imagini mici, fără fișiere mari inutile.

## Proces
Mai întâi propui un plan cu pași mici. Lucrezi doar după aprobare. Un PR = un issue.
