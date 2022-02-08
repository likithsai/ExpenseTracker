import React, { useRef, useState, useEffect } from 'react'
import { View, Text, Vibration, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import HeaderCompStart from '../component/HeaderCompStart'
import Card from '../component/Card'
import Icon from 'react-native-ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import RBSheet from "react-native-raw-bottom-sheet"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
    const refRBExport = useRef()
    const [ selectedCurrency, setSelectedCurrency ] = useState('USD')

    const getCurrency = async(key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if(value !== null) {
                setSelectedCurrency(JSON.parse(value).countryCurrency)
            }
        } catch(e) {}
    }

    useEffect(() => {
        getCurrency('SelectedCurrency')
    })

    return (
        <>
            <RBSheet
                ref={refRBExport}
                height={100}
                openDuration={250}
                customStyles={{
                    container: {
                        height: 235,
                        elevation: 5,
                    }
                }}>
                    <View style={{ width: '100%', height: '100%', backgroundColor: '#11998e', padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Select Export</Text>
                        <ScrollView style={{ marginTop: 15 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 15, borderBottomColor: '#ccc', borderBottomWidth: 0.5 }} onPress={() => {
                                refRBExport.current.close()
                            }}>
                                <View>
                                    <FeatherIcons name="database" color="#fff" style={{ marginRight: 20, elevation: 10 }} size={30}/>
                                </View>
                                <View>
                                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>JSON</Text>
                                    <Text style={{ color: '#fff', textAlign: 'justify', fontSize: 15 }}>Export Database to JSON Format</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 15, borderBottomColor: '#ccc', borderBottomWidth: 0.5 }} onPress={() => {
                                refRBExport.current.close()
                            }}>
                                <View>
                                    <FeatherIcons name="calendar" color="#fff" style={{ marginRight: 20, elevation: 10 }} size={30}/>
                                </View>
                                <View>
                                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Excel</Text>
                                    <Text style={{ color: '#fff', textAlign: 'justify', fontSize: 15 }}>Export Database to Excel Format</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 15 }} onPress={() => {
                                refRBExport.current.close()
                            }}>
                                <View>
                                    <FeatherIcons name="code" color="#fff" style={{ marginRight: 20, elevation: 10 }} size={30}/>
                                </View>
                                <View>
                                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>XML</Text>
                                    <Text style={{ color: '#fff', textAlign: 'justify', fontSize: 15 }}>Export Database to XML Format</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
            </RBSheet>
            <HeaderCompStart 
                leftIcon = "arrow-back"
                headerTitle="Settings"
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
            <ScrollView>
                <View style={{ padding: 20, marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="person" color={'#000'} size={50} style={{ marginRight: 20 }} />
                        <View>
                            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Likith Sai</Text>
                            <Text style={{ color: '#555', fontSize: 15 }}>+91 8861346757</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#11998e', padding: 10, borderRadius: 10, elevation: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="refresh" color={'#fff'} size={20} style={{ marginRight: 10 }} />
                        <Text style={{ color: '#fff' }}>BACKUP</Text>
                    </TouchableOpacity>
                </View>
                <Card style={{ elevation: 5, padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }} onPress={() => {
                    navigation.navigate('SelectCurrency', [])
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <FeatherIcons name="dollar-sign" size={30} color='#777' style={{ marginRight: 20 }} />
                            <View>
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Currency</Text>
                                <Text style={{ color: '#777' }}>Select the currency to be displayed</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 20, color: '#777', fontWeight: 'bold' }}>{ selectedCurrency }</Text>
                    </View>
                </Card>
                <Card style={{ elevation: 5, padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="upload" size={30} color='#777' style={{ marginRight: 20 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Import data</Text>
                            <Text style={{ color: '#777' }}>Import data from excel</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ elevation:5, padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }} onPress={() => {
                    refRBExport.current.open()
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="download" size={30} color='#777' style={{ marginRight: 20 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Export data</Text>
                            <Text style={{ color: '#777' }}>Export Database to Excel, PDF</Text>
                        </View>
                    </View>
                </Card>
                <Text style={{ color: '#777', fontWeight: 'bold', margin: 20, fontSize: 15 }}>App Information</Text>
                <Card style={{ elevation: 5, padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="info" size={30} color='#777' style={{ marginRight: 20 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>About</Text>
                            <Text style={{ color: '#777' }}>Show the details about the app</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ elevation: 5, padding: 20 }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="mail" size={30} color='#777' style={{ marginRight: 20 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Send Feedback</Text>
                            <Text style={{ color: '#777' }}>Send feedback to developers</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </>
    )
}

export default Settings