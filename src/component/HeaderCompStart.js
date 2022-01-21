import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-ionicons'

const HeaderCompStart = (props) => {
    return (
        <View style={{ elevation: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItem: 'center', padding: 20, backgroundColor: '#11998e' }}>
            <TouchableOpacity onPress={props.onBackPressed} style={{ marginRight: 20 }}>
                <Icon name={props.leftIcon} size={30} color='#fff' />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>{ props.headerTitle }</Text>
        </View>
    )
}

export default HeaderCompStart