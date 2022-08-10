import * as ImagePicker from 'expo-image-picker';
import { Formik, FormikHelpers } from 'formik';
import React, { ReactNode } from 'react';
import useAddPost from 'src/hooks/post-query/useAddPost';
import * as yup from 'yup';

type AddPostContextProps = {
  children: ReactNode
}

export interface FormValues {
  title: string;
  content: string;
  link: string;
  file: ImagePicker.ImageInfo | undefined;
  topic: string;
  type: 'text' | 'link' | 'photo'
}

// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
// const FILE_SIZE = 10485760;
const schema = yup.object({
  title: yup
    .string()
    .max(300, 'Post title can be at most 300 characters')
    .required('Enter a title for your post'),
  topic: yup.string().required('Select a topic to post to'),
  content: yup.string(),
  link: yup.string().url('Enter a valid URL'),
  // file: yup
  //   .mixed()
  //   .test('fileSize', 'File Size is too large',
  //    (value) => (value === undefined ? true : value.size <= FILE_SIZE))
  //   .test('fileType', 'Unsupported File Format',
  //    (value) => (value === undefined ? true : SUPPORTED_FORMATS.includes(value.type))),
});

const initialValues: FormValues = {
  title: '',
  content: '',
  file: undefined,
  link: '',
  topic: '',
  type: 'text',
};

function AddPostContext({ children }: AddPostContextProps) {
  const { mutate } = useAddPost();

  const handleSubmit = ({
    title,
    content,
    link,
    file,
    type,
    topic,
  }: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    const formData = new FormData();
    if (type === 'photo') {
      if (!file) {
        formikHelpers.setFieldError('file', 'Please upload a file.');
        return;
      }
      const fileName = file.uri.split('/').pop() || '';
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : 'image';

      formData.append('file', {
        uri: file.uri,
        type: fileType,
        name: fileName,
      } as any);
    }
    if (type === 'link' && !link) {
      formikHelpers.setFieldError('link', 'Please add a link.');
      return;
    }
    formData.append('title', title);
    formData.append('content', content || link);
    formData.append('type', type);
    formData.append('topic', topic);
    mutate({ formData });
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {children}
    </Formik>
  );
}

export default AddPostContext;
