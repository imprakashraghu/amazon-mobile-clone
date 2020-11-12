import React, { useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import Header from './Header'
import HomePage from './HomePage'
import { useDataLayerValue } from '../DataLayer'

const Main = ({ route, navigation }) => {

    const [{}, dispatch] = useDataLayerValue();    

    useEffect(() => {
        if(route.params?.result) {
            dispatch({
                type: 'EMPTY_BASKET'
            });
        }
    },[route.params]);

    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" />
            <View style={styles.main}>
                <Header navigation={navigation} />   
                <HomePage navigation={navigation} />         
            </View>
        </SafeAreaView>
    )
}

export default Main

const styles = StyleSheet.create({
    main: {        
    }
})
