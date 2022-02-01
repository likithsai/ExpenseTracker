import React from 'react'
import { View, Text, Vibration, ScrollView, Touchable } from 'react-native'
import HeaderCompStart from '../component/HeaderCompStart'
import Card from '../component/Card'
import Icon from 'react-native-ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Settings = ({ navigation }) => {
    return (
        <>
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
                <Card style={{ elevation: 5, padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="dollar-sign" size={30} color='#666' style={{ marginRight: 20 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Currency</Text>
                            <Text style={{ color: '#777' }}>Selected Currency: INR</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ elevation: 5, padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="upload" size={30} color='#666' style={{ marginRight: 20 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Import data</Text>
                            <Text style={{ color: '#777' }}>Import data from excel</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ elevation:5, padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="download" size={30} color='#666' style={{ marginRight: 20 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Export data</Text>
                            <Text style={{ color: '#777' }}>Export Database to Excel, PDF</Text>
                        </View>
                    </View>
                </Card>
                <Text style={{ color: '#777', fontWeight: 'bold', margin: 20, fontSize: 15 }}>App Information</Text>
                <Card style={{ elevation: 5, padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="info" size={30} color='#666' style={{ marginRight: 20 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>About</Text>
                            <Text style={{ color: '#777' }}>Show the details about the app</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ elevation: 5, padding: 20 }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="mail" size={30} color='#666' style={{ marginRight: 20 }} />
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