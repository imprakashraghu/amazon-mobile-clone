import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import Header from './Header'

const Prime = ({ navigation }) => {
    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" />
            <View style={styles.main}>
                <Header navigation={navigation} query={null} />   
                <View style={styles.prime}>
                    <Image
                        resizeMode="contain"
                        style={styles.primeImage}
                        source={{
                            uri: "https://mainlymiles.com/wp-content/uploads/2018/08/amazon-prime-now.jpg"
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={styles.primeButton}
                    >
                        <Text style={{textAlign:'center', color:'#111'}}>Join Prime Now</Text>
                    </TouchableOpacity>                    
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Prime

const styles = StyleSheet.create({
    prime: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center'
    },
    primeImage: {        
        width: '100%',        
        height: 137,
        zIndex: -1,
        marginBottom: 10      
    },
    primeButton: {
        backgroundColor: '#f0c14b',
        borderRadius: 2,
        width: '80%',
        padding: 10,
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#a88734'    
    }    
})
