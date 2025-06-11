import React from "react";
import Product from './product';
import Customers from "./customers"
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

const root = createRoot(document.querySelector("#root"));

root.render(<h1>Hello, World</h1>);
// But you may need to display whole page. Then you need bigger code
// So you will use external compnent

root.render(<Product />);
// root.render(<Customers />);