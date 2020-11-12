import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Moment from 'react-moment'

const Review = ({ username, rating, message }) => {
    return (
        <View style={styles.review}>
            <View style={styles.reviewHeading}>
                <Image
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                    source={{
                        uri: "https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                    }}
                />
                <Text style={styles.reviewHeadingTitle}>
                    {username}
                </Text>
            </View>            
                <Text style={{marginBottom: 5, marginTop: 5}}>
                    {'⭐'.repeat(rating)}
                </Text>
                <Text style={styles.reviewTime}>
                    Reviewed on {<Moment element={Text} format={'DD MMMM YYYY'}>
                        {new Date().toISOString()}
                        </Moment>}
                </Text>
                <Text style={styles.reviewMessage}>
                    {message}
                </Text>            
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    review: {
        width: '100%',
        padding: 5,
        display: "flex",
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderColor: 'lightgray'
    },
    reviewHeading: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center'
    },
    reviewHeadingTitle: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "bold"
    },
    reviewTime: {
        color: '#2a2a2a',
        fontSize: 14,
        marginBottom: 6
    },
    reviewMessage: {
        fontSize: 15,
        marginBottom: 10                
    }
})
