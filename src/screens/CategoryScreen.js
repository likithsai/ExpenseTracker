import React, { useEffect, useState } from 'react'
import { View, Vibration, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native'
import HeaderWithIcons from '../component/HeaderWithIcons'
import { openDatabase } from 'react-native-sqlite-storage'
import FeatherIcons from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Feather'

var db = openDatabase({ name: 'data.db' }, () => {}, (err) => {
    console.log('SQL Error : ' + err.message)
})

const CategoryScreens= ({ navigation }) => {
    
    const [ DATA, setDATA ] = useState([])
    const [refreshing, setRefreshing] = React.useState(true)

    useEffect(() => {
        executeDBDQueries("SELECT * FROM tbl_category")
    })

    const onListRefresh = React.useCallback(async () => {
        executeDBDQueries("SELECT * FROM tbl_category")
    }, [refreshing]);

    const executeDBDQueries = (query, param) => {
        db.transaction((tx) => {
            tx.executeSql(query, param, (tx, results) => {
                var temp = []
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i))
                }
                setDATA(temp)
                setRefreshing(false)
            })
        })
    }

    return (
        <>
            <HeaderWithIcons
                headerTitle="Expense Tracker"
                onRightIconPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.navigate('Settings')
                }}
            />  
            <View style={{ padding: 20, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#11998e', elevation: 5 }}>
                <Icon name="copy" size={40} color='#fff' style={{ paddingVertical: 5}} />
                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Categories</Text>
                <Text style={{ fontSize: 15, color: '#fff' }}>{DATA.length}</Text>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 5 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AddCategory')
                    }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Icon name="copy" size={16} color='#555' style={{ marginRight: 10 }} />
                            <Text style={{ fontWeight: 'bold', color: '#555', fontSize: 14 }}>Add Categories</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={DATA}
                keyExtractor={item => item.category_id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ padding: 20, elevation: 5, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FeatherIcons name={item.category_icon} color="#11998e" style={{ marginTop: 5, marginRight: 20 }} size={40}/>
                            <View>
                                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>{ item.category_name }</Text>
                                <Text style={{ color: '#555', fontSize: 15 }}>{ item.category_desc }</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onListRefresh} />}
            />
        </>
    )
}

export default CategoryScreens