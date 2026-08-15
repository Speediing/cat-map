/**
 * Signed session tokens for the password gate.
 * Web Crypto only, so the same code runs in the proxy (edge) and in
 * server actions (node).
 *
 * Token format: "<expiry ms>.<hex hmac-sha256 of expiry>"
 */

export const SESSION_COOKIE = "site_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const encoder = new TextEncoder();

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);
  if (bufA.length !== bufB.length) return false;
  let diff = 0;
  for (let i = 0; i < bufA.length; i++) diff |= bufA[i] ^ bufB[i];
  return diff === 0;
}

export async function createSessionToken(secret: string): Promise<string> {
  const expiry = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = String(expiry);
  const key = await hmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toHex(signature)}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expiry = Number(payload);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const key = await hmacKey(secret);
  const expected = toHex(
    await crypto.subtle.sign("HMAC", key, encoder.encode(payload)),
  );
  return timingSafeEqual(signature, expected);
}

/** Constant-time password check, used by the login action. */
export function passwordMatches(candidate: string, actual: string): boolean {
  return timingSafeEqual(candidate, actual);
}
