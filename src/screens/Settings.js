import React from 'react'
import { View, Text, Vibration, ScrollView } from 'react-native'
import HeaderCompStart from '../component/HeaderCompStart'
import Card from '../component/Card'
import Icon from 'react-native-ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'

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
                <Card style={{ padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="download" size={30} color='#666' style={{ marginRight: 15 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Export</Text>
                            <Text style={{ color: '#777' }}>Export Database</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ padding: 20 }} onPress={() => {}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FeatherIcons name="info" size={30} color='#666' style={{ marginRight: 15 }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>About</Text>
                            <Text style={{ color: '#777' }}>Show the details about the app</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </>
    )
}

export default Settings