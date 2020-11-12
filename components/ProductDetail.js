import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, StatusBar, Image, TextInput, ScrollView, CheckBox, TouchableOpacity } from 'react-native'
import Header from './Header'
import Moment from 'react-moment'
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import Review from './Review'
import { useDataLayerValue } from '../DataLayer'

const ProductDetail = ({ route, navigation }) => {  
    
    const [{ reviews }, dispatch] = useDataLayerValue();

    const { id, title, rating, price, description, image } = route.params;

    const secondTextInput = useRef();
    const thirdTextInput = useRef();
    const scrolls = useRef();

    const [name, setName] = useState('');
    const [reviewMessage, setReviewMessage] = useState('');
    const [reviewRating, setReviewRating] = useState('1');    

    const [itemReviews, setItemReviews] = useState([]);

    useEffect(() => {
        setItemReviews(reviews.filter(r => r.id === id));        
    },[id,reviews]);

    useEffect(() => {
        scrolls.current?.scrollTo({y:0, animated:true});
    },[id]);

    const addReview = () => {                
        if(name && reviewMessage) {
            
            if(parseInt(reviewRating) < 6) {                
                dispatch({
                    type: "ADD_REVIEW",
                    review: {
                        id: id,
                        name: name,
                        message: reviewMessage,
                        reviewRating: reviewRating
                    }
                });
    
                setName('');
                setReviewMessage('');
                setReviewRating('1');                

            } else {
                warning('Product Review', 'Rating must be less than equal to 5');
            }

        } else {
            warning('Product Review', 'Input badly formatted');
        }
    }

    const warning = (title, message) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Close",
                    style: "cancel"
                }
            ],
            { cancelable: true }            
        );
    }

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

    const buyNow = () => {
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
        navigation.navigate('Basket');
    }

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>            
            <StatusBar barStyle="light-content" />
            <View style={styles.productDetail}>
                <Header navigation={navigation} query={null} />            
                <Image
                    style={{ width: '100%', height: 25 }}
                    resizeMode="contain"
                    source={{
                        uri: 'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Jupiter2020/ILMs_Phase-4/Flat/Category_ILM_640x45_32._CB416322963_.jpg'
                    }}
                />                                    
            </View>  
            <ScrollView ref={scrolls}>
            <View style={styles.productDetailInfo}>
                <Text style={styles.productDetailTitle}>
                    {title}
                </Text>
                <Text style={styles.productDetailRating}>
                    {'⭐'.repeat(rating)}
                </Text>
                <Image
                    style={{ width: '100%', height: 250, marginBottom: 20 }}
                    resizeMode="contain"
                    source={{
                        uri: image
                    }}
                />         
                <Text style={styles.productDetailPrice}>
                        M.R.P.:
                        <Text style={{marginLeft: 3 , color: '#B12704'}}> $</Text>
                        <Text style={{ fontWeight: 'bold', color: '#B12704'}}>{price}</Text>
                </Text>
                <Text style={styles.productDetailTime}>
                    Delivery by: <Text style={{fontWeight: 'bold'}}>                    
                        <Moment element={Text} format={'dddd, MMM DD'}>
                            { new Date().toISOString() }
                        </Moment>
                    </Text>
                </Text>
                <Text style={{ marginTop: 10, color: 'green', marginBottom: 5, fontWeight: 'bold' }}>In Stock.</Text>
                <Text style={styles.productDetailDescription}>
                    {description}
                </Text>                
                <View style={styles.productDetailPriceDetail}>
                    <View style={styles.productDetailShare}>
                        <Text style={{fontSize:15}}>Share</Text>
                        <MaterialIcons name="email" size={24} color="black" />
                        <FontAwesome name="facebook-square" size={24} color="#0055ff" />
                        <FontAwesome5 name="twitter" size={24} color="#2d73ff" />
                        <FontAwesome name="pinterest" size={24} color="red" />
                    </View>
                    <TouchableOpacity  
                        onPress={() => addToBasket()}                      
                        style={styles.productDetailButton}
                    ><Text style={{textAlign: 'center', color: '#111'}}>Add to Basket</Text>               
                    </TouchableOpacity>
                    <TouchableOpacity  
                        onPress={() => buyNow()}
                        style={styles.productDetailButton}
                    ><Text style={{textAlign: 'center', color: '#111'}}>Buy Now</Text>               
                    </TouchableOpacity>
                    <View style={styles.productDetailGift}>
                                            <CheckBox /> 
                                            <Text>This order
                                            contains gift</Text>
                    </View>
                    <View style={styles.productDetailOptions}>
                        <FontAwesome5 name="lock" size={20} color="black" />
                        <Text style={{marginLeft: 10}}>Secure Transaction</Text>
                    </View>
                    <View style={styles.productDetailOptions}>
                        <MaterialIcons name="location-on" size={24} color="black" />
                        <Text style={{marginLeft: 10}}>Select delivery location</Text>
                    </View>
                </View>
                <Image
                    style={{ width: '100%', height: 300 }}
                    resizeMode="contain"
                    source={{
                        uri: 'https://images-na.ssl-images-amazon.com/images/G/31/shazam/M-series-Platter-244x250-p5VJB._V418916226_.jpg'
                    }}
                />  
                <View style={styles.productDetailReviews}>
                    <Text style={styles.productDetailReviewsTitle}>
                        Customer Reviews
                    </Text>
                    <Text style={{marginBottom: 10, fontSize: 14}}>
                        Share your thoughts with other customers
                    </Text>
                    <View style={styles.productDetailReviewsContainer}>
                        <TextInput 
                            value={name}                       
                            onChangeText={text => setName(text)}
                            style={styles.productDetailReviewsInput}
                            placeholder="Your Name"                        
                            returnKeyType={"next"}
                            onSubmitEditing={() => secondTextInput.current.focus()}
                        />                           
                        <TextInput                             
                            ref={secondTextInput}
                            value={reviewMessage}                       
                            onChangeText={text => setReviewMessage(text)}
                            style={styles.productDetailReviewsInput}
                            placeholder="Your Message"                        
                            returnKeyType={"next"}
                            onSubmitEditing={() => thirdTextInput.current.focus()}
                        />                                        
                        <TextInput                                                                                      
                            maxLength={1}                      
                            ref={thirdTextInput}
                            keyboardType = 'number-pad'
                            value={reviewRating}                       
                            onChangeText={text => setReviewRating(text)}                        
                            style={{ padding: 8 }}
                            placeholder="Your Rating"                        
                        />
                </View>
                <TouchableOpacity 
                    onPress={() => addReview()}                   
                    style={styles.productDetailReviewsButton}
                >
                    <Text style={{ color: '#111', textAlign: 'center' }}>Write a Product Review</Text>                    
                </TouchableOpacity>
                </View>
                <View style={styles.productDetailReviewsMessage}>

                    {
                        itemReviews.map((review, index) => (
                            <Review  
                                key={index}                                                              
                                username={review.name}
                                message={review.message}
                                rating={review.reviewRating}
                            />  
                        ))                        
                    }

                            <Review 
                                username="Max Ikrane"
                                rating={4}
                                message="Product is super good. I repeat this is just a test review message for a dummy project build for my personal project stack."
                            /> 
                </View>
            </View>            
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    productDetail: {},
    productDetailInfo: {
        height: '100%',
        marginBottom: 150,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 15
    },
    productDetailTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 27,
        marginBottom: 7                 
    },
    productDetailRating: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20
    },
    productDetailPrice: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 7,
        fontSize: 18
    },
    productDetailTime: {
        display: 'flex',
        flexDirection: 'row',        
        fontSize: 15
    },
    productDetailDescription: {
        textAlign: 'left',
        color: '#111',
        marginBottom: 5,
        paddingBottom: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    productDetailPriceDetail: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 15
    },
    productDetailShare: {        
        width: 170,
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    productDetailButton: {
        backgroundColor: '#f0c14b',
        borderRadius: 2,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#a88734'  
    },
    productDetailGift: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    productDetailOptions: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'      
    },
    productDetailReviews: {
        width: '100%',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column'
    },
    productDetailReviewsTitle: {        
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 17
    },
    productDetailReviewsContainer: {        
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        padding: 5
    },
    productDetailReviewsInput: {        
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        padding: 8
    },
    productDetailReviewsButton: {
        padding: 10,
        width: '100%',               
        borderWidth: 1,
        backgroundColor: 'lightgray',
        marginTop: 12,
        marginBottom: 10,
        borderColor: 'darkgray'
    },
    productDetailReviewsMessage: {
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    }
})
