import React from 'react'
import { View, Text, Vibration, ScrollView } from 'react-native'
import HeaderWithIcons from '../component/HeaderWithIcons'
import Card from '../component/Card'

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
            <ScrollView>
            </ScrollView>
        </>
    )
}

export default DashboardScreen