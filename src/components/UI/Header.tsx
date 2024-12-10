'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect, useRef } from 'react';
import { Settings, User, LogOut } from 'lucide-react';
import { Spinner } from './Spinner';

export default function Header() {
 const [mounted, setMounted] = useState(false);
 const [loading, setLoading] = useState(false);
 const [dropdownOpen, setDropdownOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
   setMounted(true);

   const handleClickOutside = (event: MouseEvent) => {
     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
       setDropdownOpen(false);
     }
   };

   document.addEventListener('mousedown', handleClickOutside);
   return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const { user, isLoading } = useUser();

 const handleLogin = () => {
   setLoading(true);
   window.location.href = '/api/auth/login';
 };

 const handleLogout = () => {
   setLoading(true);
   window.location.href = '/api/auth/logout';
 };

 return (
   <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
     <div className="container mx-auto p-4 flex justify-between items-center">
       <h1 className="text-xl font-bold">
         <Link href="/" className="hover:opacity-90 transition-opacity">
           QR Direct
         </Link>
       </h1>
       
       <nav className="flex items-center space-x-6">
         <Link 
           href="/qr-generator" 
           className="hover:opacity-90 transition-opacity hidden sm:inline"
         >
           QR Generator
         </Link>
         <Link 
           href="/analytics" 
           className="hover:opacity-90 transition-opacity hidden sm:inline"
         >
           Analytics
         </Link>
         <Link 
           href="/about" 
           className="hover:opacity-90 transition-opacity hidden sm:inline"
         >
           About
         </Link>

         {mounted && (
           <>
             {isLoading || loading ? (
               <Spinner />
             ) : user ? (
               <div className="relative" ref={dropdownRef}>
                 <button
                   onClick={() => setDropdownOpen(!dropdownOpen)}
                   className="flex items-center space-x-2 focus:outline-none group"
                 >
                   <img
                     src={user.picture || '/default-avatar.png'}
                     alt="User Avatar"
                     className="w-8 h-8 rounded-full border-2 border-white/50 group-hover:border-white transition-colors"
                   />
                 </button>

                 {dropdownOpen && (
                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                     <div className="px-4 py-2 border-b border-gray-100">
                       <p className="text-sm text-gray-500">Signed in as</p>
                       <p className="text-sm font-medium text-gray-900 truncate">
                         {user.email}
                       </p>
                     </div>

                     <Link
                       href="/profile"
                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                     >
                       <User className="w-4 h-4 mr-2" />
                       Profile
                     </Link>

                     <Link
                       href="/settings"
                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                     >
                       <Settings className="w-4 h-4 mr-2" />
                       Settings
                     </Link>

                     <div className="border-t border-gray-100">
                       <button
                         onClick={handleLogout}
                         className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                       >
                         <LogOut className="w-4 h-4 mr-2" />
                         Logout
                       </button>
                     </div>
                   </div>
                 )}
               </div>
             ) : (
               <button
                 onClick={handleLogin}
                 className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                 disabled={loading}
               >
                 {loading ? <Spinner /> : 'Login'}
               </button>
             )}
           </>
         )}
       </nav>
     </div>
   </header>
 );
}