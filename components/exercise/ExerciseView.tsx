import {Text, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Exercise} from '../../models/Exercise';
import {GifControllerView} from 'react-native-gif-controller-view';
import { ExerciseGroup } from '../../models/ExerciseGroup';

const ExerciseView = ({data: {exercises}}: {data: ExerciseGroup}) => {
  return (
    <FlashList
      keyExtractor={(item: Exercise) => item.id}
      data={exercises}
      renderItem={({item}) => <ExerciseComponent data={item} />}
    />
  );
};

const ExerciseComponent = ({data}) => {
  return (
    <View style={{flex: 1}}>
      {/*<Image*/}
      {/*    style={{height: 100, width: 100}}*/}
      {/*    source={data.gifUrl}*/}
      {/*    placeholder={blurhash}*/}
      {/*    contentFit="cover"*/}
      {/*    transition={1000}*/}
      {/*/>*/}
      <Text>{data.name}</Text>
    </View>
  );
};

export default ExerciseView;
