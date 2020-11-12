import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Keyboard, Alert } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useDataLayerValue } from '../DataLayer'
import { useRoute } from '@react-navigation/native'

const Header = ({ navigation, query=null }) => {  

    const [{ basket }] = useDataLayerValue();
    
    const route = useRoute();
    const [searchText, setSearchText] = useState('');         

    useEffect(() => {
        setSearchText(query);
    },[query]);

    const handleSearch = () => {
        if(searchText) {
            Keyboard.dismiss();            
            navigation.navigate('Search', { q: searchText });                                    
        } else {
            warning('Amazon Clone Search', 'Input badly formatted');
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

    const navigateNow = (place) => {
        setSearchText(null);        
        navigation.navigate(place);
    }

    return (
        <View style={styles.header}>                     
            <View style={styles.headerTop}>  
                <View style={styles.headerTopLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                    >
                                    <Ionicons                                                        
                                    name="ios-menu"
                                    color="white"
                                    size={32}  
                                    style={{ marginBottom: 10 }}                  
                                />
                    </TouchableOpacity>
                    <TouchableOpacity                        
                        onPress={() => navigateNow('Home')}
                    >
                        <Image
                            style={styles.headerLogo}                    
                            source={{
                                uri: "http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                            }}
                        />
                    </TouchableOpacity>
                </View>                
                    <TouchableOpacity
                        style={styles.headerTopRight}
                        onPress={() => navigateNow('Basket')}
                    >
                        <Ionicons
                            name="md-basket"
                            size={28}
                            color="white"
                        />
                        <Text style={{ color: 'white', paddingLeft: 10, fontSize: 15 }}>
                            {basket.length}
                        </Text>
                    </TouchableOpacity>                
            </View>            
            <View style={styles.headerBottom}>  
                <View style={styles.headerSearch}>
                    <TextInput                    
                        onSubmitEditing={() => handleSearch()}
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.headerInput}
                    />
                    <Feather
                        onPress={() => handleSearch()}
                        name="search"
                        size={25}
                        color="black"
                        style={{
                            backgroundColor: '#cd9042',
                            padding: 5,
                            borderBottomRightRadius: 4,
                            borderTopRightRadius: 4
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {                
        display: "flex",
        flexDirection: 'column',        
        alignItems: 'center',
        backgroundColor: '#131921',
        zIndex: 100
    },
    headerTop: { 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: 60,
        width: '100%',        
        padding: 10
    },
    headerTopLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',  
    },
    headerTopRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',  
        paddingRight: 5        
    },
    headerLogo:{   
        marginTop: 5,     
        marginLeft: 15,
        width: 102,
        height: 37        
    },
    headerBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',        
        width: '100%',        
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15
    },
    headerSearch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 3
    },
    headerInput: {        
        padding: 5,
        height: 35,
        width: '90%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4
    }
})
