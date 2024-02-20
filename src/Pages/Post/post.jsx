import { useParams } from 'react-router-dom';
import usePostRequest from '../../hooks/post';
import { useEffect } from 'react';
import { CommentForm } from '../../Components/CommentForm/CommentForm';

export const Post = () => {
  const { communityId, postId } = useParams();

  const { post: postCall, isLoading: isPostLoading, response: postResponse } = usePostRequest('/posts/get');
  const { post: commentCall, isLoading: isCommentLoading, response: commentResponse } = usePostRequest('/comment/get');

  const getData = () => {
    postCall({ postId });
    commentCall({ postId });
  };

  useEffect(() => {
    getData();
  }, [postId]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className='post-page'>
      <div className='post-container'>
        {isPostLoading ? (
          <div>Loading post...</div>
        ) : (
          postResponse && (
            <div className='post'>
              <h2 className='post-title'>{postResponse.title}</h2>
              <div className='post-meta'>
                <span className='post-author'>{postResponse.author}</span>
                <span className='post-timestamp'>{formatDate(postResponse.timestamp)}</span>
              </div>
              <div className='post-content'>{postResponse.content}</div>
              <div className='post-likes'>{postResponse.likes} likes</div>
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
              <div className='comment-timestamp'>{formatDate(comment.timestamp)}</div>
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
