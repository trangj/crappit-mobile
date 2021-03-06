import { useInfiniteQuery } from 'react-query';
import { Post } from 'src/types/entities/post';
import { Error } from 'src/types/error';
import { useUser } from '../../context/UserState';
import axios from '../../axiosConfig';

interface Response {
  posts: Post[],
  nextCursor: number;
}

async function fetchPosts(topic: string, pageParam: number, sortParam: string) {
  try {
    const res = await axios.get(
      `/api/posts/${topic}?skip=${pageParam}&sort=${sortParam}`,
    );
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
}

export default function usePosts(topic: string, sortParam: string) {
  const { fetching } = useUser();
  return useInfiniteQuery<Response, Error>(
    ['posts', topic, sortParam],
    ({ pageParam = 0 }) => fetchPosts(topic, pageParam, sortParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      select: (data: any) => data.pages
        .map((page: any) => page.posts)
        .flat(),
      enabled: !fetching,
    },
  );
}
