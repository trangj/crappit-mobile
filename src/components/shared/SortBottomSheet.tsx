import { View } from 'react-native';
import React, { useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNBottomSheet from '@gorhom/bottom-sheet';
import SortSelect from '../../components/shared/SortSelect';
import BottomSheet from '../../ui/BottomSheet';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';

type SortBottomSheetProps = {
  setSortParam: (arg: string) => void;
  sortParam: string;
};

function SortBottomSheet({ setSortParam, sortParam }: SortBottomSheetProps) {
  const { theme } = useTheme();
  const ref = useRef<RNBottomSheet>(null);

  return (
    <>
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          padding: theme.spacing.xs,
        }}
      >
        <Button
          variant="ghost"
          icon={(
            <Ionicons
              name="chevron-down"
              color={theme.colors.textAlt}
              size={22}
            />
    )}
          onPress={() => ref.current?.expand()}
          style={{ flexDirection: 'row-reverse' }}
          textStyle={{ fontSize: 12 }}
        >
          {sortParam.toUpperCase()}
          {' '}
          COMMENTS
        </Button>
      </View>
      <BottomSheet ref={ref}>
        <SortSelect
          setSortParam={setSortParam}
          sortParam={sortParam}
          bottomSheetRef={ref}
        />
      </BottomSheet>
    </>
  );
}

export default SortBottomSheet;
