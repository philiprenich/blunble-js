const path = require("path");
const fs = require("fs");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV;
const dotenvPath = path.resolve(process.cwd(), ".env");

try {
  const config = fs.readFileSync(dotenvPath).toString();
  config.split("\n").forEach(line => {
    if (!line) {
      return;
    }

    let [key, value] = line.split("=");

    process.env[key] = value.trim();
  });
} catch (error) {
  console.log("failed to load default .env", error);
}
