import { createStore } from 'redux';

let initState = {
    index:0,
    uid:'xie',
    
}

const store = createStore((state = initState, action)=> {
    return {
        uid:"10",
        token: "t34w4232423423fdskfkljsd",
        name:"你是谁"
    }
})



export default store;

