import {Pressable, View} from 'react-native';
import Input from './Input';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ExpenseForm(){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    function amountChangeHandler(){

    }


    function handleDatePicker(){
        setShowDatePicker(!showDatePicker);
    }

    // function datepicker(){
    //     setShowDatePicker(true);
    //     return  <DateTimePicker
    //     mode = "date"
    //     value = {selectedDate}
    //     onChange = {(event, date) => setSelectedDate(date)}
    //     onConfirm={() => setShowDatePicker(false)}
    //     onCancel = {() => setShowDatePicker(false)}
    // />
    // }

    return(
        <View>
            <Input label = "Amount" textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amountChangeHandler
            }}/>

           {/* {!showDatePicker && (
            <Pressable onPress = {datepicker}>
                <Input label = "Date"
                textInputConfig={{
                    placeHolder: 'Select Date',
                    value: selectedDate.toLocaleDateString(),
                    onPress: handleDatePicker,
                    editable: false
                }}
            />
            </Pressable>
           )} */}
            
           {showDatePicker && <DateTimePicker
                mode = "date"
                value = {selectedDate}
                onChange = {(event, date) => setSelectedDate(date)}
                onConfirm={() => setShowDatePicker(false)}
                onCancel = {() => setShowDatePicker(false)}
            />}

            <Pressable onPress = {handleDatePicker}>
                <Input label = "Date"
                textInputConfig={{
                    placeHolder: 'Select Date',
                    value: selectedDate.toLocaleDateString(),
                    onPress: handleDatePicker,
                    editable: false
                }}
            />
            </Pressable>
           
            <Input label = "Description"
                textInputConfig={{
                    
                }}
            />
        </View>
    );
}