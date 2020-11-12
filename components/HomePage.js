import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import Product from './Product'
import TinyProduct from './TinyProduct'


const HomePage = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height

    return (
        <View style={styles.homepage}>            
            <ScrollView style={{ height: screenHeight }}>
                <Image
                    style={styles.homepageImage}
                    source={{
                        uri: "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    }}
            />      
            <View style={styles.homepageRow}>                  
                    <Product 
                        navigation={navigation} 
                        type="add"                      
                        id="1234567"
                        title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                        price={589.99}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                    />
                    <View style={styles.homepageContainer}>
                        <TinyProduct
                            type="add"
                            navigation={navigation} 
                            id="90913012"
                            title="Think Like a Monk: Train Your Mind for Peace and Purpose Every Day Hardcover"                     
                            price={16.02}
                            rating={5}
                            image="https://images-na.ssl-images-amazon.com/images/I/71ru1Xg+VyL.jpg"
                        />
                        <TinyProduct
                            type="add"
                            navigation={navigation} 
                            id="0987652"
                            title="Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal"
                            price={18.99}
                            rating={4}
                            image="https://images-na.ssl-images-amazon.com/images/I/61IxWv3ecpL._AC_SL1000_.jpg"
                        />
                    </View>
                    <Product  
                        navigation={navigation} 
                        type="add"                       
                        id="920122"
                        title="TCL Active Noise Cancelling Headphones, MTRO200NC Wireless Bluetooth Headphones On-Ear Lightweight Stereo Headphones"                     
                        price={79.99}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/61pRR8YhmYL._AC_SL1500_.jpg"                        
                    /> 
                    <Product  
                        navigation={navigation} 
                        type="add"                       
                        id="48038203"
                        title="Simple Mobile Prepaid - Apple iPhone 7 (32GB) - Black"                     
                        price={199.99}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/61%2BfbdrjtCL._AC_SL1500_.jpg"                        
                    />                               
                    <Product
                         navigation={navigation} 
                         type="add"                     
                         id="193201932131"
                         title="Samsung IT LC27F591FDNXZA Samsung C27F591 27-Inch Curved Monitor"                     
                         price={958.74}
                         rating={5}
                         image="https://images-na.ssl-images-amazon.com/images/I/91wXQisyRiL._AC_SL1500_.jpg"                        
                    />
            </View>            
            </ScrollView>
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({
    homepage: {         
    },
    homepageImage: {
        width: '100%',
        height: 200,
        marginBottom: -80       
    },
    homepageRow: {
        height: '100%',
        marginBottom: 150
    },
    homepageContainer: {        
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'        
    }
})
