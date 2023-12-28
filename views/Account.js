import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Avatar from '../components/account/Avatar';
import {useTheme} from '../utils/ThemeContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountModal from '../components/account/AccountModal';
import {StackActions} from '@react-navigation/native';
import Header from '../components/header/Header';
import {getItem, setItem} from '../utils/Storage';
import {useEffect, useState} from 'react';
import {BASE_URL} from '../utils/Constants';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faMoon,
  faPersonBiking,
  faRightFromBracket,
  faTableCells,
} from '@fortawesome/free-solid-svg-icons';

library.add(faMoon, faRightFromBracket, faTableCells, faPersonBiking);

const Account = ({navigation, route}) => {
  const {theme, toggleTheme} = useTheme();
  const {navigateToAccountModal} = route.params || {};
  const [userData, setUserData] = useState({});

  const showModal = type => {
    navigation.dispatch(StackActions.push('AccountModal', {type}));
  };

  useEffect(async () => {
    const USER_ID = await getItem('USER_ID');
    const options = {
      method: 'GET',
      url: BASE_URL + `/api/social/user/${USER_ID}/info`,
      headers: {
        Accept: 'application/json',
        Authorization: await getItem('Authorization'),
        USER_ID: await getItem('USER_ID'),
      },
    };

    try {
      const {data} = await axios.request(options);
      setUserData(data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, []);

  const logout = async () => {
    await setItem('Authorization', null);
    await setItem('USER_ID', null);
    await setItem('ROLE', null);
    navigation.dispatch(StackActions.push('LoginScreen'));
  };

  const styles = StyleSheet.create({
    avatarContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    followContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      flex: 1,
      alignItems: 'center',
      gap: 10,
      text: {
        fontSize: 12,
        fontFamily: 'monospace',
        color: theme === 'dark' ? '#c5c5c5' : '#696969',
      },
      value: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        color: theme === 'dark' ? '#ffffff' : '#000000',
      },
    },
    accountContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
    },
    container: {
      margin: 12,
      padding: 12,
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      // alignItems: 'center',
    },
    postContainer: {
      buttons: {
        margin: 20,
        padding: 30,
        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        gap: 10,
      },
    },
    accountName: {
      fontSize: 20,
      fontFamily: 'Roboto-Medium',
      margin: 10,
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    yourPosts: {
      text: {
        fontSize: 20,
        fontFamily: 'monospace',
        color: theme === 'dark' ? '#c5c5c5' : '#696969',
      },
    },
  });

  return (
    <View>
      <View
        style={{
          ...styles.container,
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: 120,
        }}>
        <View style={styles.accountContainer}>
          <View style={styles.avatarContainer}>
            <Avatar />
          </View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.accountName}>
              {userData.username}
              <TouchableOpacity onPress={logout}>
                <FontAwesomeIcon
                  icon={'right-from-bracket'}
                  color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
                  size={20}
                  style={{marginHorizontal: 15}}
                />
              </TouchableOpacity>
            </Text>
            <View style={styles.followContainer}>
              <Pressable onPress={() => showModal('Posts')}>
                <Text style={styles.followContainer.text}>Posts</Text>
                <Text style={styles.followContainer.value}>
                  {userData.workouts}
                </Text>
              </Pressable>
              <Pressable onPress={() => showModal('Followers')}>
                <Text style={styles.followContainer.text}>Followers</Text>
                <Text style={styles.followContainer.value}>
                  {userData.followers}
                </Text>
              </Pressable>
              <Pressable onPress={() => showModal('Following')}>
                <Text style={styles.followContainer.text}>Followings</Text>
                <Text style={styles.followContainer.value}>
                  {userData.following}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={toggleTheme}>
        <FontAwesomeIcon
          icon={'moon'}
          color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
          size={40}
          style={{marginHorizontal: 20}}
        />
      </TouchableOpacity>

      <View style={styles.postContainer.buttons}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => showModal('Posts')}>
          <FontAwesomeIcon
            icon={'table-cells'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={30}
            style={{marginHorizontal: 20}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => showModal('Routines')}>
          <FontAwesomeIcon
            icon={'person-biking'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={30}
            style={{marginHorizontal: 20}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const AccountStack = ({navigation}) => {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        header: ({navigation, route, options}) => {
          let title = 'Account';
          let modal = false;

          if (route.name === 'AccountModal') {
            title = route.params.type;
            modal = true;
          }

          return (
            <Header
              title={title}
              theme={theme}
              modal={modal}
              navigation={navigation}
              route={route.name}
            />
          );
        },
      })}>
      <Stack.Screen name="AccountScreen" component={Account} />
      <Stack.Screen name="AccountModal" component={AccountModal} />
    </Stack.Navigator>
  );
};

export default AccountStack;
