import DislikeButtonIcon from '@/assets/icons/dislikeButton';
import LikeButtonIcon from '@/assets/icons/likeButton';
import React, {useState} from 'react';

const LikeDislike = (props) => {

    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDisikeClicked] = useState(false);

    const handleLikeClick = async (event) => {
        if (!likeClicked && !dislikeClicked) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blog/like/${props.blogId}`);
                if (response.ok) {
                    setLikeClicked(true);
                }
            } catch (error) {
                console.log('exception in like');
            }
        }
    }

    const handleDislikeClick = async (event) => {
        if (!likeClicked && !dislikeClicked) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blog/dislike/${props.blogId}`);
                if (response.ok) {
                    setDisikeClicked(true);
                }
            } catch (error) {
                console.log('exception in like');
            }
        }
    }

    return (
        <div className="flex justify-end mb-8">
            <div className="pr-4 border-r border-black flex items-center text-gray-500">
                Feedback
            </div>
            <button className="ml-4 mr-3" onClick={handleLikeClick}>
                <LikeButtonIcon color={likeClicked ? 'green' : 'black'} />
            </button>
            <button className="ml-3 mr-2" onClick={handleDislikeClick}>
                <DislikeButtonIcon color={dislikeClicked ? 'red' : 'black'} />
            </button>
        </div>
    );
};

export default LikeDislike;
