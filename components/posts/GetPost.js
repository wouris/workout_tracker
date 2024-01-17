import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useTheme} from '../../utils/ThemeContext';
import Avatar from '../account/Avatar';
import {getItem} from '../../utils/Storage';
import {BASE_URL} from '../../utils/Constants';
import axios from 'axios';

const GetPost = ({post}) => {
  const {theme} = useTheme();
  const [likes, setLikes] = useState(post.likes);
  const [heartClicked, setHeartClicked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [userData, setUserData] = useState({});

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
  const handleHeartClick = () => {
    //implementovat na server request
    if (heartClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHeartClicked(!heartClicked);
  };
  const handleCommentClick = () => {
    setCommentClicked(!commentClicked);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      marginVertical: 15,
    },
    cardImage: {
      width: '100%',
      height: 300,
    },
    cardHeader: {
      marginTop: 8,
      marginLeft: 8,
      marginBottom: 8,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 3,
    },
    cardInteraction: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 10,
      borderWidth: 0.25,
      borderColor: theme === 'dark' ? '#ffffff' : '#000000',
    },
    cardTitle: {
      marginLeft: 20,
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    cardAvatar: {
      marginRight: 16,
      width: 40,
      height: 40,
    },
    cardContent: {
      padding: 10,
      borderWidth: 0.25,
      borderColor: theme === 'dark' ? '#ffffff' : '#000000',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    avatarContainer: {
      width: 22,
      height: 22,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    // <View style={styles.container}>
    //   <Text>{item.username}</Text>
    //   <Image
    //     source={{uri: `data:image/png;base64,${item.image}`}}
    //     style={styles.image}
    //   />
    //   <Text>{item.description}</Text>
    //   <View style={styles.interaction}>
    //     <Text>{item.likes}</Text>
    //     <Text>ahoj</Text>
    //   </View>
    // </View>

    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Image
            style={{width: 42, height: 42, borderRadius: 50}}
            source={{uri: `data:image/png;base64,${userData.avatar}`}}
          />
        </View>
        <Text style={styles.cardTitle}>{post.username}</Text>
      </View>
      <Image
        source={{uri: `data:image/png;base64,${post.image}`}}
        style={styles.cardImage}
      />
      <View style={styles.cardInteraction}>
        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <Text
            style={{
              color: theme === 'dark' ? '#ffffff' : '#000000',
              fontFamily: 'bold',
              fontSize: 15,
            }}>
            {likes}
          </Text>
          <TouchableOpacity onPress={handleHeartClick}>
            <FontAwesomeIcon
              icon={'heart'}
              color={
                heartClicked
                  ? '#EB4040'
                  : theme === 'dark'
                  ? '#ffffff'
                  : '#2a2a2a'
              }
              size={30}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleCommentClick}>
          <FontAwesomeIcon
            icon={'comment'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={{color: theme === 'dark' ? '#ffffff' : '#000000'}}>
          {post.description}
        </Text>
      </View>
    </View>
  );
};
export default GetPost;
