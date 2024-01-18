import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCheck, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {BASE_URL} from '../../utils/Constants';
import axios from 'axios';
import {getItem, setItem} from '../../utils/Storage';
import {useTheme} from '../../utils/ThemeContext';
import FastImage from 'react-native-fast-image';
import Avatar from '../account/Avatar';

library.add(faSearch, faPlus, faCheck);

export const Search = ({navigation}) => {
  const [followedUsers, setFollowedUsers] = useState([]);
  const {theme, toggleTheme} = useTheme();
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    const noa = async () => {
      const options = {
        method: 'GET',
        url: BASE_URL + '/api/social/user/all',
        headers: {
          Accept: 'application/json',
          Authorization: await getItem('Authorization'),
          USER_ID: await getItem('USER_ID'),
        },
      };

      try {
        const {data} = await axios.request(options);
        console.log(data);
        setData(data);
        setFilteredData(data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    noa();
  }, []);

  const [filteredData, setFilteredData] = useState(data);

  const styles = StyleSheet.create({
    searchBox: {
      alignItems: 'center',
      width: '100%',
      margin: 10,
      height: 40,
      display: 'flex',
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: theme === 'dark' ? '#ffffff' : '#000000',
      borderRadius: 20,
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      text: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: theme === 'dark' ? '#ffffff' : '#2a2a2a',
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      margin: 50,
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      height: 'fit-content',
      width: '100%',
      borderRadius: 12,
      text: {
        marginLeft: 12,
        fontSize: 16,
        fontFamily: 'monospace',
        color: theme === 'dark' ? '#ffffff' : '#2a2a2a',
        width: '100%',
        fontWeight: 'bold',
      },
      followText: {
        fontSize: 16,
        fontFamily: 'monospace',
        color: theme === 'dark' ? '#ffffff' : '#2a2a2a',
        width: '100%',
      },
    },
    items: {
      margin: 20,
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      height: 'fit-content',
      width: '100%',
      text: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: 'white',
        fontWeight: 'bold',
      },
    },
  });

  const redirect = item => {
    console.log(item.id);
    navigation.navigate('AccountScreen', {
      user_id: item.id,
    });
  };

  const follow = async item => {
    const isFollowing = followedUsers.includes(item.id);

    const baseOptions = {
      headers: {
        Accept: 'application/json',
        Authorization: await getItem('Authorization'),
        USER_ID: await getItem('USER_ID'),
      },
      data: {
        followingId: item.id,
      },
    };

    let options;

    if (isFollowing) {
      // If already following, unfollow
      options = {
        ...baseOptions,
        method: 'DELETE',
        url: BASE_URL + '/api/social/user/unfollow',
      };
    } else {
      // If not following, follow
      options = {
        ...baseOptions,
        method: 'POST',
        url: BASE_URL + '/api/social/user/follow',
      };
    }

    try {
      const {data} = await axios.request(options);
      console.log(data);

      // Update the state to indicate that the button has been pressed
      if (isFollowing) {
        setFollowedUsers(prevUsers =>
          prevUsers.filter(userId => userId !== item.id),
        );
      } else {
        setFollowedUsers(prevUsers => [...prevUsers, item.id]);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <View style={{alignItems: 'center', margin: 10}}>
      {/* ... (other code) */}
      <View style={styles.modal}>
        <FlatList
          data={filteredData}
          renderItem={({item}) => (
            <View style={styles.items}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/*Add onPress to navigate to user profile*/}
                <TouchableOpacity onPress={() => redirect(item)}>
                  <Avatar avatar={item.avatar} />
                </TouchableOpacity>
                <View
                  style={{flexDirection: 'row', marginLeft: 10, width: '60%'}}>
                  <Text style={styles.modal.text}>{item.username}</Text>
                  {/*add follow button functionality*/}
                  <TouchableOpacity onPress={() => follow(item)}>
                    {followedUsers.includes(item.id) ? (
                      <FontAwesomeIcon
                        icon={'check'}
                        size={20}
                        color={theme === 'dark' ? '#ffffff' : '#000000'}
                        style={{marginLeft: 10}}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={'plus'}
                        size={20}
                        color={theme === 'dark' ? '#ffffff' : '#000000'}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};
