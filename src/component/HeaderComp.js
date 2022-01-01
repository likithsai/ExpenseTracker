import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-ionicons';

const HeaderComp = (props) => {
    return (
        <View style={{ elevation: 5, flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center', padding: 20, backgroundColor: '#fff' }}>
            <TouchableOpacity onPress={props.onBackPressed}>
                <Icon name="arrow-back" size={30} color='#666' />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>{ props.headerTitle }</Text>
            <TouchableOpacity onPress = {props.onSucessPressed}>
                <Icon name="checkmark" size={30} color='#666' />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderComp