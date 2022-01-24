import React, { useState } from 'react'
import {View, TouchableOpacity, FlatList, StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const IconList = (props) => {
    const [ selectedIcon, setSelectedIcon ] = useState([{"iconKey": 2, "iconName": "airplay", "iconType": "feather"}])

    return (
        <View style={styles.MainContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 20, borderRadius: 10 }}>
                <Icon name={selectedIcon.iconName | props.selectedIcon} size={30} color='#000' />
            </View>
            <FlatList  
                style = {{ padding: 0, margin: 0, marginBottom: 50 }}
                data={props.iconList}
                renderItem={({item}) =>
                    <TouchableOpacity style={[styles.GridViewBlockStyle]} onPress={() => {
                        props.onIconPressed(item)
                        setSelectedIcon(item)
                    }}>
                        <Icon name={item.iconName} size={20} color='#fff' />
                    </TouchableOpacity>
                }
                numColumns={props.iconNumber}
                keyExtractor={item => item.iconKey} 
            />
        </View>
    );
}
 
const styles = StyleSheet.create({
    MainContainer :{
        justifyContent: 'center',
        marginVertical: 20,
        width: '100%',
        height: '100%'
    },
    GridViewBlockStyle: {
        justifyContent: 'center',
        flex:1,
        alignItems: 'center',
        margin: 5,
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: '#11998ecc'
    },
    GridViewInsideTextItemStyle: { 
        color: '#fff',
        padding: 10,
        fontSize: 18,
        justifyContent: 'center',
    },
    selectedItem : {
        opacity: 0.5
    },
    deSelectItem : {
        opacity: 1
    }
});


export default IconList