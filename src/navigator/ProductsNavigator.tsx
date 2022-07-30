import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductScreen} from '../screens/ProductScreen';
import {ProductsScreen} from '../screens/ProductsScreen';
import {CotizarScreen} from '../screens/CotizarScreen';

export type ProductsStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {id?: string; name?: string; price?: number};
  CotizarScreen: {id?: string; name?: string; price?: number };
};

const Stack = createStackNavigator<ProductsStackParams>();

export const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{title: 'Automoviles'}}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="CotizarScreen" component={CotizarScreen} />
    </Stack.Navigator>
  );
};
