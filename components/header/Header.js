import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
          <Ionicons name={'chevron-back'} size={30} color={'red'} />
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
