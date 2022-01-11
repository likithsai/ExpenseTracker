import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, Modal, ScrollView, View } from 'react-native'
import Icon from 'react-native-ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'

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
                        <ScrollView style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: props.modalItemBackgroundColor, elevation: 10, padding: 20, minHeight: '70%' }}>
                            <Text style={{ color: props.modalItemTextColor, fontSize: 20, fontWeight: 'bold' }}>Select {props.modalTitle}</Text>
                            {
                                props.modalItems.map(item => (
                                        <TouchableOpacity 
                                            key={item.category_id + ""}
                                            onPress={() => {
                                                // console.log(JSON.parse(item.category_icon).iconName)
                                                props.onItemSelected(item)
                                                setSelectedItem(item)
                                                setModalVisible(false)
                                            }} 
                                            style={{ backgroundColor: props.modalItemBackgroundColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                                                <View>
                                                    <FeatherIcons name={item.category_icon} color={props.modalItemTextColor} style={{ marginRight: 20 }} size={30}/>
                                                </View>
                                                <View>
                                                    <Text style={[styles.listItemText, { color: props.modalItemTextColor}]}>{ item.category_name }</Text>
                                                    <Text style={[styles.listItemSubText, { color: props.modalItemTextColor, textAlign: 'justify' }]}>{ item.category_desc }</Text>
                                                </View>
                                        </TouchableOpacity>
                                    )
                                )
                            }
                            {/* <TouchableOpacity 
                                key="add_category"
                                onPress={() => {
                                    props.onItemSelected({ category_id: 'add_category', category_name: 'category', category_desc: 'add transactional category' })
                                    setModalVisible(false)
                                }} 
                                style={{ backgroundColor: props.modalItemBackgroundColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 20 }}
                            >
                                <View>
                                    <FeatherIcons name="plus" color={props.modalItemTextColor} style={{ marginRight: 20 }} size={30} />
                                </View>
                                <View>
                                    <Text style={[styles.listItemText, { color: props.modalItemTextColor}]}>Add Category</Text>
                                    <Text style={[styles.listItemSubText, { color: props.modalItemTextColor, textAlign: 'justify' }]}>Add transaction category</Text>
                                </View>
                            </TouchableOpacity> */}
                        </ScrollView>
                    </View>
            </Modal>
            <TouchableOpacity 
                style={[ props.style, { width: '100%', backgroundColor: '#fff', marginTop: 10, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } ]}
                onPress={() => setModalVisible(true)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '80%' }}>
                    <FeatherIcons name={selectedItem.category_icon} size={30} color={props.itemColor} style={{ marginRight: 10, marginTop: 5 }} />
                    <Text style={{ color: props.itemColor, fontSize: 20 }}>{[ selectedItem.category_name || "Select " + props.modalTitle ]}</Text>
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