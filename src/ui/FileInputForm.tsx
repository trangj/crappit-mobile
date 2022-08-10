import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Image, View } from 'react-native';
import { theme } from 'src/theme';
import Button from './Button';
import Text from './Text';

interface FileInputFormProps {
  error: string | undefined,
  touched: boolean | undefined,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

function FileInputForm({ error, touched, setFieldValue }: FileInputFormProps) {
  const [uri, setUri] = useState('');
  const handleImageSelection = async () => {
    if (Constants.platform?.ios) {
      const imageLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!imageLibraryStatus.granted) return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (res.cancelled) return;

    setUri(res.uri);

    setFieldValue('file', res);
  };

  const handleCamera = async () => {
    if (Constants.platform?.ios) {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraStatus.granted) return;
    }

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (res.cancelled) return;

    setUri(res.uri);

    setFieldValue('file', res);
  };

  return (
    <>
      {uri ? (
        <Image
          source={{ uri }}
          style={{
            height: 200, width: 200, borderRadius: theme.spacing.ms, alignSelf: 'center',
          }}
        />
      ) : null}
      <View
        style={{
          display: 'flex',
          marginTop: theme.spacing.lg,
        }}
      >
        <Button
          onPress={handleImageSelection}
          style={{ marginBottom: theme.spacing.xs }}
        >
          Select A Photo
        </Button>
        <Button onPress={handleCamera}>Take A Photo</Button>
      </View>
      {!!error && touched && (
      <Text
        style={{
          color: theme.colors.red,
          marginHorizontal: theme.spacing.md,
        }}
      >
        {error}
      </Text>
      )}
    </>
  );
}

export default FileInputForm;
