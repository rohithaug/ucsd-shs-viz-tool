// IMPORT LIBRARIES
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

// IMPORT COMPONENTS
import Layout from './components/layout';
import Card from './components/card';

export default function Page() {

    const router = useRouter();

    const [blogData, setBlogData] = useState(null);
    const [blogDataFetchLoading, setBlogDataFetchLoading] = useState(true);
    const [blogDataFetchError, setBlogDataFetchError] = useState(false);

    // Function to fetch blog data from API
    const fetchBlogDataDetails = async () => {
        try {
          setBlogDataFetchLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blog/bulk/`);
            if (!response.ok) {
                blogDataFetchError(true);
                setBlogDataFetchLoading(false);
            } else {
                const blogData = await response.json();

                // Add time from now to each post
                const blogDataWithTime = blogData.map(post => ({
                  ...post,
                  time: moment(post.updatedAt).fromNow(),
                }));

                setBlogData(blogDataWithTime);
                setBlogDataFetchLoading(false);
            }
        } catch (error) {
            setBlogDataFetchError(true);
            setBlogDataFetchLoading(false);
        }
    };

    useEffect(() => {
      fetchBlogDataDetails();
    }, []);

    if (blogDataFetchLoading) {
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

  if (blogDataFetchError) {
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

    const renderCategories = (blogData) => {
        const blogDataCategorized = {};
        blogData.forEach(element => {
            if (element.category) {
                if (element.category in blogDataCategorized) {
                    blogDataCategorized[element.category].push(element);
                } else {
                    blogDataCategorized[element.category] = [element];
                }
            }            
        });

        const blogDataCategorizedArray = [];
        Object.entries(blogDataCategorized).forEach(([key, value]) => {
            blogDataCategorizedArray.push({
                category: key,
                cardsData: value
            })
        });

        return blogDataCategorizedArray;
    }

    const renderCardRows = (cardsData) => {
        const rows = [];
        for (let i = 0; i < cardsData.length; i += 2) {
            const rowCards = cardsData.slice(i, i + 2);
            const row = (
                <div key={`row-${i}`} className="grid lg:grid-cols-2 gap-4">
                    {rowCards.map((card, index) => (
                        <div key={`card-${i}-${index}`} className="flex-1 max-w-fit">
                            <Card {...card} />
                        </div>
                    ))}
                </div>
            );
            rows.push(row);
        }
        return rows;
    };

  return (
    <div className="mb-8">
        {
            renderCategories(blogData).map(({ category, cardsData }, index) => {
                return (
                  <div key={`category-index-${index}`}>
                    <h1 className="text-3xl mb-4 font-normal tracking-tight text-gray-900">{category}</h1>
                    <div className="w-full">
                      {renderCardRows(cardsData)}
                    </div>
                  </div>
                )
            })
        }
    </div>
  );
}
 
Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}