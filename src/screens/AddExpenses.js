import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, StyleSheet, Vibration } from 'react-native'
import HeaderComp from '../component/HeaderComp'
import Card from '../component/Card'
import DatePicker from 'react-native-neat-date-picker'
import Icon from 'react-native-ionicons';
import { openDatabase } from 'react-native-sqlite-storage';
import {Picker} from '@react-native-picker/picker';

var db = openDatabase({ name: 'data.db' }, () => {}, (err) => {
    console.log('SQL Error : ' + err.message)
});

const dateFormatter = (date) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}

const AddExpense = ({ navigation }) => {
    const calcButtons = [
        { id: 'NUM_1', key: '1' },
        { id: 'NUM_2', key: '2' },
        { id: 'NUM_3', key: '3' },
        { id: 'NUM_PLS', key: '+' },
        { id: 'NUM_4', key: '4' },
        { id: 'NUM_5', key: '5' },
        { id: 'NUM_6', key: '6' },
        { id: 'NUM_MIN', key: '-' },
        { id: 'NUM_7', key: '7' },
        { id: 'NUM_8', key: '8' },
        { id: 'NUM_9', key: '9' },
        { id: 'NUM_MUL', key: '*' },
        { id: 'NUM_DOT', key: '.' },
        { id: 'NUM_0', key: '0' },
        { id: 'NUM_EQ', key: '=' },
        { id: 'NUM_DIV', key: '/' },
        { id: 'NUM_CLR', key: 'CE' },
        { id: 'NUM_BCK', key: 'BCK' }
    ]
    const [ amount, setAmount ] = useState(0)
    const [ showDatePicker, setShowDatePicker] = useState(false)
    const [ title, setTitle ] = useState()
    const [ description, setDescription ] = useState()
    const [ date, setDate] = useState(dateFormatter(new Date()))
    const [invoiceType, setInvoiceType] = useState()

    const insertDataToDatabase = () => {
        db.transaction(function(txn) {
            txn.executeSql(        
                'INSERT INTO tbl_expense(expense_name, expense_desc, expense_type, expense_amt, expense_date) VALUES (?, ?, ?, ?, ?)',
                [ title, description, invoiceType, amount, date ],
                (tx, results) => {               
                    console.log('Results', results.rowsAffected);
                    if(results.rowsAffected > 0) {
                        navigation.pop()
                    }
                }
            )
        })
    }

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {
        // You should close the modal in here
        setShowDatePicker(false)
    }

    const onConfirm = ( date ) => {
        // You should close the modal in here
        setShowDatePicker(false)
        setDate(dateFormatter(date))
    }

    const handlePress = (item) => {
        switch (item.id) {
            case 'NUM_EQ':
                setAmount(eval(amount))
                break;
        
            case 'NUM_CLR':
                setAmount(0)
                break;
            
            case 'NUM_BCK':
                if(amount.toString().length === 1) {
                    setAmount(0)
                } else {
                    setAmount(amount.toString().slice(0, -1))
                }
                break;

            default:
                if(amount === 0) {
                    setAmount(item.key)
                } else {
                    setAmount(amount + item.key)
                }
                break;
        }
    }

    return (
        <>
        <DatePicker
            isVisible={showDatePicker}
            mode={'single'}
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
        <View style={{ flex: 1 }}>
            <HeaderComp headerTitle="Add Expenses"
                onBackPressed = {() => {
                    navigation.pop()
                }}
                onSucessPressed = {() => {
                    insertDataToDatabase()
                }} 
            />
            
            <ScrollView>
                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Title</Text>
                        <TextInput
                            style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, color: '#000' }}
                            onChangeText={setTitle}
                            value={title}
                            placeholder="Set title"
                            placeholderTextColor="#555"
                            multiline={true}
                        />
                    </View>
                </Card>

                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Description</Text>
                        <TextInput
                            style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, color: '#000' }}
                            onChangeText={setDescription}
                            value={description}
                            multiline={true}
                            placeholderTextColor="#555"
                            placeholder="Set Description"
                        />
                    </View>
                </Card>

                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1, width: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Invoice Type</Text>
                        <Picker 
                            selectedValue={invoiceType} 
                            onValueChange={(itemValue, itemIndex) =>
                                setInvoiceType(itemValue)
                            }
                            style={{ color: '#555', fontSize: 20 }}>
                            <Picker.Item label="Income" style={{ color: '#fff', fontSize: 20  }} value="Income" />
                            <Picker.Item label="Expenses" style={{ color: '#fff', fontSize: 20 }} value="Expenses" />
                        </Picker>
                        <View style={{ marginTop: 10 }}>
                            {/* <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Amount</Text> */}
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Invoice amount</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 10 }}>
                                <Text style={{ fontSize: 30, color: '#000', marginRight: 10 }}>$</Text>
                                <Text style={{ fontSize: 30, color: '#000' }}>{amount}</Text>
                            </View>
                            <FlatList
                                scrollEnabled={false}
                                style = {{ padding: 0, margin: 0 }}
                                data={calcButtons}
                                numColumns={4}
                                keyExtractor={(item, index) => item.id }
                                renderItem={({item}) => {
                                    return(
                                        <TouchableOpacity 
                                            onPress={() => {
                                                Vibration.vibrate(50)
                                                handlePress(item)
                                            }} 
                                            style={{ flex: 1, margin: 5, backgroundColor: '#ddd', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                            <Text style={{ fontSize: 20, color: '#666' }}>{item.key}</Text>
                                        </TouchableOpacity>
                                    )
                                }} />
                        </View>
                    </View>
                </Card>

                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }} onPress={openDatePicker}>
                    <View>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Date</Text>
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 10 }}>{date}</Text>
                    </View>
                </Card>
            </ScrollView>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    btnGroup : {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    btnGroupItems : { 
        width: '50%', 
        alignItems: 'center',
        padding: 10, 
        marginVertical: 20, 
        backgroundColor: '#11998e', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-evenly' 
    },
    btnGroupItemsFirst : {
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 10, 
    },
    btnGroupItemsLast : {
        borderTopRightRadius: 10, 
        borderBottomRightRadius: 10, 
    },
    btnGroupSelectedItem : {
        backgroundColor: '#000'
    }
})
export default AddExpense