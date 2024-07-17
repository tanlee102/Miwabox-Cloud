'use client';

import { useContext, useEffect, useState } from "react";
import "./styles/HomePage/HomePage.css";
import { WindowContext } from "./context/WindowContext";

async function getData() {
  const res = await fetch('http://localhost:8080/api/v1/posts');
  if (!res.ok) {
      console.log('Failed to fetch data');
      return null;
  }else{
      return res.json();
  }
}

export default function Home() {

  const [data, setData] = useState([]);
  const {setPostId} = useContext(WindowContext);

  const loadData = async () => {
    setData(await getData());
  }
  
  useEffect(() => {
    loadData();
  }, []);


  const tags = [
    { name: "Health & Wellness", posts: "120K" },
    { name: "Personal Finance", posts: "95K" },
    { name: "Career Development", posts: "80K" },
    { name: "Relationships", posts: "60K" },
    { name: "Food & Nutrition", posts: "35K" },
    { name: "Fitness", posts: "30K" },
    { name: "Mental Health", posts: "25K" },
    { name: "Education", posts: "20K" },
    { name: "Technology", posts: "15K" },
    { name: "Arts & Culture", posts: "10K" },
    { name: "Sustainability", posts: "8K" },
    { name: "Fashion & Style", posts: "7K" },
  ];

  const {gridMode, setDisplayPost} = useContext(WindowContext);

  return (
        <div className={`fr-home-page fr-content ${!gridMode ? `timeline-mode` : ``}`}>

            <div className="list-item-tags">
                {tags.map((tag, index) => (
                  <div className="item-tag" key={index}>
                    <div>{tag.name}</div>
                    <div>{tag.posts} Posts</div>
                  </div>
                ))}
            </div>

            <div className="list-item-posts">
              {data.map((post) => (
                <div key={post.id} className="item-post" onClick={() => {setDisplayPost(true); setPostId(post.id)}}>
                  <div className="item-post_">
                    <div className="head-item-post">
                      <img src={post.media[0].mediaType==="video" ? 'https://image.lehienthanh1.workers.dev/?id='+post.media[0].thumb_url : 'https://image.lehienthanh1.workers.dev/?id='+post.media[0].url } alt="Post Image" />
                    </div>
                    <div className="body-item-post">
                      <div className="head-body-item-post">
                        <p>
                        {post.title}
                        </p>
                      </div>
                      <div className="bottom-body-item-post">
                        <span>
                          <svg viewBox="0 0 24 24">
                            <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                          </svg>
                          <p>{post.likeCount}</p>
                        </span>
                        <span>
                          <svg viewBox="0 0 16 16" className="PostCommentsIcon" fill="none">
                            <path fill="currentColor" stroke="#ffffff" strokeWidth="0" d="M4.455 12.195l.367 1.105 1.037-.53c.266-.135.637-.412 1.039-.74.39-.319.872-.737 1.422-1.245h2.291a3.306 3.306 0 003.306-3.306V5.306A3.306 3.306 0 0010.611 2H5.306A3.306 3.306 0 002 5.306v2.656c0 1.34.933 2.461 2.185 2.75.008.172.025.335.046.479a6.622 6.622 0 00.168.803c.016.07.035.137.056.2z"></path>
                          </svg>
                          <p>{post.commentCount}</p>
                        </span>
                        <span>
                          <svg viewBox="0 0 16 16" className="PostViewsIcon" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2.5C4.74998 2.5 2.30142 5.50267 1.27514 6.77517C0.925337 7.20917 0.908553 7.76483 1.2278 8.16583C2.22527 9.41833 4.6991 12.5 8 12.5C11.3686 12.5 13.8396 9.31133 14.796 8.0905C15.0769 7.732 15.0674 7.2535 14.7692 6.8755C13.7938 5.6395 11.3376 2.5 8 2.5ZM7.98224 9.33333C6.90897 9.33333 6.03887 8.51233 6.03887 7.5C6.03887 6.4875 6.90897 5.66667 7.98224 5.66667C9.05551 5.66667 9.92561 6.4875 9.92561 7.5C9.92561 8.51233 9.05551 9.33333 7.98224 9.33333Z" fill="currentColor"></path>
                          </svg>
                          <p>{12}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

        </div>
  );
}