import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar, CheckBox, TouchableOpacity } from 'react-native'
import Header from './Header'
import NumberFormat from 'react-number-format'
import { useDataLayerValue } from '../DataLayer'
import Product from './Product'
import { getBasketTotal } from '../reducer'
import { ScrollView } from 'react-native-gesture-handler'

const Checkout = ({ navigation }) => {

    const [{ user, basket }] = useDataLayerValue();

    const handlePayment = () => {
        if(user) {
            navigation.navigate('Payment');
        } else {
            navigation.navigate('Login');
        }
    }
    
    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>            
                <StatusBar barStyle="light-content" />
                <View style={styles.main}>
                    <Header navigation={navigation} query={null} />            
                    <Image
                        style={{ width: '100%', height: 60 }}
                        resizeMode="contain"
                        source={{
                            uri: 'https://wanderlustandlipstick.com/wp-content/uploads/2015/09/Amazon-Banner.jpg'
                        }}
                    />                    
                </View>                
                {
                    !basket.length ?
                    (
                        <View style={styles.checkoutInfo}>
                                <Text style={styles.checkoutInfoTitle}>
                                    Your Shopping Basket {!basket.length && 'is empty'}
                                </Text>
                                {
                                    !basket.length && (
                                        <Text style={styles.checkoutInfoDescription}>
                                            You have no items in your basket. To buy one or more items, click "Add to basket" next to the item.
                                        </Text>
                                    )
                                }
                        </View>                        
                    ): null
                }
                {
                    !!basket.length && (
                        <ScrollView>
                {
                    !!basket.length && (
                        <View style={styles.checkoutSubtotal}>
                            <NumberFormat
                                renderText={(value) => (
                                    <View style={{display:'flex', flexDirection: 'column' }}>
                                        <Text style={{marginLeft: 8 ,fontSize: 15}}>
                                            Subtotal ({basket.length} items):
                                            <Text style={{fontWeight: 'bold'}}> {value}</Text>
                                        </Text>
                                        <View style={styles.checkoutGift}>
                                            <CheckBox /> 
                                            <Text>This order
                                            contains gift</Text>
                                        </View>
                                    </View>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <TouchableOpacity
                                onPress={() => handlePayment()}
                                style={styles.checkoutButton}
                            ><Text style={{textAlign:'center',color:'#111'}}>
                                Proceed to Checkout
                            </Text>                    
                            </TouchableOpacity>
                        </View>
                    )
                }
                <View style={styles.checkoutProducts}>
                    {
                        basket.map((item, i) => (
                            <Product
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                image={item.image}
                            />
                        ))
                    }                    
                </View>
            </ScrollView>
                    )
                }
        </SafeAreaView>
    )
}

export default Checkout

const styles = StyleSheet.create({
    checkoutInfo: {
        display: 'flex',
        flexDirection: 'column',
        height: 100,
        padding: 10,
        backgroundColor: 'white'
    },
    checkoutInfoTitle: {        
        fontWeight: 'bold',
        fontSize: 20,
        padding: 2
    },
    checkoutInfoDescription: {
        fontSize: 14,
        color: 'gray'        
    },
    checkoutSubtotal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '97%',
        height: 125,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#dddddd',
        backgroundColor: '#f3f3f3',
        borderRadius: 3
    },
    checkoutGift: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkoutButton: {
        backgroundColor: '#f0c14b',
        borderRadius: 2,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#a88734'        
    },
    checkoutProducts: {
        padding: 5,
        backgroundColor: '#F2F2F2',
        marginBottom: 200        
    }
})
