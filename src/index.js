import app from "./app.js";

const port = 4000;

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("\nServer ready 🚀.\nListening on port", port);
});
