import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BASE_URL} from '../../utils/Constants';
import axios from 'axios';
import {setItem} from '../../utils/Storage';
import {StackActions} from '@react-navigation/native';

export const LoginForm = ({navigation}) => {
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

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 50}}>
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={require('../../assets/background/lift.png')}
            style={{height: 400, width: 400}}
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
          Sign in
        </Text>

        <TextInput
          placeholder={'Username'}
          onChangeText={handleUsernameChange}
          value={username}
          style={{
            margin: 5,
            padding: 5,
            borderWidth: 1,
            borderColor: '#f06129',
          }}
        />

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
          onPress={login}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              color: '#fff',
            }}>
            LOGIN
          </Text>
        </TouchableOpacity>

        <Text style={{textAlign: 'center', color: 'black', marginBottom: 10}}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={''}
              style={{
                borderColor: '#f06129',
                borderWidth: 3,
                borderRadius: 50,
                paddingHorizontal: 8,
                paddingVertical: 8,
              }}>
              <ImageBackground
                source={require('../../assets/badges/gogel.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Don't have an account ?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(StackActions.push('RegisterScreen'))
            }>
            <Text style={{color: '#f06129', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
