'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { ThumbsUp, MessageCircle, Share2, ImageIcon, VideoIcon, TextIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import { url } from "@/config";
import axios from 'axios';

type Post = {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  content: string;
  interactions: {
    likes: string[];
    comments: { user: string; text: string }[];
    shares: string[];
  };
};

const FeedPage = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  const getPosts = async () => {
    try {
      const response = await axios.get(`${url}/get_posts`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setPosts(response.data.posts);
    } catch (error) {
      // handle error
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      await axios.post(`${url}/like_post`, { post_id: postId }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      getPosts();
    } catch (error) {}
  };

  const handleShare = async (postId: string) => {
    try {
      await axios.post(`${url}/share_post`, { post_id: postId }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      getPosts();
    } catch (error) {}
  };

  const handleComment = async (postId: string) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;
    try {
      await axios.post(`${url}/comment_post`, { post_id: postId, text }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setCommentText((prev) => ({ ...prev, [postId]: '' }));
      getPosts();
    } catch (error) {}
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
                <button className={styles.postBtn}>Post</button>
                </div>
          </div>
          {posts.map((post) => (
            <div key={post._id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.avatar}>
                  {post.user.username ? post.user.username[0].toUpperCase() : "U"}
                </div>
                <div>
                  <div className={styles.username}>{post.user.username}</div>
                  <div className={styles.email}>{post.user.email}</div>
                </div>
              </div>
              <div className={styles.postContent}>
                {post.content}
              </div>
              <div className={styles.postActions}>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleLike(post._id)}
                  aria-label="Like"
                >
                  <ThumbsUp size={18} />
                  <span>{post.interactions.likes.length}</span>
                </button>
                <button
                  className={styles.actionBtn}
                  aria-label="Comment"
                  onClick={() => {
                  }}
                >
                  <MessageCircle size={18} />
                  <span>{post.interactions.comments.length}</span>
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleShare(post._id)}
                  aria-label="Share"
                >
                  <Share2 size={18} />
                  <span>{post.interactions.shares.length}</span>
                </button>
              </div>
              {/* Comments Section */}
              <div className={styles.commentsSection}>
                {post.interactions.comments.map((c, idx) => (
                  <div key={idx} className={styles.comment}>
                    <span className={styles.commentUser}>{c.user}:</span> {c.text}
                  </div>
                ))}
                <div className={styles.commentBox}>
                  <input
                    className={styles.commentInput}
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText[post._id] || ''}
                    onChange={e =>
                      setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))
                    }
                  />
                  <button
                    className={styles.commentBtn}
                    onClick={() => handleComment(post._id)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FeedPage;