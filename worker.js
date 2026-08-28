// Cloudflare Worker + Grok (xAI) Integration for Dynamic Financial Vitrina
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle root / catalog requests
    if (pathname === "/" || pathname === "/mfo" || pathname === "/kredity") {
      const targetUrl = `https://kaylas000.github.io/all-banki-site${pathname === "/" ? "/index.html" : pathname + ".html"}`;
      const response = await fetch(targetUrl);
      let html = await response.text();

      // Dynamic UTM Keyword Replacement
      const utmTerm = url.searchParams.get("utm_term") || url.searchParams.get("q");
      if (utmTerm) {
        const decoded = decodeURIComponent(utmTerm).replace(/-/g, " ");
        const title = decoded.charAt(0).toUpperCase() + decoded.slice(1);
        html = html.replace(/<h1 class="mega-title"[^>]*>.*?<\/h1>/i, `<h1 class="mega-title">${title}</h1>`);
      }

      return new Response(html, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "cache-control": "public, max-age=3600, s-maxage=86400"
        }
      });
    }

    // AI Generation Endpoint using Grok (xAI) API
    if (pathname === "/api/generate-offer" && request.method === "POST") {
      try {
        const body = await request.json();
        const promptKeyword = body.keyword || "быстрый займ на карту";

        // Call Grok (xAI) API
        const grokResponse = await fetch(env.GROK_API_URL || "https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env.GROK_API_KEY || ""}`
          },
          body: JSON.stringify({
            model: "grok-beta",
            messages: [
              { role: "system", content: "Ты — экспертный финансовый аналитик. Сгенерируй JSON с полями: title, description, h1, text." },
              { role: "user", content: `Сгенерируй финансовое предложение под запрос "${promptKeyword}"` }
            ]
          })
        });

        const grokData = await grokResponse.json();
        return new Response(JSON.stringify(grokData), {
          headers: { "content-type": "application/json;charset=UTF-8" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // Proxy default requests to GitHub Pages
    return fetch(`https://kaylas000.github.io/all-banki-site${pathname}`);
  }
};
