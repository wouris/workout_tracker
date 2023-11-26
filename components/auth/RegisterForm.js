import {StackActions} from '@react-navigation/native';
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import React, {useState} from 'react';
import {setItem} from '../../utils/Storage';
import {BASE_URL} from '../../utils/Constants';
import {useTheme} from '../../utils/ThemeContext';

export const RegisterForm = ({navigation}) => {
  const {theme, toggleTheme} = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = text => {
    setUsername(text);
  };
  const handlePasswordChange = text => {
    setPassword(text);
  };
  const handleEmailChange = text => {
    setEmail(text);
  };

  async function register() {
    const options = {
      method: 'POST',
      url: BASE_URL + '/auth/register',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      data: {email: email, username: username, password: password},
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
      flex: 1,
      margin: 5,
      padding: 5,
            borderColor: theme === 'dark' ? '#ffffff' : '#000000',

              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              color: theme === 'dark' ? '#ffffff' : '#2a2a2a'
            
    },
    
    passwordInput :{
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
              color: theme === 'dark' ? '#000000' : '#ffffff',
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
          Register
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            placeholder={'Username'}
            placeholderTextColor={theme === 'dark' ? '#A1A1A1' : '2a2a2a'}
            onChangeText={handleUsernameChange}
            value={username}
            style={styles.textInput}
          />

<TextInput
            placeholder={'E-mail'}
            placeholderTextColor={theme === 'dark' ? '#A1A1A1' : '2a2a2a'}
            onChangeText={handleEmailChange}
            value={email}
            style={styles.textInput}
          />

        </View>

        <TextInput
          placeholder={'Password'}
          placeholderTextColor={theme === 'dark' ? '#A1A1A1' : '2a2a2a'}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={password}
          style={styles.passwordInput}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={register}>
          <Text
            style={styles.button.text}>
            REGISTER
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <Text style={{color: theme === 'dark' ? '#ffffff' : '2a2a2a'}}>Already have an account ?</Text>
          </View>
          <View style={{alignSelf: 'center'}}>
          <Text style={{color: theme === 'dark' ? '#ffffff' : '2a2a2a', fontWeight: 'bold'}}>_____________________________________________</Text>
        </View>
          <View style={{alignSelf: 'center', marginTop: 10}}>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(StackActions.push('LoginScreen'))
            }>
            <Text style={{color: theme === 'dark' ? '#ffffff' : '#000000', fontWeight: 'bold', fontSize: 24}}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
