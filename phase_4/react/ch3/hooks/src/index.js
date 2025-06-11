import React from "react";
import Counter from "./components/Counter"
import App from "./components/App"
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

const root = createRoot(document.querySelector("#root"));

root.render(<App />)