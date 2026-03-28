import { useEffect, useState } from 'react';
import Cars from './components/cars.jsx';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('/api/v1/cars')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to the PERN Stack Starter!</h1>
      <ul>
        {cars && cars.length > 0 ? (
          cars.map((car) => (
            <li key={car.id}>
              {car.make} {car.model} - {car.year} - ${car.price}
            </li>
          ))
        ) : (
          <li>No cars found</li>
        )}
      </ul>
      <Cars />
    </div>
  );
}

export default App;