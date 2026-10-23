# landing-loop

Buclă de agent pentru un landing page, pe GitHub Actions și Gemini (cheie gratuită).

## Cum se folosește
1. Creezi un issue cu ce vrei (ex. „Hero cu titlu și buton").
2. Comentezi: `@gemini-cli <ce să facă>`. Agentul postează „AI Assistant: Plan of Action".
3. Dacă planul e bun, comentezi: `@gemini-cli /approve`. Agentul creează branch și PR.
4. Apoi rulează automat screenshot-urile (desktop, tablet, mobil) și apar în comentariul PR-ului.
5. Tu verifici și faci merge manual.

Doar proprietarul repo-ului poate declanșa agentul.

## Setare (o singură dată)
- Secret `GEMINI_API_KEY` (cheie din Google AI Studio)
- Variabilă `GEMINI_MODEL` = `gemini-3.5-flash-lite`
- Settings -> Actions -> General -> „Allow GitHub Actions to create and approve pull requests"

## Surse
`gemini-invoke.yml` și `gemini-plan-execute.yml` vin din exemplele oficiale
[google-github-actions/run-gemini-cli](https://github.com/google-github-actions/run-gemini-cli),
copiate fără modificări.
