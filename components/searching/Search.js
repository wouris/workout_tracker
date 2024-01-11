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
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {BASE_URL} from '../../utils/Constants';
import axios from 'axios';
import {getItem, setItem} from '../../utils/Storage';
import {useTheme} from '../../utils/ThemeContext';
import FastImage from 'react-native-fast-image';
import Avatar from '../account/Avatar';

library.add(faSearch);

export const Search = ({navigation}) => {
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
        fontSize: 16,
        fontFamily: 'monospace',
        color: theme === 'dark' ? '#ffffff' : '#2a2a2a',
        width: '100%',
        fontWeight: 'bold',
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

  const handleSearch = text => {
    setSearchText(text);

    if (data) {
      const filtered = data.filter(
        item =>
          item.username &&
          item.username.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  return (
    <View style={{alignItems: 'center', margin: 10}}>
      <Pressable style={styles.searchBox}>
        <FontAwesomeIcon
          icon={'search'}
          size={20}
          color={theme === 'dark' ? '#ffffff' : '#000000'}
          style={{marginLeft: 15, marginRight: 5}}
        />
        <TextInput
          placeholder={'Search'}
          placeholderTextColor={theme === 'dark' ? '#A1A1A1' : '#2a2a2a'}
          style={styles.searchBox.text}
          value={searchText}
          onChangeText={handleSearch}
        />
      </Pressable>
      <View style={styles.modal}>
        <FlatList
          data={filteredData}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.items}
              onPress={() => {
                // Handle item press logic here
                // For example, you can navigate to a new screen with the item details
                navigation.navigate('ItemDetails', {itemId: item.id});
              }}>
              <View style={{flexDirection: 'row', gap: 10, alignItems:'center'}}>
                <Avatar avatar={item.avatar} />
                <Text style={styles.modal.text}>{item.username}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};
