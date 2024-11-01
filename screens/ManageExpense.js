import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native"
import IconButtons from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";

export default function ManageExpense({route, navigation}){
    const edittedexpenseId = route.params?.expenseId;

    const isEditing = !!edittedexpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler(){
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(){
        navigation.goBack();
    }
   
    return (
        <View style = {styles.container}>
            <View style = {styles.buttons} >
                <Button style = {styles.button} mode = "flat" onPress = {cancelHandler}>Cancel</Button>
                <Button style = {styles.button} onPress = {confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
            </View>
            {isEditing && <View style = {styles.deleteContainer}>
                <IconButtons 
                name = "trash" 
                color = {GlobalStyles.colors.error500} 
                size = "36" 
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