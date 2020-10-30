import { PostDto } from '../dto';
import { Post } from '../models';

// eslint-disable-next-line import/prefer-default-export
export const mapDtoToPosts = (dtos: PostDto[]): Post[] => dtos.map((dto) => new Post({
  id: dto.id,
  userId: dto.userId,
  title: dto.title,
  body: dto.body,
}))
