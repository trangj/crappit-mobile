import React, { useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNBottomSheet from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import MenuButton from 'src/ui/MenuButton';
import { useNavigation } from '@react-navigation/native';
import useReadAllNotifications from 'src/hooks/notification-query/useReadAllNotifications';
import { NotificationScreenNavigationProp } from 'src/screens/NotificationScreens/NotificationScreen';
import BottomSheet from '../../ui/BottomSheet';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';

function NotificationOptions() {
  const { theme } = useTheme();
  const { mutateAsync } = useReadAllNotifications();
  const ref = useRef<RNBottomSheet>(null);
  const navigation = useNavigation<NotificationScreenNavigationProp>();

  const handleReadAllNotification = async () => {
    try {
      await mutateAsync();
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
            onPress={handleReadAllNotification}
            icon="checkbox-outline"
            active
          >
            Mark all notifications read
          </MenuButton>
          <MenuButton
            onPress={() => {
              navigation.navigate('NotificationSettings');
              ref.current?.close();
            }}
            icon="settings-outline"
            active
          >
            Edit notification settings
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

export default NotificationOptions;
