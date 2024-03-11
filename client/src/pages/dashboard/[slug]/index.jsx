// IMPORT LIBRARIES
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

// IMPORT COMPONENTS
import Layout from '../components/layout';
import IndivdualBlogPostMetrics from '../components/individualBlogPostMetrics';
import PieChart from '../components/charts/pieChart';
export default function Page() {
    const router = useRouter();
    const adminToken = Cookie.get('token') || null;
    const [blogPostMetrics, setBlogPostMetrics] = useState(null);
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
        <div>
            {blogPostMetrics ?
                <div>
                    <IndivdualBlogPostMetrics 
                        blogPostMetrics={blogPostMetrics}
                    />

                    <h1 className="text-3xl mb-4 font-normal tracking-tight text-gray-900">Blog Post Metrics Visualization</h1>
                    <div className="mb-8 flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 p-4">
                            <PieChart
                                title="Likes and Dislikes"
                                labels={["Likes", "Dislikes"]}
                                datasets={[
                                    { 
                                        label: "# of votes", 
                                        data: [blogPostMetrics.likes || 0, blogPostMetrics.dislikes || 0],
                                        backgroundColor: ['rgba(75, 192, 192, 0.3)', 'rgba(255, 99, 132, 0.3)'],
                                        borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
                                        borderWidth: 1
                                    }
                                ]}
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-4">
                            <PieChart
                                title="Source of visit"
                                labels={["Home", "Direct", "Email"]}
                                datasets={[
                                    { 
                                        label: "# of visits", 
                                        data: [
                                            blogPostMetrics.source && blogPostMetrics.source.home ? blogPostMetrics.source.home : 0,
                                            blogPostMetrics.source && blogPostMetrics.source.direct ? blogPostMetrics.source.direct : 0,
                                            blogPostMetrics.source && blogPostMetrics.source.email ? blogPostMetrics.source.email : 0
                                        ],
                                        backgroundColor: [
                                            'rgba(255, 206, 86, 0.3)',
                                            'rgba(153, 102, 255, 0.3)',
                                            'rgba(54, 162, 235, 0.3)'
                                        ],
                                        borderColor: [
                                            'rgb(255, 206, 86)', 
                                            'rgb(153, 102, 255)',
                                            'rgb(54, 162, 235)'
                                        ],
                                        borderWidth: 1
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
                :
                <></>
            }
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