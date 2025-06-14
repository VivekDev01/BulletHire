// app/feed/page.tsx
'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { ImageIcon, VideoIcon, TextIcon } from 'lucide-react';
import Layout from '@/components/Layout';

const FeedPage = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState<any[]>([]);

  const handlePost = () => {
    if (postText.trim() === '') return;
    const newPost = {
      id: Date.now(),
      user: {
        name: 'John Doe',
        avatar: '/avatar.png',
      },
      content: postText,
      media: null,
    };
    setPosts([newPost, ...posts]);
    setPostText('');
  };

  return (
  <Layout>
    <div className={styles.container}>

        <div className={styles.feedContainer}>
            <div className={styles.postBox}>
                <textarea
                className={styles.textArea}
                placeholder="What's on your mind?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                />
                <div className={styles.actions}>
                <button className={styles.iconBtn}><ImageIcon size={20} /> Image</button>
                <button className={styles.iconBtn}><VideoIcon size={20} /> Video</button>
                <button className={styles.iconBtn}><TextIcon size={20} /> Text</button>
                <button className={styles.postBtn} onClick={handlePost}>Post</button>
                </div>
            </div>

        {/* <div className={styles.posts}>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                <div className={styles.userInfo}>
                <img src={post.user.avatar} className={styles.avatar} alt="avatar" />
                <span className={styles.userName}>{post.user.name}</span>
                </div>
                <p className={styles.content}>{post.content}</p>
                {post.media && <img src={post.media} className={styles.media} alt="post media" />}
                </div>
                ))}
                </div> */}
        </div>
    </div>
  </Layout>
  );
};

export default FeedPage;
