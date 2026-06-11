import type { Handler } from "@netlify/functions";
import { processContactRequest } from "../../server/contactMail";

export const handler: Handler = async (event) => {
  const result = await processContactRequest(event.httpMethod, event.body);

  return {
    statusCode: result.status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.body),
  };
};
