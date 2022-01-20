import React from 'react'
import Home from '../screens/Home'
import AddExpense from '../screens/AddExpenses'
import ViewExpenses from '../screens/ViewExpenses'
import AddCategory from '../screens/AddCategory'
import Settings from '../screens/Settings'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const MyStacks = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddExpenses" component={AddExpense} />
            <Stack.Screen name="ViewExpenses" component={ViewExpenses} />
            <Stack.Screen name="AddCategory" component={AddCategory} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    )
}

export default MyStacks