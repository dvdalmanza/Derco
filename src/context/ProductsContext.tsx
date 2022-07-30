import React, {createContext, useEffect, useState} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import dercoApi from '../api/dercoApi';
import {
  Cotizacion,
  CotizacionResponse,
  ListarCotizacion,
  Producto,
  ProductsResponse,
} from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  cotizar: Cotizacion[];
  // listar: ListarCotizacion[];
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
  loadCotizacionById: (id: string) => Promise<Cotizacion>;
  uploadImage: (data: any, id: string) => Promise<void>; // TODO: cambiar ANY
  addCotizacion: (
    cuotas: string,
    cuotaInicial: number,
    cuotaMensual: number,
    _id: string,
  ) => Promise<Cotizacion>;
  loadCotizacion: () => Promise<void>;
  loadCotizaciones: () => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [cotizar, setCotizar] = useState<Cotizacion[]>([]);
  //const [listar, setListar] = useState<ListarCotizacion[]>();

  useEffect(() => {
    loadProducts();
    loadCotizacion();
    loadCotizaciones();
  }, []);

  const loadProducts = async () => {
    const resp = await dercoApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...resp.data.productos]);
    //console.log('?????????????????', ...resp.data.productos);
  };

  const loadCotizacion = async () => {
    //console.log('Aqui loadCotizacion');
    const resp = await dercoApi.get<CotizacionResponse>('/cotizaciones');
    setCotizar([...resp.data.totalCotizaciones]);
    //console.log('?????????????????', ...resp.data.totalCotizaciones);
  };

  const loadCotizaciones = async () => {
    console.log('Aqui loadCotizaciones');
    const resp = await dercoApi.get<ListarCotizacion>('/cotizaciones/count');
    console.log('?????????????????', resp.data);
    return resp.data;
    
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
        cotizar,
        // listar,
        loadProducts,
        loadCotizacion,
        loadCotizaciones,
        //loadCotizacionById,
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
