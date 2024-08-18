import React, { useContext, useRef, useState } from 'react';
import { WindowContext } from '@/app/context/WindowContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const PostInputComment = ({ setComments, comments, isUsingFull=true, postId }) => {
    const [newComment, setNewComment] = useState("");
    const [loadSending, setLoadSending] = useState(false);
    const contentEditableDiv = useRef();

    const handleAddComment = async () => {
        const token = Cookies.get('token');
        if (token) {
            setLoadSending(true);
            try {
                const response = await axios.post(
                    'https://hoifancuongonepiece.site/api/v1/comments/post/'+postId,
                    { content: newComment },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setComments([response.data, ...comments]);
                setNewComment("");
                contentEditableDiv.current.textContent = '';
            } catch (error) {
                console.error(error);
            } finally {
                setLoadSending(false);
            }
        }
    };

    return (
        <div className={`${isUsingFull ? 'full-post-input-comment' : ""} post-input-comment`}>
            <div className="contain-input-thread">
                <div className="input-thread">
                    <div className="contain-input-thr">
                        <div
                            onPaste={(e) => onPaste(e)}
                            onKeyDown={null}
                            onInput={e => setNewComment(e.currentTarget.textContent)}
                            contentEditable='true'
                            className="input-thr"
                            placeholder="Aa"
                            ref={contentEditableDiv}
                        ></div>
                        <div className="btn-input-thread">
                            {loadSending ? <div className="loader-roundo"></div> : ""}
                            {loadSending ? "" : (
                                <svg onClick={handleAddComment} fill="#000000" viewBox="0 0 24 24" id="send" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg">
                                    <path id="primary" d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13l.45-1-.45-1L3.18,5.87A2,2,0,0,1,5.87,3.25l14.65,6.94A2,2,0,0,1,21.66,12Z"></path>
                                    <path id="secondary" d="M12,12a1,1,0,0,1-1,1H5.46l.45-1-.45-1H11A1,1,0,0,1,12,12Z"></path>
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostInputComment;
