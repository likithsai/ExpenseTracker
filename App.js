import React, { useEffect, useState } from "react"
import { StyleSheet, SafeAreaView, StatusBar, View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import MyStacks from "./src/routes/MyStacks"
import { openDatabase } from 'react-native-sqlite-storage'

var db = openDatabase({ name: 'data.db' }, () => {
  console.log('Database opened :)')
}, (err) => {
  console.log('SQL Error : ' + err.message)
})

const ExpenseTracker = () => {
    const [splashScreenLoad, setSplashScreenLoad] = useState(true)

    useEffect(() => {
        //  category table
        db.transaction(function(txn) {
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS tbl_category(
                  category_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  category_name VARCHAR(20) DEFAULT NULL, 
                  category_desc VARCHAR(500) DEFAULT NULL,
                  category_icon VARCHAR(100) DEFAULT NULL, 
                  category_created timestamp default CURRENT_TIMESTAMP
              )`,
              [],
              () => {
                  console.log('table category created !')
              }, 
              (err) => {
                  console.log('Error: ' + err.message)
              }
          )
        })

        db.transaction(function(txn) {
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_expense(
                expense_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                expense_name VARCHAR(20) DEFAULT NULL, 
                expense_desc VARCHAR(500) DEFAULT NULL, 
                expense_type VARCHAR(20) DEFAULT NULL, 
                expense_amt DECIMAL(6.3) DEFAULT NULL, 
                expense_date TIMESTAMP DEFAULT NULL, 
                expense_category INTEGER DEFAULT NULL,
                expense_created_date timestamp DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (expense_category) REFERENCES tbl_category(category_id)
                ON DELETE SET NULL
            )`,
            [],
            () => {
                console.log('table expenses created !')
            }, 
            (err) => {
                console.log('Error: ' + err.message)
            }
        )
      })


      //  load splash screen
      setTimeout(() => {
          setSplashScreenLoad(false)
      }, 5000)
    }, [])
    
    if (!splashScreenLoad) {
        return (
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <StatusBar barStyle="light-content" backgroundColor="#11998e" />
                <MyStacks />
              </NavigationContainer>
            </SafeAreaView>
        )
    } else {
        return (
          <SafeAreaView style={styles.container}>
              <StatusBar barStyle="light-content" backgroundColor="#11998e" />
              <View style={{ flexDirection: 'row', alignItem: 'center', justifyContent: 'center', backgroundColor: '#11998e', width: '100%', height: '100%' }}>
                  <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Sample example</Text>
              </View>
          </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f0f0",
    },
})

export default ExpenseTracker