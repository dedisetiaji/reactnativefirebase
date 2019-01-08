import React,{Component} from 'react'
import {View,Text,drawerWidth} from 'react-native'
import {DrawerNavigator} from 'react-navigation'
import App from './App'



export default DrawerNavigator(
  {
    App: {
      screen: App
    },
  }, 
  {
    drawerWidth: 225,
    contentComponent: props => <SideBar {...props} />
  }
);