import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Vibration, ScrollView } from 'react-native'
import Icon from 'react-native-ionicons'

const HeaderWithoutAddExpense = (props) => {
    return (
        <>
        <View style={styles.boxBorder}>
            <View>
                <View style={[styles.boxBorder, { backgroundColor: '#11998e', paddingTop: 25, paddingBottom: 30, paddingHorizontal: 20, elevation: 5 }]}>
                    <TouchableOpacity style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { props.onDateSelected() }}>
                        {/* <Text style={{ fontWeight: '900', color: '#ff0' }}>DATE : </Text> */}
                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 16 }}>{props.dateText}</Text>
                    </TouchableOpacity>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', borderRightColor: '#ccc' }}>
                            <Icon name="card" size={40} color='#fff' style={{ paddingVertical: 5}} />
                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Incomes</Text>
                            <Text style={{ fontSize: 15, color: '#fff' }}>{props.incomeValue}</Text>
                        </TouchableOpacity>
                        <View style={{ borderColor: '#f0f0f0', borderWidth: 0.2, height: '100%' }} />
                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', borderRightColor: '#ccc'}}>
                            <Icon name="cash" size={40} color='#fff' style={{ paddingVertical: 5}} />
                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Expense</Text>
                            <Text style={{ fontSize: 15, color: '#fff' }}>{props.expenseValue}</Text>
                        </TouchableOpacity>
                        <View style={{ borderColor: '#f0f0f0', borderWidth: 0.2, height: '100%' }} />
                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', borderRightColor: '#ccc' }}>
                            <Icon name="wallet" size={40} color='#fff' style={{ paddingVertical: 5}} />
                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Balance</Text>
                            <Text style={{ fontSize: 15, color: '#fff' }}>{props.balanceValue}</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#11998e',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#aaa'
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
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    txtKPITitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    }
})

export default HeaderWithoutAddExpense