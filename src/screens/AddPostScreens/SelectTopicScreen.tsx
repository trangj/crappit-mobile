import React from 'react';
import { Button as RNButton } from 'react-native';
import { Header } from '@react-navigation/elements';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeState';
import { AddPostStackParamList } from '../../navigators/AddPostStackNavigator';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import Button from '../../ui/Button';

type SelectTopicScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AddPostStackParamList, 'SelectTopic'>,
  NativeStackScreenProps<RootStackParamList>
>;

function SelectTopicScreen({ navigation }: SelectTopicScreenProps) {
  const { theme } = useTheme();

  return (
    <Header
      title=""
      headerLeftContainerStyle={{ paddingLeft: theme.spacing.md }}
      headerRightContainerStyle={{ paddingRight: theme.spacing.md }}
      headerLeft={() => (
        <Button
          variant="ghost"
          onPress={() => navigation.navigate('DrawerNavigator')}
          icon={(
            <Ionicons
              name="close-outline"
              size={35}
              color={theme.colors.textAlt}
            />
     )}
        />
      )}
      headerRight={() => (
        <RNButton
          title="Next"
          onPress={() => navigation.navigate('AddPost')}
        />
      )}
    />
  );
}

export default SelectTopicScreen;
