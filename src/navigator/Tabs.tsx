import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Platform} from 'react-native';

import {CotizarScreen} from '../screens/CotizarScreen';

import {colores} from '../theme/appTheme';
import {TopTabNavigator} from './TopTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {ProductsNavigator} from './ProductsNavigator';

export const Tabs = () => {
  return Platform.OS === 'ios' ? <TabsIOS /> : <TabsAndroid />;
};

const BottomTabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {
  return (
    <BottomTabAndroid.Navigator
      sceneAnimationEnabled={true}
      barStyle={{
        backgroundColor: colores.primary,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'ProductsNavigator':
              iconName = 'bookmarks-outline';
              break;
            case 'CotizarScreen':
              iconName = 'bandage-outline';
              break;

            case 'Tab2Screen':
              iconName = 'basketball-outline';
              break;
          }

          return <Icon name={iconName} size={20} color={color} />;
        },
      })}>
      <BottomTabAndroid.Screen
        name="ProductsNavigator"
        options={{title: 'Cotizar'}}
        component={ProductsNavigator}
      />
      <BottomTabAndroid.Screen
        name="CotizarScreen"
        options={{title: 'Autos'}}
        component={CotizarScreen}
      />
      <BottomTabAndroid.Screen
        name="Tab2Screen"
        options={{title: 'Opciones'}}
        component={TopTabNavigator}
      />
    </BottomTabAndroid.Navigator>
  );
};

const BottomTabIOS = createBottomTabNavigator();

const TabsIOS = () => {
  return (
    <BottomTabIOS.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      tabBarOptions={{
        activeTintColor: colores.primary,
        style: {
          borderTopColor: colores.primary,
          borderTopWidth: 0,
          elevation: 0,
        },
        labelStyle: {
          fontSize: 15,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'CotizarScreen':
              iconName = 'bandage-outline';
              break;

            case 'Tab2Screen':
              iconName = 'basketball-outline';
              break;

            case 'StackNavigator':
              iconName = 'bookmarks-outline';
              break;
          }

          return <Icon name={iconName} size={20} color={color} />;
        },
      })}>
      {/* <Tab.Screen name="Tab1Screen" options={{ title: 'Tab1', tabBarIcon: (props) => <Text style={{ color: props.color }} >T1</Text> }} component={ Tab1Screen } /> */}
      <BottomTabIOS.Screen
        name="CotizarScreen"
        options={{title: 'Cotizar'}}
        component={CotizarScreen}
      />
      <BottomTabIOS.Screen
        name="Tab2Screen"
        options={{title: 'Opciones'}}
        component={TopTabNavigator}
      />
      <BottomTabIOS.Screen
        name="ProductsNavigator"
        options={{title: 'Autos'}}
        component={ProductsNavigator}
      />
    </BottomTabIOS.Navigator>
  );
};
