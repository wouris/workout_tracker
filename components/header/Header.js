import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(faChevronLeft);

const Header = ({title, theme, modal, route, navigation}) => {
  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    modalHeader: {
      position: 'relative',
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      left: 10,
      top: 10,
    },
    title: {
      color: theme === 'dark' ? '#ffffff' : '#000000',
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      margin: 10,
      textAlign: 'center',
    },
  });

  if (modal && navigation) {
    return (
      <View style={styles.modalHeader}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FontAwesomeIcon
            icon={'chevron-left'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={22}
            style={{marginHorizontal: 5}}
          />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  } else {
    return route === 'Home' || route === 'Account' ? null : (
      <View style={styles.headerStyle}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
};

export default Header;
