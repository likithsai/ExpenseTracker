import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Vibration, ToastAndroid } from 'react-native'
import Card from '../component/Card'
import HeaderComp from '../component/HeaderComp'
import IconList from '../component/IconList'
import { openDatabase } from 'react-native-sqlite-storage'

var db = openDatabase({ name: 'data.db' }, () => {}, (err) => {
    console.log('SQL Error : ' + err.message)
})

const insertIntoDatabase = (name, desc, icon) => {
    db.transaction((txn) => {
        txn.executeSql(        
            'INSERT INTO tbl_category(category_name, category_desc, category_icon) VALUES (?, ?, ?)',
            [name, desc, icon],
            (tx, results) => {               
                console.log('Results', results.rowsAffected)
                if(results.rowsAffected > 0) {
                    navigation.pop()
                }
            },
            (err) => {
                console.log('Error: ' + err.message)
            }
        )
    })
}

const updateIntoDatabase = (name, desc, icon) => {
    db.transaction((txn) => {
        txn.executeSql(        
            'UPDATE tbl_category SET category_name=?, category_desc=?, category_icon=? WHERE category_id = ?',
            [name, desc, icon, route.params.data.category_id],
            (tx, results) => {               
                console.log('Results', results.rowsAffected)
                if(results.rowsAffected > 0) {
                    navigation.pop()
                }
            },
            (err) => {
                console.log('Error: ' + err.message)
            }
        )
    })
}

