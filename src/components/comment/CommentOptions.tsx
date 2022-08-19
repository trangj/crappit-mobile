import React, { useRef } from 'react';
import RNBottomSheet from '@gorhom/bottom-sheet';
import { LayoutAnimation, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Comment } from 'src/types/entities/comment';
import useDeleteComment from 'src/hooks/comment-query/useDeleteComment';
import { useUser } from 'src/context/UserState';
import * as Clipboard from 'expo-clipboard';
import { parseTextFromHtml } from 'src/helpers/parseText';
import BottomSheet from '../../ui/BottomSheet';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';
import MenuButton from '../../ui/MenuButton';

type CommentOptionsProps = {
  comment: Comment,
  setHideComments: React.Dispatch<React.SetStateAction<boolean>>,
};

function CommentOptions({ comment, setHideComments }: CommentOptionsProps) {
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
          <MenuButton
            onPress={() => {
              Clipboard.setString(parseTextFromHtml(comment.content));
              ref.current?.close();
            }}
            icon="copy-outline"
            active
          >
            Copy text
          </MenuButton>
          <MenuButton
            onPress={() => {
              LayoutAnimation.configureNext({
                ...LayoutAnimation.Presets.linear,
                duration: 200,
              });
              setHideComments(true);
              ref.current?.close();
            }}
            icon="chevron-up"
            active
          >
            Collapse thread
          </MenuButton>
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
