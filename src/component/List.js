import React, {useRef, useState, useEffect} from 'react'
import { StyleSheet, Text, FlatList, View, TouchableOpacity, ScrollView, Vibration, Alert } from 'react-native'
import Icon from 'react-native-ionicons'
import RBSheet from "react-native-raw-bottom-sheet"
import { useNavigation } from '@react-navigation/native'
import { openDatabase } from 'react-native-sqlite-storage'
import FeatherIcons from 'react-native-vector-icons/Feather'

var db = openDatabase({ name: 'data.db' }, () => {}, (err) => {
    console.log('SQL Error : ' + err.message)
})

const List = (props) => {
    const refRBSheet = useRef()
    const refCategorySheet = useRef()
    const [ selectedItem, setSelectedItem ] = useState([])
    const [ category, setCategory ] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        selectDataFromDatabase("SELECT * FROM tbl_category")
    })

    const getCategoryData = (type) => {
        let filteredResponseJson = category.filter(item => item.category_id === type)
        return (filteredResponseJson.length > 0) ? filteredResponseJson : "[{ category_icon: 'plus' }]"
    }


    const selectDataFromDatabase = (query, param) => {
        db.transaction((tx) => {
            tx.executeSql(query, param, (tx, results) => {
                var temp = []
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i))
                }
                setCategory(temp)
            })
        })
    }

    const executeSQLDB = (query, param) => {
        db.transaction((tx) => {
            tx.executeSql(query, param, (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log('User updated successfully')
                    Snackbar.show({
                        text: 'Expense Deleted',
                        duration: Snackbar.LENGTH_LONG,
                        action: {
                          text: 'CLOSE',
                          textColor: 'green',
                          onPress: () => {},
                        },
                    })
                } else {
                    console.log('Updation Failed')
                }
            },
            (err) => {
                console.log(err.message)
            })
        })
    }

    return (
        <>
        <RBSheet
            ref={refCategorySheet}
            height={200}
            openDuration={250}
            customStyles={{
                container: {
                    height: 300,
                    backgroundColor: '#11998e'
                }
            }}>
                <Text style={{ color: props.modalItemTextColor, fontSize: 20, fontWeight: 'bold', color: '#fff', paddingHorizontal: 20, marginTop: 20, marginBottom: 10 }}>Select Category</Text>
                <View style={{ flex:1, flexDirection: 'column' }}>
                    <ScrollView style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', backgroundColor: '#11998e', paddingHorizontal: 20, minHeight: '70%' }}>
                        {
                            category.map(item => (
                                <TouchableOpacity 
                                    key={item.category_id + ""}
                                    onPress={() => {
                                        executeSQLDB('UPDATE tbl_expense SET expense_category = ? WHERE expense_id = ?', [item.category_id, selectedItem.expense_id])
                                        setSelectedItem(item)
                                        refCategorySheet.current.close()
                                    }} 
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                                        <View>
                                            <FeatherIcons name={item.category_icon} color="#fff" style={{ marginRight: 20 }} size={30}/>
                                        </View>
                                        <View>
                                            <Text style={[styles.listItemText, { color: '#fff', fontSize: 18 }]}>{ item.category_name }</Text>
                                            <Text style={[styles.listItemSubText, { color: '#fff', textAlign: 'justify', fontSize: 15 }]}>{ item.category_desc }</Text>
                                        </View>
                                    </TouchableOpacity>
                            ))
                        }
                        <TouchableOpacity 
                            key="add_catgeory"
                            onPress={() => {
                                navigation.navigate("AddCategory", {})
                            }} 
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                                <View>
                                    <FeatherIcons name="plus" color="#fff" style={{ marginRight: 20, elevation: 10 }} size={30}/>
                                </View>
                                <View>
                                    <Text style={[styles.listItemText, { color: '#fff', fontSize: 18 }]}>Add Category</Text>
                                    <Text style={[styles.listItemSubText, { color: '#fff', textAlign: 'justify', fontSize: 15 }]}>Add Transaction category</Text>
                               </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
        </RBSheet>
        <RBSheet
            ref={refRBSheet}
            height={200}
            openDuration={250}
            customStyles={{
                container: {
                    height: 300,
                    elevation: 5,
                }
            }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#11998e', padding: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View>
                            <FeatherIcons name={ getCategoryData(selectedItem.expense_category)[0].category_icon || 'alert-triangle' } size={35} color="#fff" style={{ marginRight: 10 }} />
                        </View>
                        <View style={{ width: '55%' }}>
                            <Text style={[styles.listItemText, { color: '#fff' }]}>{selectedItem.expense_name}</Text>
                            <Text numberOfLines={2} style={[styles.listItemSubText, {color: '#fff', fontSize: 15}]}>{selectedItem.expense_desc}</Text>
                        </View>
                        <View>
                            <Text style={ [styles.listItemAmt, {color: '#fff'}] }>{ selectedItem.expense_type === 'income' ? '+ ' + selectedItem.expense_amt : '- ' + selectedItem.expense_amt }</Text>
                        </View>
                    </View>
                    <ScrollView style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                refRBSheet.current.close()
                                navigation.navigate('ViewExpenses', {
                                    list: selectedItem
                                })
                            }}>
                                <Icon name="eye" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', fontSize: 15 }}>View</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#ccc', width: '100%' }}></View>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                console.log(selectedItem)
                                navigation.navigate('AddExpenses', {
                                    data: selectedItem
                                })
                            }}>
                                <Icon name="create" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', fontSize: 15 }}>Edit</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#ccc', width: '100%' }}></View>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                Alert.alert("Delete Item", "Do you want to delete item :\n" + selectedItem.expense_name, [{
                                    text: 'Cancel',
                                    onPress: () => {},
                                    style: 'cancel'
                                }, {
                                    text: 'Ok',
                                    onPress: () => {
                                        executeSQLDB('DELETE FROM tbl_expense WHERE expense_id = ?', [selectedItem.expense_id])
                                    }
                                }])
                                refRBSheet.current.close()
                                refCategorySheet.current.close()
                            }}>
                                <Icon name="trash" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', fontSize: 15 }}>Delete</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#ccc', width: '100%' }}></View>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                props.onShareItem(selectedItem)
                            }}>
                                <Icon name="share" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', fontSize: 15 }}>Share</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#ccc', width: '100%' }}></View>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => { 
                                refRBSheet.current.close()
                                refCategorySheet.current.open()
                            }}>
                                <Icon name="albums" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', fontSize: 15 }}>Add to category</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
        </RBSheet>

        <View style={{ flex: 1 }}>
            <FlatList
                data={props.listData}
                // ListHeaderComponent={()=> {
                //     return (
                //         <View style={{ marginVertical: 10 , paddingHorizontal: 20, fontSize: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                //             <Text style={{ fontSize: 15, color: '#555' }}>{props.topBarTitle}</Text>
                //         </View>
                //     )
                // }}
                ListEmptyComponent={() => {
                    return (
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent:'center', paddingTop: '40%' }}>
                            <Icon name="snow" size={50} color='#666' style={{ marginBottom: 10 }} />
                            <Text style={{ fontSize: 15, color: '#555' }}>There is no items</Text>
                        </View>
                    )
                }}
                renderItem={({item}) => ( 
                        <TouchableOpacity style={styles.listItems} 
                            onPress={() => {
                                setSelectedItem(item)
                                Vibration.vibrate(50)
                                refRBSheet.current.open()
                            }}>
                            <View style={{ width: '75%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '75%' }}>
                                    <View>
                                        <FeatherIcons name={ getCategoryData(item.expense_category)[0].category_icon || 'alert-triangle' } size={30} color="#fff" style={{ marginRight: 15, backgroundColor: '#11998e', padding:12, borderRadius: 10, marginTop: 5, elevation: 10 }} />
                                    </View>
                                    <View>
                                        <Text numberOfLines={1} style={styles.listItemText}>{item.expense_name}</Text>
                                        <Text numberOfLines={2} style={styles.listItemSubText}>{item.expense_desc}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={ item.expense_type === 'income' ? [styles.listItemAmt, styles.colorGreen] : [styles.listItemAmt, styles.colorRed] }>{item.expense_type === 'income' ? '+ ' + item.expense_amt : '- ' + item.expense_amt }</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onListRefresh} />}
                refreshControl={props.refreshControl}
                // keyExtractor={item => item.expense_id} 
                />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    topBarTitle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    listItems: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        width: '100%',
        elevation: 5,
        backgroundColor: '#fff'
    },
    listItemText : {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    listItemSubText : {
        fontSize: 14,
        color: '#555'
    },
    listItemAmt: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    colorRed: {
        color: 'red'
    },
    colorGreen: {
        color: 'green'
    }
})

export default List