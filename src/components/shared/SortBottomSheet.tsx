import { View } from "react-native";
import React, { useRef } from "react";
import SortSelect from "../../components/shared/SortSelect";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "../../ui/BottomSheet";
import Button from "../../ui/Button";
import { useTheme } from "../../context/ThemeState";
import RNBottomSheet from "@gorhom/bottom-sheet";

type SortBottomSheetProps = {
	setSortParam: (arg: string) => void;
	sortParam: string;
};

const SortBottomSheet = ({ setSortParam, sortParam }: SortBottomSheetProps) => {
	const { theme } = useTheme();
	const ref = useRef<RNBottomSheet>(null);

	return (
		<>
			<View
				style={{
					display: "flex",
					alignItems: "flex-start",
					padding: theme.spacing.xs,
				}}
			>
				<Button
					variant="ghost"
					icon={
						<Ionicons
							name="chevron-down"
							color={theme.colors.textAlt}
							size={22}
						/>
					}
					onPress={() => ref.current?.expand()}
					style={{ flexDirection: "row-reverse" }}
					textStyle={{ fontSize: 12 }}
				>
					{sortParam.toUpperCase()} COMMENTS
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
};

export default SortBottomSheet;
