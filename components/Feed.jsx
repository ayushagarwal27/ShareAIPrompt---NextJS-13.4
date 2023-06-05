'use client';

import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const handleSearch = () => {};

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center '>
        <input
          type='text'
          placeholder='search for a tag or a username'
          value={searchText}
          onChange={handleSearch}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
