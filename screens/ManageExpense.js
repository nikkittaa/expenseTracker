import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native"
import IconButtons from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageExpense({route, navigation}){
    const expensesCtx = useContext(ExpenseContext);

    const edittedexpenseId = route.params?.expenseId;

    const isEditing = !!edittedexpenseId;

    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === edittedexpenseId);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler(){
        expensesCtx.deleteExpense(edittedexpenseId);
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(expenseData){
        if(isEditing){
            expensesCtx.updateExpense(edittedexpenseId, expenseData);
        }else{
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }
   
    return (
        <View style = {styles.container}>
            <ExpenseForm onCancel = {cancelHandler} 
                    isEditing={isEditing}
                    onSubmit={confirmHandler}
                    defaultValues = {selectedExpense}
                />
           
            {isEditing && <View style = {styles.deleteContainer}>
                <IconButtons 
                icon = "trash" 
                color = {GlobalStyles.colors.error500} 
                size = {36} 
                onPress = {deleteExpenseHandler}/>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
   
});