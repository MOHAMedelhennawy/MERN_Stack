import { Outlet, NavLink, Link } from "react-router-dom";

const DashboardLayout = () => {
    return ( 
        <>
            <main>
                <Outlet />
            </main>
            <nav>
                <ul>
                    <li><NavLink className={({ isActive }) => isActive ? "text-red-500" : "text-black"} to="/dashboard/user">User</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? "text-red-500" : "text-black"} to="/dashboard/posts">Posts</NavLink></li>
                </ul>
            </nav>

        </>
     );
}
 
export default DashboardLayout;