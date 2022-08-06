import React, { useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNBottomSheet from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native';
import BottomSheet from '../../ui/BottomSheet';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';
import MenuButton from '../../ui/MenuButton';

type CommentOptionsProps = {

};

function CommentOptions({ }: CommentOptionsProps) {
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
            icon={(
              <Ionicons
                name="trash-bin-outline"
                size={24}
                color="white"
              />
            )}
          >
            Delete Comment
          </MenuButton>
        </View>
      </BottomSheet>
    </>
  );
}

export default CommentOptions;
