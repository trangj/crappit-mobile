import { useQuery } from 'react-query';
import { Post } from 'src/types/entities/post';
import { Error } from 'src/types/error';
import { useUser } from '../../context/UserState';
import axios from '../../axiosConfig';

async function fetchPost(id: number) {
  try {
    const res = await axios.get(`/api/post/${id}`);
    return res.data.post;
  } catch (err) {
    throw err.response.data;
  }
}

export default function usePost(id: number) {
  const { fetching } = useUser();
  return useQuery<Post, Error>(['post', id], () => fetchPost(id), { enabled: !fetching });
}
