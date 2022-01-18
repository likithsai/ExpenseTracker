import React from 'react'
import { View, Vibration, Text, Button, ScrollView } from 'react-native'
import HeaderComp from '../component/HeaderComp'
import Card from '../component/Card'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-ionicons'
import { useNavigation } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg'

const ViewExpenses = ({ route }) => {
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <HeaderComp 
                leftIcon = "arrow-back"
                rightIcon = "create"
                headerTitle="View Expenses"
                onBackPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.pop()
                }}
                onSucessPressed = {() => {
                    Vibration.vibrate(50)
                    console.log(route.params.data)
                    navigation.navigate('AddExpenses', {
                        data: route.params.list
                    })
                }} 
            />
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <QRCode value={[route.params.list]} size={120} />
            </View>
            <ScrollView>    
                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Title</Text>
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ route.params.list.expense_name || '-' }</Text>
                    </View>
                </Card>
                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Description</Text>
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ route.params.list.expense_desc || '-' }</Text>
                    </View>
                </Card>
                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Transaction Type</Text>
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ route.params.list.expense_type || '-' }</Text>
                    </View>
                </Card>
                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Transaction Amount</Text>
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ route.params.list.expense_amt || '-' }</Text>
                    </View>
                </Card>
                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Transaction Category</Text>
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ route.params.list.expense_category || '-' }</Text>
                    </View>
                </Card>
                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Date</Text>
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ route.params.list.expense_date || '-' }</Text>
                    </View>
                </Card>
            </ScrollView>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, margin: 10, elevation: 5, backgroundColor: '#11998e' }}>
                <Icon name="trash" size={20} color='#fff' style={{ marginRight: 10 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ViewExpenses