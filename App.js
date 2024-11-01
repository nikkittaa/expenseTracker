import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons';
import IconButtons from './components/UI/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return <BottomTabs.Navigator screenOptions={({navigation}) => ({
    headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({tintColor}) => (<IconButtons name = "add" size = {24} color = {tintColor} 
      onPress = {() => {navigation.navigate('ManageExpense')}}/>),
    
  })}>
    <BottomTabs.Screen 
      name = "RecentExpenses" 
      options = {{
        title: 'Recent Expenses',
        headerTitleAlign: 'center',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => <Ionicons name = "hourglass" size = {size} color = {color}/>
      }}
      component = {RecentExpenses}/>
    <BottomTabs.Screen 
      name = "AllExpenses" 
      options = {{
        title: 'All Expenses',
        headerTitleAlign:'center',
        tabBarLabel: 'All Expense',
        tabBarIcon: ({color, size}) => <Ionicons name = "calendar" size = {size} color = {color}/>
      }}
      component={AllExpenses}/>
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
    <StatusBar style="auto" />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        headerTitleAlign: 'center'
      }}>
        <Stack.Screen 
          name = "ExpenseOverview" 
          options = {{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
          component={ExpensesOverview}/>
        <Stack.Screen name = "ManageExpense" 
          component = {ManageExpense}
            options={{
              presentation: 'modal',
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

