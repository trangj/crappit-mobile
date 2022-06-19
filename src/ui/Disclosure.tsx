import {
  View,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  PressableProps,
} from 'react-native';
import React, { ReactNode, useState } from 'react';

type DisclosureProps = PressableProps & {
  children: ReactNode;
  headerContent: ReactNode;
};

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Disclosure({ children, headerContent, ...props }: DisclosureProps) {
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      onPress={() => {
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.linear,
          duration: 200,
        });
        setOpen(!open);
      }}
      {...props}
    >
      <View>{headerContent}</View>
      <View>{open && children}</View>
    </Pressable>
  );
}

export default Disclosure;
