import { useMutation } from 'react-query';
import { Error } from 'src/types/error';
import axios from '../../axiosConfig';

interface MutationResponse extends Response {
  post: {
    topic: string,
    id: number
  };
}

interface MutationParams {
  formData: FormData
}

async function addPost({ formData }: MutationParams) {
  try {
    const res = await axios.post('/api/post', formData);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
}

export default function useAddPost(navigation: any) {
  return useMutation<MutationResponse, Error, MutationParams>(addPost, {
    onSuccess: (res) => {
      navigation.navigate('Post', { postid: res.post.id });
    },
  });
}
