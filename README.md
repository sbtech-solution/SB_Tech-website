# SB Tech Solution

A responsive React + Vite + Tailwind website for SB Tech Solution.

## Run locally on Windows 11

1. Install Node.js 20+.
2. Open PowerShell in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Build and deploy

- `npm run build` creates the production build in `dist`.
- Run `npm run preview` to check the production build locally.
- Import this folder into Vercel, keep the framework preset as **Vite**, and deploy the frontend. Set `VITE_API_URL` to the deployed API URL.
- Deploy the `server` folder separately on a Node.js host. Set `ALLOWED_ORIGINS` to the frontend URL and add `CONTACT_EMAIL` after connecting a real email provider or delivery workflow.

## Notes

- WhatsApp quote actions use `https://wa.me/916382379827` with a prefilled message.
- The contact form validates fields locally and submits to `POST /api/enquiries`. The API returns an explicit configuration error until `CONTACT_EMAIL` is set; it does not show a false success state.
- Start the contact API locally with `npm run server`. Copy `.env.example` to `.env` first.
- Replace the sample portfolio cards with real work only after project details are available.
- Email and business address are intentionally marked as configurable until supplied.
"# SB_Tech-website" 
