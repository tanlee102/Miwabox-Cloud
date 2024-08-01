'use client';

import { useContext, useEffect, useRef, useState } from "react";
import "./styles/HomePage/HomePage.css";
import { WindowContext } from "./context/WindowContext";
import DropdownTrans from "./components/DropDown/DropDownTrans";
import ListTags from "./components/Tags/ListTags";
import ListItemPost from "./components/Post/Components/ListItemPost";
import LoadMore from "./components/Other/LoadMore";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const pageSize = 20;
const limit = 20;

async function getData(sortingIndex, pageNumber = 0, lastId = null, tagname = null, title = null) {
  let url;

  if (tagname) {
    url = `http://localhost:8080/api/v1/posts/topByTag?limit=${limit}&tagName=${tagname}`;
  } else if (title) {
    url = `http://localhost:8080/api/v1/posts/topByTitle?limit=${limit}&keyword=${title}`;
  } else {
    switch (sortingIndex) {
      case 1: // Top Posts
        url = `http://localhost:8080/api/v1/posts/orderByTotalLikes?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        break;
      case 0: // Chronology
        url = `http://localhost:8080/api/v1/posts/orderById?limit=${limit}`;
        if (lastId) url += `&postId=${lastId}`;
        break;
      case 2: { // Followed
        const token = Cookies.get('token');
        if (token) {
          const decoded = jwtDecode(token);
          if (decoded?.id) {
            url = `http://localhost:8080/api/v1/posts/followed?size=${limit}&page=${pageNumber}&userId=${decoded.id}`;
            break;
          }
        }
        return null; // Return null if there's no valid user ID for "Followed" case
      }
      default:
        url = `http://localhost:8080/api/v1/posts`;
    }

    const token = Cookies.get('token');
    if(token){
      const decoded = jwtDecode(token);
      if(decoded?.id){
        url += `&userId=${decoded.id}`;
      }
    }
    
  }

  const res = await fetch(url);
  if (!res.ok) {
    console.log('Failed to fetch data');
    return null;
  } else {
    return res.json();
  }
}

export default function Home() {
  const searchParams = useSearchParams();
  const tagname = searchParams.get('tagname');
  const title = searchParams.get('title');

  const [data, setData] = useState([]);
  const { gridMode } = useContext(WindowContext);
  const [sortingIndex, setSortingIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [lastId, setLastId] = useState(null);
  const [loadState, setLoadState] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loading = useRef(false);


  const loadData = async (index, page = 0, lastId = null, tagname = null, title = null) => {
    if (loading.current) return;
    loading.current = true;
    const newData = await getData(index, page, lastId, tagname, title);
    if (newData && newData.length > 0) {
      setData(prevData => (page === 0 && !lastId ? newData : [...prevData, ...newData]));
      setLastId(newData[newData.length - 1]?.id); // Assuming each post has a unique id
      if (newData.length < limit) {
        setHasMore(false);
      }
    } else {
      if(tagname != null || title != null) setData([])
      setHasMore(false);
    }
    setLoadState(false);
    loading.current = false;
  };


  useEffect(() => {
    setPageNumber(0);
    setLastId(null);
    setHasMore(true);
    loadData(sortingIndex, 0, null, tagname, title);
  }, [sortingIndex, tagname, title]);


  const handleLoadMore = () => {
    setLoadState(true);
    setPageNumber(prevPage => {
      const nextPage = prevPage + 1;
      loadData(sortingIndex, nextPage, lastId, tagname, title);
      return nextPage;
    });
  };

  return (
    <div className={`fr-home-page fr-content ${!gridMode ? `timeline-mode` : ``}`}>
      {
      !tagname && !title ? <ListTags />
      :
      <div className="label-list-item-post">
          <svg viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.858 20H10.221C6.3456 20 4.40789 20 3.20394 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.20394 5.17157C4.40789 4 6.34561 4 10.221 4H12.858C15.0854 4 16.1992 4 17.1289 4.50143C18.0586 5.00286 18.6488 5.92191 19.8294 7.76001L20.5102 8.82001C21.5034 10.3664 22 11.1396 22 12C22 12.8604 21.5034 13.6336 20.5102 15.18L19.8294 16.24C18.6488 18.0781 18.0586 18.9971 17.1289 19.4986C16.1992 20 15.0854 20 12.858 20ZM7 7.05423C7.41421 7.05423 7.75 7.37026 7.75 7.76011V16.2353C7.75 16.6251 7.41421 16.9412 7 16.9412C6.58579 16.9412 6.25 16.6251 6.25 16.2353V7.76011C6.25 7.37026 6.58579 7.05423 7 7.05423Z" /></svg>
          {(tagname) && <div>tag: {tagname}</div>}
          {(title) && <div>search: {title}</div>}
      </div>
      }
      <div className="contain-list-item-posts">
        {!tagname && !title && (
          <DropdownTrans options={['Chronology', 'Top Posts', 'Followed']} indexOption={sortingIndex} setIndexOption={setSortingIndex} />
        )}
        <div className="list-item-posts">
          <ListItemPost data={data} />
        </div>
        {hasMore && <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={handleLoadMore} />}
      </div>
    </div>
  );
}
