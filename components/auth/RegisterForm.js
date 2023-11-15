import {StackActions} from '@react-navigation/native';
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import React, {useState} from 'react';
import {setItem} from '../../utils/Storage';
import {BASE_URL} from '../../utils/Constants';

export const RegisterForm = ({navigation}) => {
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

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 50}}>
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={require('../../assets/background/body2.png')}
            style={{height: 400, width: 500}}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 15,
            textAlign: 'center',
            textShadowColor: '#f06129',
            textShadowOffset: {width: 4, height: 4},
            textShadowRadius: 100,
          }}>
          Register
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            placeholder={'Username'}
            onChangeText={handleUsernameChange}
            value={username}
            style={{
              flex: 1,
              margin: 5,
              padding: 5,
              borderWidth: 1,
              borderColor: '#f06129',
            }}
          />

          <TextInput
            placeholder={'E-mail'}
            onChangeText={handleEmailChange}
            value={email}
            style={{
              flex: 1,
              margin: 5,
              padding: 5,
              borderWidth: 1,
              borderColor: '#f06129',
            }}
          />
        </View>

        <TextInput
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={password}
          style={{
            borderWidth: 1,
            padding: 5,
            marginTop: 5,
            margin: 5,
            borderColor: '#f06129',
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#f06129',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            marginTop: 10,
          }}
          onPress={register}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              color: '#fff',
            }}>
            REGISTER
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already have an account ?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(StackActions.push('LoginScreen'))
            }>
            <Text style={{color: '#f06129', fontWeight: '700'}}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
