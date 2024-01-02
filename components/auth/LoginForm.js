import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import React, {useState} from 'react';
import {BASE_URL} from '../../utils/Constants';
import axios from 'axios';
import {setItem} from '../../utils/Storage';
import {StackActions} from '@react-navigation/native';
import {useTheme} from '../../utils/ThemeContext';

export const LoginForm = ({navigation}) => {
  const {theme, toggleTheme} = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = text => {
    setUsername(text);
  };
  const handlePasswordChange = text => {
    setPassword(text);
  };

  async function login() {
    const options = {
      method: 'POST',
      url: BASE_URL + '/auth/login',
      data: {username: username, password: password},
    };

    try {
      const {data} = await axios.request(options);
      await setItem('Authorization', data.Authorization);
      await setItem('USER_ID', data.USER_ID);
      await setItem('ROLE', data.ROLE);
      showContent();
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  const showContent = () => {
    navigation.dispatch(StackActions.push('MainContent'));
  };

  const backgroundImage =
    theme === 'dark'
      ? require('../../assets/background/ff.png')
      : require('../../assets/background/ffw.png');


  const styles = StyleSheet.create({
    titleText :{
      fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: theme === 'dark' ? '#ffffff' : '#2a2a2a',
            marginBottom: 15,
            textAlign: 'center',
            textShadowColor: theme === 'dark' ? '#ffffff' : '#000',
            textShadowOffset: {width: 4, height: 4},
            textShadowRadius: 100,
    },
    textInput :{
      borderWidth: 1,
            padding: 5,
            marginTop: 5,
            margin: 5,
            borderColor: theme === 'dark' ? '#ffffff' : '#000000',

              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              color: theme === 'dark' ? '#ffffff' : '#2a2a2a'

    },
    button:{
      backgroundColor: theme === 'dark' ? '#ffffff' : '#000000',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            marginTop: 10,
            text : {
            textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              color: theme === 'dark' ? '#000' : '#fff',
    }}


  })

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 50}}>
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={backgroundImage}
            style={{height: 300, width: 400}}
          />
        </View>

        <Text
          style={styles.titleText}>
          Sign in
        </Text>

        <TextInput
          placeholder={'Username'}
          placeholderTextColor={theme === 'dark' ? '#A1A1A1' : '#2a2a2a'}
          onChangeText={handleUsernameChange}
          value={username}
          style={styles.textInput}
        />

        <TextInput
          placeholder={'Password'}
          placeholderTextColor={theme === 'dark' ? '#A1A1A1' : '2a2a2a'}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={password}
          style={styles.textInput}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={login}>
          <Text
            style={styles.button.text}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <Text style={{color: theme === 'dark' ? '#ffffff' : '2a2a2a'}}>Don't have an account ?</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={{color: theme === 'dark' ? '#ffffff' : '2a2a2a', fontWeight: 'bold'}}>_____________________________________________</Text>
        </View>
        <View style={{alignSelf: 'center', marginTop: 5}}>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(StackActions.push('RegisterScreen'))
            }>
            <Text style={{color: theme === 'dark' ? '#ffffff' : '#000000', fontWeight: 'bold', fontSize: 24}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
