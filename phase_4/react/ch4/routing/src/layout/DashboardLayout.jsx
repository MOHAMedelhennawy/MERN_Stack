import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <aside style={{ width: '200px', background: '#eee', padding: '1rem' }}>
                <nav>
                    <ul>
                        <li><Link to="/dashboard/users">Users</Link></li>
                        <li><Link to="/dashboard/posts">Posts</Link></li>
                    </ul>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '1rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
