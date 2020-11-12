import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDataLayerValue } from '../DataLayer'

const Product = ({ id, title, price, image, rating, type, hideButton=false, navigation }) => {

    const [{ basket }, dispatch] = useDataLayerValue();

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id,
                title,
                image,
                price,
                rating
            }
        });
    }

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        });
    }

    const previewProduct = () => {
        navigation.navigate('ProductPreview', { id, title, price, image, rating, description: "This is a test description of a test product. This is just a sample project for my personal stack." })
    }

    return (
        <View key={id} style={styles.product}>
            <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => previewProduct()}
                style={{display: 'flex', alignItems: 'center'}}>
                <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>
                        {title}
                    </Text>
                    <View style={styles.productPrice}>
                        <Text style={{ fontSize: 12 }}>$</Text>
                        <Text style={{ fontWeight: 'bold' }}>{price}</Text>
                    </View>
                    <View style={styles.productRating}>
                        <Text>{'⭐'.repeat(rating)}</Text>
                    </View>
                </View>
                <Image
                    style={styles.productImage}
                    resizeMode="contain"
                    source={{
                        uri: image
                    }}
                />
            </TouchableOpacity>
            {
                !hideButton ?
                type === 'add' ?
                (
                    <TouchableOpacity
                        onPress={() => addToBasket()}
                        style={styles.productButton}
                    ><Text>Add to Basket</Text>               
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => removeFromBasket()}
                        style={styles.productButton}
                    ><Text>Remove from Basket</Text>               
                    </TouchableOpacity>
                ) : null
            }
        </View>
    )
}

export default Product

const styles = StyleSheet.create({
    product: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        padding: 20,
        maxHeight: 500,
        minWidth: 100,
        backgroundColor: 'white',
        zIndex: 1
    },
    productInfo: {
        height: 100,
        marginBottom: 15
    },
    productTitle: {},
    productPrice: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    productRating: {},
    productImage: {        
        width: 150,
        height: 120,                                     
        marginBottom: 15
    },
    productButton: {
        padding: 3,
        backgroundColor: '#f0c14b',
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#a88734',
        color: '#111'
    }
})
