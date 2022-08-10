import React from 'react';
import { Button as RNButton } from 'react-native';
import { Header } from '@react-navigation/elements';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import useTopics from 'src/hooks/topic-query/useTopics';
import { Picker } from '@react-native-picker/picker';
import { useFormikContext } from 'formik';
import Text from 'src/ui/Text';
import { useTheme } from '../../context/ThemeState';
import { AddPostStackParamList } from '../../navigators/AddPostStackNavigator';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import Button from '../../ui/Button';
import { FormValues } from './AddPostContext';

type SelectTopicScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AddPostStackParamList, 'SelectTopic'>,
  NativeStackScreenProps<RootStackParamList>
>;

function SelectTopicScreen({ navigation }: SelectTopicScreenProps) {
  const { theme } = useTheme();
  const { data } = useTopics();
  const {
    values, errors, touched, setFieldValue, submitForm,
  } = useFormikContext<FormValues>();

  return (
    <>
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
            title="Post"
            onPress={async () => {
              try {
                await submitForm();
              } catch {
                navigation.navigate('DrawerNavigator');
              }
            }}
          />
        )}
      />
      <Picker
        selectedValue={values.topic}
        onValueChange={(value) => {
          setFieldValue('topic', value);
        }}
        itemStyle={{
          color: theme.colors.text,
        }}
      >
        {data && data.map((topic) => (
          <Picker.Item
            key={topic.title}
            label={`t/${topic.title}`}
            value={topic.title}
          />
        ))}
      </Picker>
      {!!errors.topic && touched.topic && (
      <Text
        style={{
          color: theme.colors.red,
          marginHorizontal: theme.spacing.md,
        }}
      >
        {errors.topic}
      </Text>
      )}
    </>
  );
}

export default SelectTopicScreen;
