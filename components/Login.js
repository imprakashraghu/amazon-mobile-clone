import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { auth } from '../firebase'

const Login = ({ navigation }) => {

    const secondTextInput = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    

    const signIn = () => {
        if(email && password) {
        
            auth
                .signInWithEmailAndPassword(email, password)
                .then(auth => {
                    navigation.navigate('Home');
                })
                .catch(error => warning("Amazon Clone Sign In",error.message));

        } else {
            warning("Amazon Clone Sign In", "Input Badly Formatted 😢");
        }
    }

    const register = () => {
        if(email && password) {

            auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if(auth) {
                    navigation.navigate('Home');
                }
            })
            .catch(error => warning("Amazon Clone Sign In",error.message));

        } else {
            warning("Amazon Clone Register", "Input Badly Formatted 😢");
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

    return (        
        <View style={styles.login}>
            <StatusBar barStyle="light-content" />
            <View style={styles.loginHeader}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image
                        style={styles.loginImage}
                        source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.loginForm}>
                <View style={{ width: '100%', display: 'flex', flexDirection:'row', alignItems:'center', justifyContent: 'space-between' }}>
                    <Text style={styles.loginFormTitle}>
                        Sign in
                    </Text>
                    <Text style={styles.loginFormLink}>
                        Forgot password?
                    </Text>
                </View>
                <View style={styles.loginInputContainer}>
                    <TextInput 
                        value={email}                       
                        onChangeText={text => setEmail(text)}
                        style={styles.loginInputText}
                        placeholder="Email Address"                        
                        returnKeyType={"next"}
                        onSubmitEditing={() => secondTextInput.current.focus()}
                    />                                        
                    <TextInput
                        ref={secondTextInput}
                        value={password}                       
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                        style={styles.loginInputPassword}
                        placeholder="Your Password"                        
                    />
                </View>
                <TouchableOpacity
                    onPress={() => signIn()}
                    style={styles.loginSignInButton}
                >
                    <Text style={{ color: '#111', textAlign: 'center' }}>Sign in</Text>                    
                </TouchableOpacity>
                <Text style={{ textAlign: 'left', fontSize: 13, color: 'gray' }}>
                    By signing-in you agree to Amazon's Conditions of Use &amp; Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </Text>
                <TouchableOpacity
                    onPress={() => register()}
                    style={styles.loginRegisterButton}
                >
                    <Text style={{ color: '#111', textAlign: 'center' }}>Create your Amazon Account</Text>                    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.loginFormLink}>
                        Continue Shopping                        
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={{textAlign: 'center', padding: 10, color: 'gray'}}>
                © Amazon Clone 2020
            </Text>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    login: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'        
    },
    loginHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 10,
        width: '100%'        
    },
    loginImage: {
        marginTop: 18,             
        width: 102,
        height: 30  
    },
    loginForm: {
        width: '100%',
        padding: 13,
        borderColor: '#ccc',
        borderWidth: 1
    },
    loginFormTitle: {        
        fontSize: 22,
        fontWeight: "bold"
    },
    loginFormLink: {
        textAlign: 'center',
        fontSize: 15,
        color: '#0095ff'
    },
    loginInputContainer: {
        borderWidth: 1,
        marginTop: 22,
        borderRadius: 2,
        borderColor: 'gray'                
    },
    loginInputText: {
        padding: 10,
        paddingLeft: 14,
        fontSize: 17,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    loginInputPassword: {
        padding: 10,
        paddingLeft: 14,
        fontSize: 17     
    },
    loginSignInButton: {
       padding: 10,
       width: '100%',       
       backgroundColor: '#f0c14b',
       borderWidth: 1,
       marginTop: 17,
       marginBottom: 10,
       borderColor: '#a88734'
    },
    loginRegisterButton: {
        padding: 10,
        width: '100%',               
        borderWidth: 1,
        backgroundColor: 'lightgray',
        marginTop: 17,
        marginBottom: 10,
        borderColor: 'darkgray'
    }
})
