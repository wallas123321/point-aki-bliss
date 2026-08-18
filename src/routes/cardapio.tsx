import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  MapPin,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import logo from "@/assets/logo-point-aki.png";
import whatsappLogo from "@/assets/whatsapp-logo.png.asset.json";
import bandeiraPara from "@/assets/bandeira-para.png.asset.json";
import { menuCatalog, type MenuItem, type MenuTab } from "@/data/menu";
import { getMenuOverrides, type MenuOverride } from "@/lib/menu.functions";

const whatsappNumber = "554498721016";
const address = "R. Ver. Joaquim Pereira de Castro, 311 - Vila Santo Antônio, Maringá";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio | Point Aki do Açaí" },
      {
        name: "description",
        content:
          "Cardápio do Point Aki do Açaí: comidas típicas do Norte, açaí paraense e produtos para levar para casa em Maringá.",
      },
      { name: "theme-color", content: "#0b050d" },
    ],
  }),
  component: CardapioPage,
});

const css = `
  .menu-root {
    --menu-bg: #080509;
    --menu-bg-soft: #120916;
    --menu-purple: #6d0a70;
    --menu-purple-2: #9a1599;
    --menu-magenta: #cf28bd;
    --menu-pink: #f05adb;
    --menu-green: #62b90b;
    --menu-text: #fff9ff;
    --menu-muted: #d8c9d9;
    --menu-line: rgba(234, 80, 211, .52);
    min-height: 100vh;
    color: var(--menu-text);
    background:
      radial-gradient(circle at 12% 2%, rgba(206, 40, 189, .20), transparent 22rem),
      radial-gradient(circle at 88% 20%, rgba(98, 185, 11, .08), transparent 18rem),
      radial-gradient(circle at 20% 84%, rgba(109, 10, 112, .22), transparent 26rem),
      linear-gradient(180deg, #0a050b 0%, #090509 45%, #050305 100%);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    overflow-x: hidden;
  }

  .menu-root * { box-sizing: border-box; }

  .menu-shell {
    width: min(100%, 1120px);
    margin: 0 auto;
    padding: 18px 16px 36px;
  }

  .ornament-line {
    height: 17px;
    margin: 0 0 22px;
    opacity: .86;
    background:
      linear-gradient(135deg, transparent 35%, var(--menu-purple-2) 36% 43%, transparent 44%) 0 0 / 28px 17px,
      linear-gradient(45deg, transparent 35%, var(--menu-purple-2) 36% 43%, transparent 44%) 14px 0 / 28px 17px;
    border-top: 1px solid rgba(207,40,189,.48);
    border-bottom: 1px solid rgba(207,40,189,.48);
  }

  .menu-header {
    position: relative;
    display: grid;
    grid-template-columns: 190px 1fr;
    align-items: center;
    gap: 28px;
    margin-bottom: 22px;
    padding: 18px 28px 22px;
    border: 1px solid rgba(207,40,189,.28);
    background: linear-gradient(180deg, rgba(255,255,255,.025), rgba(255,255,255,.008));
    box-shadow: 0 22px 60px rgba(0,0,0,.32);
    overflow: hidden;
  }

  .menu-header::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--menu-magenta), transparent);
    z-index: 2;
  }

  .menu-header-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: .68;
    z-index: 0;
    pointer-events: none;
  }

  .menu-header-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(8,5,9,.42), rgba(8,5,9,.68));
    z-index: 1;
    pointer-events: none;
  }

  .menu-logo {
    position: relative;
    z-index: 3;
    width: 176px;
    height: 176px;
    border-radius: 50%;
    object-fit: cover;
    filter: drop-shadow(0 0 18px rgba(207,40,189,.30));
  }

  .menu-brand {
    position: relative;
    z-index: 3;
    text-align: center;
  }

  .menu-brand-name {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2rem, 5vw, 4.2rem);
    font-weight: 700;
    line-height: .95;
    letter-spacing: -.045em;
  }

  .menu-brand-name .do { color: var(--menu-green); font-size: 1.25em; }

  .menu-title {
    margin: 12px 0 0;
    font-size: clamp(3rem, 8vw, 6.6rem);
    line-height: .88;
    letter-spacing: .015em;
    font-weight: 950;
    text-transform: uppercase;
    color: #fdf7fd;
    text-shadow:
      0 0 5px rgba(255,255,255,.28),
      0 0 19px rgba(207,40,189,.40),
      0 4px 0 rgba(76,9,77,.46);
  }

  .menu-subtitle {
    margin: 12px 0 0;
    color: var(--menu-pink);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.2rem, 3.2vw, 2.2rem);
    font-style: italic;
    font-weight: 700;
  }

  .menu-toolbar {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 14px;
    align-items: center;
    margin: 0 0 22px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 46px;
    padding: 0 16px;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 14px;
    color: #fff;
    background: rgba(255,255,255,.045);
    text-decoration: none;
    font-weight: 800;
  }

  .menu-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 6px;
    border: 1px solid rgba(207,40,189,.32);
    border-radius: 16px;
    background: rgba(12,5,14,.84);
  }

  .menu-tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 48px;
    border: 1px solid rgba(207,40,189,.28);
    border-radius: 11px;
    color: #d9c8da;
    background: rgba(255,255,255,.045);
    font-family: "Montserrat", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 900;
    cursor: pointer;
    transition: .18s ease;
  }

  .menu-tab:hover {
    color: #fff;
    background: rgba(255,255,255,.09);
    border-color: rgba(207,40,189,.55);
  }

  .menu-tab.active {
    color: #fff;
    background: linear-gradient(135deg, #5c075f, #aa159f);
    border-color: transparent;
    box-shadow: 0 8px 24px rgba(143,13,139,.28), inset 0 1px 0 rgba(255,255,255,.16);
  }

  .menu-content {
    display: grid;
    gap: 28px;
  }

  .menu-section {
    position: relative;
    padding: 0 18px 18px;
    border: 1px solid rgba(207,40,189,.28);
    background: linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.012));
    box-shadow: 0 16px 40px rgba(0,0,0,.18);
  }

  .section-title {
    position: relative;
    z-index: 1;
    width: min(86%, 720px);
    margin: -1px auto 12px;
    padding: 10px 24px;
    color: #fff;
    background: linear-gradient(90deg, #4b084d, #9d1296 48%, #4b084d);
    text-align: center;
    text-transform: uppercase;
    font-size: clamp(1rem, 2.7vw, 1.55rem);
    font-weight: 950;
    letter-spacing: .035em;
    clip-path: polygon(3% 0, 97% 0, 100% 50%, 97% 100%, 3% 100%, 0 50%);
  }

  .items-list {
    display: grid;
    gap: 6px;
  }

  .menu-item {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, auto) 1fr auto auto;
    gap: 12px;
    align-items: center;
    min-height: 72px;
    padding: 14px 12px;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 12px;
    background: rgba(255,255,255,.03);
    transition: opacity .18s ease, background .18s ease, transform .18s ease;
  }

  .menu-item:nth-child(odd) { background: rgba(255,255,255,.065); }
  .menu-item:nth-child(even) { background: rgba(255,255,255,.025); }
  .menu-item:hover { background: rgba(207,40,189,.14); transform: translateY(-1px); }
  .menu-item:last-child { margin-bottom: 0; }

  .item-copy { min-width: 0; }

  .item-name {
    display: block;
    color: #fff;
    font-size: clamp(.98rem, 2vw, 1.18rem);
    font-weight: 850;
    line-height: 1.18;
  }

  .item-description {
    display: block;
    margin-top: 3px;
    color: #c9b9ca;
    font-size: .83rem;
    line-height: 1.28;
  }

  .item-dots {
    min-width: 24px;
    border-bottom: 2px dotted rgba(255,255,255,.34);
    transform: translateY(3px);
  }

  .item-price {
    min-width: 96px;
    padding: 7px 13px;
    border-radius: 999px;
    color: #fff;
    background: linear-gradient(180deg, #97108f, #67106b);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.14);
    text-align: center;
    font-size: .94rem;
    font-weight: 950;
    white-space: nowrap;
  }

  .order-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 42px;
    padding: 0 15px;
    border-radius: 12px;
    color: #071b0d;
    background: #25d366;
    box-shadow: 0 8px 20px rgba(37,211,102,.16);
    text-decoration: none;
    font-size: .9rem;
    font-weight: 950;
    white-space: nowrap;
  }

  .menu-item.unavailable { opacity: .58; }
  .menu-item.unavailable .item-name { text-decoration: line-through; text-decoration-thickness: 2px; }
  .menu-item.unavailable .item-dots { opacity: .35; }
  .menu-item.unavailable .order-button {
    pointer-events: none;
    color: #bbaebc;
    background: #312832;
    box-shadow: none;
  }

  .unavailable-badge {
    position: absolute;
    top: 50%;
    right: 112px;
    z-index: 2;
    translate: 0 -50%;
    rotate: -5deg;
    padding: 5px 9px;
    border: 2px solid #ff5d7e;
    border-radius: 5px;
    color: #ff829b;
    background: rgba(18,5,10,.94);
    font-size: .7rem;
    font-weight: 1000;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .menu-footer {
    margin-top: 24px;
    padding: 22px 20px;
    border-top: 1px solid var(--menu-line);
    border-bottom: 1px solid var(--menu-line);
    text-align: center;
  }

  @keyframes whatsapp-pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 10px 26px rgba(37,211,102,.22), 0 0 0 0 rgba(37,211,102,.35);
    }
    50% {
      transform: scale(1.025);
      box-shadow: 0 14px 32px rgba(37,211,102,.30), 0 0 22px 8px rgba(37,211,102,.28);
    }
  }

  .footer-whatsapp {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 58px;
    padding: 0 24px;
    border-radius: 14px;
    color: #071b0d;
    background: #25d366;
    font-size: clamp(.74rem, 1.85vw, .98rem);
    font-weight: 950;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: .02em;
    white-space: nowrap;
    animation: whatsapp-pulse 2.6s ease-in-out infinite;
  }

  .footer-whatsapp img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .footer-address {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 13px;
    color: #f2e8f3;
    font-size: .92rem;
    font-weight: 650;
  }

  .bottom-ornament { margin: 22px 0 0; }

  @media (max-width: 760px) {
    .menu-shell { padding: 10px 9px 26px; }
    .ornament-line { margin-bottom: 12px; }
    .menu-header {
      grid-template-columns: 88px 1fr;
      gap: 10px;
      padding: 13px 10px 16px;
    }
    .menu-logo { width: 84px; height: 84px; }
    .menu-brand { min-width: 0; }
    .menu-brand-name { font-size: clamp(1.15rem, 5.6vw, 1.7rem); }
    .menu-title { margin-top: 6px; font-size: clamp(1.7rem, 8.5vw, 2.8rem); }
    .menu-subtitle { font-size: clamp(.92rem, 4.4vw, 1.25rem); }
    .menu-toolbar { grid-template-columns: 1fr; }
    .back-link { width: fit-content; min-height: 40px; }
    .menu-tabs { grid-template-columns: 1fr; position: sticky; top: 8px; z-index: 20; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
    .menu-tab { min-height: 44px; font-size: .82rem; }
    .menu-section { padding: 0 10px 12px; }
    .section-title { width: 96%; padding-inline: 12px; margin-bottom: 14px; }
    .items-list { gap: 8px; }
    .menu-item {
      grid-template-columns: 1fr auto;
      gap: 7px 10px;
      min-height: 86px;
      padding: 13px 10px;
      border: 1px solid rgba(255,255,255,.10);
      border-radius: 12px;
    }
    .item-copy { grid-column: 1 / 2; }
    .item-dots { display: none; }
    .item-price { grid-column: 2; grid-row: 1; min-width: 83px; padding: 6px 9px; font-size: .84rem; }
    .order-button { grid-column: 1 / -1; width: 100%; min-height: 40px; }
    .order-button img { width: 48px; height: 48px; }
    .unavailable-badge { right: 5px; top: 49px; translate: 0 0; font-size: .62rem; }
    .footer-whatsapp { gap: 10px; min-height: 62px; padding: 0 14px; font-size: .72rem; }
    .footer-whatsapp img { width: 50px; height: 50px; }
    .footer-address { align-items: flex-start; text-align: left; }
  }

  @media (max-width: 370px) {
    .menu-header { grid-template-columns: 76px 1fr; }
    .menu-logo { width: 72px; height: 72px; }
    .menu-tab { gap: 5px; font-size: .77rem; }
    .menu-tab svg { width: 17px; height: 17px; }
  }
`;

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

