import React, { useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNBottomSheet from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import MenuButton from 'src/ui/MenuButton';
import { Post } from 'src/types/entities/post';
import { useUser } from 'src/context/UserState';
import useDeletePost from 'src/hooks/post-query/useDeletePost';
import { HomeScreenNavigationProp } from 'src/screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';
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
          {user && user.id === post.author_id && (
          <MenuButton
            onPress={handleDelete}
            icon="trash-outline"
            active
          >
            Delete post
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

export default PostOptions;
