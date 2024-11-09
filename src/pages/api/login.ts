import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = `${new URL(request.url).origin}/api/callback`;
  // console.log('redirect_uri', redirect_uri);
  const scope = "playlist-read-private user-library-read";

  const spotifyAuthUrl = new URL("https://accounts.spotify.com/authorize");
  spotifyAuthUrl.searchParams.append("client_id", client_id);
  spotifyAuthUrl.searchParams.append("response_type", "code");
  spotifyAuthUrl.searchParams.append("redirect_uri", redirect_uri);
  spotifyAuthUrl.searchParams.append("scope", scope);

  return new Response(null, {
    status: 302,
    headers: {
      Location: spotifyAuthUrl.toString(),
    },
  });
};
