import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const Card = (props) => {
    return (
        (props.onPress) ? 
            <TouchableOpacity style = {[ styles.cardContainer, props.style ]} onPress={props.onPress}>
                { props.children }
            </TouchableOpacity>
        :
            <View style = {[ styles.cardContainer, props.style ]}>
                { props.children }
            </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 20,
        elevation: 5,
        backgroundColor: '#fff'
    }
})

export default Card