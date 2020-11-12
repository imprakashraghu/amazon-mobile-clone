import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import axios from 'axios'
import Button from './Button'
import { db } from '../firebase'

export default class CardFormScreen extends PureComponent {
  static title = 'Card Form'  

  state = {
    loading: false,
    token: null,
  }  

  componentDidMount() {    
        Stripe.setOptionsAsync({
            publishableKey: 'pk_test_51HlEFvDPfCWaAczP7KnxZB389coG9RjEqThhDtYskEEAw84KctGINrAmI8TMSJMrjQJnuYrQuxA0s2VjmOeR46Hd00ou6eOhDi',
            androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)    
        });    
  }

  handleCardPayPress = async () => {
    try {
        this.setState({ loading: true, token: null })
        const options = {
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
              billingAddress: {
                name: 'Test Name',
                line1: 'Test Line 1',
                line2: '4',
                city: 'Test City',
                state: 'Test State',
                country: 'Test Country',
                postalCode: '31217',
              },
            },
          };
          
          const token = await Stripe.paymentRequestWithCardFormAsync(options);        
          this.setState({ loading: false, token }) 
    } catch (error) {
      this.setState({ loading: false })
    }        
  }

  makePayment = async () => {
    this.setState({ loading: true })
    axios({
        method: 'POST',
        url: `http://192.168.1.10:7000/api/payments/mobile/create?total=${parseInt(this.props.total * 100)}&token=${this.state.token?.tokenId}`
    }).then(response => {             
            db
                .collection('users')
                .doc(this.props.user?.uid)
                .collection('orders')
                .doc(this.state.token.tokenId)
                .set({
                    basket: this.props.basket,
                    amount: parseInt(this.props.total * 100),
                    created: Date.now()
                }).then(response => {
                    this.setState({ loading: false, token: null })   
                    this.props.navigation.navigate('Home', {result: true});
                }).catch(e => console.log(e))
    }).catch(e => {
        this.setState({ loading: false, token: null })        
        console.log(e)
    })


  }

  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>        
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
        //   {...testID('cardFormButton')}
        />
        <View
          style={styles.token}
        >
          {token &&
           <View style={{ display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                <Text style={styles.instruction}>
                Token: {token.tokenId}
                </Text>
                <Button                
                    text="Make Payment"
                    loading={loading}
                    onPress={this.makePayment}                
                />
            </View>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    padding: 5
  },
  token: {    
  },
})