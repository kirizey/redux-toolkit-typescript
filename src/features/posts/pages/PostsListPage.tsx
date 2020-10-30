import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../../core/models';
import { RootState } from '../../../store';
import { fetchPosts } from '../../../store/posts/postsSlice';

/**
 *
 */
export default function PostsListPage() {
  const dispatch = useDispatch();
  const posts: Post[] | null = useSelector((state: RootState) => state.postsSlice.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <div>
      hello posts from develop!!!
    </div>
  );
}
