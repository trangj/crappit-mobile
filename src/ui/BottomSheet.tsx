import React, { forwardRef, ReactNode } from 'react';
import RNBottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { useTheme } from '../context/ThemeState';

type BottomSheetProps = {
  children: ReactNode;
};

const BottomSheet = forwardRef<RNBottomSheet, BottomSheetProps>(
  ({ children }, ref) => {
    const { theme } = useTheme();

    return (
      <Portal>
        <RNBottomSheet
          ref={ref}
          snapPoints={[300]}
          index={-1}
          // eslint-disable-next-line react/no-unstable-nested-components
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
            />
          )}
          backgroundStyle={{
            backgroundColor: theme.colors.card,
            borderRadius: theme.spacing.sm,
          }}
          style={{ marginHorizontal: theme.spacing.sm }}
        >
          {children}
        </RNBottomSheet>
      </Portal>
    );
  },
);

export default BottomSheet;
