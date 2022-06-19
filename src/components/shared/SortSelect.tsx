import { View } from 'react-native';
import React from 'react';
import { useTheme } from '../../context/ThemeState';
import Text from '../../ui/Text';
import Button from '../../ui/Button';
import MenuButton from '../../ui/MenuButton';

type SortSelectParam = {
  sortParam: string;
  setSortParam: (arg: string) => void;
  bottomSheetRef: any;
};

function SortSelect({
  setSortParam,
  sortParam,
  bottomSheetRef,
}: SortSelectParam) {
  const { theme } = useTheme();

  const handleSortChange = (newSortParam: string) => {
    setSortParam(newSortParam);
    bottomSheetRef.current.close();
  };

  return (
    <View
      style={{
        padding: theme.spacing.md,
        display: 'flex',
        height: '100%',
      }}
    >
      <Text
        style={{ marginBottom: theme.spacing.sm, color: theme.colors.textAlt }}
      >
        SORT BY
      </Text>
      <View style={{ height: 1, backgroundColor: theme.colors.textAlt }} />
      <MenuButton
        onPress={() => handleSortChange('hot')}
        active={sortParam === 'hot'}
      >
        Hot
      </MenuButton>
      <MenuButton
        onPress={() => handleSortChange('new')}
        active={sortParam === 'new'}
      >
        New
      </MenuButton>
      <MenuButton
        onPress={() => handleSortChange('top')}
        active={sortParam === 'top'}
      >
        Top
      </MenuButton>
      <View style={{ marginTop: 'auto', marginBottom: theme.spacing.md }}>
        <Button variant="filled" onPress={() => bottomSheetRef.current.close()}>
          Close
        </Button>
      </View>
    </View>
  );
}

export default SortSelect;
