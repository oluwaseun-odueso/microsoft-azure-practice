const express = require("express");
const { getToken } = require('./authMiddleware')
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/keys', async (req, res) => {
  try {
    const token = await getToken();
    const keys = await fetchKeys(token);
    res.status(200).send(keys);
  } catch (error) {
    res.status(403).send({ error: 'Forbidden', message: error.message });
  }
});

// Function to fetch discovery keys
async function fetchKeys(token) {
  const response = await fetch('https://login.microsoftonline.com/common/discovery/v2.0/keys', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.json();
}


app.get("/", (req, res) => {
  res.send("Welcome to the Microsoft Graph API Integration!");
});

// Import routes
const userRoutes = require("./userRoutes");
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
