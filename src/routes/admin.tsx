import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Lock, LogOut } from "lucide-react";
import { menuCatalog, type MenuTab } from "@/data/menu";
import {
  adminLogin,
  adminLogout,
  adminStatus,
  getMenuOverrides,
  saveMenuItem,
  type MenuOverride,
} from "@/lib/menu.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Configurar cardápio | Point Aki do Açaí" },
      {
        name: "description",
        content:
          "Painel para ativar, desativar e alterar os preços dos itens do cardápio do Point Aki do Açaí.",
      },
      { property: "og:title", content: "Configurar cardápio | Point Aki do Açaí" },
      {
        property: "og:description",
        content: "Painel interno de gestão do cardápio do Point Aki do Açaí.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const css = `
  .adm-root {
    min-height: 100vh;
    padding: 22px 14px 44px;
    color: #fff9ff;
    background: linear-gradient(180deg, #0a050b, #14081a 45%, #050305);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }
  .adm-shell { width: min(100%, 880px); margin: 0 auto; }
  .adm-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 18px; }
  .adm-btn {
    display: inline-flex; align-items: center; gap: 8px; min-height: 42px; padding: 0 14px;
    border: 1px solid rgba(255,255,255,.16); border-radius: 12px; color: #fff;
    background: rgba(255,255,255,.06); text-decoration: none; font-weight: 800; cursor: pointer;
  }
  .adm-title { margin: 0 0 6px; font-size: 1.5rem; font-weight: 950; }
  .adm-sub { margin: 0 0 20px; color: #d5c3d7; font-size: .9rem; }
  .adm-card {
    padding: 20px; border: 1px solid rgba(207,40,189,.3); border-radius: 16px;
    background: rgba(255,255,255,.04);
  }
  .adm-input {
    width: 100%; min-height: 46px; padding: 0 12px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,.18); background: rgba(0,0,0,.35); color: #fff; font-size: 1rem;
  }
  .adm-primary {
    margin-top: 12px; width: 100%; min-height: 46px; border: 0; border-radius: 12px; color: #fff;
    background: linear-gradient(135deg, #5c075f, #aa159f); font-weight: 900; cursor: pointer;
  }
  .adm-error { margin-top: 10px; color: #ff879f; font-weight: 700; font-size: .9rem; }
  .adm-section { margin-top: 24px; }
  .adm-section h2 { margin: 0 0 10px; font-size: 1.05rem; font-weight: 900; color: #f0a7e6; text-transform: uppercase; letter-spacing: .04em; }
  .adm-row {
    display: grid; grid-template-columns: 1fr 120px 132px; gap: 10px; align-items: center;
    padding: 11px 12px; margin-bottom: 8px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04);
  }
  .adm-row.off { opacity: .62; }
  .adm-name { font-weight: 800; font-size: .95rem; }
  .adm-price { min-height: 40px; text-align: right; }
  .adm-toggle {
    min-height: 40px; border-radius: 10px; border: 1px solid transparent; font-weight: 900; cursor: pointer;
    color: #071b0d; background: #25d366;
  }
  .adm-toggle.off { color: #ffd7e0; background: #7a1330; }
  .adm-tabs { display: flex; gap: 8px; margin-bottom: 14px; }
  .adm-tab { flex: 1; min-height: 44px; border-radius: 12px; border: 1px solid rgba(207,40,189,.35); background: rgba(255,255,255,.05); color: #e6d6e7; font-weight: 900; cursor: pointer; }
  .adm-tab.active { color: #fff; background: linear-gradient(135deg, #5c075f, #aa159f); border-color: transparent; }
  @media (max-width: 620px) {
    .adm-row { grid-template-columns: 1fr; }
    .adm-price { text-align: left; }
  }
`;

type Draft = { price: string; available: boolean };

function AdminPage() {
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const status = useServerFn(adminStatus);
  const fetchOverrides = useServerFn(getMenuOverrides);
  const save = useServerFn(saveMenuItem);

  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<MenuTab>("local");
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  function seedDrafts(overrides: MenuOverride[]) {
    const map = new Map(overrides.map((o) => [o.item_id, o]));
    const next: Record<string, Draft> = {};
    (Object.keys(menuCatalog) as MenuTab[]).forEach((key) => {
      menuCatalog[key].forEach((section) =>
        section.items.forEach((item) => {
          const o = map.get(item.id);
          next[item.id] = {
            price: String(o?.price ?? item.price),
            available: o ? o.available : item.available,
          };
        }),
      );
    });
    setDrafts(next);
  }

  useEffect(() => {
    let active = true;
    (async () => {
      const [{ unlocked: isUnlocked }, overrides] = await Promise.all([
        status(),
        fetchOverrides(),
      ]);
      if (!active) return;
      setUnlocked(isUnlocked);
      seedDrafts(overrides);
      setChecking(false);
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { ok } = await login({ data: { password } });
    if (ok) {
      setUnlocked(true);
      setPassword("");
    } else {
      setError("Senha incorreta.");
    }
  }

  async function persist(itemId: string, draft: Draft) {
    setSavingId(itemId);
    setError("");
    try {
      const price = Number(draft.price.replace(",", "."));
      await save({ data: { itemId, price, available: draft.available } });
    } catch {
      setError("Não foi possível salvar. Tente novamente.");
    } finally {
      setSavingId(null);
    }
  }

  if (checking) {
    return (
      <div className="adm-root">
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div className="adm-shell">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="adm-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="adm-shell">
        <div className="adm-top">
          <Link className="adm-btn" to="/">
            <ArrowLeft size={18} /> Início
          </Link>
          {unlocked ? (
            <button
              type="button"
              className="adm-btn"
              onClick={async () => {
                await logout();
                setUnlocked(false);
              }}
            >
              <LogOut size={18} /> Sair
            </button>
          ) : null}
        </div>

        <h1 className="adm-title">Configurar cardápio</h1>

        {!unlocked ? (
          <form className="adm-card" onSubmit={handleLogin}>
            <p className="adm-sub">
              <Lock size={14} style={{ display: "inline", marginRight: 6 }} />
              Digite a senha para gerenciar preços e disponibilidade.
            </p>
            <input
              className="adm-input"
              type="password"
              autoComplete="current-password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="adm-primary" type="submit">
              Entrar
            </button>
            {error ? <p className="adm-error">{error}</p> : null}
          </form>
        ) : (
          <>
            <p className="adm-sub">
              Toque em Disponível/Indisponível para ativar ou desativar o item. Altere o
              preço e ele é salvo automaticamente.
            </p>
            <div className="adm-tabs">
              <button
                type="button"
                className={`adm-tab ${tab === "local" ? "active" : ""}`}
                onClick={() => setTab("local")}
              >
                Consumo no local
              </button>
              <button
                type="button"
                className={`adm-tab ${tab === "casa" ? "active" : ""}`}
                onClick={() => setTab("casa")}
              >
                Levar para casa
              </button>
            </div>

            {error ? <p className="adm-error">{error}</p> : null}

            {menuCatalog[tab].map((section) => (
              <div className="adm-section" key={section.id}>
                <h2>{section.title}</h2>
                {section.items.map((item) => {
                  const draft = drafts[item.id] ?? {
                    price: String(item.price),
                    available: item.available,
                  };
                  return (
                    <div
                      className={`adm-row ${draft.available ? "" : "off"}`}
                      key={item.id}
                    >
                      <span className="adm-name">{item.name}</span>
                      <input
                        className="adm-input adm-price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={draft.price}
                        onChange={(e) =>
                          setDrafts((d) => ({
                            ...d,
                            [item.id]: { ...draft, price: e.target.value },
                          }))
                        }
                        onBlur={() => persist(item.id, drafts[item.id] ?? draft)}
                      />
                      <button
                        type="button"
                        className={`adm-toggle ${draft.available ? "" : "off"}`}
                        disabled={savingId === item.id}
                        onClick={() => {
                          const next = { ...draft, available: !draft.available };
                          setDrafts((d) => ({ ...d, [item.id]: next }));
                          persist(item.id, next);
                        }}
                      >
                        {draft.available ? "Disponível" : "Indisponível"}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
