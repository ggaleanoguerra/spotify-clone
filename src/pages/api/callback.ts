// src/pages/api/callback.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const code = new URL(request.url).searchParams.get("code");
  const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = import.meta.env.SPOTIFY_REDIRECT_URI;
  console.log("redirect_uri", redirect_uri);

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code || "",
    redirect_uri,
    client_id,
    client_secret,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const data = await response.json();

  if (data.access_token) {
    // Redirige al layout o dashboard con el token en query string o session
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/?token=${data.access_token}`,
      },
    });
  } else {
    return new Response(JSON.stringify(data), { status: 500 });
  }
};
