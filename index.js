const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/btcusdt/15m", async (req, res) => {
  try {
    const response = await fetch("https://fapi.binance.com/fapi/v1/klines?symbol=BTCUSDT&interval=15m&limit=200");
    const data = await response.json();

    const formatted = data.map(candle => ({
      time: candle[0],
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5],
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
