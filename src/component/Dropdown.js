import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, Modal, ScrollView, View } from 'react-native'
import Icon from 'react-native-ionicons'

const Dropdown = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])

    return (
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                    <View style={{ flex:1, flexDirection: 'column' }}>
                        <ScrollView style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: props.modalItemBackgroundColor, elevation: 10, padding: 20 }}>
                            <Text style={{ color: props.modalItemTextColor, fontSize: 20, fontWeight: 'bold' }}>Select {props.modalTitle}</Text>
                        
                            {
                                props.modalItems.map(item => (
                                        <TouchableOpacity 
                                            key={item.category_id + ""}
                                            onPress={() => {
                                                props.onItemSelected(item)
                                                setSelectedItem(item)
                                                setModalVisible(false)
                                            }} 
                                            style={{ backgroundColor: props.modalItemBackgroundColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 20 }}>
                                                <View>
                                                    <Icon name="add" color={props.modalItemTextColor} style={{ marginRight: 20 }} />
                                                </View>
                                                <View>
                                                    <Text style={[styles.listItemText, { color: props.modalItemTextColor}]}>{ item.category_name }</Text>
                                                    <Text style={[styles.listItemSubText, { color: props.modalItemTextColor, textAlign: 'justify' }]}>{ item.category_desc }</Text>
                                                </View>
                                        </TouchableOpacity>
                                    )
                                )
                            }
                            <TouchableOpacity 
                                key="10000"
                                onPress={() => {
                                    props.onItemSelected({ category_id: '10000', category_name: 'category', category_desc: 'add transactional category' })
                                    setModalVisible(false)
                                }} 
                                style={{ backgroundColor: props.modalItemBackgroundColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 20 }}
                            >
                                <View>
                                    <Icon name="add" color={props.modalItemTextColor} style={{ marginRight: 20 }} />
                                </View>
                                <View>
                                    <Text style={[styles.listItemText, { color: props.modalItemTextColor}]}>Add Category</Text>
                                    <Text style={[styles.listItemSubText, { color: props.modalItemTextColor, textAlign: 'justify' }]}>Add transaction category</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
            </Modal>
            <TouchableOpacity 
                style={[ props.style, { width: '100%', backgroundColor: '#fff', marginTop: 10, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } ]}
                onPress={() => setModalVisible(true)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '80%' }}>
                    <Icon name={selectedItem.itemIcon} size={30} color={props.itemColor} style={{ marginRight: 10, marginTop: 5 }} />
                    <Text style={{ color: props.itemColor, fontSize: 20 }}>{[ selectedItem.itemName || "Select " + props.modalTitle ]}</Text>
                    {/* <Text style={{ color: props.itemColor, fontSize: 15 }}>{[ selectedItem.itemDesc || null ]}</Text> */}
                </View>
                <Icon name="arrow-dropdown-circle" color={props.itemColor} style={{ marginRight: 10 }} />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    listItemText : {
        fontSize: 20,
        fontWeight: 'bold'
    },
    listItemSubText : {
        fontSize: 15
    }
})

export default Dropdown