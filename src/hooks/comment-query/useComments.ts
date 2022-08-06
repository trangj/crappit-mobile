import { useInfiniteQuery } from 'react-query';
import { useUser } from 'src/context/UserState';
import { Comment } from 'src/types/entities/comment';
import { Error } from 'src/types/error';
import axios from '../../axiosConfig';

interface Response {
  comments: Comment[],
  nextCursor: number;
}

export async function fetchComments(id: string, pageParam: number, sortParam: string) {
  try {
    const res = await axios.get(
      `/api/comments/${id}?skip=${!pageParam ? 0 : pageParam}&sort=${sortParam}`,
    );
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
}

export default function useComments(id: string, sortParam: string) {
  const { fetching } = useUser();
  return useInfiniteQuery<Response, Error>(
    ['comments', id, sortParam],
    ({ pageParam = 0 }) => fetchComments(id, pageParam, sortParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      select: (data: any) => data.pages
        .map((page: any) => page.comments)
        .flat(),
      onError: () => {
        // toast.error(err.status.text);
      },
      enabled: !fetching,
    },
  );
}
