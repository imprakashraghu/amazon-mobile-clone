import React, { useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native'
import Header from './Header'
import { getBasketTotal } from '../reducer'
import { ScrollView } from 'react-native-gesture-handler'
import { useDataLayerValue } from '../DataLayer'
import Product from './Product'
import CardFormScreen from './CardFormScreen'
import NumberFormat from 'react-number-format'

const PaymentPage = ({ navigation }) => {
    const [{ user, basket }] = useDataLayerValue();        

    return (
        <ScrollView>
                        <View style={styles.paymentContainer}>                            
                                <Text style={{ fontSize: 15, textAlign: 'center', color: '#111', padding: 10, backgroundColor: '#eaeded' }}>
                                    Checkout 2 items
                                </Text>
                                <View style={styles.paymentSection}>
                                    <Text style={styles.paymentTitle}>
                                        Delivery Adress
                                    </Text>
                                    <View style={styles.paymentAddress}>
                                        <Text style={{ fontSize: 13, textAlign: 'left', marginLeft: 10, marginTop: 8 }}>{user?.email||'text@example.com'}</Text>
                                        <Text style={{ fontSize: 13, textAlign: 'left', marginLeft: 10, marginTop: 8 }}>123, React Native Road</Text>
                                        <Text style={{ fontSize: 13, textAlign: 'left', marginLeft: 10, marginTop: 8 }}>PY, India</Text>
                                    </View>
                                </View>
                                <View style={styles.paymentSection}>
                                    <Text style={styles.paymentTitle}>
                                        Review Items and Delivery
                                    </Text>
                                    <View style={styles.paymentItems}>
                                        {
                                            basket.map((item, i) => (
                                                <Product                                                
                                                    key={i}
                                                    id={item.id}
                                                    title={item.title}
                                                    price={item.price}
                                                    rating={item.rating}
                                                    image={item.image}
                                                    navigation={navigation}
                                                />
                                            ))
                                        }
                                    </View>
                                </View>
                                <View style={styles.paymentSection}>
                                    <Text style={styles.paymentTitle}>
                                        Payment Method
                                    </Text>
                                    <View style={styles.paymentDetails}>
                                        <NumberFormat
                                                renderText={(value) => (
                                                    <>
                                                        <Text style={{fontWeight: 'bold', fontSize: 15}}>Order Total : {value}</Text>
                                                    </>
                                                )}
                                                decimalScale={2}
                                                value={getBasketTotal(basket)}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                            />
                                        <CardFormScreen navigation={navigation} user={user} total={getBasketTotal(basket)} basket={basket} />
                                    </View>
                                </View>                        
                        </View>  
                    </ScrollView>        
    )
}

export default PaymentPage

const styles = StyleSheet.create({
    paymentContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        marginBottom: 100
    },
    paymentSection: {
        display: 'flex',
        flexDirection: 'column',        
        padding: 10,
        borderBottomColor: '#eaeded',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginRight: 5        
    },
    paymentTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 5        
    },
    paymentItems: {
        display: 'flex',
        flexDirection: 'column',                
    }
})
