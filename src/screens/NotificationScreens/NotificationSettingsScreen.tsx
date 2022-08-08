import React, { useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { useUser } from 'src/context/UserState';
import Text from 'src/ui/Text';
import axios from 'src/axiosConfig';
import { useTheme } from 'src/context/ThemeState';

type Setting = {
  user_id: number,
  notification_type_id: number,
  value: boolean,
  notification_type: {
    description: string
  }
}

function NotificationSettingsScreen() {
  const { user } = useUser();
  const { theme } = useTheme();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotificationSettings() {
      try {
        setLoading(true);
        const res = await axios.get('/api/notification/settings');
        setSettings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      fetchNotificationSettings();
    }
  }, [user]);

  const handleChange = async (index: number) => {
    try {
      await axios.put('/api/notification/settings', {
        notification_type_id: settings[index].notification_type_id,
      });
      const newSettings = settings.map((setting, i) => {
        if (i === index) {
          setting.value = !setting.value;
        }
        return setting;
      });
      setSettings(newSettings);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <Text
        style={{
          padding: theme.spacing.sm,
          alignItems: 'center',
          color: theme.colors.textAlt,
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: 12,
        }}
      >
        Activity
      </Text>
      <View>
        {!loading && settings.map((setting, i) => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: theme.spacing.xs,
              paddingHorizontal: theme.spacing.md,
              backgroundColor: theme.colors.card,
            }}
            key={i}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: theme.colors.text,
              }}
            >
              {setting.notification_type.description}
            </Text>
            <Switch
              value={setting.value}
              onValueChange={() => handleChange(i)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default NotificationSettingsScreen;
