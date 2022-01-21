import React from 'react'
import { View, Text, Vibration } from 'react-native'
import HeaderCompStart from '../component/HeaderCompStart'

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
        </>
    )
}

export default Settings