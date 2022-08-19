import React, { useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNBottomSheet from '@gorhom/bottom-sheet';
import { Share, View } from 'react-native';
import MenuButton from 'src/ui/MenuButton';
import { Post } from 'src/types/entities/post';
import { useUser } from 'src/context/UserState';
import useDeletePost from 'src/hooks/post-query/useDeletePost';
import { HomeScreenNavigationProp } from 'src/screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { parseTextFromHtml } from 'src/helpers/parseText';
import BottomSheet from '../../ui/BottomSheet';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';

type PostOptionsProps = {
  post: Post
};

function PostOptions({ post }: PostOptionsProps) {
  const { theme } = useTheme();
  const { user } = useUser();
  const ref = useRef<RNBottomSheet>(null);
  const { mutateAsync } = useDeletePost();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleDelete = async () => {
    try {
      await mutateAsync({ postid: post.id });
      navigation.navigate('Home');
    } catch {
      //
    }
  };

  const onShare = async () => {
    try {
      ref.current?.close();
      await Share.share(
        {
          url: `https://crappit.me/t/${post.topic}/comments/${post.id}`,
          title: post.title,
          message: `https://crappit.me/t/${post.topic}/comments/${post.id}`,
        },
        {
          dialogTitle: post.title,
          subject: post.title,
        },
      );
    } catch (e) {
      console.log(e);
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
        style={{ marginLeft: 'auto' }}
      />
      <BottomSheet ref={ref}>
        <View
          style={{
            padding: theme.spacing.md,
            display: 'flex',
            height: '100%',
          }}
        >
          <MenuButton
            onPress={onShare}
            icon="share-outline"
            active
          >
            Share
          </MenuButton>
          {user && user.id === post.author_id && (
          <MenuButton
            onPress={handleDelete}
            icon="trash-outline"
            active
          >
            Delete post
          </MenuButton>
          )}
          <MenuButton
            onPress={() => {
              Clipboard.setString(`${post.title}\n\n${parseTextFromHtml(post.content)}`);
              ref.current?.close();
            }}
            icon="copy-outline"
            active
          >
            Copy text
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

export default PostOptions;
