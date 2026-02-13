import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const PublicLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white text-center py-4">
                <p>&copy; {new Date().getFullYear()} ShopMERN. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PublicLayout;
