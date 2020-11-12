export const initialState = {    
    basket: [],
    reviews: [],
    user: null,
    products: [
        {
                        id:"1234567",
                        title:"New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",                     
                        price:589.99,
                        rating:5,
                        image:"https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg",
        },
        {
            id:"0987652",
            title:"Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal",                     
            price:18.99,
            rating:4,
            image:"https://images-na.ssl-images-amazon.com/images/I/61IxWv3ecpL._AC_SL1000_.jpg",
        },
        {
            id:"48038203",
            title:"Simple Mobile Prepaid - Apple iPhone 7 (32GB) - Black",                     
            price:199.99,
            rating:5,
            image:"https://images-na.ssl-images-amazon.com/images/I/61%2BfbdrjtCL._AC_SL1500_.jpg",
        },
        {
            id:"920122",
            title:"TCL Active Noise Cancelling Headphones, MTRO200NC Wireless Bluetooth Headphones On-Ear Lightweight Stereo Headphones",                     
            price:79.99,
            rating: 4,
            image: "https://images-na.ssl-images-amazon.com/images/I/61pRR8YhmYL._AC_SL1500_.jpg"
        },
        {
            id:"90913012",
            title:"Think Like a Monk: Train Your Mind for Peace and Purpose Every Day Hardcover",                     
            price: 16.02,
            rating: 5,
            image: "https://images-na.ssl-images-amazon.com/images/I/71ru1Xg+VyL.jpg"
        },
        {
            id:"193201932131",
            title:"Samsung IT LC27F591FDNXZA Samsung C27F591 27-Inch Curved Monitor",                     
            price: 958.74,
            rating: 5,
            image: "https://images-na.ssl-images-amazon.com/images/I/91wXQisyRiL._AC_SL1500_.jpg"
        }
    ]
}

export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            };       
        case "REMOVE_FROM_BASKET":
                const index = state.basket.findIndex(
                    (basketItem) => basketItem.id === action.id);
                let newBasket = [...state.basket];
                if(index >= 0) {
                    newBasket.splice(index, 1);
    
                } else {
                    console.warn(`Cant remove product (id: ${action.id}) as its not in basket!`);
                }       
                
                return {
                    ...state,
                    basket: newBasket
                }; 
        case "ADD_REVIEW": 
                return {
                    ...state,
                    reviews: [...state.reviews, action.review]
                }
                break;    
        case "SET_USER":
                    return {
                        ...state,
                        user: action.user
                    }
                    break;
        case "EMPTY_BASKET":
                        return {
                            ...state,
                            basket: []
                        }
                        break;
        default:
            return state;        
    }
}

export default reducer;