import {
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  UIManager,
  View,
} from 'react-native';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from 'src/screens/HomeScreen';
import { Comment } from '../../types/entities/comment';
import Text from '../../ui/Text';
import RenderHTML from '../../ui/RenderHTML';
import { useTheme } from '../../context/ThemeState';
import CommentToolBar from './CommentToolBar';

type CommentItemProps = {
  comment: Comment;
};

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function CommentItem({ comment }: CommentItemProps) {
  const { theme } = useTheme();
  const [hideComments, setHideComments] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View
      style={{
        paddingTop: theme.spacing.sm,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: theme.spacing.sm,
        }}
      >
        {comment.avatar_image_url ? (
          <Image
            source={{ uri: comment.avatar_image_url }}
            style={{
              height: 28,
              width: 28,
              backgroundColor: theme.colors.textAlt,
              borderRadius: 9999,
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
        )}
        <Pressable
          onPress={() => navigation.navigate('Profile', { id: comment.author_id })}
        >
          <Text style={{ color: theme.colors.textAlt }}>
            {comment.is_deleted ? '[deleted]' : comment.author}
            {' '}
            &bull;
            {' '}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            LayoutAnimation.configureNext({
              ...LayoutAnimation.Presets.linear,
              duration: 200,
            });
            setHideComments(!hideComments);
          }}
          style={{ width: '100%' }}
        >
          <Text style={{ color: theme.colors.textAlt }}>
            {dayjs(comment.created_at).fromNow()}
          </Text>
        </Pressable>
      </View>
      {!hideComments && (
      <>
        <RenderHTML
          source={{
            html: comment.is_deleted
              ? '<p>[deleted]</p>'
              : `<p>${comment.content}</p>`,
          }}
        />
        <CommentToolBar comment={comment} setHideComments={setHideComments} />
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: theme.colors.grey,
            paddingLeft: theme.spacing.md,
          }}
        >
          {comment.children
            ? comment.children.map((comment) => (
              <CommentItem comment={comment} key={comment.id} />
            ))
            : null}
        </View>
      </>
      )}
    </View>
  );
}

export default CommentItem;
