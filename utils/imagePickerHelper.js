import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export const launchImagePicker = async () => {
    await checkMediaPermission();

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspectRatio: [1, 1],
        quality: 0.5,
    });

    if (!result.canceled)
    {
        return result.assets;
    }
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