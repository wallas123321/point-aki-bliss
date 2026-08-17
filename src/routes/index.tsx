import { createFileRoute } from "@tanstack/react-router";

import { ShoppingBag, UtensilsCrossed } from "lucide-react";
import logo from "@/assets/logo-point-aki.png";

const whatsappUrl =
  "https://wa.me/554498721016?text=Ol%C3%A1%2C%20vim%20pelo%20Instagram%2C%20queria%20mais%20informa%C3%A7%C3%B5es.";
const mapsUrl = "https://share.google/Ki5s6pwdYh4Apfe2r";
const instagramUrl = "https://www.instagram.com/point.akidoacai/";
const address =
  "R. Ver. Joaquim Pereira de Castro, 311 — Vila Santo Antonio, Maringá";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Point Aki do Açaí | Links" },
      {
        name: "description",
        content:
          "Point Aki do Açaí — açaí paraense de verdade em Maringá. WhatsApp, Instagram e localização.",
      },
      { property: "og:title", content: "Point Aki do Açaí | Links" },
      {
        property: "og:description",
        content:
          "Açaí paraense de verdade em Maringá. Fale no WhatsApp, veja o Instagram e como chegar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#42004f" },
    ],
  }),
  component: Index,
});

const css = `
  .pa-root {
    --purple-950: #19001f;
    --purple-600: #7b138c;
    --magenta: #c12ab3;
    --pink: #ed4fd3;
    --white: #ffffff;
    --soft-white: #fff9ff;
    --muted: #d9bfdc;
    --card: rgba(29, 0, 36, .76);
    --line: rgba(255,255,255,.16);
    --shadow: 0 24px 70px rgba(0,0,0,.42);
    position: relative;
    min-height: 100vh;
    color: var(--white);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background:
      radial-gradient(circle at 15% 5%, rgba(237,79,211,.26), transparent 27rem),
      radial-gradient(circle at 92% 18%, rgba(121,206,0,.10), transparent 19rem),
      linear-gradient(145deg, #16001b 0%, #3c0047 45%, #130018 100%);
    overflow-x: hidden;
  }
  .pa-root * { box-sizing: border-box; }
  .pa-root::before, .pa-root::after {
    content: ""; position: fixed; width: 26rem; height: 26rem; border-radius: 50%;
    filter: blur(68px); opacity: .22; pointer-events: none; z-index: 0;
  }
  .pa-root::before { background: var(--magenta); top: -14rem; right: -10rem; }
  .pa-root::after { background: var(--purple-600); bottom: -15rem; left: -11rem; }
  .page { position: relative; z-index: 1; width: min(100%, 560px); margin: 0 auto; padding: 32px 18px 42px; }
  .card {
    position: relative; overflow: hidden; padding: 30px 22px 24px;
    border: 1px solid rgba(255,255,255,.18); border-radius: 34px;
    background: linear-gradient(180deg, rgba(92,8,109,.28), rgba(20,0,25,.75)), var(--card);
    box-shadow: var(--shadow); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  }
  .card::before {
    content: ""; position: absolute; inset: 0 0 auto; height: 5px;
    background: linear-gradient(90deg, transparent, var(--pink), #79ce00, transparent); opacity: .92;
  }
  .brand { display: grid; justify-items: center; text-align: center; }
  .logo-wrap {
    width: 178px; height: 178px; padding: 7px; border-radius: 50%;
    background: linear-gradient(145deg, #fff, #e9c9ec);
    box-shadow: 0 0 0 5px rgba(193,42,179,.18), 0 18px 45px rgba(0,0,0,.42);
  }
  .logo { width: 100%; height: 100%; display: block; border-radius: 50%; object-fit: cover; }
  .pa-root h1 { margin: 22px 0 6px; font-size: clamp(2rem, 8vw, 2.75rem); line-height: .98; letter-spacing: -.045em; }
  .headline { margin: 10px auto 0; max-width: 410px; color: var(--soft-white); font-size: 1.08rem; line-height: 1.42; }
  .headline strong { color: var(--pink); font-weight: 800; }
  .address {
    display: flex; gap: 12px; align-items: flex-start; margin: 24px 0 20px; padding: 16px;
    border: 1px solid var(--line); border-radius: 20px; background: rgba(255,255,255,.055);
    color: #f8ecf9; text-align: left; line-height: 1.42;
  }
  .address svg { flex: 0 0 auto; width: 24px; height: 24px; margin-top: 1px; color: var(--pink); }
  .footer-address {
    display: flex; justify-content: center; align-items: center; gap: 6px;
    margin-top: 10px; color: rgba(255,255,255,.72); font-size: .72rem; line-height: 1.3;
  }
  .footer-address svg { width: 14px; height: 14px; color: var(--pink); }
  .links { display: grid; gap: 13px; }
  .link {
    position: relative; display: grid; grid-template-columns: 46px 1fr 24px; align-items: center;
    min-height: 70px; padding: 11px 15px 11px 12px; border: 1px solid rgba(255,255,255,.18);
    border-radius: 20px; color: var(--white); text-decoration: none; background: rgba(255,255,255,.072);
    box-shadow: 0 10px 28px rgba(0,0,0,.18);
    transition: transform .18s ease, border-color .18s ease, background .18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .link:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.4); background: rgba(255,255,255,.12); }
  .link:active { transform: scale(.988); }
  .link.primary { border-color: rgba(37,211,102,.42); background: linear-gradient(135deg, rgba(37,211,102,.20), rgba(255,255,255,.075)); }
  .icon { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 15px; background: rgba(255,255,255,.11); }
  .primary .icon { background: #25d366; box-shadow: 0 8px 25px rgba(37,211,102,.24); }
  .instagram .icon { background: linear-gradient(145deg, #7b2fff, #e33186 54%, #ffae31); }
  .maps .icon { background: linear-gradient(145deg, var(--purple-600), var(--magenta)); }
  .menu .icon { background: linear-gradient(145deg, #ff6a00, #ee0979); }
  .icon svg { width: 25px; height: 25px; display: block; }
  .link-copy { min-width: 0; padding: 0 9px; }
  .link-title { display: block; font-weight: 800; font-size: 1.02rem; }
  .link-description { display: block; margin-top: 3px; color: var(--muted); font-size: .86rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .arrow { width: 21px; height: 21px; opacity: .72; }
  .mini-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 13px; }
  .mini-button {
    min-height: 45px; border: 1px solid var(--line); border-radius: 15px; color: #f7eaf8;
    background: rgba(255,255,255,.055); font: inherit; font-size: .85rem; font-weight: 700; cursor: pointer;
  }
  .mini-button:hover { background: rgba(255,255,255,.10); }
  .footer { padding-top: 22px; color: rgba(255,255,255,.62); text-align: center; font-size: .78rem; }
  .toast {
    position: fixed; left: 50%; bottom: 24px; z-index: 5; translate: -50% 18px; padding: 11px 16px;
    border-radius: 999px; color: #27002f; background: #fff; box-shadow: 0 12px 38px rgba(0,0,0,.35);
    font-weight: 800; opacity: 0; pointer-events: none; transition: .22s ease;
  }
  .toast.show { translate: -50% 0; opacity: 1; }
  @media (max-width: 390px) {
    .page { padding-inline: 12px; }
    .card { padding-inline: 15px; }
    .logo-wrap { width: 154px; height: 154px; }
    .link { grid-template-columns: 43px 1fr 20px; }
    .link-description { font-size: .8rem; }
    .mini-actions { grid-template-columns: 1fr; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pa-root *, .pa-root *::before, .pa-root *::after { scroll-behavior: auto !important; transition: none !important; }
  }
`;

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function Index() {
  return (
    <div className="pa-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="page">
        <div className="card">
          <header className="brand">
            <div className="logo-wrap">
              <img className="logo" src={logo} alt="Logo Point Aki do Açaí" width={816} height={816} />
            </div>
            <h1>Point Aki do Açaí</h1>
            <p className="headline">
              <strong>Açaí paraense de verdade</strong>
              <br />O sabor do Pará agora em Maringá.
            </p>
          </header>

          <nav className="links">
            <a className="link primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <span className="icon">
                <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                  <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
                  <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.8 9.8 0 0 0 4.68 1.19h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0 0 12.04 2Zm0 17.94c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.18.83.85-3.1-.2-.32a8.1 8.1 0 0 1-1.24-4.32c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.39 5.79c0 4.51-3.67 8.23-8.09 8.23Z" />
                </svg>
              </span>
              <span className="link-copy">
                <span className="link-title">Falar no WhatsApp</span>
                <span className="link-description">Pedidos, reservas e mais informações</span>
              </span>
              <Arrow />
            </a>

            <a className="link maps" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <span className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="link-copy">
                <span className="link-title">Como chegar</span>
                <span className="link-description">Abrir localização no Google Maps</span>
              </span>
              <Arrow />
            </a>

            <a className="link instagram" href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <span className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" stroke="none" />
                </svg>
              </span>
              <span className="link-copy">
                <span className="link-title">@point.akidoacai</span>
                <span className="link-description">Acompanhe novidades e pratos</span>
              </span>
              <Arrow />
            </a>

            <a className="link menu" href="/cardapio?tab=local" aria-label="Cardápio para consumo no local">
              <span className="icon">
                <UtensilsCrossed size={25} color="#fff" />
              </span>
              <span className="link-copy">
                <span className="link-title">Consumo no local</span>
                <span className="link-description">Ver cardápio para comer aqui</span>
              </span>
              <Arrow />
            </a>

            <a className="link menu" href="/cardapio?tab=casa" aria-label="Cardápio para levar para casa">
              <span className="icon">
                <ShoppingBag size={25} color="#fff" />
              </span>
              <span className="link-copy">
                <span className="link-title">Levar para casa</span>
                <span className="link-description">Ver cardápio para viagem</span>
              </span>
              <Arrow />
            </a>

          </nav>

          <footer className="footer">
            Point Aki do Açaí • Maringá, Paraná
            <div className="footer-address">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{address}</span>
            </div>
          </footer>
        </div>
      </div>

      <div className={toast ? "toast show" : "toast"} role="status" aria-live="polite">
        {toast ?? "Copiado!"}
      </div>
    </div>
  );
}