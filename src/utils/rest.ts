import type { APIRoute } from "astro";

/**
 * The internal URL
 *
 * @param route the route within this projects API (e.g., /api/search)
 * @returns the url of Wise House api, adding the route (e.g., https://api.wisehouse.app/search)
 */
export function getURL(route: string): string {
  const aux = route.split("api/");
  const newURL = aux[aux.length - 1];
  const base = "https://api1-2v6xvmx6xq-as.a.run.app";
  return `${base}/${newURL}`;
}

type HTML_METHOD =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";
export function wisehouseMiddleware(method: HTML_METHOD): APIRoute {
  return async ({ request }) => {
    const fullURL = getURL(request.url);
    const token = request.headers.get("Authorization");
    const headers = getHeaders({ token });

    let options: any = { method, headers };
    if (method !== "GET") {
      const params = await request.json();
      const body = JSON.stringify(params);
      options["body"] = body;
    }
    return fetch(fullURL, options);
  };
}

export function getHeaders({
  contentType,
  token,
}: {
  contentType?: string;
  token?: any;
}): any {
  let wisehouse_key = import.meta.env.WISEHOUSE_API_KEY;
  if (!wisehouse_key) {
    throw new Error("Could not find API key.");
  }
  let headers: any = {
    "Content-Type": contentType || "application/json",
    "WiseHouse-API-Key": wisehouse_key,
  };
  if (token) {
    headers["Authorization"] = token;
  }

  return headers;
}
