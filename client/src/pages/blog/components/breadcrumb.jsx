// IMPORT LIBRARIES
import React from 'react';

// IMPORT ICONS
import HomeIcon from '@/assets/icons/home';

const Breadcrumb = ({ postTitle }) => {
    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <a href="/blog" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                        <HomeIcon />
                        Home
                    </a>
                </li>
                <li aria-current="page">
                <div className="flex items-center">
                    /
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">{postTitle || ""}</span>
                </div>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
