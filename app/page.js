'use client';

import { useContext, useState } from "react";
import "./styles/HomePage/HomePage.css"
import { WindowContext } from "./context/WindowContext";

export default function Home() {

  const sampleData = [
    {
      id: 1,
      imgSrc: "https://i.imgur.com/jlViTKT.jpeg",
      description: "Hello This is my friend Hello This is my friend Hello This is my friend Hello This is my friend",
      likes: 34,
      comments: 5,
      views: 303
    },
    {
      id: 2,
      imgSrc: "https://i.imgur.com/gYXbYin.jpeg",
      description: "Another post description goes here",
      likes: 42,
      comments: 10,
      views: 150
    },
    {
      id: 3,
      imgSrc: "https://i.imgur.com/TEj3lKt.jpeg",
      description: "Here's a different post with some new content",
      likes: 27,
      comments: 3,
      views: 210
    },
    {
      id: 4,
      imgSrc: "https://i.imgur.com/gYXbYin.jpeg",
      description: "This is yet another example of a post description",
      likes: 56,
      comments: 8,
      views: 400
    },
    {
      id: 5,
      imgSrc: "https://i.imgur.com/TEj3lKt.jpeg",
      description: "A short description for a new post",
      likes: 18,
      comments: 2,
      views: 120
    },
    {
      id: 6,
      imgSrc: "https://i.imgur.com/XFLnDf5.jpeg",
      description: "This is a post about my latest trip to the mountains.",
      likes: 75,
      comments: 12,
      views: 350
    },
    {
      id: 7,
      imgSrc: "https://i.imgur.com/gYXbYin.jpeg",
      description: "A delicious meal I had at a local restaurant.",
      likes: 60,
      comments: 8,
      views: 290
    },
    {
      id: 8,
      imgSrc: "https://i.imgur.com/zgVenuw.jpeg",
      description: "Sunset at the beach. A beautiful end to the day.",
      likes: 80,
      comments: 15,
      views: 500
    },
    {
      id: 9,
      imgSrc: "https://i.imgur.com/8KFn0LF.jpeg",
      description: "Exploring the city and finding hidden gems.",
      likes: 45,
      comments: 5,
      views: 200
    },
    {
      id: 10,
      imgSrc: "https://i.imgur.com/zgVenuw.jpeg",
      description: "An interesting article about technology trends.",
      likes: 30,
      comments: 4,
      views: 180
    }
  ];


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
              {sampleData.map((post) => (
                <div key={post.id} className="item-post" onClick={() => {setDisplayPost(true)}}>
                  <div className="item-post_">
                    <div className="head-item-post">
                      <img src={post.imgSrc} alt="Post Image" />
                    </div>
                    <div className="body-item-post">
                      <div className="head-body-item-post">
                        <p>
                        {post.description}
                        </p>
                      </div>
                      <div className="bottom-body-item-post">
                        <span>
                          <svg viewBox="0 0 24 24">
                            <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                          </svg>
                          <p>{post.likes}</p>
                        </span>
                        <span>
                          <svg viewBox="0 0 16 16" className="PostCommentsIcon" fill="none">
                            <path fill="currentColor" stroke="#ffffff" strokeWidth="0" d="M4.455 12.195l.367 1.105 1.037-.53c.266-.135.637-.412 1.039-.74.39-.319.872-.737 1.422-1.245h2.291a3.306 3.306 0 003.306-3.306V5.306A3.306 3.306 0 0010.611 2H5.306A3.306 3.306 0 002 5.306v2.656c0 1.34.933 2.461 2.185 2.75.008.172.025.335.046.479a6.622 6.622 0 00.168.803c.016.07.035.137.056.2z"></path>
                          </svg>
                          <p>{post.comments}</p>
                        </span>
                        <span>
                          <svg viewBox="0 0 16 16" className="PostViewsIcon" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2.5C4.74998 2.5 2.30142 5.50267 1.27514 6.77517C0.925337 7.20917 0.908553 7.76483 1.2278 8.16583C2.22527 9.41833 4.6991 12.5 8 12.5C11.3686 12.5 13.8396 9.31133 14.796 8.0905C15.0769 7.732 15.0674 7.2535 14.7692 6.8755C13.7938 5.6395 11.3376 2.5 8 2.5ZM7.98224 9.33333C6.90897 9.33333 6.03887 8.51233 6.03887 7.5C6.03887 6.4875 6.90897 5.66667 7.98224 5.66667C9.05551 5.66667 9.92561 6.4875 9.92561 7.5C9.92561 8.51233 9.05551 9.33333 7.98224 9.33333Z" fill="currentColor"></path>
                          </svg>
                          <p>{post.views}</p>
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