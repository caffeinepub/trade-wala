import { useEffect, useRef, useState } from "react";

const TELEGRAM_LINK = "https://t.me/+CsVmAh9_RSU2YTdl";
const LOGO_SRC =
  "/assets/20250408_043140-019d51ef-887d-710e-ae67-dfeff9096e6d.jpg";
const AUTO_REDIRECT_SECONDS = 10;

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

// ── Animated Chart Component ──────────────────────────────────────────────
function TradingChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const totalBars = 28;
    const barW = (W * 0.72) / totalBars;
    const gap = barW * 0.35;
    const bodyW = barW - gap;

    type Candle = { o: number; c: number; h: number; l: number };
    const candles: Candle[] = [];
    let price = 55;
    for (let i = 0; i < totalBars; i++) {
      const change = (Math.sin(i * 0.7) + Math.random() - 0.4) * 7;
      const open = price;
      const close = price + change;
      const high = Math.max(open, close) + Math.random() * 4 + 1;
      const low = Math.min(open, close) - Math.random() * 4 - 1;
      candles.push({ o: open, c: close, h: high, l: low });
      price = close;
    }

    const minP = Math.min(...candles.map((c) => c.l)) - 5;
    const maxP = Math.max(...candles.map((c) => c.h)) + 5;
    const range = maxP - minP;

    const toY = (p: number) => H - 28 - ((p - minP) / range) * (H - 44);

    const linePoints = candles.map((c, i) => ({
      x: 24 + i * barW + bodyW / 2,
      y: toY((c.o + c.c) / 2),
    }));

    let startTime: number | null = null;

    function loop(ts: number) {
      if (startTime === null) startTime = ts;
      let elapsed = ts - startTime;

      // Restart loop after all bars + pause
      if (elapsed > totalBars * 380 + 900) {
        startTime = ts;
        elapsed = 0;
      }

      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Background grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const y = 10 + (g / 4) * (H - 38);
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(W - 8, y);
        ctx.stroke();
      }

      const revealedBars = Math.min(totalBars, Math.floor(elapsed / 380) + 1);

      // Draw candles
      for (let i = 0; i < revealedBars; i++) {
        const c = candles[i];
        const x = 24 + i * barW;
        const isGreen = c.c >= c.o;
        const alpha = i === revealedBars - 1 ? 0.7 : 1;

        ctx.strokeStyle = isGreen
          ? `rgba(67,160,71,${alpha})`
          : `rgba(239,83,80,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + bodyW / 2, toY(c.h));
        ctx.lineTo(x + bodyW / 2, toY(c.l));
        ctx.stroke();

        ctx.fillStyle = isGreen
          ? `rgba(67,160,71,${alpha})`
          : `rgba(239,83,80,${alpha})`;
        const bodyTop = toY(Math.max(c.o, c.c));
        const bodyBot = toY(Math.min(c.o, c.c));
        const bh = Math.max(2, bodyBot - bodyTop);
        ctx.fillRect(x, bodyTop, bodyW, bh);
      }

      // Signal line
      const lineProgress = Math.min(1, elapsed / (totalBars * 380));
      const totalPts = linePoints.length;
      const drawUpTo = lineProgress * (totalPts - 1);
      const fullPts = Math.floor(drawUpTo);
      const frac = drawUpTo - fullPts;

      if (fullPts > 0) {
        const grd = ctx.createLinearGradient(
          linePoints[0].x,
          0,
          linePoints[fullPts].x,
          0,
        );
        grd.addColorStop(0, "rgba(255,214,0,0)");
        grd.addColorStop(0.3, "rgba(255,214,0,0.7)");
        grd.addColorStop(1, "rgba(255,214,0,1)");

        ctx.beginPath();
        ctx.moveTo(linePoints[0].x, linePoints[0].y);
        for (let i = 1; i <= fullPts; i++) {
          const cp = linePoints[i - 1];
          const np = linePoints[i];
          ctx.bezierCurveTo(
            cp.x + (np.x - cp.x) * 0.5,
            cp.y,
            np.x - (np.x - cp.x) * 0.5,
            np.y,
            np.x,
            np.y,
          );
        }
        if (fullPts < totalPts - 1) {
          const cp = linePoints[fullPts];
          const np = linePoints[fullPts + 1];
          const ex = cp.x + (np.x - cp.x) * frac;
          const ey = cp.y + (np.y - cp.y) * frac;
          ctx.bezierCurveTo(
            cp.x + (ex - cp.x) * 0.5,
            cp.y,
            ex - (ex - cp.x) * 0.5,
            ey,
            ex,
            ey,
          );
        }
        ctx.strokeStyle = grd;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Glowing dot at tip
        const tipPt =
          fullPts < totalPts - 1
            ? {
                x:
                  linePoints[fullPts].x +
                  (linePoints[fullPts + 1].x - linePoints[fullPts].x) * frac,
                y:
                  linePoints[fullPts].y +
                  (linePoints[fullPts + 1].y - linePoints[fullPts].y) * frac,
              }
            : linePoints[fullPts];
        const pulse = 0.6 + 0.4 * Math.sin(elapsed / 200);
        ctx.beginPath();
        ctx.arc(tipPt.x, tipPt.y, 5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,214,0,${0.5 * pulse})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(tipPt.x, tipPt.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffd600";
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(loop);
    }

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={200}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(AUTO_REDIRECT_SECONDS);
  const [redirected, setRedirected] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRedirected(true);
          window.open(TELEGRAM_LINK, "_blank", "noopener,noreferrer");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleJoinClick = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRedirected(true);
  };

  return (
    <div className="app-bg">
      <div className="page-card">
        {/* ── HERO SECTION ── */}
        <div className="hero-section">
          <div className="hero-shimmer" />
          <div className="hero-content">
            <p
              className={`hero-badge fade-up ${visible ? "fade-up-in" : ""}`}
              style={{ animationDelay: "0.05s" }}
            >
              🏆 #1 Free Trading Community
            </p>
            <h1
              className={`hero-headline fade-up ${visible ? "fade-up-in" : ""}`}
              style={{ animationDelay: "0.1s" }}
            >
              #1 Most{" "}
              <span className="profitable-word">
                Profitable
                <span className="animated-underline" />
              </span>
            </h1>
            <p
              className={`hero-sub fade-up ${visible ? "fade-up-in" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              Trading Community in India
            </p>
            <p
              className={`hero-desc fade-up ${visible ? "fade-up-in" : ""}`}
              style={{ animationDelay: "0.28s" }}
            >
              Learn to trade Stocks, Options &amp; Futures with India&apos;s
              most active free community — daily signals, live sessions &amp;
              expert mentorship.
            </p>
          </div>
        </div>

        {/* LOGO BRIDGE — transparent positioning bridge only, no chart here */}
        <div className="logo-bridge">
          <div className="logo-wrapper">
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="logo-ring logo-ring-btn"
              aria-label="Join Trade Wala on Telegram"
              onClick={handleJoinClick}
            >
              <img src={LOGO_SRC} alt="Trade Wala Logo" className="logo-img" />
            </a>
            {/* Pulse ring */}
            <span className="logo-pulse-ring" />
            {/* "Join" badge */}
            <span className="logo-join-badge">Tap to Join ✈</span>
          </div>
        </div>

        {/* DARK CARD */}
        <div
          className="main-card"
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "0",
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

          {/* FEATURE LIST */}
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

          {/* ANIMATED TRADING CHART — between features and CTA */}
          <div
            className={`chart-section fade-up ${visible ? "fade-up-in" : ""}`}
            style={{ animationDelay: "0.72s" }}
          >
            <TradingChart />
          </div>

          {/* CTA SECTION */}
          <div
            className={`cta-section fade-up ${visible ? "fade-up-in" : ""}`}
            style={{
              textAlign: "center",
              animationDelay: "0.82s",
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
              onClick={handleJoinClick}
            >
              <span className="btn-shine" />✈ Join Our Free Telegram Channel
            </a>

            {/* COUNTDOWN TIMER */}
            {!redirected && (
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  style={{ flexShrink: 0 }}
                  aria-label="Countdown timer"
                >
                  <title>Countdown timer</title>
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#2196F3"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 15}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 15 * (1 - countdown / AUTO_REDIRECT_SECONDS)
                    }`}
                    transform="rotate(-90 18 18)"
                    style={{ transition: "stroke-dashoffset 0.9s linear" }}
                  />
                  <text
                    x="18"
                    y="22"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="#f0f0f0"
                  >
                    {countdown}
                  </text>
                </svg>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#aaaaaa",
                    margin: 0,
                    fontWeight: 500,
                    lineHeight: 1.4,
                    textAlign: "left",
                  }}
                >
                  Auto-joining in{" "}
                  <span style={{ color: "#2196F3", fontWeight: 700 }}>
                    {countdown}s
                  </span>{" "}
                  if you don&apos;t click
                </p>
              </div>
            )}
            {redirected && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#43a047",
                  marginTop: "14px",
                  marginBottom: "0",
                  fontWeight: 600,
                }}
              >
                ✅ Redirecting to Telegram...
              </p>
            )}

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
