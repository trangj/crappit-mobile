import { Image, ImageBackground, View } from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeState';
import { Topic } from '../../types/entities/topic';
import Heading from '../../ui/Heading';
import Text from '../../ui/Text';
import Button from '../../ui/Button';
import useAddTopicFollow from '../../hooks/topic-query/useAddTopicFollow';
import { useUser } from '../../context/UserState';
import { TopicScreenProps } from '../../screens/TopicScreen';

type TopicHeaderProps = {
  topic: Topic;
  translateY: SharedValue<number>;
  navigation: TopicScreenProps['navigation'];
  headerSize: number;
};

function TopicHeader({
  navigation,
  topic,
  translateY,
  headerSize,
}: TopicHeaderProps) {
  const { theme } = useTheme();
  const { mutate } = useAddTopicFollow(topic);
  const { user } = useUser();

  const headerStyle = useAnimatedStyle(() => {
    const moveY = interpolate(
      translateY.value,
      [-headerSize, -headerSize + 60],
      [0, -60],
      Extrapolate.CLAMP,
    );

    return { transform: [{ translateY: moveY }] };
  });

  const bannerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-headerSize + 60, -headerSize + 120],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return { opacity };
  });

  const iconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-headerSize, -headerSize + 30],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return { opacity };
  });

  const cardStyle = useAnimatedStyle(() => {
    const moveY = interpolate(
      translateY.value,
      [-headerSize, -headerSize + 215],
      [0, -215],
      Extrapolate.CLAMP,
    );

    return { transform: [{ translateY: moveY }] };
  });

  return (
    <>
      <Animated.View
        style={[
          {
            backgroundColor: theme.colors.card,
            zIndex: 100,
            width: '100%',
            position: 'absolute',
          },
          headerStyle,
        ]}
      >
        {topic.image_url ? (
          <Animated.View style={bannerStyle}>
            <ImageBackground
              source={{ uri: topic.image_url }}
              style={{ height: 150 }}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'transparent']}
                style={{
                  height: '100%',
                }}
              />
            </ImageBackground>
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              { backgroundColor: theme.colors.blue, height: 150 },
              bannerStyle,
            ]}
          />
        )}
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: -12,
              marginLeft: theme.spacing.md,
            },
            iconStyle,
          ]}
        >
          {topic.icon_image_url ? (
            <Image
              source={{ uri: topic.icon_image_url }}
              style={{
                height: 65,
                width: 65,
                borderRadius: 9999,
                borderWidth: 2,
                borderColor: theme.colors.card,
              }}
            />
          ) : (
            <View
              style={{
                height: 65,
                width: 65,
                borderRadius: 9999,
                borderWidth: 2,
                borderColor: theme.colors.card,
                backgroundColor: theme.colors.textAlt,
              }}
            />
          )}
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          {
            padding: theme.spacing.md,
            backgroundColor: theme.colors.card,
            borderBottomWidth: 0.5,
            borderColor: theme.colors.border,
            paddingTop: theme.spacing.lg,
            height: 155,
            width: '100%',
            position: 'absolute',
            top: 150,
            zIndex: 10,
          },
          cardStyle,
        ]}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Heading size="md">
            t/
            {topic?.title}
          </Heading>
          <Button
            size="sm"
            onPress={() => (user
              ? mutate(topic.title)
              : navigation.navigate('AuthStackNavigator'))}
          >
            {topic.user_followed_id ? 'Unfollow' : 'Follow'}
          </Button>
        </View>
        <Text
          style={{
            color: theme.colors.textAlt,
            marginBottom: theme.spacing.sm,
            marginTop: theme.spacing.md,
          }}
        >
          {topic?.number_of_followers}
          {' '}
          followers
        </Text>
        <Text numberOfLines={3}>{topic?.description}</Text>
      </Animated.View>
      <View style={{ height: 90 }} />
    </>
  );
}

export default React.memo(TopicHeader);
