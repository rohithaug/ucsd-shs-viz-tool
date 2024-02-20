// IMPORT LIBRARIES
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import moment from 'moment';

// IMPORT COMPONENTS
import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumb';

// IMPORT ICONS
import blogSample from '../../../assets/images/blogSample.png';

const Page = () => {
    const router = useRouter();

    const [postDetails, setPostDetails] = useState(null);
    const [postDetailsFetchLoading, setPostDetailsFetchLoading] = useState(true);
    const [postDetailsFetchError, setPostDetailsFetchError] = useState(false);

    // Function to fetch post details from API
    const fetchPostDetails = async (slug) => {
        try {
            setPostDetailsFetchLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blog/${slug}`);
            if (!response.ok) {
                setPostDetailsFetchError(true);
            } else {
                const data = await response.json();

                // Add time from now
                data.timeFromNow = moment(data.updatedAt).fromNow();
                
                setPostDetails(data);    
            }
            setPostDetailsFetchLoading(false);
        } catch (error) {
            setPostDetailsFetchError(true);
            setPostDetailsFetchLoading(false);
        }
    };

    useEffect(() => {
        if (router.query.slug) {
            fetchPostDetails(router.query.slug);
        }
    }, [router.query.slug]); // Empty dependency array ensures the effect runs only once on component mount

    if (postDetailsFetchLoading) {
        return (
            <div className="flex items-center justify-center mt-32">
                <div className="text-center">
                    <div role="status">
                        <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (postDetailsFetchError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold text-gray-900">404: Page Not Found</h1>
                <p className="mt-4 text-lg text-gray-600">The requested page does not exist.</p>
                <button 
                    onClick={() => router.push('/blog')} 
                    className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <>
            {
                postDetails ?
                <>
                    <Breadcrumb 
                        postTitle={postDetails.title}
                    />

                    <h2 
                        className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl"
                    >
                        {postDetails.title}
                    </h2>

                    <h4 
                        className="mb-4 text-2xl text-gray-500"
                    >
                        <span className="text-[#6DE4EA]">{postDetails.author}</span> 
                        {" "}|{" "}
                        <span className="text-[#18A0FB]">{postDetails.category}</span> 
                        {" "}|{" "} 
                        <span className="text-opacity-50">{postDetails.timeFromNow}</span> 
                    </h4>

                    <Image src={blogSample} alt="Blog Image" className="mb-4 h-auto max-w-full" />

                    {/* TODO: Remove this line */}
                    <p>Post: {router.query.slug}</p>
                    <p className="mb-8 text-justify text-gray-500 whitespace-pre-line">
                        {postDetails.content}
                    </p>
                </>
                :
                <></>
            }
        </>
    );
};

export default Page;
 
Page.getLayout = function getLayout(page) {
  return (
    <Layout>
        {page}
    </Layout>
  )
}
