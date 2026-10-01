import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ACCESS_COOKIE = "cx_access";
export const ACCESS_PATH = "/cluster-explorer";

function secret() {
  return process.env.CLUSTER_EXPLORER_PASSWORD?.trim() || "";
}

/** Cookie value derived from the password, so changing the password signs everyone out. */
export function accessToken() {
  const pw = secret();
  return pw ? createHmac("sha256", pw).update("cluster-explorer:v1").digest("hex") : "";
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function passwordMatches(input: string) {
  const pw = secret();
  return Boolean(pw) && safeEqual(input, pw);
}

export async function hasAccess() {
  const token = accessToken();
  if (!token) return false;
  const value = (await cookies()).get(ACCESS_COOKIE)?.value ?? "";
  return safeEqual(value, token);
}
