// src/main.jsx

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error('Root container with id "root" not found');
}
createRoot(container).render(<App />);
