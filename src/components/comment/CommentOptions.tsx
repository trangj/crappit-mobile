import React, { useRef } from 'react';
import RNBottomSheet from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Comment } from 'src/types/entities/comment';
import useDeleteComment from 'src/hooks/comment-query/useDeleteComment';
import { useUser } from 'src/context/UserState';
import BottomSheet from '../../ui/BottomSheet';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';
import MenuButton from '../../ui/MenuButton';

type CommentOptionsProps = {
  comment: Comment
};

function CommentOptions({ comment }: CommentOptionsProps) {
  const { theme } = useTheme();
  const { user } = useUser();
  const ref = useRef<RNBottomSheet>(null);
  const { mutateAsync } = useDeleteComment(comment);

  const handleDelete = async () => {
    try {
      await mutateAsync({ commentId: comment.id });
      ref.current?.close();
    } catch {
      //
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        icon={(
          <Ionicons
            name="ellipsis-horizontal"
            color={theme.colors.textAlt}
            size={16}
          />
          )}
        onPress={() => ref.current?.expand()}
      />
      <BottomSheet ref={ref}>
        <View
          style={{
            padding: theme.spacing.md,
            display: 'flex',
            height: '100%',
          }}
        >
          {user && comment.author_id === user.id && (
          <MenuButton
            onPress={handleDelete}
            icon="trash-outline"
            active
          >
            Delete comment
          </MenuButton>
          )}
          <View style={{ marginTop: 'auto', marginBottom: theme.spacing.md }}>
            <Button variant="filled" onPress={() => ref.current?.close()}>
              Close
            </Button>
          </View>
        </View>
      </BottomSheet>
    </>
  );
}

export default CommentOptions;
