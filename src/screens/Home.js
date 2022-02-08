import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Vibration, Share, RefreshControl } from 'react-native'
import Header from '../component/Header'
import HeaderWithIcons from '../component/HeaderWithIcons'
import List from '../component/List'
import { openDatabase } from 'react-native-sqlite-storage'
import DatePicker from 'react-native-neat-date-picker'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Feather'
import CategoryScreens from './CategoryScreen'
import DashboardScreen from './DashboardScreeen'
import Utils from '../utils/Utils'

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

const HomeScreen = ({ navigation }) => {
    const [ showDatePicker, setShowDatePicker ] = useState(false)
    const [ selectedData, setSelectedDate ] = useState(Utils.formatDate(new Date().toISOString()))
    const [ income, setIncome ] = useState(0.0)
    const [ expense, setExpense ] = useState(0.0)
    const [ balance, setBalance ] = useState(0.0)
    const [ DATA, setDATA ] = useState([])
    const [refreshing, setRefreshing] = React.useState(true)

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {
        setShowDatePicker(false)
    }

    const onConfirm = ( date ) => {
        setShowDatePicker(false)
        setSelectedDate(Utils.formatDate(date.toISOString()))
    }

    // Setup database
    useEffect(() => {
        selectDataFromDatabase("SELECT * FROM tbl_expense WHERE expense_date = ?", [selectedData])
    }, [selectedData])

    const loadExpenseData = () => {
        selectDataFromDatabase("SELECT * FROM tbl_expense WHERE expense_date = ?", [selectedData])
        //  load KPI's
        setIncome(loadKPIS('income'))
        setExpense(loadKPIS('expense'))
        setBalance(income - expense)
        setRefreshing(false)
    }

    useEffect(() => {
        loadExpenseData()
    })

    const loadKPIS = (type) => {
        let item = 0
        DATA.filter(item => item.expense_type.toLowerCase() === type).map(filteredItem => {
            item = item + filteredItem.expense_amt
        })
        return item
    }

    const selectDataFromDatabase = (query, param) => {
        db.transaction(tx => {
            tx.executeSql(query, param, (tx, results) => {
                var temp = []
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i))
                }
                setDATA(temp)
            })
        })
    }

    const onListRefresh = React.useCallback(async () => {
        loadExpenseData()
    }, [refreshing]);

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
                <HeaderWithIcons
                    headerTitle="Expense Tracker"
                    onRightIconPressed = {() => {
                        Vibration.vibrate(50)
                        navigation.navigate('Settings')
                    }}
                />
                <Header 
                    onDateSelected = {() => {
                        Vibration.vibrate(50)
                        openDatePicker()
                    }}
                    incomeValue = {income}
                    expenseValue = {expense}
                    balanceValue = {balance}
                    dateText = { Utils.dateFormatter(new Date(selectedData)) }
                    onAddExpensesClicked = {() => {
                        Vibration.vibrate(50)
                        navigation.navigate('AddExpenses', {})
                    }}/>
                    <View style={styles.scrollView}>
                        <List listData={DATA}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onListRefresh} tintColor="#fff" titleColor="#fff" colors={["#11998e"]} />}
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
                        iconName = 'dollar-sign'
                    } else if (route.name === 'Categories') {
                        iconName = 'list'
                    } else if (route.name === 'Dashboard') {
                        iconName = 'home'
                    }
        
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#11998e',
                tabBarInactiveTintColor: '#888',
                // tabBarStyle: {backgroundColor: '#11998e', elevation: 10 },
                tabBarLabelStyle: {
                    fontWeight: '600',
                    fontSize: 12,
                    // color: '#fff',
                    height: 20
                },
                tabBarItemStyle: {
                    height: 53,
                  },
                  tabBarStyle: {
                    height: 53,
                  },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Expenses" component={HomeScreen} />
            <Tab.Screen name="Categories" component={CategoryScreens} />
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