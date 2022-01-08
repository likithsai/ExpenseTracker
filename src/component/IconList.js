import React from 'react'
import {View, TouchableOpacity, FlatList, StyleSheet, ScrollView} from 'react-native'
// import Icon from 'react-native-ionicons';
import Icon from 'react-native-vector-icons/Feather';

const IconList = (props) => {
    return (
        <View style={styles.MainContainer}>
            <FlatList  
                style = {{ padding: 0, margin: 0 }}
                data={props.iconList}
                renderItem={({item}) =>
                    <TouchableOpacity style={styles.GridViewBlockStyle} onPress={() => {
                        props.onIconPressed(item)
                    }}>
                        <Icon name={item.iconName} size={20} color='#fff' />
                        {/* <Text style={styles.GridViewInsideTextItemStyle}>{item.iconName}</Text> */}
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
        borderRadius: 20,
        backgroundColor: '#11998ecc'
    },
    GridViewInsideTextItemStyle: { 
        color: '#fff',
        padding: 10,
        fontSize: 18,
        justifyContent: 'center',
    } 
});


export default IconList