import { View , Text, StyleSheet} from "react-native";
import ExpensesSummary from "./ExpenseSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";



export default function ExpensesOutput({expenses, periodName}){
    return(
        <View style = {styles.container}>
            <ExpensesSummary expenses = {expenses} periodName = {periodName}/>
            {!!expenses.length ? <ExpensesList expenses = {expenses}/> :
                <View style = {styles.emptyContainer}>
                    <Text style = {styles.emptyText}>No expenses to show</Text>
                </View>            
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText:{
        color: 'white',
        fontSize: 24
    }
});