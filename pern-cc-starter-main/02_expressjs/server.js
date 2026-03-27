import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

// ✅ Real data storage (in memory)
let cars = [
  { id: 1, make: "Toyota", model: "Camry", year: 2020 },
  { id: 2, make: "Honda", model: "Civic", year: 2019 },
  { id: 3, make: "Ford", model: "Mustang", year: 2021 },
];

// ✅ GET all cars
app.get("/api/v1/cars", (req, res) => {
  res.json(cars);
});

// ✅ GET single car
app.get("/api/v1/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(c => c.id === id);

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  res.json(car);
});

// ✅ POST (Create new car)
app.post("/api/v1/cars", (req, res) => {
  const newCar = {
    id: cars.length > 0 ? cars[cars.length - 1].id + 1 : 1,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
  };

  cars.push(newCar);

  res.status(201).json({
    message: "Car created successfully",
    data: newCar,
  });
});

// ✅ PUT (Update car)
app.put("/api/v1/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(c => c.id === id);

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  // Update fields
  car.make = req.body.make || car.make;
  car.model = req.body.model || car.model;
  car.year = req.body.year || car.year;

  res.json({
    message: "Car updated successfully",
    data: car,
  });
});

// ✅ DELETE car
app.delete("/api/v1/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Car not found" });
  }

  const deletedCar = cars.splice(index, 1);

  res.json({
    message: "Car deleted successfully",
    data: deletedCar,
  });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});