import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { getFirebaseApp } from "./firebaseHelper";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

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

export const uploadImageAsync = async (uri) => {
    const { app } = getFirebaseApp();

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const pathFolder = 'profilePics';
    const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`);

    await uploadBytesResumable(storageRef, blob);

    blob.close();
    return await getDownloadURL(storageRef);
}

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