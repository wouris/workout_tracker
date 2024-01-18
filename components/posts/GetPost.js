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
  const handleHeartClick = async () => {
    const baseOptions = {
      headers: {
        Accept: 'application/json',
        Authorization: await getItem('Authorization'),
        USER_ID: await getItem('USER_ID'),
      },
      data: {postId: post.id},
    };

    let options;

    if (heartClicked) {
      options = {
        ...baseOptions,
        method: 'DELETE',
        url: BASE_URL + '/api/social/post/unlike',
      };
    } else {
      options = {
        ...baseOptions,
        method: 'POST',
        url: BASE_URL + '/api/social/post/like',
      };
    }

    try {
      const {data} = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    if (heartClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }

    setHeartClicked(!heartClicked);
  };
  const fetchPostInfo = async () => {
    const options = {
      method: 'POST',
      url: BASE_URL + '/api/social/post/get',
      headers: {
        Accept: 'application/json',
        Authorization: await getItem('Authorization'),
        USER_ID: await getItem('USER_ID'),
      },
      data: {pageSize: 0, pageOffset: 0},
    };

    try {
      const {data} = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
      justifyContent: 'flex-start',
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
    commentsContainer: {
      marginTop: 8,
      borderRadius: 5,
      padding: 20,
      borderWidth: 0.5,
      borderColor: theme === 'dark' ? '#ffffff' : '#000000',
      backgroundColor: theme === 'dark' ? '#383838' : '#fcfcfc',
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Image
            style={{width: 42, height: 42, borderRadius: 50}}
            source={{uri: `data:image/png;base64,${post.avatar}`}}
          />
        </View>
        <Text style={styles.cardTitle}>{post.username}</Text>
      </View>
      <Image
        source={{uri: `data:image/png;base64,${post.image}`}}
        style={styles.cardImage}
      />
      <View style={styles.cardInteraction}>
        <View style={{flexDirection: 'row', gap: 13, alignItems: 'center'}}>
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
          <Text
            style={{
              color: theme === 'dark' ? '#ffffff' : '#000000',
              fontFamily: 'bold',
              fontSize: 15,
            }}>
            {likes}
          </Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={{color: theme === 'dark' ? '#ffffff' : '#000000'}}>
          {post.description}
        </Text>
      </View>

      {post.topComments.length > 0 && (
        <View style={styles.commentsContainer}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <Text
              style={{
                color: theme === 'dark' ? '#ffffff' : '#000000',
                marginRight: 2,
              }}>
              {post.topComments[0]?.username}
            </Text>
            <Text
              style={{
                color: theme === 'dark' ? '#ffffff' : '#000000',
              }}>
              :
            </Text>
            <Text
              style={{
                color: theme === 'dark' ? '#ffffff' : '#000000',
              }}>
              {post.topComments[0]?.content}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
export default GetPost;
