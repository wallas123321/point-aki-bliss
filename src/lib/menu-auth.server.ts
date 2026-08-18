import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export function matchesPassword(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

function signPayload(payload: string) {
  const secret = process.env["SESSION_SECRET"] ?? "dev-session-secret-placeholder";
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function issueToken() {
  const exp = String(Date.now() + TOKEN_TTL_MS);
  return `${exp}.${signPayload(exp)}`;
}

export function requireAdmin(token: string | undefined) {
  const [exp, sig] = (token ?? "").split(".");
  if (!exp || !sig) throw new Error("Não autorizado");
  if (Number(exp) < Date.now()) throw new Error("Não autorizado");
  const expected = signPayload(exp);
  if (sig.length !== expected.length) throw new Error("Não autorizado");
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    throw new Error("Não autorizado");
  }
}
