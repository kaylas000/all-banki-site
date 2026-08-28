import { generateLowFrequencyPhrases } from "./01-phrase-generator/phrase-service.mjs";
import { generateHumanSeoArticle } from "./02-text-generator/text-service.mjs";
import { compileUniquePage } from "./03-page-compiler/page-compiler-service.mjs";
import { publishAllGeneratedPages } from "./04-publisher/publisher-service.mjs";

/* 🚀 SOTA 2026 PROGRAMMATIC MICROSERVICES ORCHESTRATOR */

async function runProgrammaticPipeline(phraseCount = 5) {
  console.log("=================================================");
  console.log("🚀 STARTING CEH STUDIO PROGRAMMATIC GENERATION PIPELINE");
  console.log("=================================================");

  // Step 1: Generate Low-Frequency Keywords
  console.log("\n[STEP 1/4] Generating Low-Frequency Long-Tail Keywords...");
  const phrases = generateLowFrequencyPhrases(phraseCount);
  console.log(`Generated ${phrases.length} keywords.`);

  // Step 2 & 3: Generate Human SEO Text & Compile Unique Pages
  console.log("\n[STEP 2 & 3/4] Generating Human SEO Copy & Compiling CEH Unique Pages...");
  const compiledFiles = [];

  for (const p of phrases) {
    console.log(` -> Processing: "${p.keyword}" (${p.slug}.html)...`);
    const seoText = generateHumanSeoArticle(p);
    const pagePath = compileUniquePage(p, seoText);
    compiledFiles.push(pagePath);
  }

  // Step 4: Validate Linters & Publish
  console.log("\n[STEP 4/4] Validating Linters & Publishing to GitHub Pages...");
  const publishResult = publishAllGeneratedPages();

  console.log("\n=================================================");
  console.log("🎉 PIPELINE COMPLETED SUCCESSFULLY!");
  console.log(`Total Published URLs: ${publishResult.count}`);
  console.log("=================================================");
}

runProgrammaticPipeline(5).catch(err => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
