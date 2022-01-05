import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text, Modal, ScrollView, View } from 'react-native'
import Icon from 'react-native-ionicons';

const Dropdown = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])

    const getSelected = () => {
        return selectedItem
    }

    return (
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <View style={{ flex:1, flexDirection: 'column' }}>
                        <ScrollView style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: props.modalItemBackgroundColor, elevation: 10, padding: 20 }}>
                            <Text style={{ color: props.modalItemTextColor, fontSize: 20, fontWeight: 'bold' }}>{props.modalTitle}</Text>
                        
                            {
                                props.modalItems.map(item => (
                                        <TouchableOpacity 
                                            key={item.itemKey}
                                            onPress={() => {
                                                setSelectedItem(item)
                                                setModalVisible(false)
                                            }} 
                                            style={{ backgroundColor: props.modalItemBackgroundColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingVertical: 20 }}>
                                            <View>
                                                <Icon name={item.itemIcon} color={props.modalItemTextColor} style={{ marginRight: 20 }} />
                                            </View>
                                            <View>
                                                <Text style={[styles.listItemText, { color: props.modalItemTextColor}]}>{ item.itemName }</Text>
                                                <Text style={[styles.listItemSubText, { color: props.modalItemTextColor, textAlign: 'justify' }]}>{ item.itemDesc }</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                )
                            }
                        </ScrollView>
                    </View>
            </Modal>
            <TouchableOpacity 
                style={[ props.style, { width: '100%', backgroundColor: '#fff', marginTop: 10, marginBottom: 20, flexDirection: 'row',  } ]}
                onPress={() => setModalVisible(true)}
            >
                <Icon name={[ selectedItem.itemIcon || 'arrow-dropdown-circle' ]} color={props.itemColor} style={{ marginRight: 10 }} />
                <Text style={{ color: props.itemColor, fontSize: 20 }}>{[ selectedItem.itemName || 'Please Select Invoice Type' ]}</Text>
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