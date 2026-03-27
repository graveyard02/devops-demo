const express = require("express");
const os = require("os");

const app = express();

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DevOps Dashboard</title>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f172a;
  color: white;
}

header {
  background: #020617;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.container {
  padding: 30px;
}

.card {
  background: #1e293b;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  gap: 20px;
}

button {
  padding: 10px 20px;
  background: #3b82f6;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

.footer {
  text-align: center;
  margin-top: 40px;
  opacity: 0.6;
}
</style>

</head>

<body>

<header>
🚀 DevOps Dashboard
</header>

<div class="container">

<div class="grid">

<div class="card">
<h3>Application Version</h3>
<p id="version">2.0</p>
</div>

<div class="card">
<h3>Hostname</h3>
<p>${os.hostname()}</p>
</div>

<div class="card">
<h3>Platform</h3>
<p>${os.platform()}</p>
</div>

<div class="card">
<h3>Uptime</h3>
<p id="uptime">Loading...</p>
</div>

</div>

<div class="card">
<h3>System Info</h3>
<p>Total Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB</p>
<p>Free Memory: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB</p>
<p>CPU Cores: ${os.cpus().length}</p>
</div>

<div class="card">
<h3>Health Check</h3>
<button onclick="checkHealth()">Check Health</button>
<p id="health"></p>
</div>

<div class="footer">
DevOps Demo • CI/CD • Docker • GitHub Actions
</div>

</div>

<script>

function checkHealth() {
fetch('/health')
.then(res => res.json())
.then(data => {
document.getElementById('health').innerText =
"Status: " + data.status + 
" | Uptime: " + data.uptime.toFixed(2);
})
}

setInterval(() => {
document.getElementById("uptime").innerText =
Math.floor(performance.now()/1000) + " seconds";
},1000)

</script>

</body>
</html>
`);
});

app.get("/health", (req, res) => {
  res.json({
    status: "Running",
    uptime: process.uptime(),
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});