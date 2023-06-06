'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/users/${session?.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.id) {
      fetchPost();
    }
  }, [session?.id]);

  const handleEdit = () => {};
  const handleDelete = async () => {};

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
