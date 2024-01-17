import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground, Alert,
} from "react-native";
import {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {BASE_URL} from '../../utils/Constants';
import {getItem} from '../../utils/Storage';
import axios from 'axios';
import {useTheme} from '../../utils/ThemeContext';
import TextImput from "./TextImput";
import MultilineTextInputExample from "./TextImput";

export const AddPost = ({navigation}) => {
  const [value, onChangeText] = useState('');
  const [image, setImage] = useState(null);
  const {theme, toggleTheme} = useTheme();
  const ImgaePicker = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}).then(
      response => {
        console.log(response.assets);
        setImage(response.assets[0].base64);
      },
    );
  };

  const upload = async () => {
    const options = {
      method: 'POST',
      url: BASE_URL + '/api/social/post/upload',
      headers: {
        Accept: 'application/json',
        Authorization: await getItem('Authorization'),
        USER_ID: await getItem('USER_ID'),
      },
      data: {image: image, description: value},
    };

    try {
      const {data} = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    Alert.alert('Post was uploaded');
    back();
  };


  const backgroundImage =
    theme === 'dark'
      ? require('../../assets/background/ff2_white.png')
      : require('../../assets/background/ff2_black.png');

  const back = () => {
    setImage(null);
  };

  const handleTextChange = (text) => {
    onChangeText(text);
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme === 'dark' ? '#ffffff' : '#1f1f1f',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      alignSelf: 'center',
      font: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme === 'dark' ? '#000000' : '#ffffff',
        fontFamily: 'monospace',
      },
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });



  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {image ? (
        <View style={{alignItems: 'center', paddingTop: 70}}>
          <FastImage
            style={{width: 400, height: 400}}
            source={{
              uri: 'data:image/jpeg;base64,' + image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View>
            <View style={styles.inputContainer}>
              <MultilineTextInputExample onTextChange={handleTextChange} />
            </View>
            <TouchableOpacity style={styles.button} onPress={ImgaePicker}>
              <Text style={styles.button.font}>Choose Another</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity style={styles.button} onPress={upload}>
                <Text style={styles.button.font}>Upload</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={back}>
                <Text style={styles.button.font}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <FastImage
            style={{width: 400, height: 400}}
            source={backgroundImage}
            resizeMode={FastImage.resizeMode.contain}
          />

          <TouchableOpacity
            style={{...styles.button, marginTop: 10}}
            onPress={ImgaePicker}>
            <Text style={styles.button.font}>Choose Image</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
