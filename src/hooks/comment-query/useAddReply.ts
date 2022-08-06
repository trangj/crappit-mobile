import { useMutation, useQueryClient } from 'react-query';
import { Comment } from 'src/types/entities/comment';
import { Error } from 'src/types/error';
import axios from '../../axiosConfig';

interface MutateResponse extends Response {
  comment: Comment;
}

interface MutationParams {
  commentId: number,
  reply: {
    content: string,
    postId: string
  }
}

async function addReply({ commentId, reply }: MutationParams) {
  try {
    const res = await axios.post(`/api/comment/${commentId}/reply`, reply);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
}

export default function useAddReply(id: string) {
  const queryClient = useQueryClient();
  return useMutation<MutateResponse, Error, MutationParams>(addReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id]);
    },
  });
}
