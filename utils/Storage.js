import AsyncStorage from "@react-native-async-storage/async-storage";

const getItem = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch(e) {
        // error reading value
    }
}

const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
};

export {getItem, setItem};