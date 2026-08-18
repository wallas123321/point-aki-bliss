import { createFileRoute } from "@tanstack/react-router";

import logo from "@/assets/logo-point-aki.png";
import googleMapsPinAsset from "@/assets/google-maps-pin.png.asset.json";
import levarCasaAsset from "@/assets/levar-casa.png.asset.json";
import consumoLocalAsset from "@/assets/consumo-local.png.asset.json";
import bandeiraParaAsset from "@/assets/bandeira-para.png.asset.json";

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
  .page { position: relative; z-index: 1; width: 100%; margin: 0; padding: 0; }
  .card {
    position: relative; overflow: hidden; padding: 24px 14px 32px;
    border: none; border-radius: 0;
    background: linear-gradient(180deg, rgba(92,8,109,.28), rgba(20,0,25,.75)), var(--card);
    box-shadow: none; backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    min-height: 100vh;
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
  .headline { margin: 10px auto 28px; max-width: 410px; color: var(--soft-white); font-size: 1.08rem; line-height: 1.42; }
  .para-badge { display: inline-flex; align-items: center; gap: 8px; margin-top: 10px; padding: 5px 12px 5px 6px; border-radius: 999px; background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.22); color: var(--soft-white); font-size: .78rem; font-weight: 700; letter-spacing: .02em; }
  .para-badge img { display: block; border-radius: 3px; box-shadow: 0 1px 4px rgba(0,0,0,.35); }
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
    min-height: 70px; padding: 11px 15px 11px 12px; border: 1px solid rgba(255,255,255,.45);
    border-radius: 20px; color: #1f0226; text-decoration: none; background: rgba(255,255,255,.92);
    box-shadow: 0 10px 28px rgba(0,0,0,.18);
    transition: transform .18s ease, border-color .18s ease, background .18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .link:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.7); background: #ffffff; }
  .link:active { transform: scale(.988); }
  .icon { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 15px; background: rgba(255,255,255,.11); }
  .instagram .icon { background: linear-gradient(145deg, #7b2fff, #e33186 54%, #ffae31); }
  .maps .icon { background: linear-gradient(145deg, var(--purple-600), var(--magenta)); }
  .menu .icon { background: linear-gradient(145deg, #ff6a00, #ee0979); }
  .icon svg { width: 25px; height: 25px; display: block; }
  .link-copy { min-width: 0; padding: 0 9px; }
  .link-title { display: block; font-weight: 800; font-size: 1.02rem; }
  .link-description { display: block; margin-top: 3px; color: #6b4a6e; font-size: .86rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .arrow { width: 21px; height: 21px; opacity: .72; }
  .footer { padding-top: 22px; color: rgba(255,255,255,.62); text-align: center; font-size: .78rem; }
  .admin-link {
    display: inline-block;
    margin-top: 12px;
    padding: 7px 14px;
    border: 1px solid rgba(255,255,255,.22);
    border-radius: 999px;
    color: rgba(255,255,255,.72);
    text-decoration: none;
    font-size: .74rem;
    font-weight: 700;
  }
  .admin-link:hover { color: #fff; border-color: rgba(255,255,255,.5); }
  @media (max-width: 390px) {
    .card { padding-inline: 12px; }
    .logo-wrap { width: 154px; height: 154px; }
    .link { grid-template-columns: 43px 1fr 20px; }
    .link-description { font-size: .8rem; }
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
            <div className="para-badge">
              <img src={bandeiraParaAsset.url} alt="Bandeira do Pará" width={28} height={19} />
              <span>Tradição paraense</span>
            </div>
            <p className="headline">
              <strong>Comida paraense de verdade</strong>
              <br />O sabor do Pará agora em Maringá.
            </p>
          </header>

          <nav className="links">
            <a className="link menu" href="/cardapio?tab=local" aria-label="Cardápio para consumo no local">
              <span className="icon">
                <img src={consumoLocalAsset.url} alt="" style={{ width: '44px', height: '44px', display: 'block', borderRadius: '15px', objectFit: 'cover' }} />
              </span>
              <span className="link-copy">
                <span className="link-title">Cardápio - Consumo no local</span>
                <span className="link-description">Ver cardápio para comer aqui</span>
              </span>
              <Arrow />
            </a>

            <a className="link menu" href="/cardapio?tab=casa" aria-label="Cardápio para levar para casa">
              <span className="icon">
                <img src={levarCasaAsset.url} alt="" style={{ width: '44px', height: '44px', display: 'block', borderRadius: '15px', objectFit: 'cover' }} />
              </span>
              <span className="link-copy">
                <span className="link-title">Cardápio - Levar para casa</span>
                <span className="link-description">Ver cardápio para viagem</span>
              </span>
              <Arrow />
            </a>

            <a className="link maps" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <span className="icon">
                <img src={googleMapsPinAsset.url} alt="" style={{ width: '44px', height: '44px', display: 'block', borderRadius: '15px', objectFit: 'cover' }} />
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
                <span className="link-title">Siga nosso Instagram</span>
                <span className="link-description">@point.akidoacai</span>
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
            <Link className="admin-link" to="/admin">
              Configurar cardápio
            </Link>
          </footer>
        </div>
      </div>

    </div>
  );
}