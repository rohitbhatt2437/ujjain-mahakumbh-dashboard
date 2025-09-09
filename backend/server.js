const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001; // We'll run the backend on a different port

// Middleware
app.use(cors()); // Allow requests from our React frontend
app.use(express.json()); // Allow the server to understand JSON request bodies

// --- Simple Login Endpoint ---
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password });

  // IMPORTANT: In a real app, you would check these against a database!
  // Here, we are just hardcoding them for the example.
  if (email === 'admin@example.com' && password === 'password') {
    // Successful login
    res.status(200).json({
      message: 'Login successful!',
      token: 'fake-auth-token-12345', 
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});