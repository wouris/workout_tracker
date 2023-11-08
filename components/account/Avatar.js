import {Image, StyleSheet, View} from 'react-native';
import {getItem} from '../../utils/Storage';
// import Ionicons from "@expo/vector-icons/Ionicons";
import {useEffect, useState} from 'react';
import {useTheme} from '../../utils/ThemeContext';

const Avatar = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function getImage() {
      const image = await getItem('avatar');
      if (image) {
        setImage(image);
      }
    }

    getImage();
  }, []);

  const styles = StyleSheet.create({
    avatarContainer: {
      borderRadius: 50,
      backgroundColor: '#818181',
      width: 75,
      height: 75,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.avatarContainer}>
      {image ? (
        <Image style={{width: 70, height: 70}} source={{uri: image}} />
      ) : null}

      <HighlightBadge />
    </View>
  );
};

const HighlightBadge = () => {
  const {theme} = useTheme();
  const image = require('../../assets/badges/placeholder_badge.png');

  const styles = StyleSheet.create({
    badge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: 3,
      width: 'fit-content',
      height: 'fit-content',
      borderRadius: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#2A2A2A' : '#ffffff',
      backgroundColor:
        theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
    },
  });
  return (
    <View style={styles.badge}>
      <Image source={image} style={{width: 20, height: 20}} />
    </View>
  );
};

export default Avatar;
