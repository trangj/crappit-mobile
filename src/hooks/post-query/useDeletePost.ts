import { useMutation } from 'react-query';
import axios from '../../axiosConfig';

async function deletePost({ postid }: { postid: number; }) {
  try {
    const res = await axios.delete(`/api/post/${postid}`);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
}

export default function useDeletePost(navigation: any) {
  return useMutation(deletePost, {
    onSuccess: () => {
      navigation.navigate('Home');
    },
  });
}
