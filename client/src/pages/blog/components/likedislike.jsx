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
    <div style={{'display': 'flex', 'justify-content': 'flex-end'}}>
        <div style={{paddingRight: '20px', borderRight: '1px black solid', display: 'flex', alignItems: 'center'}} className='text-gray-500'>
            Feedback
        </div>
        <button style={{marginLeft: '20px', marginRight: '15px'}} onClick={handleLikeClick}>
            <LikeButtonIcon color={likeClicked? 'green' : 'black'} />
        </button>
        <button style={{marginLeft: '15px', marginRight: '10px'}} onClick={handleDislikeClick}>
            <DislikeButtonIcon color={dislikeClicked? 'red' : 'black'} />
        </button>
        
    </div>
  );
};

export default LikeDislike;
