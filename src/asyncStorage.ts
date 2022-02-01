import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveState = (state: any, stateName: string) => {
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem(stateName, serializedState);
};

export const loadState = async (stateName: string) => {
    const res = await AsyncStorage.getItem(stateName);
    return res !== null ? JSON.parse(res) : undefined;
};

export const removeState = (stateName: string) => {
    AsyncStorage.removeItem(stateName);
};