import React, { useEffect, useRef, useState } from 'react';
import LoadMore from '../Other/LoadMore';
import ListItemPost from '../Post/Components/ListItemPost';

const limit = 12;

async function getData(type, cursor, userId) {
    let url = `http://8.219.96.109/api/v1`;

    if (type === 1) {
        url += `/posts/users/${userId}?limit=${limit}`;
        if (cursor) url += `&postId=${cursor}`;
    } else if (type === 2) {
        url += `/likes/users/${userId}?limit=${limit}`;
        if (cursor) url += `&createdAt=${cursor}`;
    } else if (type === 3) {
        url += `/bookmarks/users/${userId}?limit=${limit}`;
        if (cursor) url += `&id=${cursor}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const ContentByUser = ({ type, userId }) => {
    const [data, setData] = useState([]);
    const cursor = useRef();
    const [loading, setLoading] = useState(false);
    const [displayLoadMore, setDisplayLoadMore] = useState(true);

    const isLoading = useRef(false);

    const loadData = async (newCursor = null) => {
        if(isLoading.current) return;
        isLoading.current = true;
        setLoading(true);
        try {
            const newData = await getData(Number(type), newCursor, userId);
            setData((prevData) => [...prevData, ...newData]);
            console.log(newData)
            if (newData.length < limit) setDisplayLoadMore(false);
            if (newData.length > 0) {
                if (type === 1) {
                    cursor.current = newData[newData.length - 1].id;
                } else if (type === 2) {
                    cursor.current = newData[newData.length - 1].createdAt;
                } else if (type === 3) {
                    cursor.current = newData[newData.length - 1].bookmarkId;
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            isLoading.current = false;
        }
    };

    useEffect(() => {
        if (userId && Number(type) <= 3) {
            setData([]);
            cursor.current = null;  // Reset cursor when type or userId changes
            setDisplayLoadMore(true);
            loadData();
        }
    }, [type, userId]);

    const handleLoadMore = () => {
        loadData(cursor.current);
    };

    return (
        <>
            <div className="fr-content-by-user list-item-posts">
                <ListItemPost data={data}></ListItemPost>
            </div>

            {displayLoadMore && (
                <>
                    {loading ? 'Loading...' : <LoadMore loadState={loading} setLoadState={setLoading} btnAct={handleLoadMore} />}
                </>
            )}
        </>
    );
};

export default ContentByUser;
