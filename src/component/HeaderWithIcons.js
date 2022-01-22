import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Vibration, ScrollView } from 'react-native'
import Icon from 'react-native-ionicons'

const HeaderWithIcons= (props) => {
    return (
        <>
        <View>
            <View style={styles.headerContainer}>
                <View style={[styles.headerBarContent]}>
                    <Text style={styles.headerTitle}>{props.headerTitle}</Text>
                </View>
                <TouchableOpacity onPress={props.onRightIconPressed}>
                    <Icon name="settings" size={25} color='#fff' />
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer : {
        width: '100%',
        backgroundColor: '#11998e',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        borderBottomWidth: 0.5,
        borderBottomColor: '#aaa'
    },
    headerBarContent : {
        flexDirection: 'row'
    },
    headerBarKPI : {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    headerParallax: {
        minHeight: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    txtKPITitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    }
})

export default HeaderWithIcons