# Point Aki Links

crie esse site (arore de links no lovable). nao altere nada. mantenha como está: from pathlib import Path
import base64
import mimetypes
import zipfile

logo_path = Path("/mnt/data/7cef897a-b969-4be8-8e58-bd891a557a72.png")
html_path = Path("/mnt/data/point-aki-links.html")
zip_path = Path("/mnt/data/point-aki-links-site.zip")

logo_b64 = base64.b64encode(logo_path.read_bytes()).decode("ascii")
logo_data = f"data:image/png;base64,{logo_b64}"

whatsapp_url = (
    "https://wa.me/554498721016"
    "?text=Ol%C3%A1%2C%20vim%20pelo%20Instagram%2C%20queria%20mais%20informa%C3%A7%C3%B5es."
)
maps_url = "https://share.google/Ki5s6pwdYh4Apfe2r"
instagram_url = "https://www.instagram.com/point.akidoacai/"
address = "R. Ver. Joaquim Pereira de Castro, 311 — Vila Santo Antonio, Maringá"

html = f"""<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#42004f" />
  <meta name="description" content="Point Aki do Açaí — açaí paraense de verdade em Maringá. WhatsApp, Instagram e localização." />
  <title>Point Aki do Açaí | Links</title>

  <style>
    :root {{
      --purple-950: #19001f;
      --purple-900: #27002f;
      --purple-800: #42004f;
      --purple-700: #5c086d;
      --purple-600: #7b138c;
      --magenta: #c12ab3;
      --pink: #ed4fd3;
      --green: #79ce00;
      --white: #ffffff;
      --soft-white: #fff9ff;
      --muted: #d9bfdc;
      --card: rgba(29, 0, 36, .76);
      --line: rgba(255,255,255,.16);
      --shadow: 0 24px 70px rgba(0,0,0,.42);
    }}

    * {{ box-sizing: border-box; }}

    html {{ min-height: 100%; background: var(--purple-950); }}

    body {{
      min-height: 100vh;
      margin: 0;
      color: var(--white);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at 15% 5%, rgba(237,79,211,.26), transparent 27rem),
        radial-gradient(circle at 92% 18%, rgba(121,206,0,.10), transparent 19rem),
        linear-gradient(145deg, #16001b 0%, #3c0047 45%, #130018 100%);
      overflow-x: hidden;
    }}

    body::before,
    body::after {{
      content: "";
      position: fixed;
      width: 26rem;
      height: 26rem;
      border-radius: 50%;
      filter: blur(68px);
      opacity: .22;
      pointer-events: none;
      z-index: 0;
    }}

    body::before {{
      background: var(--magenta);
      top: -14rem;
      right: -10rem;
    }}

    body::after {{
      background: var(--purple-600);
      bottom: -15rem;
      left: -11rem;
    }}

    .page {{
      position: relative;
      z-index: 1;
      width: min(100%, 560px);
      margin: 0 auto;
      padding: 32px 18px 42px;
    }}

    .card {{
      position: relative;
      overflow: hidden;
      padding: 30px 22px 24px;
      border: 1px solid rgba(255,255,255,.18);
      border-radius: 34px;
      background:
        linear-gradient(180deg, rgba(92,8,109,.28), rgba(20,0,25,.75)),
        var(--card);
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
    }}

    .card::before {{
      content: "";
      position: absolute;
      inset: 0 0 auto;
      height: 5px;
      background: linear-gradient(90deg, transparent, var(--pink), var(--green), transparent);
      opacity: .92;
    }}

    .brand {{
      display: grid;
      justify-items: center;
      text-align: center;
    }}

    .logo-wrap {{
      width: 178px;
      height: 178px;
      padding: 7px;
      border-radius: 50%;
      background: linear-gradient(145deg, #fff, #e9c9ec);
      box-shadow:
        0 0 0 5px rgba(193,42,179,.18),
        0 18px 45px rgba(0,0,0,.42);
    }}

    .logo {{
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 50%;
      object-fit: cover;
    }}

    h1 {{
      margin: 22px 0 6px;
      font-size: clamp(2rem, 8vw, 2.75rem);
      line-height: .98;
      letter-spacing: -.045em;
    }}

    .headline {{
      margin: 10px auto 0;
      max-width: 410px;
      color: var(--soft-white);
      font-size: 1.08rem;
      line-height: 1.42;
    }}

    .headline strong {{
      color: var(--pink);
      font-weight: 800;
    }}

    .address {{
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin: 24px 0 20px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: rgba(255,255,255,.055);
      color: #f8ecf9;
      text-align: left;
      line-height: 1.42;
    }}

    .address svg {{
      flex: 0 0 auto;
      width: 24px;
      height: 24px;
      margin-top: 1px;
      color: var(--pink);
    }}

    .links {{
      display: grid;
      gap: 13px;
    }}

    .link {{
      position: relative;
      display: grid;
      grid-template-columns: 46px 1fr 24px;
      align-items: center;
      min-height: 70px;
      padding: 11px 15px 11px 12px;
      border: 1px solid rgba(255,255,255,.18);
      border-radius: 20px;
      color: var(--white);
      text-decoration: none;
      background: rgba(255,255,255,.072);
      box-shadow: 0 10px 28px rgba(0,0,0,.18);
      transition: transform .18s ease, border-color .18s ease, background .18s ease;
      -webkit-tap-highlight-color: transparent;
    }}

    .link:hover {{
      transform: translateY(-2px);
      border-color: rgba(255,255,255,.4);
      background: rgba(255,255,255,.12);
    }}

    .link:active {{ transform: scale(.988); }}

    .link.primary {{
      border-color: rgba(37,211,102,.42);
      background: linear-gradient(135deg, rgba(37,211,102,.20), rgba(255,255,255,.075));
    }}

    .icon {{
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 15px;
      background: rgba(255,255,255,.11);
    }}

    .primary .icon {{
      background: #25d366;
      box-shadow: 0 8px 25px rgba(37,211,102,.24);
    }}

    .instagram .icon {{
      background: linear-gradient(145deg, #7b2fff, #e33186 54%, #ffae31);
    }}

    .maps .icon {{
      background: linear-gradient(145deg, var(--purple-600), var(--magenta));
    }}

    .icon svg {{
      width: 25px;
      height: 25px;
      display: block;
    }}

    .link-copy {{
      min-width: 0;
      padding: 0 9px;
    }}

    .link-title {{
      display: block;
      font-weight: 800;
      font-size: 1.02rem;
    }}

    .link-description {{
      display: block;
      margin-top: 3px;
      color: var(--muted);
      font-size: .86rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }}

    .arrow {{
      width: 21px;
      height: 21px;
      opacity: .72;
    }}

    .mini-actions {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 13px;
    }}

    .mini-button {{
      min-height: 45px;
      border: 1px solid var(--line);
      border-radius: 15px;
      color: #f7eaf8;
      background: rgba(255,255,255,.055);
      font: inherit;
      font-size: .85rem;
      font-weight: 700;
      cursor: pointer;
    }}

    .mini-button:hover {{ background: rgba(255,255,255,.10); }}

    .footer {{
      padding-top: 22px;
      color: rgba(255,255,255,.62);
      text-align: center;
      font-size: .78rem;
    }}

    .toast {{
      position: fixed;
      left: 50%;
      bottom: 24px;
      z-index: 5;
      translate: -50% 18px;
      padding: 11px 16px;
      border-radius: 999px;
      color: #27002f;
      background: #fff;
      box-shadow: 0 12px 38px rgba(0,0,0,.35);
      font-weight: 800;
      opacity: 0;
      pointer-events: none;
      transition: .22s ease;
    }}

    .toast.show {{
      translate: -50% 0;
      opacity: 1;
    }}

    @media (max-width: 390px) {{
      .page {{ padding-inline: 12px; }}
      .card {{ padding-inline: 15px; }}
      .logo-wrap {{ width: 154px; height: 154px; }}
      .link {{ grid-template-columns: 43px 1fr 20px; }}
      .link-description {{ font-size: .8rem; }}
      .mini-actions {{ grid-template-columns: 1fr; }}
    }}

    @media (prefers-reduced-motion: reduce) {{
      *, *::before, *::after {{
        scroll-behavior: auto !important;
        transition: none !important;
      }}
    }}
  



  
    


      


        


          
        



        

Point Aki do Açaí


        


          Açaí paraense de verdade

          O sabor do Pará agora em Maringá.
        


      



      


        
          
          
        
        {address}
      



      
        
          
            
              
              
            
          
          
            Falar no WhatsApp
            Pedidos, reservas e mais informações
          
          
            
          
        

        
          
            
              
              
            
          
          
            Como chegar
            Abrir localização no Google Maps
          
          
            
          
        

        
          
            
              
              
              
            
          
          
            @point.akidoacai</span>
            Acompanhe novidades e pratos
          
          
            
          
        
      

      


        Copiar endereço
        Compartilhar página
      



      


        Point Aki do Açaí • Maringá, Paraná
      


    
  

  

Copiado!



  


"""

html_path.write_text(html, encoding="utf-8")

with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
    zf.write(html_path, arcname="index.html")

print(f"Criados:\n- {html_path}\n- {zip_path}")

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://point-aki-bliss.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9dcd771b-df38-4ea3-af37-2a19da15ee53).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
