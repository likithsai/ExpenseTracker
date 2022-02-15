import React, { useState, useEffect } from 'react'
import { View, Vibration, Text, ScrollView } from 'react-native'
import HeaderComp from '../component/HeaderComp'
import Card from '../component/Card'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-ionicons'
import { useNavigation } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Utils from '../utils/Utils'

const ViewExpenses = ({ route }) => {
    const navigation = useNavigation()
    const [ currencySelected, setCurrencySelected ] = useState('USD')

    const getCurrency = async(key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if(value !== null) {
                setCurrencySelected(JSON.parse(value).isoName)
            }
        } catch(e) {}
    }

    useEffect(() => {
        getCurrency('SelectedCurrency') 
    })
    
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
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ route.params.list.expense_amt + ' ' + currencySelected || '-' }</Text>
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
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Payee</Text>
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ route.params.list.expense_payee || '-' }</Text>
                    </View>
                </Card>
                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Date</Text>
                        <Text style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, marginTop: 5 }}>{ route.params.list.expense_date || '-' }</Text>
                    </View>
                </Card>
                <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>File Attachments</Text>
                        </View>
                        <ScrollView horizontal={true} style={{ flexDirection: 'row', marginTop: 15 }}>
                            {
                                (JSON.parse(route.params.list.expense_attachment).length > 0) ?
                                    JSON.parse(route.params.list.expense_attachment).map((item, key) => (
                                        <TouchableOpacity key={key} style={{ backgroundColor: '#11998e', padding: 10, borderRadius: 10, marginHorizontal: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 10 }}>
                                            <View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 15 }}>{item.name ? item.name : ''}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 15 }}>{ item.size ? Utils.formatBytes(item.size) : '0 KB'}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}><Text style={{ color: '#000', fontSize: 18 }}>No Receipt</Text></View>
                            }
                        </ScrollView>
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