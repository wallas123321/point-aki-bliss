function isMondayInSaoPaulo(date = new Date()) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
  }).format(date);
  return weekday === "Mon";
}

export function ClosedBanner() {
  // Computed synchronously (same result on server and client) so the banner
  // renders immediately, with no delay on navigation.
  if (!isMondayInSaoPaulo()) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
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
