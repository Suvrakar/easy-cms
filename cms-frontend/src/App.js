import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, TextField } from "@mui/material";
import ContentForm from "./components/ContentForm";
import ContentList from "./components/ContentList";
import ContentDetails from "./components/ContentDetails";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctUsername = "timeshell@gmail.com";
  const correctPassword = "123456";

  const handleLogin = () => {
    // Perform validation logic here
    if (username === correctUsername && password === correctPassword) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setIsLoggedIn(false);
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                Timeshell CMS
              </Typography>
              <div sx={{ display: "flex", gap: 2 }}>
                <Button component={Link} to="/create" color="inherit">
                  Create Content
                </Button>
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <Container>
            <Routes>
              <Route path="/" element={<ContentList />} />
              <Route path="/create" element={<ContentForm />} />
              <Route path="/edit/:id" element={<ContentForm editMode={true} />} />
              <Route path="/details/:id" element={<ContentDetails />} />
            </Routes>
          </Container>
        </>
      ) : (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
          <Typography variant="h5">Login</Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginTop: "20px" }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginTop: "20px" }}
          />
          <Button variant="contained" onClick={handleLogin} sx={{ marginTop: "20px" }}>
            Login
          </Button>
          {error && <Typography color="error" sx={{ marginTop: "10px" }}>{error}</Typography>}
        </Container>
      )}
    </Router>
  );
};

export default App;
