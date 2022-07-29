import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useForm} from '../hooks/useForm';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useProductos} from '../hooks/useProductos';
import {ProductsContext} from '../context/ProductsContext';
import {HeaderTitle} from '../components/HeaderTitle';

interface Props extends StackScreenProps<ProductsStackParams, 'Tab1Screen'> {}

export const Tab1Screen = ({route}: Props) => {
  const {productos} = useProductos();

  const {addCotizacion} = useContext(ProductsContext);

  const id = '';
  const name = '';
  const price = '';

  const {_id, productoId, nombre, form, precio, onChange, setFormValue} =
    useForm({
      _id: id,
      productoId: '',
      nombre: name,
      precio: price,
    });

  const [cuota, setCuota] = useState('');
  let [inicial, setInicial] = useState(0);
  let [mensual, setMensual] = useState(0);

  //console.log('====================================', productos[0]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const cotizar = (cuota: number, precio: number) => {
    inicial = precio * 0.1;
    mensual = (precio - inicial) / cuota;
    setInicial(inicial);
    setMensual(mensual);
  };

  const saveCotización = async () => {
    const newProduct = await addCotizacion(cuota, inicial, mensual, productoId);
    onChange(newProduct._id, '_id');
    console.log('?????????????????????????????', newProduct);
  };

  console.log('--------------------------------', productoId);
  return (
    <View style={styles.container}>
      <HeaderTitle title="Cotizacion" />
      <ScrollView>
        <Text style={styles.label}>Nombre del carro:</Text>
        <Picker
          selectedValue={productoId}
          onValueChange={value => {
            console.log(
              '======================================================',
              value,
            );
            const valuePrecio = productos.find(x => x._id == value)?.precio;
            //onChange(valuePrecio, 'precio');
            console.log(valuePrecio);
            //onChange(valuePrecio, 'productoId2');
            console.log(precio);
            setFormValue({...form, productoId: value, precio: valuePrecio});
          }}>
          {productos.map(c => (
            <Picker.Item
              label={c.nombre.toString()}
              value={c._id}
              key={c._id}
            />
          ))}
        </Picker>
        <Text style={styles.label}>Precio del carro:</Text>
        <TextInput
          placeholder="Precio"
          style={styles.textInput}
          value={precio.toString()}
          editable={false}
          onChangeText={value => onChange(value, 'precio')}
        />
        <Text style={styles.label}>Cuotas del carro:</Text>
        <TextInput
          placeholder="Ingrese el numero de cuotas"
          keyboardType={'numeric'}
          onChangeText={setCuota}
          value={cuota}
          style={styles.textInput}
        />
        <Button
          title="Cotizar"
          onPress={() => cotizar(cuota, precio)}
          color="#5856D6"
        />
        <Text> </Text>
        <Text style={styles.label}>Cuota inicial:</Text>
        <TextInput
          placeholder="Cuota inicial"
          value={inicial.toString()}
          style={styles.textInput}
          editable={false}
        />
        <Text style={styles.label}>Cuota mensual:</Text>
        <TextInput
          placeholder="Cuota mensual"
          value={mensual.toString()}
          style={styles.textInput}
          editable={false}
        />
        <Button title="Guardar" onPress={saveCotización} color="#5856D6" />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
});
