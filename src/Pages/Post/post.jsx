import { useParams } from 'react-router-dom';
import usePostRequest from '../../hooks/post';
import { useEffect, useState } from 'react'; // Import useState
import { CommentForm } from '../../Components/CommentForm/CommentForm';
import './post.css';

export const Post = () => {
  const { communityId, postId } = useParams();
  const { post: postCall, isLoading: isPostLoading, response: postResponse } = usePostRequest('/posts/get');
  const { post: commentCall, isLoading: isCommentLoading, response: commentResponse } = usePostRequest('/comment/get');

  // State to hold the filtered post
  const [filteredPost, setFilteredPost] = useState(null);

  const getData = () => {
    postCall({ postId });
    commentCall({ postId });
  };

  useEffect(() => {
    getData();
  }, [postId]);

  useEffect(() => {
    // Assuming postResponse contains an array of posts, filter out the one that matches postId
    if (postResponse && Array.isArray(postResponse)) {
      const matchedPost = postResponse.find((post) => post._id === postId);
      setFilteredPost(matchedPost);
    } else {
      // Assuming postResponse directly contains the post data if it's not an array
      setFilteredPost(postResponse);
    }
  }, [postResponse, postId]);

  return (
    <div className='post-page'>
      <div className='post-container'>
        {isPostLoading ? (
          <div>Loading post...</div>
        ) : (
          filteredPost && (
            <div className='post'>
              <h2 className='post-title'>{filteredPost.title}</h2>
              <div className='post-meta'>
                <span className='post-author'>{filteredPost.author}</span>
                <span className='post-timestamp'>{filteredPost.timestamp}</span>
              </div>
              <div className='post-content'>{filteredPost.content}</div>
              <div className='post-likes'>{filteredPost.likes} likes</div>
            </div>
          )
        )}
      </div>

      <div className='divider'></div>

      <div className='comments-container'>
        {isCommentLoading ? (
          <div>Loading comments...</div>
        ) : (
          commentResponse &&
          !commentResponse?.message &&
          commentResponse?.map((comment) => (
            <div key={comment._id} className='comment'>
              <div className='comment-author'>{comment.author}</div>
              <div className='comment-timestamp'>{comment.timestamp}</div>
              <div className='comment-content'>{comment.comment}</div>
              <div className='comment-likes'>{comment.likes} likes</div>
            </div>
          ))
        )}
      </div>

      <CommentForm postId={postId} refresh={getData} />
    </div>
  );
};
