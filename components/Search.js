import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import Header from './Header'
import { useDataLayerValue } from '../DataLayer'
import Product from './Product'

const Search = ({ route, navigation }) => {

    const { q } = route.params || '';

    const [{ products }] = useDataLayerValue();

    const [result, setResult] = useState([]);

    useEffect(() => {        
        const newResult = products.filter(p => (
            p.title.toLowerCase().includes(q?.toLowerCase())
        ));
        setResult(newResult);
    },[q]);

    return (        
        <SafeAreaView style={{backgroundColor: 'white'}}>            
                <StatusBar barStyle="light-content" />
                <View style={styles.search}>
                    <Header navigation={navigation} query={q} /> 
                    <ScrollView>
                        <View style={styles.searchResult}>
                            {
                                result.length ?
                                (
                                    result.map((item, i) => (
                                        <Product
                                            type="add"
                                            key={i}
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            rating={item.rating}
                                            image={item.image}
                                            navigation={navigation}
                                        />
                                    ))                                
                                ) : (
                                    <Text style={{ textAlign: 'center', color: '#111', padding: 10 }}>No Search Result Found</Text>
                                )
                            }                     
                        </View>
                    </ScrollView>
                </View>
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    search: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',    
        backgroundColor: '#eaeded'    
    },
    searchResult: {

    }
})
