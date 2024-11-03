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
    console.log('here');
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

    function confirmHandler(){
        if(isEditing){
            expensesCtx.updateExpense(edittedexpenseId, 
                {description: "Test!!!!", amount: 999, date: new Date('2024-11-01')});
        }else{
            expensesCtx.addExpense({description: "Test", amount: 999, date: new Date('2024-11-03')});
        }
        navigation.goBack();
    }
   
    return (
        <View style = {styles.container}>
            <ExpenseForm/>
            <View style = {styles.buttons} >
                <Button style = {styles.button} mode = "flat" onPress = {cancelHandler}>Cancel</Button>
                <Button style = {styles.button} onPress = {confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
});