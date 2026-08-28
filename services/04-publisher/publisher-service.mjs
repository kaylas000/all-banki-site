import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

/* Microservice 4: Publisher & IndexNow Pipeline */

const siteDir = "/home/user/all-banki-site";

export function publishAllGeneratedPages() {
  console.log("Microservice 4 [Publisher] starting deployment pipeline...");

  // 1. Update Sitemap
  const files = fs.readdirSync(siteDir).filter(f => f.endsWith(".html")).sort();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files.map(f => `  <url>
    <loc>https://kaylas000.github.io/all-banki-site/${f}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${f === "index.html" ? "1.0" : f.match(/^(kredity|mfo|zaymy|karty)\.html$/) ? "0.9" : "0.7"}</priority>
  </url>`).join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(siteDir, "sitemap.xml"), sitemap, "utf8");
  console.log(`Updated sitemap.xml with ${files.length} URLs.`);

  // 2. Run Linters
  try {
    const linterOutput = execSync("node /home/user/ceh-veb/run-all-linters.mjs", { encoding: "utf8" });
    console.log(linterOutput);
  } catch (err) {
    console.error("Linter check failed!", err.stdout || err.message);
    throw new Error("Linter check failed. Publishing aborted.");
  }

  // 3. Git Commit and Push
  execSync("git config user.email 'agent@ceh-studio.local'", { cwd: siteDir });
  execSync("git config user.name 'CEH Studio Agent'", { cwd: siteDir });
  execSync("git add .", { cwd: siteDir });
  
  try {
    execSync("git commit -m '🤖 Microservices Pipeline: Auto-compiled & Published Programmatic Pages'", { cwd: siteDir });
  } catch {
    console.log("No new git changes to commit.");
  }

  execSync("git push origin master:master --force", { cwd: siteDir });
  execSync("git push origin master:main --force", { cwd: siteDir });
  execSync("git push origin master:gh-pages --force", { cwd: siteDir });

  console.log("GitHub Pages deployment complete for master, main, and gh-pages branches.");
  return { success: true, count: files.length };
}

if (process.argv[1].endsWith("publisher-service.mjs")) {
  publishAllGeneratedPages();
}
