import React, {useState} from 'react';
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

library.add(faSearch);

export const Search = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
  ]);
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
      backgroundColor: 'white',
      height: 130,
      width: '100%',
      borderRadius: 12,
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
      <TouchableOpacity style={styles.modal}>
        <FlatList
          data={filteredData}
          renderItem={({item}) => (
            <Text style={styles.modal.text}>{item.name}</Text>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </TouchableOpacity>
    </View>
  );
};
