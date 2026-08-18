import { useEffect, useState } from "react";

export function ClosedBanner() {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const today = new Date().getDay();
    setIsClosed(today === 1); // Monday = 1
  }, []);

  if (!isClosed) return null;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 9999,
        width: "100%",
        padding: "14px 18px",
        background: "#d90429",
        color: "#fff",
        textAlign: "center",
        fontWeight: 800,
        fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
        lineHeight: 1.35,
        boxShadow: "0 4px 14px rgba(0,0,0,.25)",
      }}
      role="alert"
    >
      HOJE ESTAMOS FECHADO PARA FOLGA. RETORNAMOS AMANHÃ.
    </div>
  );
}
