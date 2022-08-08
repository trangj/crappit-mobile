import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from 'src/theme';

type NotificationIconProps = {
  type: string
}

function NotificationIcon({ type }: NotificationIconProps) {
  if (type === 'POST_REPLY' || type === 'COMMENT_REPLY') {
    return (
      <Ionicons name="chatbox" color={theme.colors.blue} />
    );
  }
  return null;
}

export default NotificationIcon;
