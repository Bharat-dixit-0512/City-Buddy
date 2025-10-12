import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "_data");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_PATH, { recursive: true });
  } catch (err) {
    // ignore
  }
}

async function readCollection(name) {
  await ensureDataDir();
  const file = path.join(DATA_PATH, `${name}.json`);
  try {
    const content = await fs.readFile(file, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    // if file missing, return empty array
    return [];
  }
}

async function writeCollection(name, items) {
  await ensureDataDir();
  const file = path.join(DATA_PATH, `${name}.json`);
  await fs.writeFile(file, JSON.stringify(items || [], null, 2), "utf8");
}

async function appendToCollection(name, item) {
  const items = await readCollection(name);
  items.push(item);
  await writeCollection(name, items);
  return item;
}

export { readCollection, writeCollection, appendToCollection };
