import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Button as RNButton,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '@react-navigation/elements';
import Toast from 'react-native-toast-message';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigators/RootStackNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as yup from 'yup';
import { Formik } from 'formik';
import { AuthStackParamList } from '../../navigators/AuthStackNavigator';
import Heading from '../../ui/Heading';
import { Card } from '../../ui/Card';
import Text from '../../ui/Text';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';
import { useUser } from '../../context/UserState';
import { TextFieldForm } from '../../ui/TextInputForm';

const schema = yup.object({
  username: yup.string().required('Enter your username'),
  password: yup.string().required('Enter your password'),
});

type LoginScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface FormValues {
  username: string;
  password: string;
}

function LoginScreen({ navigation }: LoginScreenProps) {
  const { loginUser } = useUser();
  const { theme } = useTheme();

  const handleSubmit = async ({ username, password }: FormValues) => {
    try {
      const user = {
        username,
        password,
      };
      await loginUser(user);
      navigation.navigate('DrawerNavigator');
    } catch (err) {
      console.log(err);
    }
  };

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
            title="Sign up"
            onPress={() => navigation.navigate('Register')}
          />
        )}
      />
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <ScrollView>
              <Card
                style={{
                  display: 'flex',
                  padding: theme.spacing.md,
                  height: '100%',
                }}
              >
                <Heading>Log in</Heading>
                <Text
                  style={{
                    paddingHorizontal: theme.spacing.sm,
                    paddingTop: theme.spacing.md,
                    paddingBottom: theme.spacing.lg,
                    color: theme.colors.textAlt,
                  }}
                >
                  By continuing, you agree to our User Agreement and Privacy
                  Policy.
                </Text>
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onPress={() => null}
                  icon={(
                    <Ionicons
                      name="logo-google"
                      size={22}
                      color={theme.colors.blue}
                      style={{ marginRight: 12 }}
                    />
        )}
                >
                  Continue with Google
                </Button>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: theme.spacing.lg,
                    marginVertical: theme.spacing.md,
                  }}
                >
                  <View
                    style={{
                      width: '45%',
                      height: 1,
                      backgroundColor: theme.colors.grey,
                    }}
                  />
                  <Text
                    style={{
                      marginHorizontal: theme.spacing.sm,
                      color: theme.colors.textAlt,
                      fontWeight: 'bold',
                    }}
                  >
                    OR
                  </Text>
                  <View
                    style={{
                      width: '45%',
                      height: 1,
                      backgroundColor: theme.colors.grey,
                    }}
                  />
                </View>
                <TextFieldForm
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  error={errors.username}
                  touched={touched.username}
                  placeholder="Username"
                  textContentType="username"
                  autoCompleteType="username"
                />
                <TextFieldForm
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                  placeholder="Password"
                  textContentType="password"
                  autoCompleteType="password"
                  secureTextEntry
                />
              </Card>
            </ScrollView>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <Card
                style={{
                  padding: theme.spacing.md,
                }}
              >
                <Button
                  variant="filled"
                  size="lg"
                  fullWidth
                  onPress={handleSubmit as any}
                >
                  Continue
                </Button>
              </Card>
            </KeyboardAvoidingView>
          </>
        )}
      </Formik>
      <Toast />
    </>
  );
}

export default LoginScreen;
