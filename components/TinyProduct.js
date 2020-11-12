import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import {useDataLayerValue} from '../DataLayer'

const TinyProduct = ({ id, title, image, price, rating, navigation, type=null }) => {

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

    const previewProduct = () => {
        navigation.navigate('ProductPreview', { id, title, price, image, rating, description: "This is a test description of a test product. This is just a sample project for my personal stack." })
    }

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        });
    }

    return (
        <View key={id} style={styles.tinyProductContainer}>
            <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => previewProduct()}
                style={{display: 'flex', alignItems: 'center'}}>
                    <View style={styles.tinyProductInfo}>
                        <Text style={styles.tinyProductTitle}>
                            {title}
                        </Text>
                        <View style={styles.tinyProductPrice}>
                            <Text style={{ fontSize: 12 }}>$</Text>
                            <Text style={{ fontWeight: 'bold' }}>{price}</Text>
                        </View>
                        <View style={styles.tinyProductRating}>
                            <Text>{'⭐'.repeat(rating)}</Text>
                        </View>
                    </View>
                <Image
                    style={{width: 80, height: 80, marginBottom: 15}}
                    resizeMode="contain"
                    source={{
                        uri: image
                    }}
                />
            </TouchableOpacity>
       {
           type === 'add' ?
           (
            <TouchableOpacity
                    onPress={() => addToBasket()}
                    style={styles.tinyProductButton}
            ><Text>Add to Basket</Text>               
            </TouchableOpacity>
           ) : (
            <TouchableOpacity
                    onPress={() => removeFromBasket()}
                    style={styles.tinyProductButtonR}
            ><Text style={{textAlign:'center'}}>Remove from Basket</Text>               
            </TouchableOpacity>
           )
       }
    </View>
    )
}

export default TinyProduct

const styles = StyleSheet.create({
    tinyProductContainer: {
        width: 165, 
        height: 270, 
        backgroundColor: 'white', 
        margin: 3, 
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    tinyProductInfo: {        
        marginBottom: 15
    },
    tinyProductTitle: {},
    tinyProductPrice: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    tinyProductRating: {},
    tinyProductButton: {
        padding: 3,
        backgroundColor: '#f0c14b',
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#a88734',
        color: '#111'
    },
    tinyProductButtonR: {      
        padding: 3,        
        fontSize: 12,        
        backgroundColor: '#f0c14b',
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#a88734',
        color: '#111'
    }    
})