function buildWhatsAppUrl(item: MenuItem) {
  const message = `Olá! Quero pedir ${item.name}, ${formatPrice(item.price)}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function CardapioPage() {
  const search = useSearch({ from: "/cardapio" }) as { tab?: string };
  const initialTab: MenuTab = search.tab === "casa" ? "casa" : "local";
  const [activeTab, setActiveTab] = useState<MenuTab>(initialTab);
  const fetchOverrides = useServerFn(getMenuOverrides);
  const [overrides, setOverrides] = useState<Record<string, MenuOverride>>({});

  useEffect(() => {
    let active = true;
    const load = () =>
      fetchOverrides()
        .then((rows) => {
          if (!active) return;
          const map: Record<string, MenuOverride> = {};
          rows.forEach((row) => {
            map[row.item_id] = row;
          });
          setOverrides(map);
        })
        .catch(() => {});
    load();

    const channel = supabase
      .channel("menu_overrides_public")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_overrides" },
        () => {
          load();
        },
      )
      .subscribe();

    const onFocus = () => load();
    window.addEventListener("focus", onFocus);

    return () => {
      active = false;
      window.removeEventListener("focus", onFocus);
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sections = useMemo(
    () =>
      menuCatalog[activeTab].map((section) => ({
        ...section,
        items: section.items.map((item) => {
          const o = overrides[item.id];
          if (!o) return item;
          return {
            ...item,
            price: o.price ?? item.price,
            available: o.available,
          };
        }),
      })),
    [activeTab, overrides],
  );
  const subtitle = activeTab === "local" ? "Consumo no Local" : "Leve para Casa";

  return (
    <div className="menu-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <main className="menu-shell">
        <div className="ornament-line" aria-hidden="true" />

        <header className="menu-header">
          <img
            className="menu-header-bg"
            src={bandeiraPara.url}
            alt=""
            aria-hidden="true"
          />
          <div className="menu-header-overlay" aria-hidden="true" />
          <img className="menu-logo" src={logo} alt="Point Aki do Açaí" />
          <div className="menu-brand">
            <h1 className="menu-brand-name">
              Point Aki <span className="do">do</span> Açaí
            </h1>
            <div className="menu-title">Cardápio</div>
            <p className="menu-subtitle">{subtitle}</p>
          </div>
        </header>

        <div className="menu-toolbar">
          <Link className="back-link" to="/">
            <ArrowLeft size={18} /> Voltar
          </Link>

          <div className="menu-tabs" role="tablist" aria-label="Tipo de cardápio">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "local"}
              className={`menu-tab ${activeTab === "local" ? "active" : ""}`}
              onClick={() => setActiveTab("local")}
            >
              <UtensilsCrossed size={20} /> Ver cardapio de consumo no local
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "casa"}
              className={`menu-tab ${activeTab === "casa" ? "active" : ""}`}
              onClick={() => setActiveTab("casa")}
            >
              <ShoppingBag size={20} /> Ver cardápio itens para retirada/viagem
            </button>
          </div>
        </div>

        <div className="menu-content">
          {sections.map((section) => (
            <section className="menu-section" key={section.id}>
              <h2 className="section-title">{section.title}</h2>
              <div className="items-list">
                {section.items.map((item) => (
                  <article
                    className={`menu-item ${item.available ? "" : "unavailable"}`}
                    key={item.id}
                    data-item-id={item.id}
                    data-available={item.available ? "true" : "false"}
                  >
                    <div className="item-copy">
                      <span className="item-name">{item.name}</span>
                      {item.description ? (
                        <span className="item-description">{item.description}</span>
                      ) : null}
                    </div>

                    <span className="item-dots" aria-hidden="true" />
                    <span className="item-price">{formatPrice(item.price)}</span>

                    {item.available ? (
                      <a
                        className="order-button"
                        href={buildWhatsAppUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Pedir ${item.name} pelo WhatsApp`}
                      >
                        <img
                          src={whatsappLogo.url}
                          alt=""
                          width={28}
                          height={28}
                          style={{ display: "block" }}
                        />
                        Pedir
                      </a>
                    ) : (
                      <span className="order-button" aria-disabled="true">
                        Indisponível
                      </span>
                    )}

                    {!item.available ? (
                      <span className="unavailable-badge">Indisponível</span>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="menu-footer">
          <a
            className="footer-whatsapp"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={whatsappLogo.url}
              alt=""
              width={40}
              height={40}
              style={{ display: "block" }}
            />
            Informações, reservas, dúvidas
          </a>
          <div className="footer-address">
            <MapPin size={20} color="#cf28bd" />
            <span>{address}</span>
          </div>
        </footer>

        <div className="ornament-line bottom-ornament" aria-hidden="true" />
      </main>
    </div>
  );
}
