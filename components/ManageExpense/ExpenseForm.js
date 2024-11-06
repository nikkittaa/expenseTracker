import {Pressable, View, StyleSheet, Text, Alert} from 'react-native';
import Input from './Input';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../UI/Button';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseForm({onCancel, isEditing, onSubmit, defaultValues}){
    const [selectedDate, setSelectedDate] = useState(!!defaultValues ? defaultValues.date : new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [amount, setAmount] = useState({value: !!defaultValues ? defaultValues.amount.toString(): '', isValid: true});
    const [description, setDescription] = useState({value: !!defaultValues ? defaultValues.description: '', isValid: true});
    
    function amountChangeHandler(enteredAmount){
        setAmount({value: enteredAmount, isValid: true});
    }

    function descriptionChangeHandler(text){
        setDescription({value: text, isValid: true});
    }


    function handleDatePicker(){
        setShowDatePicker(!showDatePicker);
    }

    function onChange({type}, date) {
        if(type == "set"){
            const current =date;
            setSelectedDate(current);
            handleDatePicker();
        }else{
            handleDatePicker();
        }
    }

    function submitHandler(){
        const expenseData = {
            amount: +amount.value,
            date: new Date(selectedDate),
            description: description.value
        }

        amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        descriptionIsValid = expenseData.description.trim().length >0;

        if(!amountIsValid || !descriptionIsValid){
            setAmount({value: expenseData.amount, isValid: amountIsValid});
            setDescription({value: expenseData.description, isValid: descriptionIsValid});
            return;
        }

        onSubmit(expenseData);
        
    }
    

    return(
        <View style = {styles.container}>
            <Text style = {styles.titleStyle}>Your Expense</Text>
            <Input label = "Amount" 
                inValid = {!amount.isValid}
                textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amountChangeHandler,
                value: amount.value
            }}/>

            
           {showDatePicker && <DateTimePicker
                mode = "date"
                value = {selectedDate}
                onChange = {onChange}
            />}

        
            {!showDatePicker && (
                <Pressable onPress = {handleDatePicker}>
                <Input label = "Date"
                textInputConfig={{
                    placeHolder: 'Select Date',
                    value: selectedDate.toLocaleDateString(),
                    onChangeText: setSelectedDate,
                    editable: false
                }}
            />
            </Pressable>
            )}
            
           
            <Input label = "Description"
                inValid = {!description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: descriptionChangeHandler,
                    value: description.value
                }}
            />
            {(!amount.isValid || !description.isValid) && (
                <Text style = {styles.errorText}>Invalid Inputs! Please check the entered data</Text>
            )}
             <View style = {styles.buttons} >
                <Button style = {styles.button} mode = "flat" onPress = {onCancel}>Cancel</Button>
                <Button style = {styles.button} onPress = {submitHandler}>{isEditing ? "Update" : "Add"}</Button>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    rowInputStyle: {
        flex:1
    },
    container: {
        marginTop: 40
    },
    titleStyle :{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        justifyContent: 'center',
        textAlign: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
});