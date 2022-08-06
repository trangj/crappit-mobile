import { useQueryClient, useMutation } from 'react-query';
import { Comment } from 'src/types/entities/comment';
import { Error } from 'src/types/error';
import { Response } from 'src/types/response';
import axios from '../../axiosConfig';

interface MutateResponse extends Response {
  comment: Comment;
}

interface MutateParams {
  newComment: {
    content: string,
    postId: string
  }
}

async function addComment({ newComment } : MutateParams) {
  try {
    const res = await axios.post('/api/comment', newComment);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
}

export default function useAddComment(id: string, sortParam: string) {
  const queryClient = useQueryClient();
  return useMutation<MutateResponse, Error, MutateParams>(addComment, {
    onSuccess: (res) => {
      queryClient.setQueryData(['comments', id, sortParam], (initialData: any) => {
        initialData.pages[0].comments = [res.comment, ...initialData.pages[0].comments];
        return initialData;
      });
    },
    onError: () => {
      // toast.error(err.status.text);
    },
  });
}
