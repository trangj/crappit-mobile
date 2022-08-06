import { useMutation } from 'react-query';
import { Error } from 'src/types/error';
import { Response } from 'src/types/response';
import axios from '../../axiosConfig';

interface MutationParams {
  postid: number
}

async function deletePost({ postid }: MutationParams) {
  try {
    const res = await axios.delete(`/api/post/${postid}`);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
}

export default function useDeletePost() {
  return useMutation<Response, Error, MutationParams>(deletePost);
}
