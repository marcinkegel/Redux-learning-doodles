console.clear();

//(Action creator - the client with a form)

const createPolicy =(name, amount) =>{
    return {//(action - form)
        type: "CREATE_POLICY",
        payload: {
            name: name,
            amount: amount
        }

    };
};

const deletePolicy = (name)=>{
    return {
        type: "DELETE_POLICY",
        payload: {
            name: name
        }
    };
};

const createClaim =(name, amountOfMoneyToCollect)=>{
    return{
        type: "CREATE_CLAIM",
        payload: {
            name: name,
            amountOfMoneyToCollect: amountOfMoneyToCollect
        }
    };
};




//Reducers (Departments)

const claimsHistory = (oldListOfClaims = [], action)=>{
    if (action.type === "CREATE_CLAIM") {
        //WE CARE ABOUT THIS ACTION ( about this form)
        return [...oldListOfClaims, action.payload];
    }
    //WE DON'T CARE ABOUT THIS ACTION ( about this form)
    return oldListOfClaims;
};



const accounting = (bagOfMoney= 100, action)=>{
    if (action.type === "CREATE_CLAIM"){
        return bagOfMoney - action.payload.amountOfMoneyToCollect
    } else if (action.type === "CREATE_POLICY"){
        return bagOfMoney + action.payload.amount
    }
    return bagOfMoney
};


const policies =  (listOfPolicies=[], action)=>{
    if( action.type === "CREATE_POLICY"){
        return [...listOfPolicies, action.payload.name];
    } else if (action.type === "DELETE_POLICY"){
        return listOfPolicies.filter(n=> n!== action.payload.name);
    }
    return listOfPolicies;
};

console.log(Redux)


const { createStore, combineReducers } = Redux;


const ourDepartments = combineReducers({
    accounting: accounting,
    claimsHistory: claimsHistory,
    policies: policies
});

const store = createStore(ourDepartments);

const action = createPolicy("Alex", 20);

store.dispatch(action);
store.dispatch(createPolicy("Jim",50));
store.dispatch(createClaim("Jim",100));
store.dispatch(createPolicy("Jack",100));
store.dispatch(deletePolicy("Jack"));


console.log(store.getState())