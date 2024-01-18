import {
  ImageBackground,
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
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../utils/Constants';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faMoon,
  faPersonBiking,
  faRightFromBracket,
  faSquarePlus,
  faSun,
  faTableCells,
} from '@fortawesome/free-solid-svg-icons';
import FastImage from 'react-native-fast-image';

library.add(
  faMoon,
  faSun,
  faRightFromBracket,
  faTableCells,
  faPersonBiking,
  faSquarePlus,
);

const PAGE_SIZE = 3;
const Account = ({navigation, route}) => {
  const {user_id} = route.params || '';
  const {theme, toggleTheme} = useTheme();
  const {navigateToAccountModal} = route.params || {};
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [button, setButton] = useState('Posts');

  useEffect(() => {
    console.log("REFRESH")
    const loadPosts = async () => {
      console.log('UserID' + user_id);
      try {
        const loggedUser = await getItem('USER_ID');
        const requestString =
          BASE_URL + '/api/social/post/get/' + (user_id || loggedUser);
        console.log(requestString);
        const response = await axios.get(requestString, {
          headers: {
            Authorization: await getItem('Authorization'),
            USER_ID: loggedUser,
          },
        });

        console.log(response.data);

        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const loadUserData = async () => {
      const loggedUser = await getItem('USER_ID');
      const options = {
        method: 'GET',
        url: BASE_URL + '/api/social/user/' + (user_id || loggedUser) + '/info',
        headers: {
          Accept: 'application/json',
          Authorization: await getItem('Authorization'),
          USER_ID: loggedUser,
        },
      };

      try {
        const {data} = await axios.request(options);
        setUserData(data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    loadUserData().then(loadPosts());
  }, [navigation, route.params, user_id]);

  const showModal = type => {
    navigation.dispatch(StackActions.push('AccountModal', {type}));
  };

  const logout = async () => {
    await setItem('Authorization', null);
    await setItem('USER_ID', null);
    await setItem('ROLE', null);
    navigation.dispatch(StackActions.push('LoginScreen'));
  };

  const renderPostsView = () => (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {posts.map(post => (
        <View key={post.id} style={{width: '33.33%'}}>
          <FastImage
            source={{uri: `data:image/png;base64,${post.image}`}}
            style={{width: '100%', height: 100}}
          />
        </View>
      ))}
    </View>
  );

  const handleButtonPress = () => {
    setButton(prevButton => (prevButton === 'Posts' ? 'Grid' : 'Posts'));
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
        margin: 12,
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
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 10,
    },
    items: {
      margin: 12,
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      height: 'fit-content',
      width: '100%',
      padding: 5,
      color: theme === 'dark' ? '#ffffff' : '#000000',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
      gap: 10,
      text: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: 'white',
        fontWeight: 'bold',
      },
    },
    themeColor: {
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    grid: {
      marginHorizontal: 12,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
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
            <Avatar avatar={userData.avatar} />
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
              <Pressable>
                <Text style={styles.followContainer.text}>Posts</Text>
                <Text style={styles.followContainer.value}>
                  {userData.posts}
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleTheme} style={styles.items}>
          <FontAwesomeIcon
            icon={'sun'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={22}
            style={{marginHorizontal: 5}}
          />
          <Text style={styles.themeColor}>
            {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          </Text>
          <FontAwesomeIcon
            icon={'moon'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={22}
            style={{marginHorizontal: 5}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.postContainer.buttons}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setButton('Posts')}>
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
          onPress={() => setButton('Routines')}>
          <FontAwesomeIcon
            icon={'person-biking'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={30}
            style={{marginHorizontal: 20}}
          />
        </TouchableOpacity>
      </View>

      {button === 'Posts' ? (
        <View style={styles.grid}>
          {posts.map(post => (
            <View key={post.id} style={{width: '32.00%', margin: 1}}>
              <FastImage
                source={{uri: `data:image/png;base64,${post.image}`}}
                style={{width: '100%', height: 100}}
              />
            </View>
          ))}
        </View>
      ) : (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text>cau haoj</Text>
        </View>
      )}
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
      <Stack.Screen
        name="AccountScreen"
        component={Account}
      />
      <Stack.Screen name="AccountModal" component={AccountModal} />
    </Stack.Navigator>
  );
};

export default AccountStack;
