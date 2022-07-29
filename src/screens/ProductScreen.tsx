import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  const {id = '', name = '', price = ''} = route.params;

  const [tempUri, setTempUri] = useState<string>();

  const {categories} = useCategories();
  const {loadProductById, addProduct, updateProduct, uploadImage} =
    useContext(ProductsContext);

  const {_id, categoriaId, nombre, img, precio, form, onChange, setFormValue} =
    useForm({
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
      precio: price,
    });

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Sin nombre de producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) {
      return;
    }
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
      precio: product.precio,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id, precio);
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId, nombre, precio);
      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera(
      {
        cameraType: 'back',
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) {
          return;
        }
        if (!resp.assets[0].uri) {
          return;
        }
        console.log(resp);
        setTempUri(resp.assets[0].uri);
        uploadImage(resp, _id);
      },
    );
  };

  const takePhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) {
          return;
        }
        if (!resp.assets[0].uri) {
          return;
        }
        console.log(resp);
        setTempUri(resp.assets[0].uri);
        uploadImage(resp, _id);
      },
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del carro:</Text>
        <TextInput
          placeholder="Nombre"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Precio del carro:</Text>
        <TextInput
          placeholder="Precio"
          style={styles.textInput}
          value={precio.toString()}
          onChangeText={value => onChange(value, 'precio')}
        />
        {/* Picker / Selector */}
        <Text style={styles.label}>Categoría:</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={value => onChange(value, 'categoriaId')}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>
        {/* TODO: Mostrar imagen temporal */}
        {tempUri && (
          <Image
            source={{uri: tempUri}}
            style={{
              marginTop: 20,
              width: '100%',
              height: 300,
            }}
          />
        )}

        {img.length > 0 && !tempUri && (
          <Image
            source={{uri: img}}
            style={{
              marginTop: 20,
              width: '100%',
              height: 300,
            }}
          />
        )}

        <View style={{width: 10, marginTop: 10}} />

        <Button title="Guardar" onPress={saveOrUpdate} color="#5856D6" />
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="Cámara" onPress={takePhoto} color="#5856D6" />

            <View style={{width: 10}} />

            <Button
              title="Galería"
              onPress={takePhotoFromGallery}
              color="#5856D6"
            />
          </View>
        )}
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
