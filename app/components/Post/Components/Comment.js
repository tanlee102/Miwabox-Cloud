import { WindowContext } from '@/app/context/WindowContext';
import React, { useContext, useEffect, useRef, useState } from 'react'
import LoadMore from '../../Other/LoadMore';
import axios from 'axios';
import Link from 'next/link';
import { converTime } from '@/app/helper/converTime';
import Cookies from 'js-cookie';

const Comment = ({ setComments, comments }) => {

    const [replies, setReplies] = useState({});
    const {logged} = useContext(WindowContext);
    // const [newComment, setNewComment] = useState("");
    const [newReplies, setNewReplies] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [loadMoreComment, setLoadMoreComment] = useState(false);
    const [displayLoadMoreComment, setDisplayLoadMoreComment] = useState(true)

    const {userData} = useContext(WindowContext)

  
    useEffect(() => {
      // Fetch initial comments
      axios.get('http://localhost:8080/api/v1/comments/post/5/before/10000000?limit=10')
        .then(response => setComments(response.data))
        .catch(error => console.error(error));
    }, []);

    const handleLoadMoreComments = () =>{
        setLoadMoreComment(true);
        axios.get(`http://localhost:8080/api/v1/comments/post/5/before/${comments[comments.length - 1].id}?limit=10`)
         .then(response => {
            if(response.data.length < 10){
                setDisplayLoadMoreComment(false);
            }
            setComments([...comments,...response.data])
        })
         .catch(error => console.error(error))
         .finally(() => {
            setLoadMoreComment(false);
         })
    }
  
    const handleShowReplies = (commentId) => {
      if (!replies[commentId]) {
        // Fetch replies for the first time
        axios.get(`http://localhost:8080/api/v1/comments/${commentId}/replies/after/0?limit=10`)
          .then(response => setReplies(prev => ({ ...prev, [commentId]: response.data })))
          .catch(error => console.error(error));
      }
    };
  
    const handleLoadMoreReplies = (commentId, lastReplyId) => {
      axios.get(`http://localhost:8080/api/v1/comments/${commentId}/replies/after/${lastReplyId}?limit=10`)
        .then(response => setReplies(prev => ({
          ...prev,
          [commentId]: [...prev[commentId], ...response.data]
        })))
        .catch(error => console.error(error));
    };

    // const [loadSending, setLoadSending] = useState(false);
    // const contentEditableDiv = useRef();

    // const handleAddComment = async () => {
    //     const token = Cookies.get('token');
    //     if (token) {
    //         setLoadSending(true);
    //         try {
    //             const response = await axios.post(
    //                 'http://localhost:8080/api/v1/comments/post/5',
    //                 { content: newComment },
    //                 { headers: { Authorization: `Bearer ${token}` } }
    //             );
    //             setComments(prev => [response.data,...prev]);
    //             setNewComment("");
    //             contentEditableDiv.current.textContent = '';
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             setLoadSending(false);
    //         }
    //     }
    // };

    const handleAddReply = async (postId, parentId) => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const response = await axios.post(
                    `http://localhost:8080/api/v1/comments/reply/post/${postId}/parent/${parentId}`,
                    { content: newReplies[parentId] },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setReplies(prev => ({
                    ...prev,
                    [parentId]: [...(prev[parentId] ? prev[parentId] : []), response.data]
                }));
                setNewReplies(prev => ({ ...prev, [parentId]: "" }));
                setShowReplyInput(prev => ({ ...prev, [parentId]: false }));
            } catch (error) {
                console.error(error);
            } finally {
            }
        }
    };

    const deleteComment = async (commentId, isReply = false, parentId = null) => {
        const token = Cookies.get('token'); // Assuming 'jwtToken' is the cookie key storing your JWT token
        if (!token) {
            // Handle case where token is not found
            console.error('JWT token not found in cookies.');
            return;
        }

        const apiUrl = `http://localhost:8080/api/v1/comments/delete/${commentId}`;
        try {
            const response = await axios.delete(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Comment deleted successfully:', response.data);

            if (isReply) {
                setReplies(prev => ({
                    ...prev,
                    [parentId]: prev[parentId].filter(comment => comment.id !== commentId)
                }));
            } else {
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            }

        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    };



  return (
    <>
                    {/* <div className='full-post-input-comment post-input-comment'>
                    <div className="contain-input-thread">
                        <div className="input-thread">
                            <div className="contain-input-thr">
                                <div onPaste={(e) => onPaste(e)} onKeyDown={null} onInput={e => setNewComment(e.currentTarget.textContent)} contentEditable='true' className="input-thr"  placeholder="Aa" ref={contentEditableDiv}></div>
                                <div className="btn-input-thread">
                                    {loadSending ? <div className="loader-roundo"></div> : ""}
                                    {loadSending ? "" : <svg onClick={handleAddComment} fill="#000000" viewBox="0 0 24 24" id="send" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13l.45-1-.45-1L3.18,5.87A2,2,0,0,1,5.87,3.25l14.65,6.94A2,2,0,0,1,21.66,12Z"></path><path id="secondary" d="M12,12a1,1,0,0,1-1,1H5.46l.45-1-.45-1H11A1,1,0,0,1,12,12Z"></path></svg>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


    <div className='post-comments'>
    {comments.map((comment, index) => (
        <div class="item-comment">
            <Link href={"/"}>
                <span class="fr-image-item-comment">
                    <img src={(comment.userCommentDTO.profileUrl ? 'https://image.lehienthanh.workers.dev/?id='+comment.userCommentDTO.profileUrl : "/avatar.jpeg")} alt=""/>
                </span>
            </Link>
            <span class="fr-text-item-comment">
                <div class="list-in-line">
                    <ul>
                        <Link href={"/"}>
                            <li className='set-bold'> {comment.userCommentDTO.username} </li>
                        </Link>
                        <li className='set-slight'> {converTime(comment.createdAt)} </li>
                    </ul>
                </div>
                <div class="fr-ms-item-comment">
                    <span>{comment.content}</span>
                    <span>
                        <span>
                            <p>Báo cáo</p>
                        </span>
                        {comment.userCommentDTO.id === userData.id ? 
                        <span onClick={() => {deleteComment(comment.id, false, null)}} className='delete-btn-ms-item-comment'>
                            <svg viewBox="0 -1.5 19 19">
                                <path d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"/>
                            </svg>
                            <p>Xóa</p>
                        </span>
                        : ""}
                        <span onClick={() => {setShowReplyInput(prev => ({ ...prev, [comment.id]: true })); console.log(showReplyInput)}}>
                            <svg viewBox="1 1 22 22" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.71,4.72,19.28,2.29a1,1,0,0,0-1.41,0L12.29,7.87a1,1,0,0,0-.29.71V11a1,1,0,0,0,1,1h2.42a1,1,0,0,0,.71-.29l5.58-5.58A1,1,0,0,0,21.71,4.72ZM15,10H14V9l4.58-4.58,1,1Zm4,2h0a1,1,0,0,0-1,1,7,7,0,0,1-7,7H5.41l.64-.63a1,1,0,0,0,0-1.42A7,7,0,0,1,11,6a1,1,0,0,0,0-2h0A9,9,0,0,0,4,18.62L2.29,20.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h8a9,9,0,0,0,9-9A1,1,0,0,0,19,12Z"/>
                            </svg>                            
                            <p>Trả lời</p>
                        </span>
                    </span>

                    {comment.replyCount - (replies[comment.id] ? replies[comment.id] : 0) > 0 ?
                    <span onClick={() => {replies[comment.id] ? handleLoadMoreReplies(comment.id, replies[comment.id][replies[comment.id].length - 1].id) :  handleShowReplies(comment.id)}} className='btn-more-reply-comment'>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" enable-background="new 0 0 512 512">
                            <path d="M9 16h7.2l-2.6 2.6L15 20l5-5-5-5-1.4 1.4 2.6 2.6H9c-2.2 0-4-1.8-4-4s1.8-4 4-4h2V4H9c-3.3 0-6 2.7-6 6s2.7 6 6 6z"/>
                        </svg> 
                        <span>{comment.replyCount - (replies[comment.id] ? replies[comment.id] : 0)} trả lời</span>
                    </span>
                    : ""}

                    <span>
                        {replies[comment.id] && replies[comment.id].map((reply, index) => (  
                        <>
                        <div class="item-comment item-reply-comment">
                            <Link href={"/"}>
                                <span class="fr-image-item-comment">
                                    <img src={(reply.userCommentDTO.profileUrl ? 'https://image.lehienthanh.workers.dev/?id='+reply.userCommentDTO.profileUrl : "/avatar.jpeg")} alt=""/>
                                </span>
                            </Link>
                            <span class="fr-text-item-comment">
                                <div class="list-in-line">
                                    <ul>
                                        <Link href={"/"}>
                                            <li class="set-bold">{reply.userCommentDTO.username} </li>
                                        </Link>
                                        <li className="set-slight"> {converTime(reply.createdAt)} </li>
                                    </ul>
                                </div>
                                <div class="fr-ms-item-comment">
                                    <span>{reply.content}</span>
                                    <span> 
                                        <span>
                                            <p>Báo cáo</p>
                                        </span>
                                        {reply.userCommentDTO.id === userData.id ? 
                                        <span className='delete-btn-ms-item-comment' onClick={() => {deleteComment(reply.id, true, comment.id)}}>
                                            <svg viewBox="0 -1.5 19 19">
                                                <path d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"/>
                                            </svg>
                                            <p>Xóa</p>
                                        </span>
                                        : ""}  
                                        <span onClick={() => {setShowReplyInput(prev => ({ ...prev, [comment.id]: true })); console.log(showReplyInput)}}>
                                            <svg viewBox="1 1 22 22" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.71,4.72,19.28,2.29a1,1,0,0,0-1.41,0L12.29,7.87a1,1,0,0,0-.29.71V11a1,1,0,0,0,1,1h2.42a1,1,0,0,0,.71-.29l5.58-5.58A1,1,0,0,0,21.71,4.72ZM15,10H14V9l4.58-4.58,1,1Zm4,2h0a1,1,0,0,0-1,1,7,7,0,0,1-7,7H5.41l.64-.63a1,1,0,0,0,0-1.42A7,7,0,0,1,11,6a1,1,0,0,0,0-2h0A9,9,0,0,0,4,18.62L2.29,20.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h8a9,9,0,0,0,9-9A1,1,0,0,0,19,12Z"/>
                                            </svg>                            
                                            <p>Trả lời</p>
                                        </span>
                                    </span>
                                </div>
                            </span>
                        </div>
                        </>
                        ))}

                        <div class="item-input-comment item-input-reply-comment" style= {{display: logged && showReplyInput[comment.id] ? 'flex' : 'none'}}>
                            <span class="fr-image-item-comment"></span>
                            <span>
                                <textarea 
                                onKeyDown={null} id={false ? 're-comment-input' : ''} 
                                placeholder="Viết bình luận..." rows="1"
                                onInput={e => setNewReplies(prev => ({ ...prev, [comment.id]: e.target.value }))}
                                value={newReplies[comment.id]}
                                ></textarea>
                                <button onClick={() => {handleAddReply(5, comment.id)}}>Viết</button>
                            </span>
                        </div>
            
                    </span>


                </div>
            </span>
        </div>
        ))}
    {displayLoadMoreComment == false ? "" :
    <LoadMore loadState={loadMoreComment} setLoadState={setLoadMoreComment} btnAct={handleLoadMoreComments} />
    }
</div>
</>
  )
}

export default Comment
