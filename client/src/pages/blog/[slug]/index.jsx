// IMPORT LIBRARIES
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// IMPORT COMPONENTS
import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumb';

const Page = () => {
    const router = useRouter();

    const [postDetails, setPostDetails] = useState(null);
    const [postDetailsFetchLoading, setPostDetailsFetchLoading] = useState(true);
    const [postDetailsFetchError, setPostDetailsFetchError] = useState(false);
    const [postDetailsFetchErrorDetails, setPostDetailsFetchErrorDetails] = useState(null);

    const [blogImageSource, setBlogImageSource] = useState(null);
    const [blogImageFetchLoading, setblogImageFetchLoading] = useState(true);

    // Function to fetch post details from API
    const fetchPostDetails = async (slug) => {
        try {
            setPostDetailsFetchLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blog/${slug}`);
            if (!response.ok) {
                const errorDetails = await response.json();
                setPostDetailsFetchErrorDetails({
                    statusCode: response.status,
                    errorMessage: errorDetails?.message || errorDetails || "",
                    errorDescription: errorDetails?.description || "",
                });
                setPostDetailsFetchError(true);
                setPostDetailsFetchLoading(false);
            } else {
                const postDetails = await response.json();

                // Add time from now
                postDetails.timeFromNow = moment(postDetails.updatedAt).fromNow();
                
                setPostDetails(postDetails);
                setPostDetailsFetchLoading(false);

                if (postDetails.imageFileName) {
                    setblogImageFetchLoading(true);
                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blog/image?fileName=${postDetails.imageFileName}`);
                        if (response.ok) {
                            const blob = await response.blob();
                            const imageUrl = URL.createObjectURL(blob);
                            setBlogImageSource(imageUrl);
                        }
                    } catch (error) {
                        // do nothing
                    }
                    setblogImageFetchLoading(false);
                }
            }
        } catch (error) {
            setPostDetailsFetchErrorDetails({
                statusCode: 400,
                errorMessage: "Unexpected Client Error",
                errorDescription: "",
            });
            setPostDetailsFetchError(true);
            setPostDetailsFetchLoading(false);
        }
    };

    useEffect(() => {
        if (router.query.slug) {
            fetchPostDetails(router.query.slug);
        }
    }, [router.query.slug]);

    // TRACKING API - POST DETAILS
    useEffect(() => {
        if (router.query && Object.keys(router.query).length != 0 && router.query.slug) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/track/visit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // content type of the request body
                },
                body: JSON.stringify({
                    blogId: router.query.slug,
                    sessionId: uuidv4(), // assign unique ID whenever a new tab is opened
                    source: router.query.source || "direct"
                })
            }).then((response) => {
                if (response.ok) {
                    return Promise.reject(response);
                }
            })
            .then(() => {
                // do nothing
            })
            .catch(() => {
                // do nothing
            });
        }
    }, [router.query]);

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
                <h1 className="text-4xl font-bold text-gray-900">{postDetailsFetchErrorDetails.statusCode}: {postDetailsFetchErrorDetails.errorMessage}</h1>
                <p className="mt-4 text-lg text-gray-600">{postDetailsFetchErrorDetails.errorDescription}</p>
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

                    {
                        blogImageFetchLoading ?
                            <div role="status" className="mb-4 w-[36rem] h-96 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded">
                                    <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                    </svg>
                                </div>
                            </div>
                        :
                        <>
                            {blogImageSource && (
                                <img 
                                    src={blogImageSource} 
                                    alt="Blog Image"
                                    className="mb-4 h-96 max-w-full" 
                                />
                            )}
                        </>
                    }

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
