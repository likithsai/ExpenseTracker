// https://fxtop.com/en/countries-currencies.php

import React from 'react'
import { FlatList, Text, View, Image, Vibration } from 'react-native'
import Card from '../component/Card'
import HeaderCompStart from '../component/HeaderCompStart'

const SelectCurrency = ({ navigation }) => {

    const countries = [
        { countryId: 1, countryName: 'Afghanistan', countryCurrency: 'AFN', countryIcon: require('../../assets/flag/afghanistan.gif') },
        { countryId: 2, countryName: 'Albania', countryCurrency: 'ALL', countryIcon: require('../../assets/flag/albania.gif') },
        { countryId: 3, countryName: 'Algeria', countryCurrency: 'DZD', countryIcon: require('../../assets/flag/algeria.gif') },
        { countryId: 4, countryName: 'American Samoa', countryCurrency: 'USD', countryIcon: require('../../assets/flag/american_samoa.gif') },
        { countryId: 5, countryName: 'Andorra', countryCurrency: 'EUR', countryIcon: require('../../assets/flag/andorra.gif') },
        { countryId: 6, countryName: 'Angola', countryCurrency: 'AOA', countryIcon: require('../../assets/flag/angola.gif') },
        { countryId: 7, countryName: 'Anguilla', countryCurrency: 'XCD', countryIcon: require('../../assets/flag/anguilla.gif') },
        { countryId: 8, countryName: 'Antigua and Barbuda', countryCurrency: 'XCD', countryIcon: require('../../assets/flag/antigua_and_barbuda.gif') },
        { countryId: 9, countryName: 'Argentina', countryCurrency: 'ARS', countryIcon: require('../../assets/flag/argentina.gif') },
        { countryId: 10, countryName: 'Armenia', countryCurrency: 'AMD', countryIcon: require('../../assets/flag/armenia.gif') },
        { countryId: 11, countryName: 'Aruba', countryCurrency: 'AWG', countryIcon: require('../../assets/flag/aruba.gif') },
        { countryId: 12, countryName: 'Australia', countryCurrency: 'AUD', countryIcon: require('../../assets/flag/australia.gif') },
        { countryId: 13, countryName: 'Austria', countryCurrency: 'AWG', countryIcon: require('../../assets/flag/algeria.gif') },
        { countryId: 14, countryName: 'Azerbaijan', countryCurrency: 'AZN', countryIcon: require('../../assets/flag/american_samoa.gif') },
        { countryId: 15, countryName: 'Bahamas', countryCurrency: 'BSD', countryIcon: require('../../assets/flag/Bahamas.gif') },
        { countryId: 16, countryName: 'Bahrain', countryCurrency: 'BHD', countryIcon: require('../../assets/flag/Bahrain.gif') },
        { countryId: 17, countryName: 'Bangladesh', countryCurrency: 'BDT', countryIcon: require('../../assets/flag/Bangladesh.gif') },
        { countryId: 18, countryName: 'Barbados', countryCurrency: 'BBD', countryIcon: require('../../assets/flag/Barbados.gif') },
        { countryId: 19, countryName: 'Belarus', countryCurrency: 'BYN', countryIcon: require('../../assets/flag/Belarus.gif') },
        { countryId: 20, countryName: 'Belgium', countryCurrency: 'EUR', countryIcon: require('../../assets/flag/Belgium.gif') },
        { countryId: 21, countryName: 'Belize', countryCurrency: 'BZD', countryIcon: require('../../assets/flag/Belize.gif') },
        { countryId: 22, countryName: 'Benin', countryCurrency: 'XOF', countryIcon: require('../../assets/flag/Benin.gif') },
        { countryId: 23, countryName: 'Bermuda', countryCurrency: 'BMD', countryIcon: require('../../assets/flag/Bermuda.gif') },
        { countryId: 24, countryName: 'Bhutan', countryCurrency: 'BTN', countryIcon: require('../../assets/flag/Bhutan.gif') },
        { countryId: 25, countryName: 'Azerbaijan', countryCurrency: 'AZN', countryIcon: require('../../assets/flag/american_samoa.gif') },
        { countryId: 26, countryName: 'Bolivia', countryCurrency: 'BOB', countryIcon: require('../../assets/flag/Bolivia.gif') },
        { countryId: 27, countryName: 'Bosnia Herzegovina', countryCurrency: 'BAM', countryIcon: require('../../assets/flag/Bosnia-Herzegovina.gif') },
        { countryId: 28, countryName: 'Botswana', countryCurrency: 'BWP', countryIcon: require('../../assets/flag/Botswana.gif') },
        { countryId: 29, countryName: 'Bouvet Island', countryCurrency: 'NOK', countryIcon: require('../../assets/flag/Bouvet-Island.gif') },
        { countryId: 30, countryName: 'Brazil', countryCurrency: 'BRL', countryIcon: require('../../assets/flag/Brazil.gif') },
        { countryId: 31, countryName: 'British Indian O. Terr.', countryCurrency: 'GBP', countryIcon: require('../../assets/flag/British-Indian-O-Terr.gif') },
    ]
    return (
        <>
            <HeaderCompStart 
                leftIcon = "arrow-back"
                headerTitle="Select Country"
                onBackPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.pop()
                }}
                onSucessPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.navigate('AddExpenses', {
                        data: route.params.list
                    })
                }} 
            />
            <FlatList
                data={countries}
                renderItem={({item}) => 
                    <Card onPress={() =>{
                        Vibration.vibrate(50)
                        navigation.pop()
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={ item.countryIcon } style={{ height: 20, width: 30, resizeMode : 'stretch', marginRight: 20, elevation: 10, borderWidth: 1, borderColor: '#777' }}/>
                                <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold' }}>{ item.countryName }</Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#777', fontWeight: 'bold' }}>{ item.countryCurrency }</Text>
                        </View>
                    </Card>
                }
                keyExtractor={item => item.countryId} 
            />
        </>
    )
}

export default SelectCurrency 