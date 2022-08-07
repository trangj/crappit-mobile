import { FlatList, RefreshControl } from 'react-native';
import React from 'react';
import useNotifications from 'src/hooks/notification-query/useNotifications';
import { useTheme } from 'src/context/ThemeState';
import { Header } from '@react-navigation/elements';
import NotificationItem from 'src/components/notification/NotificationItem';
import NotificationOptions from 'src/components/notification/NotificationOptions';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigators/RootStackNavigator';
import { NavigationStackParamList } from 'src/navigators/NotificationStackNavigator';
import { TabParamList } from 'src/navigators/TabNavigator';

type NotificationScreenProps = CompositeScreenProps<
  NativeStackScreenProps<NavigationStackParamList, 'Post'>,
  CompositeScreenProps<
    NativeStackScreenProps<TabParamList, 'NotificationStackNavigator'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type NotificationScreenNavigationProp = NotificationScreenProps['navigation'];

function NotificationScreen() {
  const {
    data, isLoading, hasNextPage, fetchNextPage, refetch,
  } = useNotifications();
  const { theme } = useTheme();

  return (
    <>
      <Header
        title="Inbox"
        headerLeftContainerStyle={{ paddingLeft: theme.spacing.md }}
        headerRightContainerStyle={{ paddingRight: theme.spacing.md }}
        headerRight={() => (
          <NotificationOptions />
        )}
      />
      <FlatList
        indicatorStyle={theme.dark ? 'white' : 'black'}
        data={data?.pages.map((page) => page.notifications).flat()}
        renderItem={({ item }) => (
          <NotificationItem notification={item} />
        )}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        refreshing={isLoading || !data}
        onEndReached={(hasNextPage as any) && fetchNextPage}
      />
    </>
  );
}

export default NotificationScreen;
