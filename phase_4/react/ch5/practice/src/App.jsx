import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


import RootLayout from "./Layout/RootLayout";
import DashboardLayout from "./Layout/DashboardLayout";


import Home from "./components/Home";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import Posts from "./components/Posts";
import ProtectedRoute from "./components/protectedRoute";
import LoginForm from "./components/Login";

// const user = null; // not loggend in
const user = {id: "343", name: "Ahmed "}; // logged in user

function App() {
  // eslint-disable-next-line no-unused-vars
  const [ products, setProducts ] = useState([
    { id: 1, name: "Burger", price: 4},
    { id: 2, name: "Pizza", price: 2},
    { id: 3, name: "BigCola", price: 6},
  ]);

  const [ cartItems, setCartItems ] = useState([]);

  const addNewCartItem = (product) => {
    const exist = cartItems.find(p => p.id === product.id);
    
    let updateCart;
    if (exist) {
      updateCart = cartItems.filter(p => p.id !== product.id);
    } else {
      updateCart = [ ...cartItems, { ...product, count: 0}]
    }

    setCartItems(updateCart);
  };

  const incrementCartItem = (product) => {
    return () => {
      const newItems = cartItems.map(it => it.id === product.id ? { ...it, count: it.count + 1} : it)

      setCartItems(newItems)
    }
  }

  const deleteCartItem = (product) => {
    return () => {
      const newItems = cartItems.filter(it => it.id !== product.id);
    
      setCartItems(newItems);
    }
  };

  const resetCounter = () => {
    const newCartItem = cartItems.map(item => ({ ...item, count: 0 }));

    setCartItems(newCartItem)
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <RootLayout/> }>
        <Route index element={ <Home/> }></Route>
        <Route path="/products" element={ <Products products={ products } cartItems={ cartItems } addToCart={ addNewCartItem }/> }></Route>
        <Route path="/cart"
          element= { <Cart
              cartItems={ cartItems }
              onIncrement={ incrementCartItem }
              onDelete={ deleteCartItem }
              onReset={ resetCounter }
          /> }>
        </Route>
        <Route path="dashboard" element={
            <ProtectedRoute user={ user }>
              <DashboardLayout/>
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="posts" element={<Posts />} />
        </Route>

          <Route path="login" element={ <LoginForm/ > }></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
