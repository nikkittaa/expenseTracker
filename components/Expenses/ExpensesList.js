import { View, Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData){
    const description = itemData.item.description;
    const amount = itemData.item.amount;
    // const d = JSON.stringify(itemData.item.date);
    const d = itemData.item.date;
    return <ExpenseItem 
        description = {description}
        amount = {amount}
        date = {d}
        id = {itemData.item.id}
        />
}
export default function ExpensesList({expenses}){
    return (
        <FlatList data = {expenses} 
            renderItem = {renderExpenseItem}
            keyExtractor={(item) => item.id }
            />
    );
        
}