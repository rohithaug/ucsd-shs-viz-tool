// IMPORT COMPONENTS
import React from 'react';
import Image from 'next/image'

//IMPORT ICONS
import blogSample from '../../../assets/images/caps-be-kind-to-mind-and-body.png';

const Card = ({ blogId, title, author, category, time, content }) => {
    return (
        <div className="flex-1 max-w bg-white border rounded-lg mx-4 mb-4">
            <a href={`/blog/${blogId || ""}`}>
                <Image src={blogSample} className="rounded-t-lg" alt="" />
            </a>
            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <a href={`/blog/${blogId || ""}`}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">{title}</h5>
                    </a>
                    <p className="ml-2 text-sm text-blue-400">{category}</p>
                </div>    
                <div className="flex items-center mb-2">
                    <p className="mb-1 text-sm text-blue-500">{author}</p>&nbsp;&nbsp;
                    <p className="mb-1 text-sm text-gray-500">{time}</p>
                </div>
                <p className="mb-3 font-normal text-black-400 max-h-36 overflow-hidden">{content}</p>
                <a href={`/blog/${blogId || ""}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Card;