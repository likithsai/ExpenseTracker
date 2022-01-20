import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Vibration, Share, Text } from 'react-native'
import Header from '../component/Header'
import List from '../component/List'
import { openDatabase } from 'react-native-sqlite-storage'
import DatePicker from 'react-native-neat-date-picker'
import Utils from '../utils/Utils'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Feather'

const Tab = createBottomTabNavigator()

var db = openDatabase({ name: 'data.db' }, () => {}, (err) => {
    console.log('SQL Error : ' + err.message)
})

const shareItem = async (item) => {
    try {
        const result = await Share.share({
            message: JSON.stringify(item),
        })
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
      console.log(error.message)
    }
}

const AddCategoryScreen = () => {
    return (
        <Text>Goto Settings</Text>
    )
}

const HomeScreen = ({ navigation }) => {
    const [ showDatePicker, setShowDatePicker ] = useState(false)
    const [ selectedData, setSelectedDate ] = useState(Utils.dateFormatter(new Date()))
    const [ income, setIncome ] = useState(0.0)
    const [ expense, setExpense ] = useState(0.0)
    const [ balance, setBalance ] = useState(0.0)
    const [ DATA, setDATA ] = useState([])

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {
        setShowDatePicker(false)
    }

    const onConfirm = ( date ) => {
        setShowDatePicker(false)
        setSelectedDate(Utils.dateFormatter(date))
    }

    // Setup database
    useEffect(() => {
        selectDataFromDatabase("SELECT * FROM tbl_expense WHERE expense_date = ? ORDER BY expense_created_date DESC", [selectedData])
    }, [selectedData])

    useEffect(() => {
        selectDataFromDatabase("SELECT * FROM tbl_expense WHERE expense_date = ? ORDER BY expense_created_date DESC", [selectedData])
        //  load KPI's
        setIncome(loadKPIS('income'))
        setExpense(loadKPIS('expense'))
        setBalance(income - expense)
    })

    const loadKPIS = (type) => {
        let item = 0
        DATA.filter(item => item.expense_type.toLowerCase() === type).map(filteredItem => {
            item = item + filteredItem.expense_amt
        })
        return item
    }

    const selectDataFromDatabase = async (query, param) => {
        await db.transaction(tx => {
            tx.executeSql(query, param, (tx, results) => {
                var temp = []
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i))
                }
                setDATA(temp)
            })
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                maxDate={new Date()}
                colorOptions={{
                    headerColor: '#11998e',
                    weekDaysColor: '#11998e',
                    selectedDateColor: '#11998e',
                    selectedDateBackgroundColor: '#11998e',
                    confirmButtonColor: '#11998e'
                }}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />

            <View style={styles.container}>
                <Header 
                    headerTitle="Expense Tracker"
                    onRightIconPressed = {() => {
                        Vibration.vibrate(50)
                        openDatePicker()
                    }}
                    incomeValue = {income}
                    expenseValue = {expense}
                    balanceValue = {balance}
                    dateText = {selectedData}
                    onAddExpensesClicked = {() => {
                        Vibration.vibrate(50)
                        navigation.navigate('AddExpenses', {})
                    }}/>
                    <View style={styles.scrollView}>
                        <List listData={DATA}
                            onShareItem = {(item) => {
                                // console.log(item)
                                shareItem(item)
                            }} />
                    </View>
            </View>
        </SafeAreaView>
    )
}

const ExpenseTracker = () => {
    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Expenses') {
                        iconName = 'dollar-sign';
                    } else if (route.name === 'Categories') {
                        iconName = 'list';
                    }
        
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#11998e',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Expenses" component={HomeScreen} />
            <Tab.Screen name="Categories" component={AddCategoryScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    scrollView : {
        width: '100%',
        flex: 1
    }
})

export default ExpenseTracker