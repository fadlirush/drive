const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const pg = require("pg");
const zstd = require("@zstd");

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Dilan651104",
  port: 5432,
});
client.connect();

if (client) {
  console.log("Connected to the database");
} else {
  console.log("Failed to connect to the database");
}

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  const menuHtml = await renderMenu(); // Render the menu HTML using EJS or other method
  const compressedData = zstd.compressSync(Buffer.from(menuHtml));

  res.setHeader("Content-Encoding", "zstd");
  res.send(compressedData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function renderMenu() {
  return new Promise((resolve, reject) => {
    res.render("menu", (err, html) => {
      if (err) return reject(err);
      resolve(html);
    });
  });
}
