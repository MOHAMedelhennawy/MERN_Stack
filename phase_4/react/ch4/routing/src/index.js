import App from "./App";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
