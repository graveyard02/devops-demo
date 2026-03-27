const express = require("express");
const os = require("os");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 DevOps Demo App</h1>
    <p>Version: 2.0</p>
    <p>Hostname: ${os.hostname()}</p>
    <p>Platform: ${os.platform()}</p>
    <p>Time: ${new Date()}</p>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "Running",
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});