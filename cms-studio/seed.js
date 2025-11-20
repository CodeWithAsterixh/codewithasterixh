import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import {config} from "dotenv";

config()

// Instantiate Sanity client via .env
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  apiVersion:'2023-03-01',
  token: process.env.DIRECT_SEEDER_TOKEN,
  useCdn: false,
});

const helpText = `
Usage: seed [options] <file1.json> [file2.json ...]

Options:
  -b, --basePath <path>   Base directory for seed files (default: current dir)
  -h, --help               Show this help message
`;

// Simple CLI args parsing
const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  console.log(helpText);
  process.exit(0);
}

let basePath = '';
const files = [];
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-b' || arg === '--basePath') {
    basePath = args[++i] || '';
  } else if (arg.endsWith('.json')) {
    files.push(arg);
  }
}

if (files.length === 0) {
  console.error("❌  No JSON files specified. Use -h for help.");
  process.exit(1);
}

async function seedFile(filePath) {
  const absPath = resolve(process.cwd(), basePath, filePath);
  console.log(`
📄  Seeding ${filePath} (from ${basePath})`);

  if (!existsSync(absPath)) {
    console.error(`❌  File not found: ${absPath}`);
    return;
  }

  let docs;
  try {
    const raw = readFileSync(absPath, 'utf8');
    docs = JSON.parse(raw);
    if (!Array.isArray(docs)) throw new Error('JSON must be an array of docs');
    console.log(`✅  Parsed ${docs.length} docs from ${filePath}`);
  } catch (err) {
    console.error(`❌  Failed to parse ${filePath}: ${err.message}`);
    return;
  }

  const tx = client.transaction();
  docs.forEach((doc, idx) => {
    const { _id, ...body } = doc;
    const op = _id ? 'createOrReplace' : 'create';
    tx[op](_id ? { _id, ...body } : body);
    process.stdout.write(`🔄  [${idx+1}/${docs.length}] ${op}\r`);
  });

  try {
    await tx.commit();
    console.log(`
🎉  Finished seeding ${filePath}`);
  } catch (err) {
    console.error(`
❌  Transaction failed for ${filePath}: ${err.message}`);
  }
}

(async function run() {
  for (const file of files) {
    await seedFile(file);
  }
  console.log("\n✅  All done.");
})();
