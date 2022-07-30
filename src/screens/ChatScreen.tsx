import React, {useContext, useState} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {FadeInImage} from '../components/FadeInImage';
import {HeaderTitle} from '../components/HeaderTitle';
import {ProductsContext} from '../context/ProductsContext';

export const ChatScreen = () => {
  const {products} = useContext(ProductsContext);
  const [numbers, setNumbers] = useState(products ?? []);
  const loadMore = () => {
    const newArray: number[] = [];
    for (let i = 0; i < 5; i++) {
      newArray[i] = numbers.length + i;
    }
    setTimeout(() => {
      setNumbers([...numbers, ...newArray]);
    }, 1500);
  };
  
  const renderItem = (item: any, index: number) => {
    return (
      <FadeInImage
        key={index}
        uri={item.img}
        //uri={`https://picsum.photos/id/${item}/1024/1024`}
        style={{
          width: '100%',
          height: 400,
        }}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={numbers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => renderItem(item, index)}
        ListHeaderComponent={() => (
          <View style={{marginHorizontal: 20}}>
            <HeaderTitle title="Catalogo de autos" />
          </View>
        )}
        //onEndReached={loadMore}
        //onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <View
            style={{
              height: 150,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={25} color="#5856D6" />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textItem: {
    backgroundColor: 'green',
    height: 150,
  },
});
