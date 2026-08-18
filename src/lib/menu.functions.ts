import { createServerFn } from "@tanstack/react-start";
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

export const adminStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { token?: string | undefined }) => data ?? {})
  .handler(async ({ data }) => {
    try {
      const { requireAdmin } = await import("./menu-auth.server");
      requireAdmin(data.token);
      return { unlocked: true };
    } catch {
      return { unlocked: false };
    }
  });

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const { matchesPassword, issueToken } = await import("./menu-auth.server");
    const expected = process.env["MENU_ADMIN_PASSWORD"];
    if (!expected) return { ok: false as const, token: null };
    if (!matchesPassword(data.password ?? "", expected)) {
      return { ok: false as const, token: null };
    }
    return { ok: true as const, token: issueToken() };
  });

export const saveMenuItem = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { itemId: string; price: number; available: boolean; token?: string | undefined }) => {
    if (!data.itemId || typeof data.itemId !== "string") throw new Error("Item inválido");
    if (!Number.isFinite(data.price) || data.price < 0 || data.price > 100000) {
      throw new Error("Preço inválido");
    }
      return {
        itemId: data.itemId,
        price: data.price,
        available: Boolean(data.available),
        token: data.token,
      };
    },
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./menu-auth.server");
    requireAdmin(data.token);
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
