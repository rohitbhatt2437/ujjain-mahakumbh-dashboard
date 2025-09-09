const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === 'password') {
    res.status(200).json({ message: 'Login successful!', token: 'fake-auth-token-12345' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = {
  loginUser
};