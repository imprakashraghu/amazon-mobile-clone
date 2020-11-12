import React, { useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, Alert } from 'react-native'
import Login from './components/Login'
import Prime from './components/Prime'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetail from './components/ProductDetail'
import { auth } from './firebase'
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import Main from './components/Main'
import { FontAwesome } from '@expo/vector-icons'
import Checkout from './components/Checkout'
import { useDataLayerValue } from './DataLayer'
import TinyProduct from './components/TinyProduct'
import Search from './components/Search'
import Payment from './components/Payment'
import Orders from './components/Orders'

const Drawer = createDrawerNavigator();

function AppIndex() {

    const [{ user }, dispatch] = useDataLayerValue();  

    useEffect(() => {

        auth.onAuthStateChanged(authUser => {
        console.log('LOGGED USER => ', authUser);

        if(authUser) {

            dispatch({
            type: "SET_USER",
            user: authUser
            });

        } else {

            dispatch({
            type: "SET_USER",
            user: null
            });

        }

        })


    },[]);

    return (        
            <NavigationContainer>      
                <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerOption {...props} user={user} />}>
                    <Drawer.Screen name="Home" component={Main} />
                    <Drawer.Screen name="Basket" component={Checkout} />
                    <Drawer.Screen name="Try Prime" component={Prime} />
                    <Drawer.Screen name="Login" component={Login} />          
                    <Drawer.Screen name="ProductPreview" component={ProductDetail} />
                    <Drawer.Screen name="Search" component={Search} />
                    <Drawer.Screen name="Payment" component={Payment} />
                    <Drawer.Screen name="Your Orders" component={Orders} />
                </Drawer.Navigator>        
            </NavigationContainer>           
    )
}

export default AppIndex

function CustomDrawerOption(props) {
    const filteredProps = {
      ...props,
      state: {
        ...props.state,
        routeNames: props.state.routeNames.filter(
          routeName => (routeName !== 'Login' && routeName !== 'ProductPreview' && routeName !== 'Search' && routeName !== 'Payment')         
        ),
        routes: props.state.routes.filter(
          route => (route.name !== 'Login' && route.name !== 'ProductPreview' && route.name !== 'Search' && route.name !== 'Payment')
        ),
      },
    };
    return (
      <DrawerContentScrollView {...filteredProps}>      
      <View style={styles.drawerHeader}>
        <TouchableOpacity 
          onPress={() => props.navigation.navigate('Login')}
          style={styles.drawerHeaderContent}
        >
          <FontAwesome
            name="user-circle-o"
            size={24}
            color="white"
          />        
          <Text
            style={styles.drawerHeaderTitle}
          >Hello, {
            props.user ?
            props.user?.email.split('@')[0]
            : 'Guest'
          }</Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...filteredProps} />      
     {
       props.user && (
          <TouchableOpacity onPress={()=>
                  Alert.alert(
                    'Log out',
                    'Do you want to logout?',
                    [
                      {text: 'Cancel', onPress: () => {return null}},
                      {text: 'Confirm', onPress: () => {  
                        if(props.user) auth.signOut();                                                        
                        props.navigation.navigate('Login')                 
                      }},
                    ],
                    { cancelable: false }
                  )  
                }>
                <Text style={{margin: 16,fontWeight: 'bold',color: '#111'}}>Logout</Text>
          </TouchableOpacity> 
       )
     }
    </DrawerContentScrollView>
    )
  }
  
  const styles = StyleSheet.create({
    drawerHeader: {
      backgroundColor: '#131921',
      padding: 5            
    },
    drawerHeaderContent: {        
      padding: 10,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'    
    },
    drawerHeaderTitle: {
      fontSize: 20,
      color: 'white',
      paddingLeft: 15    
    }
  })

function Dummy() {
  return (<></>);
}