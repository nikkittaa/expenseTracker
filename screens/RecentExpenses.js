import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinus } from "../util/date";
import { GlobalStyles } from "../constants/styles";

export default function RecentExpenses(){
    const {expenses} = useContext(ExpenseContext);

    const recentExp = expenses.filter((expense) => {
        const today = new Date();
        const date7days = getDateMinus(today, 7);

        return expense.date >= date7days;
    });

   
    return <ExpensesOutput expenses = {recentExp} periodName = "Last 7 days"/>
}

