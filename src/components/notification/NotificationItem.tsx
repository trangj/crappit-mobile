import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import { Image, View } from 'react-native';
import { useTheme } from 'src/context/ThemeState';
import { parseTextFromHtml } from 'src/helpers/parseText';
import useReadNotification from 'src/hooks/notification-query/useReadNotification';
import { HomeScreenNavigationProp } from 'src/screens/HomeScreen';
import { Notification } from 'src/types/entities/notification';
import { PressableCard } from 'src/ui/Card';
import Text from 'src/ui/Text';
import NotificationIcon from './NotificationIcon';

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
        flexDirection: 'row',
        backgroundColor: !notification.read_at ? theme.colors.highlight : undefined,
      }}
    >
      <View
        style={{
          position: 'relative',
        }}
      >
        {notification.icon_url ? (
          <Image
            source={{ uri: notification.icon_url }}
            style={{
              height: 32,
              width: 32,
              marginRight: theme.spacing.sm,
            }}
          />
        ) : (
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: theme.colors.textAlt,
              borderRadius: 9999,
              marginRight: theme.spacing.sm,
            }}
          />
        )}
        <View
          style={{
            position: 'absolute',
            borderRadius: 9999,
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            padding: 2,
            top: 22,
            right: 6,
          }}
        >
          <NotificationIcon type={notification.notification_type.type_name} />
        </View>
      </View>
      <View
        style={{
          width: '90%',
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
            maxHeight: 48,
          }}
        >
          {parseTextFromHtml(notification.body)}
        </Text>
      </View>
    </PressableCard>
  );
}

export default Notificationnotification;