const AddCategory = ({ route, navigation }) => {

    const [ categoryName, setCategoryName ] = useState()
    const [ categoryDesc, setCategoryDesc ] = useState()
    const [ selectedCategoryIcon, setSelectedCategoryIcon ] = useState([])

    useEffect(() => {
        if(route.params.data) {
            setCategoryName(route.params.data.category_name)
            setCategoryDesc(route.params.data.category_desc)
            setSelectedCategoryIcon({ iconKey: 'selected_category', iconType: 'feather', iconName: route.params.data.category_icon })
        }
    }, [])

    const categoryIcon = [
        { iconKey: 1, iconType: 'feather', iconName: 'activity' },
        { iconKey: 2, iconType: 'feather', iconName: 'airplay' },
        { iconKey: 3, iconType: 'feather', iconName: 'alert-circle' },
        { iconKey: 4, iconType: 'feather', iconName: 'alert-octagon' },
        { iconKey: 5, iconType: 'feather', iconName: 'alert-triangle' },
        { iconKey: 6, iconType: 'feather', iconName: 'align-center' },
        { iconKey: 7, iconType: 'feather', iconName: 'align-justify' },
        { iconKey: 8, iconType: 'feather', iconName: 'align-left' },
        { iconKey: 9, iconType: 'feather', iconName: 'align-right' },
        { iconKey: 10, iconType: 'feather', iconName: 'anchor' },
        { iconKey: 11, iconType: 'feather', iconName: 'aperture' },
        { iconKey: 12, iconType: 'feather', iconName: 'archive' },
        { iconKey: 13, iconType: 'feather', iconName: 'arrow-down' },
        { iconKey: 14, iconType: 'feather', iconName: 'arrow-down-circle' },
        { iconKey: 15, iconType: 'feather', iconName: 'arrow-down-left' },
        { iconKey: 16, iconType: 'feather', iconName: 'arrow-down-right' },
        { iconKey: 17, iconType: 'feather', iconName: 'arrow-left' },
        { iconKey: 18, iconType: 'feather', iconName: 'arrow-left-circle' },
        { iconKey: 19, iconType: 'feather', iconName: 'arrow-right' },
        { iconKey: 20, iconType: 'feather', iconName: 'arrow-right-circle' },
        { iconKey: 21, iconType: 'feather', iconName: 'arrow-up' },
        { iconKey: 22, iconType: 'feather', iconName: 'arrow-up-circle' },
        { iconKey: 23, iconType: 'feather', iconName: 'arrow-up-left' },
        { iconKey: 24, iconType: 'feather', iconName: 'arrow-up-right' },
        { iconKey: 25, iconType: 'feather', iconName: 'at-sign' },
        { iconKey: 23, iconType: 'feather', iconName: 'award' },
        { iconKey: 23, iconType: 'feather', iconName: 'bar-chart' },
        { iconKey: 23, iconType: 'feather', iconName: 'battery' },
        { iconKey: 23, iconType: 'feather', iconName: 'battery-charging' },
        { iconKey: 24, iconType: 'feather', iconName: 'bell' },
        { iconKey: 25, iconType: 'feather', iconName: 'bell-off' },
        { iconKey: 26, iconType: 'feather', iconName: 'bluetooth' },
        { iconKey: 27, iconType: 'feather', iconName: 'bold' },
        { iconKey: 28, iconType: 'feather', iconName: 'book' },
        { iconKey: 29, iconType: 'feather', iconName: 'book-open' },
        { iconKey: 30, iconType: 'feather', iconName: 'bookmark' },
        { iconKey: 31, iconType: 'feather', iconName: 'box' },
        { iconKey: 32, iconType: 'feather', iconName: 'briefcase' },
        { iconKey: 33, iconType: 'feather', iconName: 'calendar' },
        { iconKey: 34, iconType: 'feather', iconName: 'camera' },
        { iconKey: 35, iconType: 'feather', iconName: 'camera-off' },
        { iconKey: 36, iconType: 'feather', iconName: 'cast' },
        { iconKey: 37, iconType: 'feather', iconName: 'check' },
        { iconKey: 38, iconType: 'feather', iconName: 'check-circle' },
        { iconKey: 39, iconType: 'feather', iconName: 'check-square' },
        { iconKey: 40, iconType: 'feather', iconName: 'chevron-down' },
        { iconKey: 41, iconType: 'feather', iconName: 'chevron-left' },
        { iconKey: 42, iconType: 'feather', iconName: 'chevron-right' },
        { iconKey: 43, iconType: 'feather', iconName: 'chevron-up' },
        { iconKey: 44, iconType: 'feather', iconName: 'chevron-down' },
        { iconKey: 45, iconType: 'feather', iconName: 'chrome' },
        { iconKey: 46, iconType: 'feather', iconName: 'circle' },
        { iconKey: 47, iconType: 'feather', iconName: 'clipboard' },
        { iconKey: 48, iconType: 'feather', iconName: 'clock' },
        { iconKey: 49, iconType: 'feather', iconName: 'cloud' },
        { iconKey: 50, iconType: 'feather', iconName: 'cloud-drizzle' },
        { iconKey: 51, iconType: 'feather', iconName: 'cloud-lightning' },
        { iconKey: 52, iconType: 'feather', iconName: 'cloud-off' },
        { iconKey: 53, iconType: 'feather', iconName: 'cloud-rain' },
        { iconKey: 54, iconType: 'feather', iconName: 'cloud-snow' },
        { iconKey: 55, iconType: 'feather', iconName: 'code' },
        { iconKey: 56, iconType: 'feather', iconName: 'codeopen' },
        { iconKey: 57, iconType: 'feather', iconName: 'codesandbox' },
        { iconKey: 58, iconType: 'feather', iconName: 'coffee' },
        { iconKey: 59, iconType: 'feather', iconName: 'columns' },
        { iconKey: 60, iconType: 'feather', iconName: 'command' },
        { iconKey: 61, iconType: 'feather', iconName: 'compass' },
        { iconKey: 62, iconType: 'feather', iconName: 'copy' },
        { iconKey: 63, iconType: 'feather', iconName: 'corner-down-left' },
        { iconKey: 64, iconType: 'feather', iconName: 'corner-down-right' },
        { iconKey: 65, iconType: 'feather', iconName: 'corner-left-down' },
        { iconKey: 66, iconType: 'feather', iconName: 'corner-left-up' },
        { iconKey: 67, iconType: 'feather', iconName: 'corner-right-down' },
        { iconKey: 68, iconType: 'feather', iconName: 'corner-right-up' },
        { iconKey: 69, iconType: 'feather', iconName: 'corner-up-left' },
        { iconKey: 70, iconType: 'feather', iconName: 'corner-up-right' },
        { iconKey: 71, iconType: 'feather', iconName: 'cpu' },
        { iconKey: 72, iconType: 'feather', iconName: 'credit-card' },
        { iconKey: 73, iconType: 'feather', iconName: 'crop' },
        { iconKey: 74, iconType: 'feather', iconName: 'crosshair' },
        { iconKey: 75, iconType: 'feather', iconName: 'database' },
        { iconKey: 76, iconType: 'feather', iconName: 'delete' },
        { iconKey: 77, iconType: 'feather', iconName: 'disc' },
        { iconKey: 78, iconType: 'feather', iconName: 'divide' },
        { iconKey: 79, iconType: 'feather', iconName: 'divide-circle' },
        { iconKey: 80, iconType: 'feather', iconName: 'divide-square' },
        { iconKey: 81, iconType: 'feather', iconName: 'dollar-sign' },
        { iconKey: 82, iconType: 'feather', iconName: 'download' },
        { iconKey: 83, iconType: 'feather', iconName: 'download-cloud' },
        { iconKey: 84, iconType: 'feather', iconName: 'dribble' },
        { iconKey: 85, iconType: 'feather', iconName: 'droplet' },
        { iconKey: 86, iconType: 'feather', iconName: 'edit' },
        { iconKey: 87, iconType: 'feather', iconName: 'edit-2' },
        { iconKey: 88, iconType: 'feather', iconName: 'edit-3' },
        { iconKey: 89, iconType: 'feather', iconName: 'external-link' },
        { iconKey: 90, iconType: 'feather', iconName: 'eye' },
        { iconKey: 91, iconType: 'feather', iconName: 'eye-off' },
        { iconKey: 92, iconType: 'feather', iconName: 'facebook' },
        { iconKey: 93, iconType: 'feather', iconName: 'fast-forward' },
        { iconKey: 94, iconType: 'feather', iconName: 'feather' },
        { iconKey: 95, iconType: 'feather', iconName: 'figma' },
        { iconKey: 96, iconType: 'feather', iconName: 'file' },
        { iconKey: 97, iconType: 'feather', iconName: 'file-minus' },
        { iconKey: 98, iconType: 'feather', iconName: 'file-plus' },
        { iconKey: 99, iconType: 'feather', iconName: 'file-text' },
        { iconKey: 100, iconType: 'feather', iconName: 'filter' },
        { iconKey: 101, iconType: 'feather', iconName: 'flag' },
        { iconKey: 102, iconType: 'feather', iconName: 'folder' },
        { iconKey: 103, iconType: 'feather', iconName: 'folder-minus' },
        { iconKey: 104, iconType: 'feather', iconName: 'folder-plus' },
        { iconKey: 105, iconType: 'feather', iconName: 'framer' },
        { iconKey: 106, iconType: 'feather', iconName: 'frown' },
        { iconKey: 107, iconType: 'feather', iconName: 'gift' },
        { iconKey: 108, iconType: 'feather', iconName: 'git-branch' },
        { iconKey: 109, iconType: 'feather', iconName: 'git-commit' },
        { iconKey: 110, iconType: 'feather', iconName: 'git-merge' },
        { iconKey: 111, iconType: 'feather', iconName: 'get-pull-request' },
        { iconKey: 112, iconType: 'feather', iconName: 'github' },
        { iconKey: 113, iconType: 'feather', iconName: 'gitlab' },
        { iconKey: 114, iconType: 'feather', iconName: 'globe' },
        { iconKey: 115, iconType: 'feather', iconName: 'grid' },
        { iconKey: 116, iconType: 'feather', iconName: 'hard-drive' },
        { iconKey: 117, iconType: 'feather', iconName: 'hash' },
        { iconKey: 118, iconType: 'feather', iconName: 'heart' },
        { iconKey: 119, iconType: 'feather', iconName: 'help-circle' },
        { iconKey: 120, iconType: 'feather', iconName: 'hexagon' },
        { iconKey: 121, iconType: 'feather', iconName: 'home' }
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
                    if(route.params.data) {
                        updateIntoDatabase(categoryName, categoryDesc, selectedCategoryIcon.iconName)
                    } else {
                        insertIntoDatabase(categoryName, categoryDesc, selectedCategoryIcon.iconName)
                    }
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
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', marginTop: 60 }}>Category Icons</Text>
                    <IconList
                        iconNumber = {4}
                        iconList = { categoryIcon }
                        selectedIcon= { selectedCategoryIcon }
                        onIconPressed = {(item) => {
                            console.log(item)
                            setSelectedCategoryIcon(item)
                        }}
                    />
                </View>
            </Card>
        </View>
    )
}

export default AddCategory