import React, {useContext, useEffect, useState} from 'react';
import {ProductsContext} from '../context/ProductsContext';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';

const Item = ({cotizacion, index}) => (
  <View style={styles.item}>
    <Text style={styles.title}> Cotización: #{index+1}</Text>
    <View style={styles.row}>
      <Text style={styles.label}> Producto:</Text>
      <Text style={styles.title}>{cotizacion.producto.nombre}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}> Cuota:</Text>
      <Text style={styles.title}>{cotizacion.cuotas}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}> Cuota Inicial:</Text>
      <Text style={styles.title}>{cotizacion.cuotaInicial}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}> Cuota Mensual:</Text>
      <Text style={styles.title}>{cotizacion.cuotaMensual}</Text>
    </View>
  </View>
);

export const CotizacionesScreen = () => {
  const renderItem = ({item, index}) => (
    <Item cotizacion={item} index={index} />
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {cotizar, loadCotizacion,loadCotizaciones} = useContext(ProductsContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
      horizontal={true}> */}
      <FlatList
        data={cotizar}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    //flexDirection: 'row',
    backgroundColor: '#7371bd',
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    //width: '20%',
    paddingHorizontal: 5,
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});
