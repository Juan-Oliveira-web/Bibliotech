import express from "express";
import cors from "cors";
import livrosRoutes from "./routes/livros.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api/livros", livrosRoutes);

app.listen(PORT, () => {
  console.log(`Bibliotech API rodando em http://localhost:${PORT}`);
});
