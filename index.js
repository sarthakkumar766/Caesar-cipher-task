const express = require("express");
const path = require("path");

const app = express();

const port = 3500;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Implement a Caesar cipher encoding. The key is an integer from 1 to 25.
// This cipher rotates the letters of the alphabet (A to Z).
// The encoding replaces each letter with the 1st to 25th next letter in the alphabet (wrapping Z to A).
// Example input: 2, "HI", Expected output: "JK"
// Example input: 20, "HI", Expected output: "BC"

app.get("/", (req, res) => {
  res.render("app");
});

app.get("/api/encode", (req, res) => {
  const { letters, key } = req.query;

  // Parse key to number
  const numKey = Number(key);

  // Define a variable to store encoded-data
  let encodedData = "";

  letters.split("").forEach((element) => {
    const charCodeVal = element.charCodeAt();

    // Convert ASCII to character after proper addition (A - 65, Z - 90)
    const code = String.fromCharCode(
      charCodeVal + numKey <= 90
        ? charCodeVal + numKey
        : ((charCodeVal + numKey) % 90) + 64
    );

    encodedData += code;
  });

  res.send({ value: encodedData });
});

app.listen(port, () => {
  console.log("Listening to port 3500");
});
