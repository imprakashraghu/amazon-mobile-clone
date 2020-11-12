import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { DataLayer, useDataLayerValue } from './DataLayer'
import reducer,{ initialState } from './reducer'
import AppIndex from './AppIndex';

export default function App() {
  return (
    <DataLayer initialState={initialState} reducer={reducer}>
      <AppIndex />
    </DataLayer>
  );
}