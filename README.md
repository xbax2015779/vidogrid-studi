# VidoGrid Studio — Vercel starter

A small Next.js companion app for sending video-generation requests to VidoGrid. The API key is read only by server routes and is never sent to the browser. The entire app is protected by HTTP Basic Authentication using `APP_PASSWORD`.

## Model endpoints
- Veo 3.1 Fast: `POST /uapi/v1/video-gen/veo`, with `model=veo-3.1-fast`.
- Grok Imagine Video 1.5: `POST /uapi/v1/video-gen/grok-imagine-video-1.5`.
- Muse: VidoGrid's overview lists `POST /uapi/v1/video-gen/meta`; confirm the exact Muse model identifier and accepted fields in its current endpoint guide before production use.

The overview docs show the common job flow: submit, receive a `uuid`, then query `GET /uapi/v1/history/{uuid}`. This starter looks for a video URL under common keys; otherwise it displays the raw response for inspection.

## Deploy to Vercel
1. Unzip this project.
2. Create a GitHub repository and upload the contents of this folder.
3. In Vercel, import that repository as a new project.
4. In Vercel → Project → Settings → Environment Variables, add:
   - `VIDOGRID_API_KEY` = your VidoGrid API key
   - `APP_PASSWORD` = a long, unique password you choose for this private app
   Select Preview and Production (and Development if desired).
5. Deploy or redeploy. Open the Vercel URL; your browser will ask for a username and password. Username: `studio`. Password: the `APP_PASSWORD` you set.

Do **not** use `NEXT_PUBLIC_VIDOGRID_API_KEY`. Do not commit `.env.local` or your API key to GitHub. Do not share the Vercel URL and app password publicly.

## Local development
```bash
npm install
cp .env.example .env.local
# Fill in both secrets in .env.local; never commit this file.
npm run dev
```

## Model-specific caveats
VidoGrid model guides may use model-specific parameter names and duration limits. The overview page confirms the endpoint paths but does not expose every parameter schema. This starter currently sends `duration`, `aspect_ratio`, and `resolution` as common form fields. Confirm the precise field names and allowed duration values for each model in the current endpoint guide. The UI includes 5/6/8/10/15-second options, but not every model necessarily supports every duration. Muse's exact model identifier should also be verified from its endpoint guide before production use.
