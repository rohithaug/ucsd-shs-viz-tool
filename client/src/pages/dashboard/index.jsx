// IMPORT LIBRARIES
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

// IMPORT COMPONENTS
import Layout from './components/layout';
import BarChart from './components/charts/barChart';
import BlogPostMetrics from './components/blogPostMetrics'; 

export default function Page() {
    const router = useRouter();

    const adminToken = Cookie.get('token') || null;

    const [dashboardMetrics, setDashboardMetrics] = useState(null);
    const [dashboardMetricsFetchLoading, setDashboardMetricsFetchLoading] = useState(true);
    const [dashboardMetricsFetchError, setDashboardMetricsFetchError] = useState(false);
    const [dashboardMetricsFetchErrorDetails, setDashboardMetricsFetchErrorDetails] = useState(null);

    // Function to fetch dashboard data from API
    const fetchDashboardMetricsData = async () => {
        try {
            setDashboardMetricsFetchLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/analytics/metrics/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                }
            });
            if (!response.ok) {
                const errorDetails = await response.json();
                setDashboardMetricsFetchErrorDetails({
                    statusCode: response.status,
                    errorMessage: errorDetails?.message || errorDetails || "",
                    errorDescription: errorDetails?.description || "",
                });
                setDashboardMetricsFetchError(true);
                setDashboardMetricsFetchLoading(false);
            } else {
                const dashboardMetrics = await response.json();

                setDashboardMetrics(dashboardMetrics);
                setDashboardMetricsFetchLoading(false);
            }
        } catch (error) {
            setDashboardMetricsFetchErrorDetails({
                statusCode: 400,
                errorMessage: "Unexpected Client Error",
                errorDescription: "",
            });
            setDashboardMetricsFetchError(true);
            setDashboardMetricsFetchLoading(false);
        }
    };

    useEffect(() => {
      fetchDashboardMetricsData();
    }, []);

    if (dashboardMetricsFetchLoading) {
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

    if (!adminToken) {
        router.push('/signin');
    }
  
    if (dashboardMetricsFetchError) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-4xl font-bold text-gray-900">{dashboardMetricsFetchErrorDetails.statusCode}: {dashboardMetricsFetchErrorDetails.errorMessage}</h1>
              <p className="mt-4 text-lg text-gray-600">{dashboardMetricsFetchErrorDetails.errorDescription}</p>
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
            {dashboardMetrics && dashboardMetrics.uniqueVisit?.blog ?
                <div>
                    <h1 className="text-3xl mb-4 font-normal tracking-tight text-gray-900">Blog Post Metrics</h1>
                    <BlogPostMetrics adminToken={adminToken}/>

                    <h1 className="text-3xl mb-4 font-normal tracking-tight text-gray-900">Blog Post Metrics Visualization</h1>
                    <BarChart 
                        title="Unique visits to each blog page"
                        labels={dashboardMetrics?.uniqueVisit?.blog?.map(post => post?.blogId)}
                        datasets={[
                            { 
                                label: "Unique Visits", data: dashboardMetrics?.uniqueVisit?.blog?.map(post => post?.count),
                                backgroundColor: 'rgba(54, 162, 235, 0.3)',
                                borderColor: 'rgb(54, 162, 235)'
                            }
                        ]}
                    />
                    <br />
                    <BarChart
                        title="Likes and Dislikes for each blog page"
                        labels={dashboardMetrics?.likes?.map(post => post?.blogId)}
                        datasets={[
                            { 
                                label: "Likes", data: dashboardMetrics?.likes?.map(post => post?.count),
                                backgroundColor: 'rgba(75, 192, 192, 0.3)',
                                borderColor: 'rgb(75, 192, 192)'                                
                            },
                            { 
                                label: "Dislikes", data: dashboardMetrics?.dislikes?.map(post => post?.count),
                                backgroundColor: 'rgba(255, 99, 132, 0.3)',
                                borderColor: 'rgb(255, 99, 132)'                                
                            }
                        ]}
                    />
                    <br />
                    <BarChart
                        title="Source of visit for each blog page"
                        labels={dashboardMetrics?.source?.blog?.map(post => post?.blogId)}
                        datasets={[
                            { 
                                label: "Home", data: dashboardMetrics?.source?.blog?.map(post => post?.count?.home),
                                backgroundColor: 'rgba(255, 206, 86, 0.3)',
                                borderColor: 'rgb(255, 206, 86)'                                
                            },
                            { 
                                label: "Direct", data: dashboardMetrics?.source?.blog?.map(post => post?.count?.direct),
                                backgroundColor: 'rgba(153, 102, 255, 0.3)',
                                borderColor: 'rgb(153, 102, 255)'                                
                            },
                            { 
                                label: "Email", data: dashboardMetrics?.source?.blog?.map(post => post?.count?.email),
                                backgroundColor: 'rgba(54, 162, 235, 0.3)',
                                borderColor: 'rgb(54, 162, 235)'                                
                            }
                        ]}
                        className="mb-8"
                    />
                    <br />
                    {/* ADDED THIS AS BAR CHART ABOVE */}
                    {/* <div style={{display: 'flex'}}>
                        <div style={{display: 'block', flex: 1}}>
                            <h1 className="text-3xl mb-4 font-normal tracking-tight text-gray-900">Likes for each blog page</h1>
                            <PieChart
                                title="Likes for each blog page"
                                labels={dashboardMetrics?.likes?.map(post => post?.blogId)}
                                datasets={[{ label: "Likes", data: dashboardMetrics?.likes?.map(post => post?.count) }]}
                            />
                        </div>
                        <div style={{display: 'block', flex: 1}}>
                            <h1 className="text-3xl mb-4 font-normal tracking-tight text-gray-900">Dislikes for each blog page</h1>
                            <PieChart
                                title="Dislikes for each blog page"
                                labels={dashboardMetrics?.dislikes?.map(post => post?.blogId)}
                                datasets={[{ label: "Dislikes", data: dashboardMetrics?.dislikes?.map(post => post?.count) }]}
                            />
                        </div>
                    </div> */}

                    <h1 className="text-3xl mb-4 font-normal tracking-tight text-gray-900">Category Wise Metrics Visualization</h1>
                    <BarChart 
                        title="Unique visits to each category"
                        labels={dashboardMetrics?.uniqueVisit?.category?.map(cat => cat?.blogId)}
                        datasets={[
                            { 
                                label: "Unique Visits", data: dashboardMetrics?.uniqueVisit?.category?.map(cat => cat?.count),
                                backgroundColor: 'rgba(54, 162, 235, 0.3)',
                                borderColor: 'rgb(54, 162, 235)'
                            }
                        ]}
                        className="mb-8"
                    />
                    {/* ADDED THIS AS BAR CHART ABOVE */}
                    {/* <div style={{display: 'block', flex: 1}}>
                        <h1 className="text-3xl mb-4 font-normal tracking-tight text-gray-900">Category wise Views</h1>
                        <PieChart
                            title="Views for each category"
                            labels={dashboardMetrics?.uniqueVisit?.category?.map(cat => cat?.blogId)}
                            datasets={[{ label: "Views", data: dashboardMetrics?.uniqueVisit?.category?.map(cat => cat?.count) }]}
                        />
                    </div> */}
                </div>
                :
                <></>
            }
        </div>
    )
}
 
Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}