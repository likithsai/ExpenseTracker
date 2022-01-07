import React, { useState } from 'react'
import { View, Text, TextInput, Vibration } from 'react-native'
import Card from '../component/Card'
import { useNavigation } from '@react-navigation/native'
import HeaderComp from '../component/HeaderComp'

const AddCategory = () => {
    const navigation = useNavigation()
    const [ categoryName, setCategoryName ] = useState()
    const [ categoryDesc, setCategoryDesc ] = useState()

    return (
        <View style={{ flex: 1 }}>
            <HeaderComp 
                leftIcon = "arrow-back"
                rightIcon = "checkmark"
                headerTitle="Add Category"
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
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Category Name</Text>
                    <TextInput
                        style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, color: '#000' }}
                        onChangeText={setCategoryName}
                        value={categoryName}
                        placeholderTextColor="#555"
                        placeholder="Enter Catgory Name"
                    />
                </View>
            </Card>

            <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Category Description</Text>
                    <TextInput
                        style={{ fontSize: 18, color: '#000', paddingHorizontal: 0, color: '#000' }}
                        onChangeText={setCategoryDesc}
                        value={categoryDesc}
                        multiline={true}
                        placeholderTextColor="#555"
                        placeholder="Enter Catgory Description"
                    />
                </View>
            </Card>
        </View>
    )
}

export default AddCategory