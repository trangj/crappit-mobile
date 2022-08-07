import React, { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
import { Platform, Pressable, View } from 'react-native';
import { Card } from '../../ui/Card';
import { TopicScreenProps } from '../../screens/SharedScreens/TopicScreen';
import { Topic } from '../../types/entities/topic';
import Disclosure from '../../ui/Disclosure';
import Text from '../../ui/Text';
import { useTheme } from '../../context/ThemeState';
import Divider from '../../ui/Divider';
import Heading from '../../ui/Heading';

type TopicAboutProps = {
  navigation: TopicScreenProps['navigation'];
  topic: Topic | undefined;
  scrollHandler: any,
  headerSize: number
};

const TopicAbout = forwardRef(({
  topic, navigation, scrollHandler, headerSize,
}: TopicAboutProps, ref : any) => {
  const { theme } = useTheme();

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      ref={ref}
      scrollEventThrottle={16}
      contentInset={{ top: headerSize }}
      contentOffset={Platform.select({
        ios: {
          x: 0,
          y: -headerSize,
        },
      })}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <Card
        style={{ padding: theme.spacing.md, marginBottom: theme.spacing.sm }}
      >
        <Heading
          size="sm"
          style={{
            marginBottom: theme.spacing.sm,
            marginLeft: theme.spacing.sm,
          }}
        >
          Rules
        </Heading>
        <Divider />
        {topic?.rules.map((rule, i) => (
          <Disclosure
            key={i}
            headerContent={(
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text>
                  {i + 1}
                  .
                  {' '}
                </Text>
                <Text>{rule.name}</Text>
              </View>
     )}
            style={{ marginTop: theme.spacing.md }}
          >
            <Text style={{ paddingLeft: theme.spacing.md }}>
              {rule.description}
            </Text>
          </Disclosure>
        ))}
      </Card>
      <Card style={{ padding: theme.spacing.md }}>
        <Heading
          size="sm"
          style={{
            marginBottom: theme.spacing.sm,
            marginLeft: theme.spacing.sm,
          }}
        >
          Moderators
        </Heading>
        <Divider />
        {topic?.moderators.map((moderator, i) => (
          <Pressable
            key={i}
            onPress={() => navigation.navigate('Profile', { id: moderator.user_id })}
            style={{ marginTop: theme.spacing.md }}
          >
            <Text style={{ paddingLeft: theme.spacing.sm }}>
              u/
              {moderator.username}
            </Text>
          </Pressable>
        ))}
      </Card>
    </Animated.ScrollView>
  );
});

export default TopicAbout;
