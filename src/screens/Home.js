import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Vibration } from 'react-native'
import Header from '../component/Header'
import List from '../component/List'
import { openDatabase } from 'react-native-sqlite-storage'
import DatePicker from 'react-native-neat-date-picker'
import Utils from '../utils/Utils'

var db = openDatabase({ name: 'data.db' }, () => {}, (err) => {
    console.log('SQL Error : ' + err.message)
})

const ExpenseTracker = ({ navigation }) => {
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
        DATA.filter(item => item.expense_type === type).map(filteredItem => {
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

    // selectDataFromDatabase("SELECT * FROM tbl_expense", [])

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
                        <List 
                            listData={DATA}
                            onItemPress = {(item) => {
                                console.log('Item Clicked : ' + item)
                            }} />
                    </View>
            </View>
        </SafeAreaView>
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