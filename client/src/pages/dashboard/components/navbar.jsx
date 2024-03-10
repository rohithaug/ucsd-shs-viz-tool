// IMPORT LIBRARIES
import React from 'react';
import Image from 'next/image'

// IMPORT ICONS
import ucsdLogo from '../../../assets/images/ucsdLogo.png';

// IMPORT UTILS
import { logout } from '../../../utils/logout_actions';

const Navbar = () => {
  return (
    <nav className="bg-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <h1 className="font-bold text-2xl text-black">STUDENT HEALTH SERVICES</h1>
            <Image src={ucsdLogo} alt="Logo" className="w-auto h-6" />
        </div>
        <hr className="border-t border-[#6DE4EA] mx-12" />
        <div className="flex justify-end">
            <div className="p-2 rounded-md hover:bg-red-100 mx-16">
                <button className="text-red-600 font-bold" onClick={logout}>Logout</button>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
