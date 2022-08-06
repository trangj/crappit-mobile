import React, { useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNBottomSheet from '@gorhom/bottom-sheet';
import { Text } from 'react-native';
import BottomSheet from '../../ui/BottomSheet';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';

type PostOptionsProps = {

};

function PostOptions({ }: PostOptionsProps) {
  const { theme } = useTheme();
  const ref = useRef<RNBottomSheet>(null);

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
        <Text>Hello</Text>
      </BottomSheet>
    </>
  );
}

export default PostOptions;
