import { createContext, useReducer } from "react";


export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action){
    switch(action.type) {
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'ADD':
            return [action.payload, ...state]
        case 'UPDATE':
            const updateIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updateExpense = state[updateIndex];
            const updated = {...updateExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updateIndex] = updated;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

export default function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    function setExpenses(expenses){
        dispatch({type: 'SET', payload: expenses});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return(
        <ExpenseContext.Provider value = {value}>
            {children}
        </ExpenseContext.Provider>
    );
}