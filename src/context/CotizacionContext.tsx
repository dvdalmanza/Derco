import React, {createContext, useState} from 'react';
import dercoApi from '../api/dercoApi';
import {Cotizacion} from '../interfaces/appInterfaces';

type CotizacionContextProps = {
  addCotizacion: (
    cuotas: string,
    cuotaInicial: number,
    cuotaMensual: number,
    _id: string,
  ) => Promise<Cotizacion>;
};

export const CotizacionContext = createContext({} as CotizacionContextProps);

export const CotizacionProvider = ({children}: any) => {
  const [cotizar, setCotizar] = useState<Cotizacion[]>([]);

  const addCotizacion = async (
    cuotas: string,
    cuotaInicial: number,
    cuotaMensual: number,
    _id: string,
  ): Promise<Cotizacion> => {
    const resp = await dercoApi.post<Cotizacion>('/cotizaciones', {
      ncuotas: cuotas,
      cuotai: cuotaInicial,
      cuotam: cuotaMensual,
      _id: _id,
    });
    setCotizar([...cotizar, resp.data]);
    return resp.data;
  };

  return (
    <CotizacionContext.Provider
      value={{
        addCotizacion,
      }}>
      {children}
    </CotizacionContext.Provider>
  );
};
