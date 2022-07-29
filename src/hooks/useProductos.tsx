import {useEffect, useState} from 'react';
import dercoApi from '../api/dercoApi';
import {ProductsResponse, Producto} from '../interfaces/appInterfaces';

export const useProductos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    const resp = await dercoApi.get<ProductsResponse>('/productos');
    setProductos(resp.data.productos);
    setIsLoading(false);
  };

  return {
    isLoading,
    productos,
  };
};
