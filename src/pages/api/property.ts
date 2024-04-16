
import type { APIRoute } from "astro";
import { wisehouseMiddleware } from "../../utils/rest"

export const prerender = false;
export const GET: APIRoute = wisehouseMiddleware('GET')