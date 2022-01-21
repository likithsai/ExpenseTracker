import React, { useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, Vibration } from 'react-native'
import HeaderWithIcons from '../component/HeaderWithIcons'

const CategoryScreens= ({ route, navigation }) => {
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

export default CategoryScreens