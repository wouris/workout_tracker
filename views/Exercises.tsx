import {SafeAreaView, Text} from 'react-native';
import React from 'react';
import {getAllExercises} from '../services/DataReader';
import {FlashList} from '@shopify/flash-list';
import ExerciseView from '../components/exercise/ExerciseView';
import {ExerciseGroup} from '../models/ExerciseGroup';

const ExercisesScreen = () => {
  const {data, isLoading, hasNextPage, fetchNextPage} = getAllExercises();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const flattenData = data.pages.flatMap(page => page.data);

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  // const blurhash =
  //     '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlashList
        keyExtractor={(item: ExerciseGroup) => item.letter}
        data={flattenData}
        renderItem={({item}) => <ExerciseView data={item} />}
        estimatedItemSize={1325}
        onEndReached={loadNext}
        onEndReachedThreshold={0.2}
      />
    </SafeAreaView>
  );
};

export default ExercisesScreen;
