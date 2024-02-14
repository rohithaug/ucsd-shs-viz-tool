// IMPORT LIBRARIES
import React from 'react';
import Image from 'next/image'

// IMPORT ICONS
import ucsdLogo from '../assets/images/ucsdLogo.png';

const Navbar = () => {
  return (
    <nav className="bg-white">
        <div className="container mx-12 px-4 py-2 flex justify-between items-center">
            <h1 className="font-bold text-2xl text-black">STUDENT HEALTH SERVICES</h1>
            <Image src={ucsdLogo} alt="Logo" className="w-auto h-6 ml-auto" />
        </div>
        
        <hr className="border-t border-custom-blue mx-12" />
    </nav>
  );
};

export default Navbar;
