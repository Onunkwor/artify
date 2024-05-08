import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { Toaster } from "sonner";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster richColors />
    <App />
  </React.StrictMode>
);
