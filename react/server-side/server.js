// const express = require('express');
// const fs = require('fs');
// const cors = require('cors');

// const app = express();
// // Enable CORS
// app.use(cors());

// // Route to serve file content
// app.get('/file', (req, res) => {
//   fs.readFile('example.txt', 'utf8', (err, data) => {
//     if (err) {
//       res.status(500).json({ error: 'Failed to read file' });
//     } else {
//       res.json({ content: data });
//     }
//   });
// });

// // Start the server
// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
// Enable CORS
app.use(cors());

// Route to serve file content
app.get('/file', (req, res) => {
  fs.readFile('example2.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read file' });
    } else {
      // Split the file content by lines
      const lines = data.trim().split('\n');

      // Initialize variables to store the last values
      let lastWaterLevel;
      let lastHumidity;
      let lastTemperature;
      let lastDanger;

      // Iterate over each line in reverse order to find the last occurrences
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line.startsWith('waterLevel:')) {
          lastWaterLevel = parseInt(line.split(':')[1].trim(), 10);
        } else if (line.startsWith('humidity:')) {
          lastHumidity = parseInt(line.split(':')[1].trim(), 10);
        } else if (line.startsWith('temperature:')) {
          lastTemperature = parseInt(line.split(':')[1].trim(), 10);
        } else if (line.startsWith('danger:')) {
          lastDanger = line.split(':')[1].trim().toLowerCase() === 'true';
        }
        // Break if all values are found
        if (lastWaterLevel !== undefined && lastHumidity !== undefined && lastTemperature !== undefined) {
          break;
        }
      }

      // Send the last values as JSON
      res.json({
        waterLevel: lastWaterLevel,
        humidity: lastHumidity,
        temperature: lastTemperature,
        danger: lastDanger
      });
    }
  });
});

// Route to serve file content
app.get('/data2', (req, res) => {
    fs.readFile('example2.txt', 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Failed to read file' });
      } else {
        // Split the file content by lines
        const lines = data.trim().split('\n');
  
        // Initialize arrays to store the last 5 values
        const lastValues = {
          waterLevels: [],
          humidities: [],
          temperatures: []
        };
  
        // Iterate over each line in reverse order
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i].trim();
          if (line.startsWith('waterLevel:')) {
            const value = parseInt(line.split(':')[1].trim(), 10);
            if (lastValues.waterLevels.length < 5) {
              lastValues.waterLevels.unshift(value); // Add value to the beginning of the array
            }
          } else if (line.startsWith('humidity:')) {
            const value = parseInt(line.split(':')[1].trim(), 10);
            if (lastValues.humidities.length < 5) {
              lastValues.humidities.unshift(value); // Add value to the beginning of the array
            }
          } else if (line.startsWith('temperature:')) {
            const value = parseInt(line.split(':')[1].trim(), 10);
            if (lastValues.temperatures.length < 5) {
              lastValues.temperatures.unshift(value); // Add value to the beginning of the array
            }
          }
          // Break if all arrays contain 5 values
          if (lastValues.waterLevels.length === 5 &&
              lastValues.humidities.length === 5 &&
              lastValues.temperatures.length === 5) {
            break;
          }
        }
  
        // Send the last 5 values as JSON
        res.json(lastValues);
      }
    });
});

// Route to serve file content
app.get('/data', (req, res) => {
    fs.readFile('example2.txt', 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Failed to read file' });
      } else {
        // Split the file content by lines
        const lines = data.trim().split('\n');
  
        // Initialize arrays to store the last 5 values for each metric
        const waterLevels = [];
        const humidities = [];
        const temperatures = [];
  
        // Iterate over each line in reverse order
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i].trim();
          if (line.startsWith('waterLevel:') && waterLevels.length < 5) {
            const value = parseInt(line.split(':')[1].trim(), 10);
            waterLevels.unshift(value);
          } else if (line.startsWith('humidity:') && humidities.length < 5) {
            const value = parseInt(line.split(':')[1].trim(), 10);
            humidities.unshift(value);
          } else if (line.startsWith('temperature:') && temperatures.length < 5) {
            const value = parseInt(line.split(':')[1].trim(), 10);
            temperatures.unshift(value);
          }
          // Break if all arrays contain 5 values
          if (waterLevels.length === 5 && humidities.length === 5 && temperatures.length === 5) {
            break;
          }
        }
  
        // Combine the last 5 values of each metric into an array of objects
        const lastValues = waterLevels.map((waterLevel, index) => ({
          waterLevel,
          humidity: humidities[index],
          temperature: temperatures[index]
        }));
  
        // Send the last 5 values as JSON
        res.json(lastValues);
      }
    });
  });

  // Route to serve file content
app.get('/data3', (req, res) => {
  fs.readFile('example2.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read file' });
    } else {
      // Split the file content by lines
      const lines = data.trim().split('\n');

      // Initialize arrays to store the last 5 values for each metric
      const waterLevels = [];
      const humidities = [];
      const temperatures = [];

      // Iterate over each line in reverse order
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        const values = line.split(' ');

        // Extract values for waterLevel, humidity, and temperature
        const waterLevel = parseFloat(values[6]);
        const humidity = parseFloat(values[2]);
        const temperature = parseFloat(values[4]);

        // Add values to respective arrays
        if (!isNaN(waterLevel) && waterLevels.length < 5) {
          waterLevels.unshift(waterLevel);
        }
        if (!isNaN(humidity) && humidities.length < 5) {
          humidities.unshift(humidity);
        }
        if (!isNaN(temperature) && temperatures.length < 5) {
          temperatures.unshift(temperature);
        }

        // Break if all arrays contain 5 values
        if (waterLevels.length === 5 && humidities.length === 5 && temperatures.length === 5) {
          break;
        }
      }

      // Combine the last 5 values of each metric into an array of objects
      const lastValues = waterLevels.map((waterLevel, index) => ({
        waterLevel,
        humidity: humidities[index],
        temperature: temperatures[index]
      }));

      // Send the last 5 values as JSON
      res.json(lastValues);
    }
  });
});
// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
