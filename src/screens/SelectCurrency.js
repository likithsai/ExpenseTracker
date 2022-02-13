// https://www.worlddata.info/currencies/

import React, { useState } from 'react'
import { FlatList, Text, View, TextInput, Vibration } from 'react-native'
import Card from '../component/Card'
import HeaderCompStart from '../component/HeaderCompStart'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectCurrency = ({ navigation }) => {
    const countries = [
        { currencyId: 1, currencyName: "Arabic Dirham", isoName: "AED" },
        { currencyId: 2, currencyName: "Afghani", isoName: "AFN" },
        { currencyId: 3, currencyName: "Lek", isoName: "ALL" },
        { currencyId: 4, currencyName: "Dram", isoName: "AMD" },
        { currencyId: 5, currencyName: "Netherlands Antillean Guilder", isoName: "ANG" },
        { currencyId: 6, currencyName: "Kwanza", isoName: "AOA" },
        { currencyId: 7, currencyName: "Argentina Peso", isoName: "ARS" },
        { currencyId: 8, currencyName: "Australian Dollar", isoName: "AUD" },
        { currencyId: 9, currencyName: "Guilder", isoName: "AWG" },
        { currencyId: 10, currencyName: "Manat", isoName: "AZN" },
        { currencyId: 11, currencyName: "Convertible Mark", isoName: "BAM" },
        { currencyId: 12, currencyName: "Barbadian Dollar", isoName: "BBD" },
        { currencyId: 13, currencyName: "Taka", isoName: "BDT" },
        { currencyId: 14, currencyName: "Bulgarian Lev", isoName: "BGN" },
        { currencyId: 15, currencyName: "Bahrain Dinar", isoName: "BHD" },
        { currencyId: 16, currencyName: "Burundi Franc", isoName: "BIF" },
        { currencyId: 17, currencyName: "Bermudian Dollar", isoName: "BMD" },
        { currencyId: 18, currencyName: "Brunei Dollar", isoName: "BND" },
        { currencyId: 19, currencyName: "Boliviano", isoName: "BOB" },
        { currencyId: 20, currencyName: "Real", isoName: "BRL" },
        { currencyId: 21, currencyName: "Bahamian Dollar", isoName: "BSD" },
        { currencyId: 22, currencyName: "Ngultrum", isoName: "BTN" },
        { currencyId: 23, currencyName: "Pula", isoName: "BWP" },
        { currencyId: 24, currencyName: "Belarun Rubel", isoName: "BYR" },
        { currencyId: 25, currencyName: "Belize Dollar", isoName: "BZD" },
        { currencyId: 26, currencyName: "Canadian Dollar", isoName: "CAD" },
        { currencyId: 27, currencyName: "Congolais Franc", isoName: "CDF" },
        { currencyId: 28, currencyName: "Swiss Franc", isoName: "CHF" },
        { currencyId: 29, currencyName: "Cook Dollar", isoName: "CKD" },
        { currencyId: 30, currencyName: "Chilean Peso", isoName: "CLP" },
        { currencyId: 31, currencyName: "Renminbi Yyan", isoName: "CNY" },
        { currencyId: 32, currencyName: "Columbian Peso", isoName: "CDP" },
        { currencyId: 33, currencyName: "Colón", isoName: "CRC" },
        { currencyId: 34, currencyName: "Cuban Peso", isoName: "CUP" },
        { currencyId: 35, currencyName: "Cape Verdean Escudo", isoName: "CVE" },
        { currencyId: 36, currencyName: "Czech Krone", isoName: "CZK" },
        { currencyId: 37, currencyName: "Djibouti Franc", isoName: "DJF" },
        { currencyId: 38, currencyName: "Danish Krone", isoName: "DKK" },
        { currencyId: 39, currencyName: "Dominican Peso", isoName: "DOP" },
        { currencyId: 40, currencyName: "Algerian Dinar", isoName: "DZD" },
        { currencyId: 41, currencyName: "Egypt Pound", isoName: "EGP" },
        { currencyId: 42, currencyName: "Nakfa", isoName: "ERN" },
        { currencyId: 43, currencyName: "Birr", isoName: "ETB" },
        { currencyId: 44, currencyName: "Euro", isoName: "EUR" },
        { currencyId: 45, currencyName: "Fidschi Dollar", isoName: "FJD" },
        { currencyId: 46, currencyName: "Falklands Pound", isoName: "FKP" },
        { currencyId: 47, currencyName: "Foroese Krona", isoName: "FOK" },
        { currencyId: 48, currencyName: "Sterling Pound", isoName: "GBP" },
        { currencyId: 49, currencyName: "Georgian Lari", isoName: "GEL" },
        { currencyId: 50, currencyName: "Guensey Pound", isoName: "GGP" },
        { currencyId: 51, currencyName: "Ghana Cedi", isoName: "GHS" },
        { currencyId: 52, currencyName: "Gibraltar Pound", isoName: "GIP" },
        { currencyId: 53, currencyName: "Dalasi", isoName: "GMD" },
        { currencyId: 54, currencyName: "Guinea Franc", isoName: "GNF" },
        { currencyId: 55, currencyName: "Quetzal", isoName: "GTQ" },
        { currencyId: 56, currencyName: "Guyana Dollar", isoName: "GYD" },
        { currencyId: 57, currencyName: "Hong Kong Dollar", isoName: "HKD" },
        { currencyId: 58, currencyName: "Lempira", isoName: "HNL" },
        { currencyId: 59, currencyName: "Kuna", isoName: "HRK" },
        { currencyId: 60, currencyName: "Gourde", isoName: "HTG" },
        { currencyId: 61, currencyName: "Hungarian Forint", isoName: "HUF" },
        { currencyId: 62, currencyName: "Indonesian Rupaih", isoName: "IDR" },
        { currencyId: 63, currencyName: "Israli Shekel", isoName: "ILS" },
        { currencyId: 64, currencyName: "Manx Pound", isoName: "IMP" },
        { currencyId: 65, currencyName: "Indian Rupee", isoName: "INR" },
        { currencyId: 66, currencyName: "Iraqi Dinar", isoName: "IQD" },
        { currencyId: 67, currencyName: "Iranian Rial", isoName: "IRR" },
        { currencyId: 68, currencyName: "Icelandic Krone", isoName: "ISK" },
        { currencyId: 69, currencyName: "Jersey Sterling Pound", isoName: "JEP" },
        { currencyId: 70, currencyName: "Jamaica Dollar", isoName: "JMD" },
        { currencyId: 71, currencyName: "Jordanian Dinar", isoName: "JOD" },
        { currencyId: 72, currencyName: "Japanese Yen", isoName: "JPY" },
        { currencyId: 73, currencyName: "Kenian Schilling", isoName: "KES" },
        { currencyId: 74, currencyName: "Som", isoName: "KGS" },
        { currencyId: 75, currencyName: "Cambodian Riel", isoName: "KHR" },
        { currencyId: 76, currencyName: "Kiribati Dollar", isoName: "KID" },
        { currencyId: 77, currencyName: "Comorian Franc", isoName: "KMF" },
        { currencyId: 78, currencyName: "North Korean Won", isoName: "KPW" },
        { currencyId: 79, currencyName: "South Korean Won", isoName: "KPR" },
        { currencyId: 80, currencyName: "Kuwaiti Dinar", isoName: "KWD" },
        { currencyId: 81, currencyName: "Cayman Dollar", isoName: "KYD" },
        { currencyId: 82, currencyName: "Tenge", isoName: "KZT" },
        { currencyId: 83, currencyName: "Kip", isoName: "LAK" },
        { currencyId: 84, currencyName: "Lebanese Pound", isoName: "LBP" },
        { currencyId: 85, currencyName: "Sri Lanka Rupee", isoName: "LKR" },
        { currencyId: 86, currencyName: "Liberian Dollar", isoName: "LRD" },
        { currencyId: 87, currencyName: "Lesotho Loti", isoName: "LSL" },
        { currencyId: 88, currencyName: "Libyan Dinar", isoName: "LYD" },
        { currencyId: 89, currencyName: "Moroccan Dirham", isoName: "MAD" },
        { currencyId: 90, currencyName: "Leu", isoName: "MDL" },
        { currencyId: 91, currencyName: "Malagasy Ariary", isoName: "MGA" },
        { currencyId: 92, currencyName: "Denar", isoName: "MKD" },
        { currencyId: 93, currencyName: "Kyat", isoName: "MMK" },
        { currencyId: 94, currencyName: "Tugrik", isoName: "MNT" },
        { currencyId: 95, currencyName: "Macanese Pataca", isoName: "MOP" },
        { currencyId: 96, currencyName: "Ouguiya", isoName: "MRO" },
        { currencyId: 97, currencyName: "Mauritian Rupee", isoName: "MUR" },
        { currencyId: 98, currencyName: "Maldivian Rufiyaa", isoName: "MVR" },
        { currencyId: 99, currencyName: "Kwacha", isoName: "MWK" },
        { currencyId: 100, currencyName: "Mexican Peso", isoName: "MXN" },
        { currencyId: 101, currencyName: "Ringgit", isoName: "MYR" },
        { currencyId: 102, currencyName: "Metical", isoName: "MZN" },
        { currencyId: 103, currencyName: "Namibian Dollar", isoName: "NAD" },
        { currencyId: 104, currencyName: "Naira", isoName: "NGN" },
        { currencyId: 105, currencyName: "C贸rdoba Oro", isoName: "NIO" },
        { currencyId: 106, currencyName: "Norwegian Krone", isoName: "NOK" },
        { currencyId: 107, currencyName: "Nepalese Rupee", isoName: "NPR" },
        { currencyId: 108, currencyName: "New Zealand Dollar", isoName: "NZD" },
        { currencyId: 109, currencyName: "Omani Rial", isoName: "OMR" },
        { currencyId: 110, currencyName: "Panamanian Balboa", isoName: "PAB" },
        { currencyId: 111, currencyName: "Nuevo Sol", isoName: "PEN" },
        { currencyId: 112, currencyName: "Kina", isoName: "PGK" },
        { currencyId: 113, currencyName: "Philippine Peso", isoName: "PHP" },
        { currencyId: 114, currencyName: "Pakistanian Rupee", isoName: "PKR" },
        { currencyId: 115, currencyName: "Zloty", isoName: "PLN" },
        { currencyId: 116, currencyName: "Guaran铆", isoName: "PYG" },
        { currencyId: 117, currencyName: "Qatari Rial", isoName: "QAR" },
        { currencyId: 118, currencyName: "Leu", isoName: "RON" },
        { currencyId: 119, currencyName: "Serbian Dinar", isoName: "RSD" },
        { currencyId: 120, currencyName: "Russian Rubel", isoName: "RUB" },
        { currencyId: 121, currencyName: "Rwandan Franc", isoName: "RWF" },
        { currencyId: 122, currencyName: "Saudi Rial", isoName: "SAR" },
        { currencyId: 123, currencyName: "Salomon Dollar", isoName: "SBD" },
        { currencyId: 124, currencyName: "Seychelles Rupee", isoName: "SCR" },
        { currencyId: 125, currencyName: "Sudanese Pound", isoName: "SDG" },
        { currencyId: 126, currencyName: "Swedish Krone", isoName: "SEK" },
        { currencyId: 127, currencyName: "Singapore Dollar", isoName: "SGD" },
        { currencyId: 128, currencyName: "St. Helena Pound", isoName: "SHP" },
        { currencyId: 129, currencyName: "Leone", isoName: "SLL" },
        { currencyId: 130, currencyName: "Somalian Shilling", isoName: "SOS" },
        { currencyId: 131, currencyName: "Surinam Dollar", isoName: "SRD" },
        { currencyId: 132, currencyName: "South Sudanese Pound", isoName: "SSP" },
        { currencyId: 133, currencyName: "Dobra", isoName: "STD" },
        { currencyId: 134, currencyName: "Syrian Pound", isoName: "SYP" },
        { currencyId: 135, currencyName: "Swazi Lilangeni", isoName: "SZL" },
        { currencyId: 136, currencyName: "Thai Baht", isoName: "THB" },
        { currencyId: 137, currencyName: "Somoni", isoName: "TJS" },
        { currencyId: 138, currencyName: "Manat", isoName: "TMT" },
        { currencyId: 139, currencyName: "Tunesian Dinar", isoName: "TND" },
        { currencyId: 140, currencyName: "Pa'anga", isoName: "TOP" },
        { currencyId: 141, currencyName: "Turkish Lira", isoName: "TRY" },
        { currencyId: 142, currencyName: "Trinidad and Tobago Dollar", isoName: "TTD" },
        { currencyId: 143, currencyName: "Tuvaluan Dollar", isoName: "TVD" },
        { currencyId: 144, currencyName: "New Taiwan Dollar", isoName: "TWD" },
        { currencyId: 145, currencyName: "Tansanian Shilling", isoName: "TZS" },
        { currencyId: 146, currencyName: "Hrywnja", isoName: "UAH" },
        { currencyId: 147, currencyName: "Ugandan Schilling", isoName: "UGX" },
        { currencyId: 148, currencyName: "US Dollar", isoName: "USD" },
        { currencyId: 149, currencyName: "Uruguay Peso", isoName: "UYU" },
        { currencyId: 150, currencyName: "Uzbekistan Sum", isoName: "UZS" },
        { currencyId: 151, currencyName: "Bol铆var fuerte", isoName: "VEF" },
        { currencyId: 152, currencyName: "Dong", isoName: "VND" },
        { currencyId: 153, currencyName: "Vatu", isoName: "VUV" },
        { currencyId: 154, currencyName: "Tala", isoName: "WST" },
        { currencyId: 155, currencyName: "Central African Franc", isoName: "XAF" },
        { currencyId: 156, currencyName: "East Caribbean Dollar", isoName: "XCD" },
        { currencyId: 157, currencyName: "West African Franc", isoName: "XOF" },
        { currencyId: 158, currencyName: "Pacific Franc", isoName: "XPF" },
        { currencyId: 159, currencyName: "Jemen Rial", isoName: "YER" },
        { currencyId: 160, currencyName: "South African Rand", isoName: "ZAR" },
        { currencyId: 161, currencyName: "Zambian Kwacha", isoName: "ZMW" },
        { currencyId: 162, currencyName: "Zimbabwe Dollar", isoName: "ZWL" }
    ]
    const [ Countries, setCountries ] = useState(countries)
    const [ searchText, setSearchText ] = useState('')

    const storeCurrencyData = async(key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {

        }
    }

    function listHeaderSearch() {
        const searchFilterFunction = (text) => {
            if (text) {
                const newData = Countries.filter(function (item) {
                    const itemData = item.currencyName ? item.currencyName.toUpperCase() : ''.toUpperCase()
                    const textData = text.toUpperCase()
                    return itemData.indexOf(textData) > -1
                })
              
                setCountries(newData)
                setSearchText(text)
            } else {
                setCountries(countries)
                setSearchText(text)
            }
        }

        return (
            <View style={{ paddingHorizontal: 20, backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                <TextInput
                    style={{ color: '#777' }}
                    onChangeText={(text) => {
                        searchFilterFunction(text)
                    }}
                    placeholder="Click here to Search for Currencies"
                    placeholderTextColor={ "#777" }
                    value={ searchText }
                />
            </View>
        )
    }

    const listRenderedView = ({item}) => {
        return (
            <Card onPress={() =>{
                Vibration.vibrate(50)
                storeCurrencyData('SelectedCurrency', JSON.stringify(item))
                navigation.pop()
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        {/* <Image source={ item.countryIcon } style={{ height: 20, width: 30, resizeMode : 'stretch', marginRight: 15, elevation: 10, borderWidth: 1, borderColor: '#777' }}/> */}
                        <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold' }}>{ item.currencyName }</Text>
                    </View>
                    <Text style={{ fontSize: 15, color: '#777', fontWeight: 'bold' }}>{ item.isoName }</Text>
                </View>
            </Card>
        )
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
                data={Countries}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={listHeaderSearch}
                renderItem={listRenderedView}
                keyExtractor={item => item.currencyId} 
            />
        </>
    )
}

export default SelectCurrency 