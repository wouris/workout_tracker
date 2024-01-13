import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {BASE_URL} from '../../utils/Constants';
import {getItem} from '../../utils/Storage';
import axios from 'axios';

export const AddPost = ({navigation}) => {
  const [image, setImage] = useState(null);
  const ImgaePicker = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}).then(
      response => {
        console.log(response.assets);
        setImage(response.assets[0].base64);
      },
    );
  };

  const toBase64 = image => {};
  const upload = async () => {
    const options = {
      method: 'POST',
      url: BASE_URL + '/api/social/post/upload',
      headers: {
        Accept: 'application/json',
        Authorization: await getItem('Authorization'),
        USER_ID: await getItem('USER_ID'),
      },
      data: {image: image, description: 'string'},
    };

    try {
      const {data} = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
  });

  return (
    <View>
      {image ? (
        <>
          <FastImage
            style={{width: 200, height: 200}}
            source={{
              uri: 'data:image/jpeg;base64,' + image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <TouchableOpacity style={styles.button} onPress={ImgaePicker}>
            <Text>Choose Another</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={upload}>
            <Text>Upload</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={ImgaePicker}>
          <Text>Choose Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
