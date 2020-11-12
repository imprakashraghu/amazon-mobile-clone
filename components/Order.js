import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'
import { getBasketTotal } from '../reducer'
import NumberFormat from 'react-number-format'
import Product from './Product'
import { useDataLayerValue } from '../DataLayer'

const Order = ({ order, navigation }) => {

    const [{ basket }] = useDataLayerValue();

    return (
        <View style={styles.order}>
            <Text style={styles.orderTitle}>
                Order
            </Text>
            <Text style={{ color: 'gray', textAlign: 'left', padding: 5 }}>
                {moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}
            </Text>
            <Text style={{ color: 'gray', textAlign: 'left', padding: 5, fontSize: 13 }}>
                {order.id}
            </Text>
            {
                order.data.basket?.map((item, i) => (
                            <Product
                                hideButton={true}
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
            <NumberFormat
                                                renderText={(value) => (
                                                    <>
                                                        <Text style={{fontWeight: 'bold', fontSize: 15}}>Order Total : {value}</Text>
                                                    </>
                                                )}
                                                decimalScale={2}
                                                value={order.data.amount / 100}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"$"}
            />
        </View>
    )
}

export default Order

const styles = StyleSheet.create({
    order: {
        padding: 10,
        margin: 15,
        borderWidth: 1,
        borderColor: 'lightgray',
        position: 'relative',
        backgroundColor: 'white'
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    }
})
