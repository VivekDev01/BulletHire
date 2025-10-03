'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { ThumbsUp, MessageCircle, Share2, ImageIcon, VideoIcon, TextIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import { url } from "@/config";
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type Comment = {
  _id: string;
  user_id: string;
  username: string;
  comment: string;
  created_at: string;
  likes: string[];
  replies: Reply[];
};

type Reply = {
  _id: string;
  user_id: string;
  username: string;
  reply: string;
  created_at: string;
};

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
    comments: Comment[];
    shares: string[];
  };
  created_at: string;
};

const FeedPage = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [showAllComments, setShowAllComments] = useState<{ [key: string]: boolean }>({});
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [showReplyInput, setShowReplyInput] = useState<{ [key: string]: boolean }>({});
  // For showing replies: { [postId_commentIdx]: boolean }
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>({});

  const getPosts = async () => {
    try {
      const response = await axios.get(`${url}/get_posts`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
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
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleShare = async (postId: string) => {
    try {
      await axios.post(`${url}/share_post`, { post_id: postId }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      getPosts();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleComment = async (postId: string) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;
    try {
      await axios.post(`${url}/comment_post`, { post_id: postId, comment: text }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setCommentText((prev) => ({ ...prev, [postId]: '' }));
      getPosts();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };


  const handleLikeComment = async (postId: string, comment: Comment) => {
    if (!comment._id) return;
    try {
      await axios.post(`${url}/like_comment`, { post_id: postId, comment_id: comment._id }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      getPosts();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // const handleReplyClick = (postId: string, comment: Comment, idx: number) => {
  //   const key = `${postId}_${idx}`;
  //   setShowReplyInput(prev => ({ ...prev, [key]: !prev[key] }));
  // };

  const handlePostReply = async (postId: string, comment: Comment, idx: number) => {
    const key = `${postId}_${idx}`;
    const text = replyText[key];
    if (!text || !text.trim() || !comment._id) return;
    try {
      await axios.post(`${url}/reply_comment`, { post_id: postId, comment_id: comment._id, reply: text }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setReplyText(prev => ({ ...prev, [key]: '' }));
      setShowReplyInput(prev => ({ ...prev, [key]: false }));
      getPosts();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    try {
      await axios.delete(`${url}/delete_comment`, {
        data: { post_id: postId, comment_id: commentId },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      getPosts();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // For context menu (delete comment)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contextMenuInfo, setContextMenuInfo] = useState<{ postId: string, commentId: string } | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
    setContextMenuInfo(null);
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
          {posts.map((post: Post) => (
            <div key={post._id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.avatar}>
                  {post.user.username ? post.user.username[0].toUpperCase() : "U"}
                </div>
                <div>
                  <div className={styles.username}>{post.user.username}</div>
                  <div className={styles.postDate}>
                    {post.created_at
                      ? new Date(post.created_at).toLocaleString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          dateStyle: 'medium',
                          timeStyle: 'short',
                          hour12: true
                        })
                      : ''}
                </div>
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
                  {
                    post.interactions.likes.includes(localStorage.getItem("userId") || "") ?
                    <ThumbsUp size={18} fill='blue' /> :
                    <ThumbsUp size={18} />
                  }
                  <span>{post.interactions.likes.length}</span>
                </button>
                <button
                  className={styles.actionBtn}
                  aria-label="Comment"
                  onClick={() => {}}
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
              <div className={styles.commentsSection}>
                {post.interactions.comments && post.interactions.comments.length > 0 && (
                  <div className={styles.commentsContainer}>
                    {(showAllComments[post._id] ? post.interactions.comments : post.interactions.comments.slice(0, 1)).map((c, idx) => {
                      const replyKey = `${post._id}_${idx}`;
                      // Only allow delete for own comments
                      const isOwnComment = c.user_id === (typeof window !== 'undefined' ? localStorage.getItem('userId') : undefined);
                      return (
                        <div
                          key={idx}
                          className={styles.topCommentBox}
                          onContextMenu={isOwnComment ? (e) => {
                            e.preventDefault();
                            setAnchorEl(e.currentTarget);
                            setContextMenuInfo({ postId: post._id, commentId: c._id });
                          } : undefined}
                          style={{ cursor: isOwnComment ? 'context-menu' : 'default' }}
                        >
                          <div className={styles.topCommentAvatar}>{c.username ? c.username[0].toUpperCase() : 'U'}</div>
                          <div className={styles.topCommentContent}>
                            <div className={styles.topCommentHeader}>
                              <span className={styles.topCommentUser}>{c.username}</span>
                              <span className={styles.topCommentDate}>{c.created_at ? new Date(c.created_at).toLocaleString() : ''}</span>
                            </div>
                            <div className={styles.topCommentText}>{c.comment}</div>
                            <div className={styles.topCommentActions}>
                              <button className={styles.commentActionBtn} onClick={() => handleLikeComment(post._id, c)}>
                                <span className={styles.commentLikeIcon}>👍</span> Like
                                {c.likes.length > 0 && ` (${c.likes.length})`}
                              </button>
                              <button
                                className={styles.commentActionBtn}
                                onClick={() => {
                                  if (c.replies.length > 0) {
                                    setShowReplies(prev => ({ ...prev, [replyKey]: !prev[replyKey] }));
                                  } else {
                                    setShowReplyInput(prev => ({ ...prev, [replyKey]: !prev[replyKey] }));
                                  }
                                }}
                              >
                                <span className={styles.commentReplyIcon}>💬</span> Reply
                                {c.replies.length > 0 && (
                                  <span
                                    className={styles.replyCount}
                                    style={{ cursor: 'pointer', marginLeft: 2 }}
                                  >
                                    ({c.replies.length})
                                  </span>
                                )}
                              </button>
                            </div>
                            {showReplies[replyKey] && c.replies && c.replies.length > 0 && (
                              <div className={styles.repliesContainer}>
                                {c.replies.map((reply: Reply, ridx: number) => (
                                  <div key={ridx} className={styles.replyBox}>
                                    <div className={styles.replyAvatar}>{reply.username ? reply.username[0].toUpperCase() : 'U'}</div>
                                    <div className={styles.replyContent}>
                                      <div className={styles.replyHeader}>
                                        <span className={styles.replyUser}>{reply.username}</span>
                                        <span className={styles.replyDate}>{reply.created_at ? new Date(reply.created_at).toLocaleString() : ''}</span>
                                      </div>
                                      <div className={styles.replyText}>{reply.reply}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {showReplyInput[replyKey] && (
                              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                <input
                                  className={styles.commentInput}
                                  type="text"
                                  placeholder="Write a reply..."
                                  value={replyText[replyKey] || ''}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReplyText(prev => ({ ...prev, [replyKey]: e.target.value }))}
                                />
                                <button
                                  className={styles.commentBtn}
                                  onClick={() => handlePostReply(post._id, c, idx)}
                                >
                                  Post
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {post.interactions.comments.length > 1 && !showAllComments[post._id] && (
                      <button
                        className={styles.showMoreBtn}
                        onClick={() => setShowAllComments(prev => ({ ...prev, [post._id]: true }))}
                      >
                        Show {post.interactions.comments.length - 1} more comment{post.interactions.comments.length - 1 > 1 ? 's' : ''}
                      </button>
                    )}
                    {post.interactions.comments.length > 1 && showAllComments[post._id] && (
                      <button
                        className={styles.showMoreBtn}
                        onClick={() => setShowAllComments(prev => ({ ...prev, [post._id]: false }))}
                      >
                        Show less comments
                      </button>
                    )}
                  </div>
                )}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      'aria-labelledby': '#basic-button',
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      if (contextMenuInfo) {
                        handleDeleteComment(contextMenuInfo.postId, contextMenuInfo.commentId);
                        handleClose();
                      }
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FeedPage;