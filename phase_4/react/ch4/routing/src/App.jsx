import React from 'react';
import RootLayout from "./layout/RootLayout";
import DashboardLayout from "./layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import {
    BrowserRouter,
    Route,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Post from "./pages/Post";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="posts" element={<Posts />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

const App = () => {
    // return (
    //     <BrowserRouter>
    //         <Navbar />
    //         <Routes>
    //             <Route path="/" element={ <Home /> }/>
    //             <Route path="/about" element={ <About /> }/>
    //         </Routes>
    //     </BrowserRouter>
    // );

    return (
        <RouterProvider router={ router } />
    );
}

export default App;