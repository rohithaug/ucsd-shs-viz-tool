// IMPORT LIBRARIES
import styles from '.././test.module.css';
import React from 'react';
import Image from 'next/image'

// IMPORT ICONS
import ucsdLogo from '../../../assets/images/ucsdLogo.png';

const Footer = () => {
  return (
    <nav className={styles.footer}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <h1 className="font-bold text-2xl text-black">© CSE 210 Group 12 2024</h1>
            <Image src={ucsdLogo} alt="Logo" className="w-auto h-6" />
        </div>
        
        <hr className="border-t border-[#6DE4EA] mx-12" />
    </nav>
  );
};

export default Footer;