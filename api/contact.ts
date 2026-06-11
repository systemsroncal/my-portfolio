import type { VercelRequest, VercelResponse } from "@vercel/node";
import { processContactRequest } from "../server/contactMail";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const result = await processContactRequest(req.method ?? "GET", req.body);
  return res.status(result.status).json(result.body);
}
