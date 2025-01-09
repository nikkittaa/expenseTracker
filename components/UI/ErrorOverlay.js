import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";


export default function ErrorOverlay({message, onConfirm}){
    return <View style = {styles.container}>
        <Text style = {[styles.textStyle, styles.title]}>An error occured!</Text>
        <Text style = {styles.textStyle}>{message}</Text>
        <Button onPress = {onConfirm}>Back</Button>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    textStyle:{
        textAlign: 'center',
        marginBotton: 8,
        color: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});