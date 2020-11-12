import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import Header from './Header'
import Order from './Order';
import { useDataLayerValue } from '../DataLayer'
import { db } from '../firebase'
import { ScrollView } from 'react-native-gesture-handler';

const Orders = ({ navigation }) => {

    const [{ user }] = useDataLayerValue();

    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        
            if(user) {
                db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')         
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))     
                ))
            } else {
                navigation.navigate('Home');
            }

    },[user]);

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>            
            <StatusBar barStyle="light-content" />
                <View style={styles.main}>
                    <Header navigation={navigation} />   
                    <ScrollView>
                        <View style={styles.ordersOrder}>
                            {
                                orders?.map(order => (
                                    <Order order={order} navigation={navigation} />
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
        </SafeAreaView>
    )
}

export default Orders

const styles = StyleSheet.create({
    ordersOrder: {        
        height: '100%',
        marginBottom: 250,
        paddingTop: 10,
        paddingBottom: 10,        
        backgroundColor: '#eaeded',
        display: 'flex',
        flexDirection: 'column'
    }
})
