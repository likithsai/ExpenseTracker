import React from 'react'
import { View, Vibration, Text } from 'react-native'
import HeaderComp from '../component/HeaderComp'
import Card from '../component/Card'


const ViewExpenses = ({ route, navigation }) => {

    // const name = route.params.data.expense_name
    // const desc = route.params.data.expense_desc
    // const type = route.params.data.expense_type
    // const amount = route.params.data.expense_amt
    // const date = route.params.data.expense_date

    const { name, desc, type, amount, date } = route.params.data

    return (
        <View style={{ flex: 1 }}>
            <HeaderComp 
                headerTitle="View Expenses"
                onBackPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.pop()
                }}
                onSucessPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.pop()
                }} 
            />
            <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Title</Text>
                    <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ name || '-' }</Text>
                </View>
            </Card>
            <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Description</Text>
                    <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ desc|| '-' }</Text>
                </View>
            </Card>
            <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Transaction Type</Text>
                    <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ type|| '-' }</Text>
                </View>
            </Card>
            <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Invoice Amount</Text>
                    <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ amount|| '-' }</Text>
                </View>
            </Card>
            <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Date</Text>
                    <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ date|| '-' }</Text>
                </View>
            </Card>
        </View>
    )
}

export default ViewExpenses;