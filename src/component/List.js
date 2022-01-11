import React, { useRef, useState } from 'react'
import { StyleSheet, Text, FlatList, View, TouchableOpacity, ScrollView, Vibration } from 'react-native'
import Icon from 'react-native-ionicons'
import RBSheet from "react-native-raw-bottom-sheet"
import { useNavigation } from '@react-navigation/native'

const List = (props) => {
    const refRBSheet = useRef()
    const [selectedItem, setSelectedItem] = useState([])
    const navigation = useNavigation()

    return (
        <>
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
                        <View style={{ width: '75%' }}>
                            <Text style={[styles.listItemText, {color: '#fff'}]}>{selectedItem.expense_name}</Text>
                            <Text numberOfLines={2} style={[styles.listItemSubText, {color: '#fff'}]}>{selectedItem.expense_desc}</Text>
                        </View>
                        <View>
                            <Text style={ [styles.listItemAmt, {color: '#fff'}] }>{selectedItem.expense_amt}</Text>
                        </View>
                    </View>
                    <ScrollView style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                refRBSheet.current.close()
                                navigation.navigate('ViewExpenses', {
                                    data: {
                                        name : selectedItem.expense_name,
                                        desc : selectedItem.expense_desc,
                                        type : selectedItem.expense_type,
                                        amount : selectedItem.expense_amt,
                                        date : selectedItem.expense_date
                                    }
                                })
                            }}>
                                <Icon name="add" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>View</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#ccc', width: '100%' }}></View>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="create" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Edit</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#ccc', width: '100%' }}></View>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="trash" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Delete</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#ccc', width: '100%' }}></View>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="share" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Share</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#ccc', width: '100%' }}></View>
                            <TouchableOpacity style={{ width:'100%', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="albums" size={20} color='#fff' style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Add to category</Text>
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
                            // onPress={() => {
                            //     console.log(item)
                            //     props.onItemPress(item)
                            //     navigation.navigate('ViewExpenses', {
                            //         data: {
                            //             name : item.expense_name,
                            //             desc : item.expense_desc,
                            //             type : item.expense_type,
                            //             amount : item.expense_amt,
                            //             date : item.expense_date
                            //         }
                            //     })    
                            // }}
                            onPress={() => {
                                setSelectedItem(item)
                                Vibration.vibrate(50)
                                setSelectedItem(item)
                                refRBSheet.current.open()
                            }}>
                            <View style={{ width: '75%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '75%' }}>
                                    <View>
                                        <Icon name={ item.expense_type === 'income' ? 'card' : 'cash' } size={35} color="#11998e" style={{ marginRight: 20 }} />
                                    </View>
                                    <View>
                                        <Text numberOfLines={1} style={styles.listItemText}>{item.expense_name}</Text>
                                        <Text numberOfLines={2} style={styles.listItemSubText}>{item.expense_desc}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                {/* { console.log(item.expense_type) } */}
                                <Text style={ item.expense_type === 'income' ? [styles.listItemAmt, styles.colorGreen] : [styles.listItemAmt, styles.colorRed] }>{item.expense_type === 'income' ? '+ ' + item.expense_amt : '- ' + item.expense_amt }</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
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
        fontSize: 15,
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