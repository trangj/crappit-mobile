import { useMutation } from "react-query";
import axios from "../../axiosConfig";

async function addPost({ formData }: { formData: FormData; }) {
	try {
		const res = await axios.post(`/api/post`, formData);
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
}


export default function useAddPost(navigation: any) {
	return useMutation(addPost, {
		onSuccess: (res) => {
			navigation.navigate("Post", { postid: res.post.id });
		},
	});
}