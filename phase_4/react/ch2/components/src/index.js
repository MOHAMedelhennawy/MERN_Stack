import React from "react";
import App from "./components/app"
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

const root = createRoot(document.querySelector("#root"));

root.render(<App />)