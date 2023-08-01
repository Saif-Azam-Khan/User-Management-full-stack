const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
const PORT = 8080; // You can use any port you prefer

// Parse incoming JSON data
app.use(bodyParser.json());

// Endpoint to handle form submissions
app.post("/submit", (req, res) => {
  const formData = req.body;
  try {
    // Convert the array to a JSON string
    const dataArrayJson = JSON.stringify(formData);
    const data = fs.readFileSync("data.txt", "utf8");
    const strData = "[" + data.slice(0, -1) + "]";
    const jsonData = JSON.parse(strData);
    const emailExists = jsonData.some((item) => item.email === formData.email);
    // Write the JSON string back to the data file
    if (data[0] !== ",") {
      if (emailExists) {
        res.status(201).json({ error: "Email already exists" });
      } else {
        fs.appendFile("./data.txt", dataArrayJson + ",", (err) => {
          if (err) {
            console.error("Error writing data to file:", err);
            res
              .status(500)
              .json({ error: "Server error, failed to save data" });
          } else {
            console.log("Data written to file successfully");
            res.json({ message: "Form data saved successfully" });
          }
        });
      }
    } else {
      fs.truncate("./data.txt", 0, (err) => {
        if (err) {
          console.error("Error truncating the file:", err);
        } else {
          console.log("File cleared successfully");
        }
      });
      fs.appendFile("./data.txt", dataArrayJson + ",", (err) => {
        if (err) {
          console.error("Error writing data to file:", err);
          res.status(500).json({ error: "Server error, failed to save data" });
        } else {
          console.log("Data written to file successfully");
          res.json({ message: "Form data saved successfully" });
        }
      });
    }
  } catch (err) {
    console.error("Error writing data to array:", err);
    res.status(500).json({ error: "Server error, failed to save data" });
  }
});

app.get("/show", (req, res) => {
  try {
    const data = fs.readFileSync("data.txt", "utf8");
    const jsonData = "[" + data.slice(0, -1) + "]";
    res.json(jsonData); // Send the data as a JSON response
  } catch (err) {
    console.error(err, "Error displaying the data");
  }
});
app.post("/delete", (req, res) => {
  const deleteId = req.body.id; // Assuming the request body contains { "id": "..." }

  try {
    // Read the existing data from the file
    const data = fs.readFileSync("data.txt", "utf8");
    const jsonData = JSON.parse("[" + data.slice(0, -1) + "]");

    // Find the index of the record with the matching ID
    const index = jsonData.findIndex((item) => item.id === deleteId);

    if (index !== -1) {
      // Remove the record with the matching ID from the jsonData array
      jsonData.splice(index, 1);

      // Convert the updated array back to a JSON string
      const dataArray = JSON.stringify(jsonData);

      // Remove the square brackets from the JSON string
      const trimmedDataArray = dataArray.slice(1, -1);

      // Write the updated JSON string back to the data file
      fs.writeFileSync("./data.txt", trimmedDataArray + ",", (err) => {
        if (err) {
          console.error("Error writing data to file:", err);
          res.status(500).json({ error: "Server error, failed to delete" });
        } else {
          console.log("Data deleted successfully");
          res.json({ message: "Form data deleted successfully" });
        }
      });
    } else {
      // If no record found with the matching ID, send an error response
      res.status(404).json({ error: "Record not found" });
    }
  } catch (err) {
    console.error("Error reading or writing data:", err);
    res.status(500).json({ error: "Server error, failed to delete" });
  }
});

app.post("/edit", (req, res) => {
  const editedData = req.body;
  try {
    // Read the existing data from the file
    const data = fs.readFileSync("data.txt", "utf8");
    const jsonData = JSON.parse("[" + data.slice(0, -1) + "]");

    // Find the index of the record with the matching ID
    const index = jsonData.findIndex((item) => item.id === editedData.id);

    if (index !== -1) {
      // Update the record at the found index with the edited data
      jsonData[index] = editedData;

      // Convert the array to a JSON string
      const dataArrayStr = JSON.stringify(jsonData).slice(1, -1);

      // Write the JSON string back to the data file
      fs.writeFileSync("./data.txt", dataArrayStr + ",", (err) => {
        if (err) {
          console.error("Error writing data to file:", err);
          res.status(500).json({ error: "Server error, failed to update" });
        } else {
          console.log("Data updated successfully");
          res.json({ message: "Form data updated successfully" });
        }
      });
    } else {
      // If no record found with the matching ID, send an error response
      res.status(404).json({ error: "Record not found" });
    }
  } catch (err) {
    console.error("Error reading or writing data:", err);
    res.status(500).json({ error: "Server error, failed to update" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
