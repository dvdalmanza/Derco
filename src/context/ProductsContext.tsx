import React, {createContext, useEffect, useState} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import dercoApi from '../api/dercoApi';
import {
  Cotizacion,
  Producto,
  ProductsResponse,
} from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (
    categoryId: string,
    productName: string,
    precio: number,
  ) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
    precio: number,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; // TODO: cambiar ANY
  addCotizacion: (
    cuotas: string,
    cuotaInicial: number,
    cuotaMensual: number,
    _id: string,
  ) => Promise<Cotizacion>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [cotizar, setCotizar] = useState<Cotizacion[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await dercoApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...resp.data.productos]);
  };

  const addProduct = async (
    categoryId: string,
    productName: string,
    precio: number,
  ): Promise<Producto> => {
    const resp = await dercoApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
      precio: precio,
    });
    setProducts([...products, resp.data]);
    return resp.data;
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
    precio: number,
  ) => {
    const resp = await dercoApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
      precio: precio,
    });
    setProducts(
      products.map(prod => {
        return prod._id === productId ? resp.data : prod;
      }),
    );
  };

  const deleteProduct = async (id: string) => {};

  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await dercoApi.get<Producto>(`productos/${id}`);
    return resp.data;
  };

  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    const fileToUpload = {
      uri: data.assets![0].uri,
      type: data.assets![0].type,
      name: data.assets![0].fileName,
    };

    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    try {
      const resp = await dercoApi.put(`/uploads/productos/${id}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: () => {
          return formData;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addCotizacion = async (
    cuotas: string,
    cuotaInicial: number,
    cuotaMensual: number,
    _id: string,
  ): Promise<Cotizacion> => {
    //console.log("¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿",cuotas, cuotaInicial, cuotaMensual, _id);
    const resp = await dercoApi.post<Cotizacion>('/cotizaciones', {
      cuotas,
      cuotaInicial: cuotaInicial,
      cuotaMensual: cuotaMensual,
      producto: _id,
    });
    setCotizar([...cotizar, resp.data]);
    return resp.data;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
        addCotizacion,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
