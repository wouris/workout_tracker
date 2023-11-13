import {Text, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Exercise} from '../../models/Exercise';
import {GifControllerView} from 'react-native-gif-controller-view';

const ExerciseView = ({data}) => {
  return (
    <FlashList
      keyExtractor={(item: Exercise) => item.id}
      data={data.exercises}
      renderItem={({item}) => <ExerciseComponent data={item} />}
      estimatedItemSize={1325}
    />
  );
};

const ExerciseComponent = ({data}) => {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/*<Image*/}
      {/*    style={{height: 100, width: 100}}*/}
      {/*    source={data.gifUrl}*/}
      {/*    placeholder={blurhash}*/}
      {/*    contentFit="cover"*/}
      {/*    transition={1000}*/}
      {/*/>*/}
      <GifControllerView
        source={{uri: data.gifUrl}}
        colorMappings={[]}
        isAnimating={false}
      />
      <Text>{data.name}</Text>
    </View>
  );
};

export default ExerciseView;
