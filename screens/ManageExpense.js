import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native"
import IconButtons from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({route, navigation}){
    const expensesCtx = useContext(ExpenseContext);

    const edittedexpenseId = route.params?.expenseId;

    const isEditing = !!edittedexpenseId;

    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === edittedexpenseId);
    const [isLoading, setIsLoading] = useState(false);
    const [ error, setError] = useState();
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    async function deleteExpenseHandler(){
        setIsLoading(true);
        try{
            await deleteExpense(edittedexpenseId);
            expensesCtx.deleteExpense(edittedexpenseId);
            navigation.goBack();
        }catch(error){
            setError('Could not delete expenese!');
            setIsLoading(false);
        }
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData){
        setIsLoading(true);
        try{
            if(isEditing){
                expensesCtx.updateExpense(edittedexpenseId, expenseData);
                await updateExpense(edittedexpenseId, expenseData);
                setIsLoading(false);
            }else{
                const id = await storeExpense(expenseData);
                setIsLoading(false);
                expensesCtx.addExpense({...expenseData, id:id});
    
            }
            navigation.goBack();
        }catch(error){
            setError("Could not save data! Please try again later");
            setIsLoading(false);
        }
        
    }

    function errorHandler(){
        setError(null);
    }

    if(error && !isLoading){
        return <ErrorOverlay message={error} onConfirm = {errorHandler}/>
    }
   
    if(isLoading){
        return <LoadingOverlay/>
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