import { useEffect, useState } from "react";

const TELEGRAM_LINK = "https://t.me/+CsVmAh9_RSU2YTdl";
const LOGO_SRC =
  "/assets/20250408_043140-019d51ef-887d-710e-ae67-dfeff9096e6d.jpg";

const FEATURES = [
  {
    id: "signals",
    icon: "🔥",
    delay: "0.4s",
    content: (
      <>
        Daily 10 to 20 <strong style={{ color: "#43a047" }}>Free</strong>{" "}
        Trading Signals
      </>
    ),
  },
  {
    id: "live",
    icon: "👨\u200d💻",
    delay: "0.5s",
    content: (
      <>
        <strong style={{ color: "#43a047" }}>Free</strong> Access to{" "}
        <strong style={{ color: "#43a047" }}>Live Session</strong> Everyday
      </>
    ),
  },
  {
    id: "mentorship",
    icon: "🧠",
    delay: "0.6s",
    content: <>1-1 Mentorship &amp; Psychological Sessions</>,
  },
  {
    id: "giveaway",
    icon: "💰",
    delay: "0.7s",
    content: (
      <>
        Don&apos;t Miss{" "}
        <strong style={{ color: "#43a047" }}>Weekly Giveaway</strong>
      </>
    ),
  },
];

export default function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="app-bg">
      <div className="page-card">
        {/* GREEN HERO — bottom padding makes room for logo overlap */}
        <div className="hero-section hero-mobile">
          <div className="hero-shimmer" />
          <p
            className={`fade-up ${visible ? "fade-up-in" : ""}`}
            style={{
              color: "rgba(255,255,255,0.92)",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "18px",
              animationDelay: "0.05s",
            }}
          >
            ✦ Trade Wala ✦
          </p>
          <h1
            className={`fade-up ${visible ? "fade-up-in" : ""}`}
            style={{
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "clamp(28px, 7vw, 38px)",
              lineHeight: 1.15,
              margin: 0,
              animationDelay: "0.15s",
              textShadow: "0 2px 16px rgba(0,0,0,0.25)",
            }}
          >
            #1 Most{" "}
            <span className="profitable-word">
              Profitable
              <span className="animated-underline" />
            </span>
          </h1>
          <p
            className={`fade-up ${visible ? "fade-up-in" : ""}`}
            style={{
              color: "rgba(255,255,255,0.88)",
              fontWeight: 500,
              fontSize: "clamp(14px, 3.5vw, 18px)",
              margin: 0,
              marginTop: "8px",
              animationDelay: "0.22s",
              letterSpacing: "0.01em",
            }}
          >
            Trading Community in India
          </p>
        </div>

        {/* LOGO BRIDGE — sits between hero and card, not clipped by either */}
        <div className="logo-bridge">
          <div className="logo-ring">
            <img src={LOGO_SRC} alt="Trade Wala Logo" className="logo-img" />
          </div>
        </div>

        {/* DARK CARD — overflow hidden is safe now, logo is outside */}
        <div
          className="main-card"
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "24px 24px 0 0",
            paddingTop: "96px",
            paddingBottom: "48px",
            paddingLeft: "24px",
            paddingRight: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <p
            className={`fade-up ${visible ? "fade-up-in" : ""}`}
            style={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: "18px",
              color: "#f0f0f0",
              marginBottom: "4px",
              animationDelay: "0.3s",
              position: "relative",
              zIndex: 2,
            }}
          >
            Trade Wala
          </p>
          <p
            className={`fade-up ${visible ? "fade-up-in" : ""}`}
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "#43a047",
              fontWeight: 600,
              marginBottom: "16px",
              letterSpacing: "0.04em",
              animationDelay: "0.35s",
              position: "relative",
              zIndex: 2,
            }}
          >
            Free Trading Community
          </p>

          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.15) 70%, transparent)",
              marginBottom: "16px",
              position: "relative",
              zIndex: 2,
            }}
          />

          <div
            className="feature-list"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              marginBottom: "32px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {FEATURES.map((item, i) => (
              <div
                key={item.id}
                data-ocid={`feature.item.${i + 1}`}
                className={`feature-row fade-up ${visible ? "fade-up-in" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  borderBottom:
                    i < FEATURES.length - 1
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "none",
                  animationDelay: item.delay,
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    lineHeight: 1,
                    flexShrink: 0,
                    width: "32px",
                    textAlign: "center",
                  }}
                >
                  {item.icon}
                </span>
                <p
                  className="feature-text"
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.45,
                    color: "#f0f0f0",
                    fontWeight: 500,
                  }}
                >
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`cta-section fade-up ${visible ? "fade-up-in" : ""}`}
            style={{
              textAlign: "center",
              animationDelay: "0.75s",
              position: "relative",
              zIndex: 2,
            }}
          >
            <p
              style={{
                fontWeight: 800,
                fontSize: "17px",
                color: "#f0f0f0",
                marginBottom: "20px",
              }}
            >
              💰 Start Earning Today
            </p>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              data-ocid="cta.primary_button"
            >
              <span className="btn-shine" />✈ Join Our Free Telegram Channel
            </a>
            <p
              style={{
                fontSize: "12px",
                color: "#aaaaaa",
                marginTop: "14px",
                marginBottom: "0",
                fontWeight: 500,
                letterSpacing: "0.03em",
              }}
            >
              ✅ 100% Free – Telegram Group
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            backgroundColor: "#111111",
            textAlign: "center",
            padding: "16px 24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#555555",
              margin: 0,
              fontWeight: 500,
            }}
          >
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#555555", textDecoration: "none" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
