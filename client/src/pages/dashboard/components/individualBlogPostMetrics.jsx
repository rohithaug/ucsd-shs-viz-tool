// IMPORT LIBRARIES
import React from 'react';

const IndivdualBlogPostMetrics = ({ blogPostMetrics }) => {
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
                            <p class="font-medium text-gray-900 whitespace-nowrap">{blogPostMetrics?.blogName || ""}</p>
                        </th>
                        <td class="px-6 py-4">
                            {blogPostMetrics?.uniqueVisit || 0}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics?.source && blogPostMetrics?.source.email ? blogPostMetrics?.source.email : 0}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics?.source && blogPostMetrics?.source.direct ? blogPostMetrics?.source.direct : 0}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics?.source && blogPostMetrics?.source.home ? blogPostMetrics?.source.home : 0}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics?.likes || 0}
                        </td>
                        <td class="px-6 py-4">
                            {blogPostMetrics?.dislikes || 0}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default IndivdualBlogPostMetrics;
