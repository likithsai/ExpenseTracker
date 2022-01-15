import React, { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, ScrollView, View } from 'react-native'
import Icon from 'react-native-ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import RBSheet from "react-native-raw-bottom-sheet"

const Dropdown = (props) => {
    const [selectedItem, setSelectedItem] = useState([])
    const refDropdownModal = useRef()

    return (
        <>
            <RBSheet
                ref={refDropdownModal}
                height={200}
                openDuration={250}
                customStyles={{
                    container: {
                        height: 240,
                        elevation: 10,
                        backgroundColor: '#11998e'
                    }
                }}>
                    <Text style={{ color: props.modalItemTextColor, fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20 }}>Select {props.modalTitle}</Text>
                    <View style={{ flex:1, flexDirection: 'column' }}>
                        <ScrollView style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', backgroundColor: props.modalItemBackgroundColor, paddingHorizontal: 20, minHeight: '70%' }}>
                            {
                                props.modalItems.map(item => (
                                        <TouchableOpacity 
                                            key={item.category_id + ""}
                                            onPress={() => {
                                                props.onItemSelected(item)
                                                setSelectedItem(item)
                                                refDropdownModal.current.close()
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
                        </ScrollView>
                    </View>
            </RBSheet>
            <TouchableOpacity 
                style={[ props.style, { width: '100%', backgroundColor: '#fff', marginTop: 10, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } ]}
                onPress={() => {
                    refDropdownModal.current.open()
                }}
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