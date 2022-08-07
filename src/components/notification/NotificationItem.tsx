import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import { useTheme } from 'src/context/ThemeState';
import { parseTextFromHtml } from 'src/helpers/parseText';
import useReadNotification from 'src/hooks/notification-query/useReadNotification';
import { HomeScreenNavigationProp } from 'src/screens/HomeScreen';
import { Notification } from 'src/types/entities/notification';
import { PressableCard } from 'src/ui/Card';
import Text from 'src/ui/Text';

function Notificationnotification({ notification } : {notification: Notification}) {
  const { mutateAsync } = useReadNotification();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme } = useTheme();

  const handleReadNotification = async (notification: Notification) => {
    try {
      await mutateAsync({
        id: notification.id,
      });
      navigation.navigate('Post', { id: notification.post_id });
    } catch {
      //
    }
  };

  return (
    <PressableCard
      onPress={() => handleReadNotification(notification)}
      style={{
        padding: theme.spacing.md,
        display: 'flex',
        backgroundColor: !notification.read_at ? theme.colors.highlight : undefined,
      }}
    >
      <Text
        style={{
          fontSize: 16,
        }}
      >
        {notification.title}
        <Text
          style={{
            color: theme.colors.textAlt,
          }}
        >
          {' '}
          &bull;
          {' '}
          {dayjs(notification.sent_at).fromNow()}
        </Text>
      </Text>
      <Text
        style={{
          color: theme.colors.textAlt,
        }}
      >
        {parseTextFromHtml(notification.body)}
      </Text>
    </PressableCard>
  );
}

export default Notificationnotification;
