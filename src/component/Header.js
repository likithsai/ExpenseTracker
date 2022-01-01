import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import Icon from 'react-native-ionicons';
import DatePicker from 'react-native-neat-date-picker'
import RBSheet from "react-native-raw-bottom-sheet";

const dateFormatter = (date) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}

const Header = (props) => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedData, setSelectedDate] = useState(dateFormatter(new Date()))
    const refRBSheet = useRef();

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
        setSelectedDate(dateFormatter(date))
    }
    
    return (
        <>
        <RBSheet
            ref={refRBSheet}
            height={200}
            openDuration={250}
            customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                container: {
                    justifyContent: "center",
                    alignItems: "flex-start",
                    position: 'absolute',
                    top: 70,
                    borderTopWidth: 1,
                    borderTopColor: '#ccc',
                    elevation: 5
                }
            }}>
                <View style={{ width: '100%' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 10, paddingHorizontal: 20 }}>
                        <Icon name="grid" size={35} color='#666' style={{ marginRight: 25 }} />
                        <Text style={{ color: '#000' }}>Categories</Text>
                    </TouchableOpacity>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 10, paddingHorizontal: 20 }}>
                        <Icon name="download" size={40} color='#666' style={{ marginRight: 25 }} />
                        <Text style={{ color: '#000' }}>Export</Text>
                    </TouchableOpacity>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 10, paddingHorizontal: 20 }}>
                        <Icon name="settings" size={30} color='#666' style={{ marginRight: 25 }} />
                        <Text style={{ color: '#000' }}>Settings</Text>
                    </TouchableOpacity>
                </View>
        </RBSheet>

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
        <View style={styles.boxBorder}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <Icon name="menu" size={30} color='#666' />
                </TouchableOpacity>
                <View style={[styles.headerBarContent]}>
                    <Text style={styles.headerTitle}>{props.headerTitle}</Text>
                </View>
                <TouchableOpacity onPress={openDatePicker}>
                    <Icon name="calendar" size={30} color='#666' />
                </TouchableOpacity>
            </View>
            <View>
                <View style={[styles.boxBorder, { backgroundColor: '#11998e', paddingTop: 25, paddingBottom: 30, paddingHorizontal: 20, elevation: 5 }]}>
                    <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Text style={{ fontWeight: '900', color: '#ff0' }}>DATE : </Text> */}
                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 16 }}>{selectedData}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', borderRightColor: '#ccc' }}>
                            <Icon name="card" size={40} color='#fff' style={{ paddingVertical: 5}} />
                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Incomes</Text>
                            <Text style={{ fontSize: 15, color: '#fff' }}>$200</Text>
                        </TouchableOpacity>
                        <View style={{ borderColor: '#f0f0f0', borderWidth: 0.2, height: '100%' }} />
                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', borderRightColor: '#ccc'}}>
                            <Icon name="cash" size={40} color='#fff' style={{ paddingVertical: 5}} />
                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Expense</Text>
                            <Text style={{ fontSize: 15, color: '#fff' }}>$200</Text>
                        </TouchableOpacity>
                        <View style={{ borderColor: '#f0f0f0', borderWidth: 0.2, height: '100%' }} />
                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', borderRightColor: '#ccc' }}>
                            <Icon name="wallet" size={40} color='#fff' style={{ paddingVertical: 5}} />
                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Balance</Text>
                            <Text style={{ fontSize: 15, color: '#fff' }}>$200</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 5 }} onPress={props.onAddExpensesClicked}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Icon name="wallet" size={16} color='#555' style={{ marginRight: 10 }} />
                            <Text style={{ fontWeight: 'bold', color: '#555', fontSize: 14 }}>Add Expenses</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    boxBorder: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 5
    },
    headerContainer : {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 5
    },
    headerBarContent : {
        flexDirection: 'row'
    },
    headerBarKPI : {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    headerParallax: {
        minHeight: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    },
    txtKPITitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    }
})

export default Header