// IMPORT LIBRARIES
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { Link } from 'next/link';

// IMPORT COMPONENTS
import Layout from '../components/layout';

export default function Page() {
    const router = useRouter();
    const adminToken = Cookie.get('token') || null;
    const [blogPostMetrics, setBlogPostMetrics] = useState([]);
    const [blogPostMetricsFetchLoading, setBlogPostMetricsFetchLoading] = useState(true);
    const [blogPostMetricsFetchError, setBlogPostMetricsFetchError] = useState(false);
    const [blogPostMetricsFetchErrorDetails, setBlogPostMetricsFetchErrorDetails] = useState(null);

    const fetchBlogPostMetrics = async (slug) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/analytics/metrics/${slug}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                setBlogPostMetricsFetchErrorDetails({
                    statusCode: response.status,
                    errorMessage: errorDetails?.message || errorDetails || "",
                    errorDescription: errorDetails?.description || ""
                });
                setBlogPostMetricsFetchError(true);
                setBlogPostMetricsFetchLoading(false);
            }
            const data = await response.json();
            setBlogPostMetrics(data);
            setBlogPostMetricsFetchLoading(false);

        } catch (error) {
            setBlogPostMetricsFetchErrorDetails({
                statusCode: 400,
                errorMessage: "Unexpected client error",
                errorDescription: "Failed to fetch blog post metrics"
            });
            setBlogPostMetricsFetchError(true);
            setBlogPostMetricsFetchLoading(false);
        }
    };

    useEffect(() => {
        if (router.query.slug) {
            fetchBlogPostMetrics(router.query.slug);
        }
    }, [router.query.slug]);

    if (blogPostMetricsFetchLoading) {
        return (
            <div class="flex items-center justify-center h-96">
                <div class="text-center">
                    <p class="text-gray-500">Loading blog post metrics...</p>
                </div>
            </div>
        );
    }

    if (!adminToken) {
        router.push('/signin');
    }

    if (blogPostMetricsFetchError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold text-gray-900">{blogPostMetricsFetchErrorDetails.statusCode}: {blogPostMetricsFetchErrorDetails.errorMessage}</h1>
                <p className="mt-4 text-lg text-gray-600">{blogPostMetricsFetchErrorDetails.errorDescription}</p>
                <button 
                    onClick={() => router.push('/signin')} 
                    className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Sign In
                </button>
            </div>
        );
    }

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Blog Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Number of Views
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Source - Email
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Source - Direct
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Source - Home
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Number of Likes
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Number of dislikes
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="bg-white border-b">
                        <th scope="row" class="px-6 py-4">
                            {/* <Link href={`blog/${blogPostMetrics.blogId}`}> */}
                                <a class="font-medium text-gray-900 whitespace-nowrap hover:text-blue-900 hover:underline">{blogPostMetrics.blogName}</a>
                            {/* </Link> */}
                        </th>
                        <td class="px-6 py-4">
                            {blogPostMetrics.uniqueVisit}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics.source && blogPostMetrics.source.email ? blogPostMetrics.source.email : 0}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics.source && blogPostMetrics.source.direct ? blogPostMetrics.source.direct : 0}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics.source && blogPostMetrics.source.home ? blogPostMetrics.source.home : 0}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics.likes || 0}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics.dislikes || 0}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};


Page.getLayout = function getLayout(page) {
    return (
      <Layout>
          {page}
      </Layout>
    )
  }  