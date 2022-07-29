import {StackScreenProps} from '@react-navigation/stack';
import React, {useState, useRef, useContext} from 'react';
import {
  ImageSourcePropType,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAnimation} from '../hooks/useAnimation';

const {width: screenWidth} = Dimensions.get('window');

interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const items: Slide[] = [
  {
    title: 'Autos',
    desc: 'Es necesario ingresar el nombre, precio y la categoria del automovil para la creación de un nuevo automovil.',
    img: require('../assets/slide-4.png'),
  },
  {
    title: 'Cotizar',
    desc: 'Es necesario la elección del auto y se autocompleta el precio, se ingresa el numero de cuotas y se calcula la cuota inicial y mensual para la creación de una cotización de un automovil.',
    img: require('../assets/slide-5.png'),
  },
  {
    title: 'Opciones',
    desc: 'Espacio para la muestra del catalogo de todos los autos, todas las cotizaciones del usuario y por última ayuda para la utilización del APP.',
    img: require('../assets/slide-6.png'),
  },
];

interface Props extends StackScreenProps<any, any> {}

export const AlbumsScreen = ({navigation}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {fadeIn} = useAnimation();
  const isVisible = useRef(false);

  const renderItem = (item: Slide) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:'white',
          borderRadius: 5,
          padding: 30,
          justifyContent: 'center',
        }}>
        <Image
          source={item.img}
          style={{
            width: 300,
            height: 300,
            resizeMode: 'center',
          }}
        />
        <Text
          style={{
            ...styles.title,
            color: '#084F6A',
          }}>
          {item.title}
        </Text>

        <Text
          style={{
            ...styles.subTitle,
            color: 'black',
          }}>
          {item.desc}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 50,
      }}>
      <Carousel
        // ref={ (c) => { this._carousel = c; }}
        data={items}
        renderItem={({item}: any) => renderItem(item)}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout="default"
        onSnapToItem={(index) => {
          setActiveIndex(index);
          if (index === 2) {
            isVisible.current = true;
            fadeIn();
          }
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <Pagination
          dotsLength={items.length}
          activeDotIndex={activeIndex}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 10,
            backgroundColor: '#084F6A',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5856D6',
  },
  subTitle: {
    fontSize: 16,
  },
});
