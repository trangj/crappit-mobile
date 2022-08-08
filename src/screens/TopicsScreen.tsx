import {
  View, Text, Image, Pressable, FlatList, SectionList, RefreshControl,
} from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from 'src/context/ThemeState';
import useTopicFollow from 'src/hooks/topic-query/useTopicFollow';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { TopicStackParamList } from 'src/navigators/TopicStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigators/RootStackNavigator';
import { TabParamList } from 'src/navigators/TabNavigator';
import Button from 'src/ui/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAddTopicFavorite from 'src/hooks/topic-query/useAddTopicFavorite';

type TopicScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TopicStackParamList, 'Topics'>,
  CompositeScreenProps<
    NativeStackScreenProps<TabParamList, 'TopicStackNavigator'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type HomeScreenNavigationProp = TopicScreenProps['navigation'];

function TopicsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { data, refetch, isLoading } = useTopicFollow();
  const { mutate } = useAddTopicFavorite();

  const favoriteTopics = useMemo(() => data?.topics_followed.filter(
    (topic) => topic.favorite,
  ), [data?.topics_followed]);

  const sectionData = [
    {
      title: 'Favorites',
      data: favoriteTopics,
    },
    {
      title: 'My Topics',
      data: data?.topics_followed,
    },
  ];

  if (!data?.topics_followed) return null;

  return (
    <SectionList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={{
            padding: theme.spacing.ms,
            alignItems: 'center',
            color: theme.colors.textAlt,
            textTransform: 'uppercase',
            fontWeight: '700',
            fontSize: 12,
          }}
        >
          {title}
        </Text>
      )}
      stickySectionHeadersEnabled={false}
      sections={sectionData as any}
      keyExtractor={(item) => item.title}
      renderItem={({ item: topic }) => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing.sm,
            paddingHorizontal: theme.spacing.md,
            backgroundColor: theme.colors.card,
          }}
        >
          <Pressable
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '90%',
            }}
            onPress={() => {
              navigation.navigate('Topic', { title: topic.title });
            }}
          >
            {topic.icon_image_url ? (
              <Image
                source={{ uri: topic.icon_image_url }}
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
            <Text
              style={{
                fontWeight: 'bold',
                color: theme.colors.text,
              }}
            >
              t/
              {topic.title}
            </Text>
          </Pressable>
          <Button
            onPress={() => {
              mutate(topic.title);
            }}
            variant="ghost"
            icon={
              <Ionicons name={topic.favorite ? 'star' : 'star-outline'} size={24} color={topic.favorite ? theme.colors.blue : theme.colors.textAlt} />
            }
          />
        </View>
      )}
    />
  );
}

export default TopicsScreen;
