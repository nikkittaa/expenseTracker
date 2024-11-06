import {View, Text, TextInput, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

export default function Input({label, textInputConfig, style, inValid}){
    let inputStyles = [styles.input]

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline);
    }
    
    if(inValid){
        inputStyles.push(styles.invalidStyle);
    }

    return(
        <View style = {[styles.inputContainer, style]}>
            <Text style = {styles.label}>{label}</Text>
            <TextInput style = {inputStyles} {...textInputConfig}/>
        </View>
    );
}
 

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label:{
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
        marginBottom: 4
    },
    invalidStyle: {
        backgroundColor: GlobalStyles.colors.error50
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    }
});