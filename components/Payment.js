import React from 'react'
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native'
import Header from './Header'
import PaymentPage from './PaymentPage'

const Payment = ({ navigation }) => {   

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>            
                <StatusBar barStyle="light-content" />
                <View style={styles.payment}>
                    <Header navigation={navigation} />                            
                    <PaymentPage navigation={navigation} />                                               
                </View>
        </SafeAreaView>
    )
}

export default Payment

const styles = StyleSheet.create({
    payment: {
        backgroundColor: 'white',
        height: '100%',
        marginBottom: 50
    }    
})
