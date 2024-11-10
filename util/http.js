import axios from "axios";

const url = "https://expense-tracker-project-58ba2-default-rtdb.firebaseio.com";
export async function storeExpense(expenseData){
    const response = await axios.post(url +"/expenses.json",
         expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses(){
    const response = await axios.get(url + "/expenses.json");
    
    const expenses = [];

    for(const key in response.data){
        const obj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };

        expenses.push(obj);
    }

    return expenses;
}

export function updateExpense(id, expenseData){
    return axios.put(url +`/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id){
    return axios.delete(url +`/expenses/${id}.json`);
}