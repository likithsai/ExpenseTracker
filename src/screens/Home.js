import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import Header from '../component/Header'
import List from '../component/List'
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'data.db' }, () => {}, (err) => {
    console.log('SQL Error : ' + err.message)
});

const ExpenseTracker = ({ navigation }) => {
    const [DATA, setDATA] = useState([])

    // Setup database
    useEffect(() => {
        selectDataFromDatabase("SELECT * FROM tbl_expense", [])
    }, [DATA])

    const selectDataFromDatabase = (query, param) => {
        db.transaction(tx => {
            tx.executeSql(query, param, (tx, results) => {
                var temp = []
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i))
                }
                setDATA(temp)
            });
        });
    }

    // selectDataFromDatabase("SELECT * FROM tbl_expense", [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="rgba(255, 255, 255, 0.7)" />

            <View style={styles.container}>
                <Header headerTitle="Expense Tracker"
                    onAddExpensesClicked = {() => {
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