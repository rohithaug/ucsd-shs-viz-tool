// IMPORT LIBRARIES
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'

// IMPORT COMPONENTS
import Layout from '../components/layout';
import Breadcrumb from '../components/breadcrumb';

// IMPORT ICONS
import blogSample from '../../../assets/images/blogSample.png';

const Page = () => {
    const router = useRouter();

    {/* TODO: Get post details from API, store in state and use */}
    const postDetails = {
        title: "Post Title",
        author: "Author",
        category: "Catgeory",
        time: "A min ago",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sit amet ipsum ac velit egestas ultrices. Vestibulum et neque id ex semper varius a sit amet metus. Vivamus congue dolor eget aliquam hendrerit. Etiam iaculis finibus egestas. Nam viverra urna quis odio efficitur malesuada. Maecenas rhoncus enim eu scelerisque rutrum. Pellentesque et mollis enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed commodo leo. Suspendisse potenti. Maecenas gravida ipsum placerat ligula posuere, ut rhoncus velit eleifend.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sit amet ipsum ac velit egestas ultrices. Vestibulum et neque id ex semper varius a sit amet metus. Vivamus congue dolor eget aliquam hendrerit. Etiam iaculis finibus egestas. Nam viverra urna quis odio efficitur malesuada. Maecenas rhoncus enim eu scelerisque rutrum. Pellentesque et mollis enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed commodo leo. Suspendisse potenti. Maecenas gravida ipsum placerat ligula posuere, ut rhoncus velit eleifend.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sit amet ipsum ac velit egestas ultrices. Vestibulum et neque id ex semper varius a sit amet metus. Vivamus congue dolor eget aliquam hendrerit. Etiam iaculis finibus egestas. Nam viverra urna quis odio efficitur malesuada. Maecenas rhoncus enim eu scelerisque rutrum. Pellentesque et mollis enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed commodo leo. Suspendisse potenti. Maecenas gravida ipsum placerat ligula posuere, ut rhoncus velit eleifend."
    }

    return (
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
                <span className="text-opacity-50">{postDetails.time}</span> 
            </h4>

            <Image src={blogSample} alt="Blog Image" className="mb-4 h-auto max-w-full" />

            {/* TODO: Remove this line */}
            <p>Post: {router.query.slug}</p>
            <p className="mb-8 text-justify text-gray-500 whitespace-pre-line">
                {postDetails.content}
            </p>
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
