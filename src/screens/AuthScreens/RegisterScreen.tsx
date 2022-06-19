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
import { CompositeScreenProps } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from 'src/navigators/RootStackNavigator';
// eslint-disable-next-line import/no-extraneous-dependencies
import Ionicons from '@expo/vector-icons/Ionicons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextFieldForm } from '../../ui/TextInputForm';
import { AuthStackParamList } from '../../navigators/AuthStackNavigator';
import Heading from '../../ui/Heading';
import { Card } from '../../ui/Card';
import Text from '../../ui/Text';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';
import { useUser } from '../../context/UserState';

const schema = yup.object({
  username: yup
    .string()
    .required('Enter an username')
    .matches(/^(\S+$)/, 'Username cannot have any white space'),
  email: yup.string().email().required('Enter an email'),
  password: yup
    .string()
    .required('Enter a password')
    .min(6, 'Your password must be at least 6 characters long')
    .matches(/^(\S+$)/, 'Password cannot have any white space'),
  // password2: yup
  // .string()
  // .oneOf([yup.ref("password"), undefined], "Passwords must match")
  // .required("Confirm your password"),
});

type RegisterScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Register'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface FormValues {
  email: string;
  username: string;
  password: string;
}

function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { loginUser } = useUser();
  const { theme } = useTheme();

  const handleSubmit = async ({ email, username, password }: FormValues) => {
    try {
      const user = {
        email,
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
            title="Log in"
            onPress={() => navigation.navigate('Login')}
          />
        )}
      />
      <Formik
        initialValues={{
          email: '',
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
                <Heading>Hi new friend, welcome to Crappit</Heading>
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
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  placeholder="Email"
                  textContentType="emailAddress"
                  autoCompleteType="email"
                  keyboardType="email-address"
                />
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

export default RegisterScreen;
