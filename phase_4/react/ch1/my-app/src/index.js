import React from 'react';
import { createRoot } from 'react-dom/client';
import Product from './product';
import 'bootstrap/dist/css/bootstrap.css';

const root = createRoot(document.querySelector('#root'));
root.render(<Product />);
