import "react-native-gesture-handler";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./src/context/UserState";
import { ThemeProvider } from "./src/context/ThemeState";
import Toast from "react-native-toast-message";
import RootStackNavigator from "./src/navigators/RootStackNavigator";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { PortalProvider } from "@gorhom/portal";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<PortalProvider>
					<UserProvider>
						<RootStackNavigator />
						<Toast />
					</UserProvider>
				</PortalProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
