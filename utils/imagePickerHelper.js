import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export const launchImagePicker = async () => {
    await checkMediaPermission();
};

const checkMediaPermission = async () => {
    if (Platform.OS !== "web")
    {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted)
        {
            return Promise.reject("We need permission to access photos");
        }
    }
    return Promise.resolve();
};