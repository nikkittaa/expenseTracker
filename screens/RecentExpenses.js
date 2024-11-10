import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinus } from "../util/date";
import { GlobalStyles } from "../constants/styles";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses(){
    const {expenses, setExpenses} = useContext(ExpenseContext);
    //const [fetchedExpenses, setFetchedExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function getExpenses(){
            setIsLoading(true);
            try{
                const expensesList = await fetchExpenses();
                setExpenses(expensesList);
            }catch(error){
                setError('Colud not fetch expenses!');
            }
            setIsLoading(false);
           
        }

        getExpenses();
    }, []);

    function errorHandler(){
        setError(null);
    }

    if(error && !isLoading){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if(isLoading){
        return <LoadingOverlay/>
    }

    const recentExp = expenses.filter((expense) => {
        const today = new Date();
        const date7days = getDateMinus(today, 7);

        return expense.date >= date7days;
    });

   
    return <ExpensesOutput expenses = {recentExp} periodName = "Last 7 days"/>
}

