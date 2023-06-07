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
  const [filteredPost, setFilteredPost] = useState([]);

  const handleSearch = e => {
    setSearchText(e.target.value);
    if (e.target.value === '') {
      setFilteredPost(posts);
      return;
    }
    const filteredNextPosts = posts.filter(
      post =>
        post.tag.includes(searchText) ||
        post?.creator?.username.includes(searchText),
    );
    setFilteredPost(filteredNextPosts);
  };

  const handleSearchByTag = tag => {
    const filteredNextPosts = posts.filter(post => post.tag.includes(tag));
    setFilteredPost(filteredNextPosts);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
      setFilteredPost(data);
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
      <PromptCardList data={filteredPost} handleTagClick={handleSearchByTag} />
    </section>
  );
};

export default Feed;
