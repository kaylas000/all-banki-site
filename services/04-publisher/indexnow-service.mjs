import fs from "node:fs";
import path from "node:path";

/* Microservice 4 Ext: Instant IndexNow & Search Engine Ping Service */

const INDEXNOW_KEY = "allbanki2026indexnowkey99999999";
const INDEXNOW_KEY_FILE = `${INDEXNOW_KEY}.txt`;
const siteDir = "/home/user/all-banki-site";

export async function pingIndexNowEndpoints(urlList = []) {
  if (!urlList.length) {
    console.log("[IndexNow] No URLs to ping.");
    return;
  }

  // Ensure IndexNow key file exists at site root
  const keyFilePath = path.join(siteDir, INDEXNOW_KEY_FILE);
  if (!fs.existsSync(keyFilePath)) {
    fs.writeFileSync(keyFilePath, INDEXNOW_KEY, "utf8");
    console.log(`[IndexNow] Created key file ${INDEXNOW_KEY_FILE}`);
  }

  const payload = {
    host: "kaylas000.github.io",
    key: INDEXNOW_KEY,
    keyLocation: `https://kaylas000.github.io/all-banki-site/${INDEXNOW_KEY_FILE}`,
    urlList: urlList.map(u => u.startsWith("http") ? u : `https://kaylas000.github.io/all-banki-site/${u}`)
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://yandex.com/indexnow",
    "https://www.bing.com/indexnow"
  ];

  console.log(`[IndexNow] Submitting ${payload.urlList.length} URLs to Instant Indexing Endpoints...`);

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload)
      });
      console.log(` -> Ping ${ep}: Status ${res.status}`);
    } catch (err) {
      console.log(` -> Ping ${ep} notice: ${err.message}`);
    }
  }
}

if (process.argv[1].endsWith("indexnow-service.mjs")) {
  pingIndexNowEndpoints(["index.html", "mfo.html", "kredity.html", "karty.html"]);
}
