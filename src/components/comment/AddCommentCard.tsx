import {
  View, KeyboardAvoidingView, Platform, Image,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import useAddReply from '../../hooks/comment-query/useAddReply';
import { Card } from '../../ui/Card';
import Button from '../../ui/Button';
import TextInput from '../../ui/TextInput';
import { useUser } from '../../context/UserState';
import { useTheme } from '../../context/ThemeState';
import useAddComment from '../../hooks/comment-query/useAddComment';
import { Post } from '../../types/entities/post';
import { useAddCommentContext } from './AddCommentContext';
import Text from '../../ui/Text';

const schema = yup.object({
  content: yup.string().required(''),
});

type AddCommentCardProps = {
  post: Post;
};

interface FormValues {
  content: string;
}

function AddCommentCard({ post } : AddCommentCardProps) {
  const { user } = useUser();
  const { theme } = useTheme();
  const {
    addCommentRef: ref, type, setType, parentComment,
  } = useAddCommentContext();
  const [focused, setFocused] = useState(false);
  const { mutateAsync: addCommentMutateAsync } = useAddComment(String(post.id));
  const { mutateAsync: addReplyMutateAsync } = useAddReply(String(post.id));

  const handleSubmit = async (
    { content }: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    const newComment = {
      content,
      postId: String(post.id),
    };
    try {
      if (type === 'comment') {
        await addCommentMutateAsync({
          newComment,
        });
      } else if (type === 'reply') {
        if (!parentComment) throw Error('No parent comment selected.');
        await addReplyMutateAsync({
          reply: newComment,
          commentId: parentComment.id,
        });
      }
      ref?.current?.blur();
      resetForm();
    } catch {
      //
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={88}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Formik
        initialValues={{
          content: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({
          handleChange, handleBlur, handleSubmit, values,
        }) => (
          <Card
            style={{
              display: 'flex',
              padding: theme.spacing.sm,
            }}
          >
            {focused && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  onPress={() => ref?.current?.blur()}
                  name="close-outline"
                  size={35}
                  color={theme.colors.textAlt}
                />
                <Text>
                  {type === 'reply'
                    ? `Replying to ${parentComment?.author}`
                    : `Commenting on ${post.title}`}
                </Text>
              </View>
            )}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                borderBottomWidth: focused ? 1 : undefined,
                borderColor: theme.colors.border,
              }}
            >
              {!focused
                  && (user && user.avatar_image_url ? (
                    <Image
                      source={{ uri: user.avatar_image_url }}
                      style={{
                        height: 28,
                        width: 28,
                        marginRight: theme.spacing.sm,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        height: 28,
                        width: 28,
                        backgroundColor: theme.colors.textAlt,
                        borderRadius: 9999,
                        marginRight: theme.spacing.sm,
                      }}
                    />
                  ))}
              <TextInput
                ref={ref}
                border="rounded"
                placeholder="Add a comment"
                onPressOut={() => {
                  setType('comment');
                }}
                onFocus={() => {
                  setFocused(true);
                }}
                onBlur={() => {
                  setFocused(false);
                  handleBlur('content');
                }}
                value={values.content}
                onChangeText={handleChange('content')}
                style={{
                  backgroundColor: focused
                    ? 'transparent'
                    : theme.colors.border,
                  height: focused ? 100 : 36,
                  textAlignVertical: 'top',
                  paddingTop: 10,
                  width: '90%',
                }}
                multiline
              />
            </View>
            {focused && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="ghost"
                  width={60}
                  textStyle={{ color: theme.colors.blue, fontSize: 16 }}
                  onPress={handleSubmit as any}
                >
                  Reply
                </Button>
              </View>
            )}
          </Card>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default AddCommentCard;
