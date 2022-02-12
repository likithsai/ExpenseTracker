// https://fxtop.com/en/countries-currencies.php

import React from 'react'
import { FlatList, Text, View, Image, Vibration, ToastAndroid, TextInput } from 'react-native'
import Card from '../component/Card'
import HeaderCompStart from '../component/HeaderCompStart'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        { countryId: 32, countryName: 'British Virgin Islands', countryCurrency: 'USD', countryIcon: require('../../assets/flag/British-Virgin-Islands.gif') },
        { countryId: 33, countryName: 'Brunei Darussalam', countryCurrency: 'BND', countryIcon: require('../../assets/flag/Brunei-Darussalam.gif') },
        { countryId: 34, countryName: 'Bulgaria', countryCurrency: 'BGN', countryIcon: require('../../assets/flag/Bulgaria.gif') },
        { countryId: 35, countryName: 'Burkina Faso', countryCurrency: '', countryIcon: require('../../assets/flag/Burkina-Faso.gif') },
        { countryId: 36, countryName: 'Burundi', countryCurrency: 'BIF', countryIcon: require('../../assets/flag/Burundi.gif') },
        { countryId: 37, countryName: 'Cambodia', countryCurrency: 'KHR', countryIcon: require('../../assets/flag/Cambodia.gif') },
        { countryId: 38, countryName: 'Cameroon', countryCurrency: '', countryIcon: require('../../assets/flag/Cameroon.gif') },
        { countryId: 39, countryName: 'Canada', countryCurrency: 'CAD', countryIcon: require('../../assets/flag/Canada.gif') },
        { countryId: 40, countryName: 'Cape Verde', countryCurrency: 'CVE', countryIcon: require('../../assets/flag/Cape-Verde.gif') },
        { countryId: 41, countryName: 'Cayman Islands', countryCurrency: 'KYD', countryIcon: require('../../assets/flag/Cayman-Islands.gif') },
        { countryId: 42, countryName: 'Central African Rep', countryCurrency: '', countryIcon: require('../../assets/flag/Central-African-Rep.gif') },
        { countryId: 43, countryName: 'Chad', countryCurrency: '', countryIcon: require('../../assets/flag/Chad.gif') },
        { countryId: 44, countryName: 'Chile', countryCurrency: 'CLP', countryIcon: require('../../assets/flag/Chile.gif') },
        { countryId: 45, countryName: 'China', countryCurrency: 'CNY', countryIcon: require('../../assets/flag/China.gif') },
        { countryId: 46, countryName: 'Christmas Island', countryCurrency: 'AUD', countryIcon: require('../../assets/flag/Christmas-Island.gif') },
        { countryId: 47, countryName: 'Cocos (Keeling) Islands', countryCurrency: 'AUD', countryIcon: require('../../assets/flag/Cocos.gif') },
        { countryId: 48, countryName: 'Colombia', countryCurrency: 'COP', countryIcon: require('../../assets/flag/Colombia.gif') },
        { countryId: 49, countryName: 'Comoros', countryCurrency: 'KMF', countryIcon: require('../../assets/flag/Comoros.gif') },
        { countryId: 50, countryName: 'Congo', countryCurrency: '', countryIcon: require('../../assets/flag/Congo.gif') },
        { countryId: 51, countryName: 'Cook Islands', countryCurrency: 'CAD', countryIcon: require('../../assets/flag/Cook-Islands.gif') },
        { countryId: 52, countryName: 'Costa Rica', countryCurrency: 'CRC', countryIcon: require('../../assets/flag/Costa-Rica.gif') },
        { countryId: 53, countryName: 'Croatia', countryCurrency: 'HRK', countryIcon: require('../../assets/flag/Croatia.gif') },
        { countryId: 54, countryName: 'Cuba', countryCurrency: 'CUC', countryIcon: require('../../assets/flag/Cuba.gif') },
        { countryId: 55, countryName: 'Cyprus', countryCurrency: 'EUR', countryIcon: require('../../assets/flag/Cyprus.gif') },
        { countryId: 56, countryName: 'Czech Republic', countryCurrency: 'CZK', countryIcon: require('../../assets/flag/Czech-Republic.gif') },
        { countryId: 57, countryName: 'Democratic Republic of Congo', countryCurrency: 'CDF', countryIcon: require('../../assets/flag/Democratic-Republic-of-Congo.gif') },
        { countryId: 58, countryName: 'Denmark', countryCurrency: 'DKK', countryIcon: require('../../assets/flag/Denmark.gif') },
        { countryId: 59, countryName: 'Djibouti', countryCurrency: 'DJF', countryIcon: require('../../assets/flag/Djibouti.gif') },
        { countryId: 60, countryName: 'Dominica', countryCurrency: 'XCD', countryIcon: require('../../assets/flag/Dominica.gif') },
        { countryId: 61, countryName: 'Dominican Republic', countryCurrency: 'DOP', countryIcon: require('../../assets/flag/Dominican-Republic.gif') },
        { countryId: 62, countryName: 'Ecuador', countryCurrency: 'USD', countryIcon: require('../../assets/flag/Ecuador.gif') },
        { countryId: 63, countryName: 'Egypt', countryCurrency: 'EGP', countryIcon: require('../../assets/flag/Egypt.gif') },
        { countryId: 64, countryName: 'El Salvador', countryCurrency: 'SVC', countryIcon: require('../../assets/flag/El-Salvador.gif') },

        { countryId: 65, countryName: 'Eritrea', countryCurrency: 'ERN', countryIcon: require('../../assets/flag/Eritrea.gif') },
        { countryId: 66, countryName: 'Estonia', countryCurrency: 'EUR', countryIcon: require('../../assets/flag/Estonia.gif') },
        { countryId: 67, countryName: 'Ethiopia', countryCurrency: 'ETB', countryIcon: require('../../assets/flag/Ethiopia.gif') },
        { countryId: 68, countryName: 'Falkland Isl., Malvinas', countryCurrency: 'FKP', countryIcon: require('../../assets/flag/Falkland-Isl-Malvinas.gif') },
        { countryId: 69, countryName: 'Faroe Islands', countryCurrency: 'DKK', countryIcon: require('../../assets/flag/Faroe-Islands.gif') },
        { countryId: 70, countryName: 'Fiji', countryCurrency: 'FJD', countryIcon: require('../../assets/flag/Fiji.gif') },
        { countryId: 71, countryName: 'Finland', countryCurrency: 'EUR', countryIcon: require('../../assets/flag/Finland.gif') },
        { countryId: 72, countryName: 'France', countryCurrency: 'EUR', countryIcon: require('../../assets/flag/France.gif') },
        { countryId: 73, countryName: 'Gabon', countryCurrency: 'XAF', countryIcon: require('../../assets/flag/Gabon.gif') },
        { countryId: 74, countryName: 'Gambia', countryCurrency: 'GMD', countryIcon: require('../../assets/flag/Gambia.gif') },
        { countryId: 75, countryName: 'Georgia', countryCurrency: 'GEL', countryIcon: require('../../assets/flag/Georgia.gif') },
    ]

    const storeCurrencyData = async(key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {

        }
    }

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
                        storeCurrencyData('SelectedCurrency', JSON.stringify(item))
                        navigation.pop()
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={ item.countryIcon } style={{ height: 20, width: 30, resizeMode : 'stretch', marginRight: 15, elevation: 10, borderWidth: 1, borderColor: '#777' }}/>
                                <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold' }}>{ item.countryName }</Text>
                            </View>
                            {/* <Text style={{ fontSize: 15, color: '#777', fontWeight: 'bold' }}>{ item.countryCurrency }</Text> */}
                        </View>
                    </Card>
                }
                keyExtractor={item => item.countryId} 
            />
        </>
    )
}

export default SelectCurrency 