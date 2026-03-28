import express from "express";
import cors from "cors";
import { db } from "./db.js";
import { cars } from "./schema.js";
import { eq } from "drizzle-orm";

const app = express();
const PORT = 3000;

const router = express.Router();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Car API!");
});

router.get("/cars", async (req, res) => {
  const allCars = await db.select().from(cars);
  res.json(allCars);
});

router.post("/cars", async (req, res) => {
  const { make, model, year, price } = req.body;

  if (!make || !model || !year || !price) {
    return res.status(400).json({
      error: "Please provide make, model, year, and price",
    });
  }

  const inserted = await db.insert(cars).values({
    make,
    model,
    year,
    price,
  }).returning();

  const newCar = Array.isArray(inserted) ? inserted[0] : inserted;
  res.status(201).json(newCar);
});

router.put("/cars/:id", async (req, res) => {
  const carId = parseInt(req.params.id, 10);
  const { make, model, year, price } = req.body;

  const existing = await db.select().from(cars).where(eq(cars.id, carId));
  if (!existing.length) {
    return res.status(404).json({ error: "Car not found" });
  }

  const updates = {};
  if (make) updates.make = make;
  if (model) updates.model = model;
  if (year) updates.year = parseInt(year, 10);
  if (price) updates.price = parseFloat(price);

  if (!Object.keys(updates).length) {
    return res.status(400).json({ error: "No updatable fields provided" });
  }

  const updated = await db.update(cars).set(updates).where(eq(cars.id, carId)).returning();
  res.json(Array.isArray(updated) ? updated[0] : updated);
});

router.delete("/cars/:id", async (req, res) => {
  const carId = parseInt(req.params.id, 10);
  const deleted = await db.delete(cars).where(eq(cars.id, carId)).returning();

  if (!deleted.length) {
    return res.status(404).json({ error: "Car not found" });
  }

  res.json({
    message: "Car deleted successfully",
    car: deleted[0],
  });
});

router.get("/cars/:id", async (req, res) => {
  const carId = parseInt(req.params.id, 10);
  const car = await db.select().from(cars).where(eq(cars.id, carId));

  if (!car.length) {
    return res.status(404).json({ error: "Car not found" });
  }

  res.json(car[0]);
});

app.use("/api/v1", router);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
