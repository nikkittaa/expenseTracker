import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expenses-context";

export default function AllExpenses(){
    const {expenses} = useContext(ExpenseContext);
    return <ExpensesOutput expenses = {expenses} periodName = "Total"/>
}