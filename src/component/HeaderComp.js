import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-ionicons';

const HeaderComp = (props) => {
    return (
        <View style={{ elevation: 5, flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center', padding: 20, backgroundColor: '#11998e' }}>
            <TouchableOpacity onPress={props.onBackPressed}>
                <Icon name={props.leftIcon} size={30} color='#fff' />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>{ props.headerTitle }</Text>
            <TouchableOpacity onPress = {props.onSucessPressed}>
                <Icon name={props.rightIcon} size={30} color='#fff' />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderComp