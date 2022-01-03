import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, StatusBar, Vibration } from 'react-native'
import Header from '../component/Header'
import List from '../component/List'
import { openDatabase } from 'react-native-sqlite-storage';
import DatePicker from 'react-native-neat-date-picker'
import Utils from '../utils/Utils';

var db = openDatabase({ name: 'data.db' }, () => {}, (err) => {
    console.log('SQL Error : ' + err.message)
});

const ExpenseTracker = ({ navigation }) => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedData, setSelectedDate] = useState(Utils.dateFormatter(new Date()))
    const [DATA, setDATA] = useState([])

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
        console.log(selectedData)
        selectDataFromDatabase("SELECT * FROM tbl_expense WHERE expense_date = ? ORDER BY expense_created_date DESC", [selectedData])
    }, [selectedData])

    const selectDataFromDatabase = (query, param) => {
        db.transaction(tx => {
            tx.executeSql(query, param, (tx, results) => {
                var temp = []
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i))
                }
                console.log(temp)
                setDATA(temp)
            });
        });
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
                <Header headerTitle="Expense Tracker"
                    onRightIconPressed = {() => {
                        Vibration.vibrate(50)
                        openDatePicker()
                    }}
                    dateText = {selectedData}
                    onAddExpensesClicked = {() => {
                        Vibration.vibrate(50)
                        navigation.navigate('AddExpenses', {})
                    }}/>
                    <View style={styles.scrollView}>
                        <List listData={DATA} />
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