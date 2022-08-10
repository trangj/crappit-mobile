import React from 'react';
import {
  Button as RNButton, Pressable, PressableProps, ScrollView, View,
} from 'react-native';
import { Header } from '@react-navigation/elements';
import { AddPostStackParamList } from 'src/navigators/AddPostStackNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from 'src/ui/Text';
import { useFormikContext } from 'formik';
import { TextFieldForm } from 'src/ui/TextInputForm';
import FileInputForm from 'src/ui/FileInputForm';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';
import { FormValues } from './AddPostContext';

type AddPostScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AddPostStackParamList, 'AddPost'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface IconButtonProps extends PressableProps {
  active: boolean,
  text: string,
  icon: React.ComponentProps<typeof Ionicons>['name']
}

function IconButton({
  active, text, icon, ...props
} : IconButtonProps) {
  const { theme } = useTheme();
  return (
    <Pressable
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: active ? theme.colors.blue : theme.colors.card,
          width: 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 9999,
        }}
      >
        <Ionicons name={icon} size={24} color={theme.colors.text} />
      </View>
      <Text
        style={{
          color: active ? theme.colors.blue : theme.colors.text,
          fontWeight: 'bold',
          fontSize: 11,
          marginTop: theme.spacing.xs,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

function AddPostScreen({ navigation }: AddPostScreenProps) {
  const { theme } = useTheme();
  const {
    values, handleChange, handleBlur, errors, touched, setFieldValue, submitForm,
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
            title="Next"
            onPress={() => {
              if (!values.title || (
                (values.type === 'link' && !values.link)
                || (values.type === 'photo' && !values.file))) return;
              if (errors.content || errors.link || errors.file) return;
              submitForm();
              navigation.navigate('SelectTopic');
            }}
          />
        )}
      />
      <ScrollView
        style={{
          padding: theme.spacing.lg,
        }}
      >
        <TextFieldForm
          multiline
          onChangeText={handleChange('title')}
          onBlur={handleBlur('title')}
          value={values.title}
          error={errors.title}
          touched={touched.title}
          placeholder="Title"
          style={{
            marginBottom: theme.spacing.lg,
            fontSize: theme.textVariants.mdHeader.fontSize,
            fontWeight: theme.textVariants.mdHeader.fontWeight as any,
          }}
        />
        {values.type === 'text' && (
        <TextFieldForm
          multiline
          onChangeText={handleChange('content')}
          onBlur={handleBlur('content')}
          value={values.content}
          error={errors.content}
          touched={touched.content}
          placeholder="body text (optional)"
          style={{
            marginBottom: theme.spacing.lg,
          }}
        />
        )}
        {values.type === 'link' && (
          <TextFieldForm
            multiline
            onChangeText={handleChange('link')}
            onBlur={handleBlur('link')}
            value={values.link}
            error={errors.link}
            touched={touched.link}
            textContentType="URL"
            autoCapitalize="none"
            placeholder="URL"
            style={{
              marginBottom: theme.spacing.lg,
            }}
          />
        )}
        {values.type === 'photo' && (
        <FileInputForm
          error={errors.file}
          touched={touched.file}
          setFieldValue={setFieldValue}
        />
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: theme.colors.grey,
          borderTopStartRadius: theme.spacing.md,
          borderTopEndRadius: theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.xl,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            marginTop: theme.spacing.sm,
            fontWeight: 'bold',
            fontSize: 11,
          }}
        >
          What Do You Want To Post?
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: theme.spacing.lg,
          }}
        >
          <IconButton
            onPress={() => setFieldValue('type', 'text')}
            icon="text"
            text="Text"
            active={values.type === 'text'}
          />
          <IconButton
            onPress={() => setFieldValue('type', 'link')}
            icon="link"
            text="Link"
            active={values.type === 'link'}
          />
          <IconButton
            onPress={() => setFieldValue('type', 'photo')}
            icon="image"
            text="Image"
            active={values.type === 'photo'}
          />
        </View>
      </View>
    </>
  );
}

export default AddPostScreen;
