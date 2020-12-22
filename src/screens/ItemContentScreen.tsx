import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Media } from '../hooks/useMedia';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/ContentNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContentListScreen'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ContentListScreen'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const ItemContentScreen: FC<Props> = ({ navigation, route }) => {
  console.log(route.params);

  return (
    <View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <Text></Text>
    </View>
  );
};

export default ItemContentScreen;

const styles = StyleSheet.create({});
