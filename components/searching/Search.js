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

library.add(faSearch);

export const Search = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'},
    {id: 4, name: 'Item 4'},
  ]);
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
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#ff6347',
      borderRadius: 20,
    },
    modal: {
      display: 'flex',
      margin: 50,
      backgroundColor: 'white',
      height: 'fit-content',
      width: '100%',
      borderRadius: 12,
      text: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: '#696969',
      },
    },
    items: {
      display: 'flex',
      margin: 20,
      backgroundColor: 'lightgrey',
      height: 'fit-content',
      width: '100%',
      borderRadius: 2,
      text: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: '#696969',
      },
    },
  });

  const handleSearch = text => {
    setSearchText(text);
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  return (
    <View style={{alignItems: 'center', margin: 10}}>
      <Pressable style={styles.searchBox}>
        <FontAwesomeIcon
          icon={'search'}
          size={20}
          color={'tomato'}
          style={{marginLeft: 15, marginRight: 5}}
        />
        <TextInput
          placeholder={'Search'}
          style={{
            fontSize: 16,
            fontFamily: 'Roboto-Medium',
            width: '100%',
          }}
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
              <Text style={styles.modal.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};
