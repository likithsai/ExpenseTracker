import React from 'react'
import { View, Text, Vibration } from 'react-native'
import HeaderWithIcons from '../component/HeaderWithIcons'

const DashboardScreen = ({ navigation }) => {
    return (
        <>
            <HeaderWithIcons
                headerTitle="Expense Tracker"
                onRightIconPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.navigate('Settings')
                }}
            />
        </>
    )
}

export default DashboardScreen