import { PostDto } from '../../dto';
import { mapDtoToPosts } from '../../mappers/posts';
import { Post } from '../../models';
import httpClient from '../http/httpClient';

// eslint-disable-next-line import/prefer-default-export
export const fetchAllPosts = async (): Promise<Post[]> => {
  const { data: postsDtos } = await httpClient.get<PostDto[]>('/posts');
  const posts = mapDtoToPosts(postsDtos);

  return posts;
};
