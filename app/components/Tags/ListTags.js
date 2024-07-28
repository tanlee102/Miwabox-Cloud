import { WindowContext } from '@/app/context/WindowContext';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';

async function getData() {
    const res = await fetch('http://localhost:8080/api/v1/tags/top');
    if (!res.ok) {
        return null;
    } else {
        return res.json();
    }
}

const ListTags = () => {

    const router = useRouter();
    const [tags, setTags] = useState([]);

    const loadData = async () => {
        const data = await getData();
        if (data) {
            setTags(data);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="list-item-tags">
            {tags.map((tag, index) => (
                <div onClick={() => {router.push("/?tagname="+tag.name);}} className="item-tag" key={index}>
                    <div>{tag.name}</div>
                    <div>{tag.postCount} Posts</div>
                </div>
            ))}
        </div>
    );
}

export default ListTags;
