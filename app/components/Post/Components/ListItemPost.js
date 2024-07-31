import { WindowContext } from '@/app/context/WindowContext';
import React, { useContext } from 'react'

const ListItemPost = ({data}) => {

    const {setPostId, setDisplayPost} = useContext(WindowContext);

    return (
        <>
            {data.map((post) => (
                <div key={post.id} className="item-post">
                    <div className="item-post_">
                        <div className="head-item-post" onClick={() => {setDisplayPost(true); setPostId(post.id);}}>
                            <img src={post.media[0].mediaType==="video" ? 'https://image.lehienthanh1.workers.dev/?id='+post.media[0].thumb_url : 'https://image.lehienthanh1.workers.dev/?id='+post.media[0].url } alt="Post Image" />
                        </div>
                        <div className="body-item-post">
                            <div className="head-body-item-post" onClick={() => {setDisplayPost(true); setPostId(post.id);}}>
                                <p>{post.title}</p>
                            </div>
                            <div className="bottom-body-item-post">
                                <span>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                                    </svg>
                                    <p>{post.likeCount}</p>
                                </span>
                                <span onClick={() => {setDisplayPost(true); setPostId(post.id);}}>
                                    <svg viewBox="0 0 16 16" className="PostCommentsIcon" fill="none">
                                        <path fill="currentColor" stroke="#ffffff" strokeWidth="0" d="M4.455 12.195l.367 1.105 1.037-.53c.266-.135.637-.412 1.039-.74.39-.319.872-.737 1.422-1.245h2.291a3.306 3.306 0 003.306-3.306V5.306A3.306 3.306 0 0010.611 2H5.306A3.306 3.306 0 002 5.306v2.656c0 1.34.933 2.461 2.185 2.75.008.172.025.335.046.479a6.622 6.622 0 00.168.803c.016.07.035.137.056.2z"></path>
                                    </svg>
                                    <p>{post.commentCount}</p>
                                </span>
                                <span onClick={() => {setDisplayPost(true); setPostId(post.id);}}>
                                    <svg viewBox="0 0 16 16" className="PostViewsIcon" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 2.5C4.74998 2.5 2.30142 5.50267 1.27514 6.77517C0.925337 7.20917 0.908553 7.76483 1.2278 8.16583C2.22527 9.41833 4.6991 12.5 8 12.5C11.3686 12.5 13.8396 9.31133 14.796 8.0905C15.0769 7.732 15.0674 7.2535 14.7692 6.8755C13.7938 5.6395 11.3376 2.5 8 2.5ZM7.98224 9.33333C6.90897 9.33333 6.03887 8.51233 6.03887 7.5C6.03887 6.4875 6.90897 5.66667 7.98224 5.66667C9.05551 5.66667 9.92561 6.4875 9.92561 7.5C9.92561 8.51233 9.05551 9.33333 7.98224 9.33333Z" fill="currentColor"></path>
                                    </svg>
                                    <p>{post.viewCount}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ListItemPost
