import React, { useState } from 'react'
import { View, Text, TextInput, Vibration } from 'react-native'
import Card from '../component/Card'
import { useNavigation } from '@react-navigation/native'
import HeaderComp from '../component/HeaderComp'
import IconList from '../component/IconList'

const AddCategory = () => {
    const navigation = useNavigation()
    const [ categoryName, setCategoryName ] = useState()
    const [ categoryDesc, setCategoryDesc ] = useState()
    const categoryIcon = [
        { iconKey: 1, iconName: 'activity' },
        { iconKey: 2, iconName: 'airplay' },
        { iconKey: 3, iconName: 'alert-circle' },
        { iconKey: 4, iconName: 'alert-octagon' },
        { iconKey: 5, iconName: 'alert-triangle' },
        { iconKey: 6, iconName: 'align-center' },
        { iconKey: 7, iconName: 'align-justify' },
        { iconKey: 8, iconName: 'align-left' },
        { iconKey: 9, iconName: 'align-right' },
        { iconKey: 10, iconName: 'anchor' },
        { iconKey: 11, iconName: 'aperture' },
        { iconKey: 12, iconName: 'archive' },
        { iconKey: 13, iconName: 'arrow-down' },
        { iconKey: 14, iconName: 'arrow-down-circle' },
        { iconKey: 15, iconName: 'arrow-down-left' },
        { iconKey: 16, iconName: 'arrow-down-right' },
        { iconKey: 17, iconName: 'arrow-left' },
        { iconKey: 18, iconName: 'arrow-left-circle' },
        { iconKey: 19, iconName: 'arrow-right' },
        { iconKey: 20, iconName: 'arrow-right-circle' },
        { iconKey: 21, iconName: 'arrow-up' },
        { iconKey: 22, iconName: 'arrow-up-circle' },
        { iconKey: 23, iconName: 'arrow-up-left' },
        { iconKey: 24, iconName: 'arrow-up-right' },
        { iconKey: 25, iconName: 'at-sign' },
        { iconKey: 23, iconName: 'award' },
        { iconKey: 23, iconName: 'bar-chart' },
        { iconKey: 23, iconName: 'battery' },
        { iconKey: 23, iconName: 'battery-charging' },
        { iconKey: 24, iconName: 'bell' },
        { iconKey: 25, iconName: 'bell-off' },
        { iconKey: 26, iconName: 'bluetooth' },
        { iconKey: 27, iconName: 'bold' },
        { iconKey: 28, iconName: 'book' },
        { iconKey: 29, iconName: 'book-open' },
        { iconKey: 30, iconName: 'bookmark' },
        { iconKey: 31, iconName: 'box' },
        { iconKey: 32, iconName: 'briefcase' },
        { iconKey: 33, iconName: 'calendar' },
        { iconKey: 34, iconName: 'camera' },
        { iconKey: 35, iconName: 'camera-off' },
        { iconKey: 36, iconName: 'cast' },
        { iconKey: 37, iconName: 'check' },
        { iconKey: 38, iconName: 'check-circle' },
        { iconKey: 39, iconName: 'check-square' },
        { iconKey: 40, iconName: 'chevron-down' },
        { iconKey: 41, iconName: 'chevron-left' },
        { iconKey: 42, iconName: 'chevron-right' },
        { iconKey: 43, iconName: 'chevron-up' },
        { iconKey: 44, iconName: 'chevron-down' },
        { iconKey: 45, iconName: 'chrome' },
        { iconKey: 46, iconName: 'circle' },
        { iconKey: 47, iconName: 'clipboard' },
        { iconKey: 48, iconName: 'clock' },
        { iconKey: 49, iconName: 'cloud' },
        { iconKey: 50, iconName: 'cloud-drizzle' },
        { iconKey: 51, iconName: 'cloud-lightning' },
        { iconKey: 52, iconName: 'cloud-off' },
        { iconKey: 53, iconName: 'cloud-rain' },
        { iconKey: 54, iconName: 'cloud-snow' },
        { iconKey: 55, iconName: 'code' },
        { iconKey: 56, iconName: 'codeopen' },
        { iconKey: 57, iconName: 'codesandbox' },
        { iconKey: 58, iconName: 'coffee' },
        { iconKey: 59, iconName: 'columns' },
        { iconKey: 60, iconName: 'command' },
        { iconKey: 61, iconName: 'compass' },
        { iconKey: 62, iconName: 'copy' },
        { iconKey: 63, iconName: 'corner-down-left' },
        { iconKey: 64, iconName: 'corner-down-right' },
        { iconKey: 65, iconName: 'corner-left-down' },
        { iconKey: 66, iconName: 'corner-left-up' },
        { iconKey: 67, iconName: 'corner-right-down' },
        { iconKey: 68, iconName: 'corner-right-up' },
        { iconKey: 69, iconName: 'corner-up-left' },
        { iconKey: 70, iconName: 'corner-up-right' },
        { iconKey: 71, iconName: 'cpu' },
        { iconKey: 72, iconName: 'credit-card' },
        { iconKey: 73, iconName: 'crop' },
        { iconKey: 74, iconName: 'crosshair' },
        { iconKey: 75, iconName: 'database' },
        { iconKey: 76, iconName: 'delete' },
        { iconKey: 77, iconName: 'disc' },
        { iconKey: 78, iconName: 'divide' },
        { iconKey: 79, iconName: 'divide-circle' },
        { iconKey: 80, iconName: 'divide-square' },
        { iconKey: 81, iconName: 'dollar-sign' },
        { iconKey: 82, iconName: 'download' },
        { iconKey: 83, iconName: 'download-cloud' },
        { iconKey: 84, iconName: 'dribble' },
        { iconKey: 85, iconName: 'droplet' },
        { iconKey: 86, iconName: 'edit' },
        { iconKey: 87, iconName: 'edit-2' },
        { iconKey: 88, iconName: 'edit-3' },
        { iconKey: 89, iconName: 'external-link' },
        { iconKey: 90, iconName: 'eye' },
        { iconKey: 91, iconName: 'eye-off' },
        { iconKey: 92, iconName: 'facebook' },
        { iconKey: 93, iconName: 'fast-forward' },
        { iconKey: 94, iconName: 'feather' },
        { iconKey: 95, iconName: 'figma' },
        { iconKey: 96, iconName: 'file' },
        { iconKey: 97, iconName: 'file-minus' },
        { iconKey: 98, iconName: 'file-plus' },
        { iconKey: 99, iconName: 'file-text' },
        { iconKey: 100, iconName: 'filter' },
        { iconKey: 101, iconName: 'flag' },
        { iconKey: 102, iconName: 'folder' },
        { iconKey: 103, iconName: 'folder-minus' },
        { iconKey: 104, iconName: 'folder-plus' },
        { iconKey: 105, iconName: 'framer' },
        { iconKey: 106, iconName: 'frown' },
        { iconKey: 107, iconName: 'gift' },
        { iconKey: 108, iconName: 'git-branch' },
        { iconKey: 109, iconName: 'git-commit' },
        { iconKey: 110, iconName: 'git-merge' },
        { iconKey: 111, iconName: 'get-pull-request' },
        { iconKey: 112, iconName: 'github' },
        { iconKey: 113, iconName: 'gitlab' },
        { iconKey: 114, iconName: 'globe' },
        { iconKey: 115, iconName: 'grid' },
        { iconKey: 116, iconName: 'hard-drive' },
        { iconKey: 117, iconName: 'hash' },
        { iconKey: 118, iconName: 'headphone' },
        { iconKey: 119, iconName: 'heart' },
        { iconKey: 120, iconName: 'help-circle' },
        { iconKey: 121, iconName: 'hexagon' },
        { iconKey: 122, iconName: 'home' }
    ]

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

            <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1, flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Category Icons</Text>
                    <IconList
                        iconNumber = {4}
                        iconList = { categoryIcon }
                        onIconPressed = {(item) => {
                            console.log(item)
                        }}
                    />
                </View>
            </Card>
        </View>
    )
}

export default AddCategory