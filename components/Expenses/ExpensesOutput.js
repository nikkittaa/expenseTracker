import { View , StyleSheet} from "react-native";
import ExpensesSummary from "./ExpenseSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 5000,
        date: new Date('2024-08-21')
    },
    {
        id: 'e2',
        description: 'A Shirt',
        amount: 3000,
        date: new Date('2024-09-02')
    },
    {
        id: 'e3',
        description: 'Groceries',
        amount: 2000,
        date: new Date('2024-09-11')
    },
    {
        id: 'e4',
        description: 'A Book',
        amount: 500,
        date: new Date('2024-08-14')
    },
    {
        id: 'e5',
        description: 'Curtains',
        amount: 3000,
        date: new Date('2024-10-21')
    },
    {
        id: 'e6',
        description: 'Dinner Set',
        amount: 2000,
        date: new Date('2023-10-21')
    },
    {
        id: 'e7',
        description: 'Food',
        amount: 1000,
        date: new Date('2024-8-07')
    },
    {
        id: 'e8',
        description: 'Bedsheets',
        amount: 700,
        date: new Date('2022-8-07')
    },
    {
        id: 'e9',
        description: 'Clothes',
        amount: 1000,
        date: new Date('2024-10-07')
    }
    
];

export default function ExpensesOutput({expenses, periodName}){
    return(
        <View style = {styles.container}>
            <ExpensesSummary expenses = {DUMMY_EXPENSES} periodName = {periodName}/>
            <ExpensesList expenses = {DUMMY_EXPENSES}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    }
});