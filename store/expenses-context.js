import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 5000,
        date: new Date('2024-08-21')
    },
    {
        id: 'e2',
        description: 'A Shirt',
        amount: 3000,
        date: new Date('2024-09-02')
    },
    {
        id: 'e3',
        description: 'Groceries',
        amount: 2000,
        date: new Date('2024-09-11')
    },
    {
        id: 'e4',
        description: 'A Book',
        amount: 500,
        date: new Date('2024-08-14')
    },
    {
        id: 'e5',
        description: 'Curtains',
        amount: 3000,
        date: new Date('2024-10-21')
    },
    {
        id: 'e6',
        description: 'Dinner Set',
        amount: 2000,
        date: new Date('2023-10-21')
    },
    {
        id: 'e7',
        description: 'Food',
        amount: 1000,
        date: new Date('2024-10-30')
    },
    {
        id: 'e8',
        description: 'Bedsheets',
        amount: 700,
        date: new Date('2022-8-07')
    },
    {
        id: 'e9',
        description: 'Clothes',
        amount: 1000,
        date: new Date('2024-11-01')
    }
    
];

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action){
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state]
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
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return(
        <ExpenseContext.Provider value = {value}>
            {children}
        </ExpenseContext.Provider>
    );
}