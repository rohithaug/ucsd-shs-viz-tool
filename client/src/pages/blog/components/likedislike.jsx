import React, {useState} from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

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
        <AiFillLike style={{'font-size': '35px'}} color={likeClicked? 'green' : 'black'} onClick={handleLikeClick}/>
        <AiFillDislike style={{'font-size': '35px'}} color={dislikeClicked? 'red' : 'black'} onClick={handleDislikeClick}/>
    </div>
  );
};

export default LikeDislike;
