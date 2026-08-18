import { createServerFn } from "@tanstack/react-start";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function signPayload(payload: string) {
  const secret = process.env["SESSION_SECRET"] ?? "dev-session-secret-placeholder";
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function issueToken() {
  const exp = String(Date.now() + TOKEN_TTL_MS);
  return `${exp}.${signPayload(exp)}`;
}

function requireAdmin(token: string | undefined) {
  const [exp, sig] = (token ?? "").split(".");
  if (!exp || !sig) throw new Error("Não autorizado");
  if (Number(exp) < Date.now()) throw new Error("Não autorizado");
  const expected = signPayload(exp);
  if (sig.length !== expected.length) throw new Error("Não autorizado");
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    throw new Error("Não autorizado");
  }
}

export type MenuOverride = {
  item_id: string;
  price: number | null;
  available: boolean;
};

export const getMenuOverrides = createServerFn({ method: "GET" }).handler(
  async (): Promise<MenuOverride[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("menu_overrides")
      .select("item_id, price, available");
    if (error) return [];
    return (data ?? []).map((row) => ({
      item_id: row.item_id,
      price: row.price === null ? null : Number(row.price),
      available: row.available,
    }));
  },
);

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getAdminSession();
  return { unlocked: Boolean(session.data.unlocked) };
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env["MENU_ADMIN_PASSWORD"];
    if (!expected) return { ok: false as const };
    if (!matches(data.password ?? "", expected)) return { ok: false as const };
    const session = await getAdminSession();
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

export const saveMenuItem = createServerFn({ method: "POST" })
  .inputValidator((data: { itemId: string; price: number; available: boolean }) => {
    if (!data.itemId || typeof data.itemId !== "string") throw new Error("Item inválido");
    if (!Number.isFinite(data.price) || data.price < 0 || data.price > 100000) {
      throw new Error("Preço inválido");
    }
    return { itemId: data.itemId, price: data.price, available: Boolean(data.available) };
  })
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("menu_overrides").upsert(
      {
        item_id: data.itemId,
        price: data.price,
        available: data.available,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "item_id" },
    );
    if (error) throw new Error("Não foi possível salvar");
    return { ok: true as const };
  });
