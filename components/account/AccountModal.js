import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../utils/ThemeContext';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

library.add(faChevronLeft);

const AccountModal = ({route}) => {
  const [data, setData] = useState([]);

  const {params} = route;
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      margin: 10,
      padding: 12,
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    icon: {
      width: 150,
      height: 100,
    },
    title: {
      fontFamily: 'Roboto-SemiBold',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      fontSize: 18,
      margin: 10,
      textAlign: 'center',
    },
    redirectButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      width: 280,
      textAlign: 'center',
      padding: 10,
      borderColor: theme === 'dark' ? '#ffffff' : '#2a2a2a',
      borderRadius: 5,
      borderWidth: 1,
      text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: theme === 'dark' ? '#ffffff' : '#2a2a2a',
      },
    },
  });

  if (params.type === 'Workouts') {
    if (data.length <= 0) {
      const image = require('../../assets/no_data_assets/no_workout.png');
      return (
        <View style={styles.noDataContainer}>
          <Image source={image} resizeMethod={'resize'} style={styles.icon} />
          <Text style={styles.title}>No data for workouts found!</Text>
        </View>
      );
    }
  } else if (params.type === 'Followers') {
    if (data.length <= 0) {
      const image = require('../../assets/no_data_assets/no_followers.png');
      return (
        <View style={styles.noDataContainer}>
          <Image source={image} resizeMethod={'resize'} style={styles.icon} />
          <Text style={styles.title}>No data for followers found!</Text>
        </View>
      );
    }
  } else if (params.type === 'Following') {
    if (data.length <= 0) {
      const image = require('../../assets/no_data_assets/no_following.png');
      return (
        <View style={styles.noDataContainer}>
          <Image source={image} resizeMethod={'resize'} style={styles.icon} />
          <Text style={styles.title}>You are not following anyone!</Text>
          <Pressable onPress={() => console.log('Go to search')}>
            <View style={styles.redirectButton}>
              <FontAwesomeIcon
                icon={'chevron-left'}
                color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
                size={22}
                style={{marginHorizontal: 5}}
              />
              <Text style={styles.redirectButton.text}>Search profiles</Text>
            </View>
          </Pressable>
        </View>
      );
    }
  }
};

export default AccountModal;
