// https://www.worlddata.info/currencies/

import React from 'react'
import { FlatList, Text, View, Image, Vibration } from 'react-native'
import Card from '../component/Card'
import HeaderCompStart from '../component/HeaderCompStart'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectCurrency = ({ navigation }) => {
    const countries = [
        { currencyName: "Arabic Dirham", isoName: "AED" },
        { currencyName: "Afghani", isoName: "AFN" },
        { currencyName: "Lek", isoName: "ALL" },
        { currencyName: "Dram", isoName: "AMD" },
        { currencyName: "Netherlands Antillean Guilder", isoName: "ANG" },
        { currencyName: "Kwanza", isoName: "AOA" },
        { currencyName: "Argentina Peso", isoName: "ARS" },
        { currencyName: "Australian Dollar", isoName: "AUD" },
        { currencyName: "Guilder", isoName: "AWG" },
        { currencyName: "Manat", isoName: "AZN" },
        { currencyName: "Convertible Mark", isoName: "BAM" },
        { currencyName: "Barbadian Dollar", isoName: "BBD" },
        { currencyName: "Taka", isoName: "BDT" },
        { currencyName: "Bulgarian Lev", isoName: "BGN" },
        { currencyName: "Bahrain Dinar", isoName: "BHD" },
        { currencyName: "Burundi Franc", isoName: "BIF" },
        { currencyName: "Bermudian Dollar", isoName: "BMD" },
        { currencyName: "Brunei Dollar", isoName: "BND" },
        { currencyName: "Boliviano", isoName: "BOB" },
        { currencyName: "Real", isoName: "BRL" },
        { currencyName: "Bahamian Dollar", isoName: "BSD" },
        { currencyName: "Ngultrum", isoName: "BTN" },
        { currencyName: "Pula", isoName: "BWP" },
        { currencyName: "Belarun Rubel", isoName: "BYR" },
        { currencyName: "Belize Dollar", isoName: "BZD" },
        { currencyName: "Canadian Dollar", isoName: "CAD" },
        { currencyName: "Congolais Franc", isoName: "CDF" },
        { currencyName: "Swiss Franc", isoName: "CHF" },
        { currencyName: "Cook Dollar", isoName: "CKD" },
        { currencyName: "Chilean Peso", isoName: "CLP" },
        { currencyName: "Renminbi Yyan", isoName: "CNY" },
        { currencyName: "Columbian Peso", isoName: "CDP" },
        { currencyName: "Colón", isoName: "CRC" },
        { currencyName: "Cuban Peso", isoName: "CUP" },
        { currencyName: "Cape Verdean Escudo", isoName: "CVE" },
        { currencyName: "Czech Krone", isoName: "CZK" },
        { currencyName: "Djibouti Franc", isoName: "DJF" },
        { currencyName: "Danish Krone", isoName: "DKK" },
        { currencyName: "Dominican Peso", isoName: "DOP" },
        { currencyName: "Algerian Dinar", isoName: "DZD" },
        { currencyName: "Egypt Pound", isoName: "EGP" },
        { currencyName: "Nakfa", isoName: "ERN" },
        { currencyName: "Birr", isoName: "ETB" },
        { currencyName: "Euro", isoName: "EUR" },
        { currencyName: "Fidschi Dollar", isoName: "FJD" },
        { currencyName: "Falklands Pound", isoName: "FKP" },
        { currencyName: "Foroese Krona", isoName: "FOK" },
        { currencyName: "Sterling Pound", isoName: "GBP" },
        { currencyName: "Georgian Lari", isoName: "GEL" },
        { currencyName: "Guensey Pound", isoName: "GGP" },
        { currencyName: "Ghana Cedi", isoName: "GHS" },
        { currencyName: "Gibraltar Pound", isoName: "GIP" },
        { currencyName: "Dalasi", isoName: "GMD" },
        { currencyName: "Guinea Franc", isoName: "GNF" },
        { currencyName: "Quetzal", isoName: "GTQ" },
        { currencyName: "Guyana Dollar", isoName: "GYD" },
        { currencyName: "Hong Kong Dollar", isoName: "HKD" },
        { currencyName: "Lempira", isoName: "HNL" },
        { currencyName: "Kuna", isoName: "HRK" },
        { currencyName: "Gourde", isoName: "HTG" },
        { currencyName: "Hungarian Forint", isoName: "HUF" },
        { currencyName: "Indonesian Rupaih", isoName: "IDR" },
        { currencyName: "Israli Shekel", isoName: "ILS" },
        { currencyName: "Manx Pound", isoName: "IMP" },
        { currencyName: "Indian Rupee", isoName: "INR" },
        { currencyName: "Iraqi Dinar", isoName: "IQD" },
        { currencyName: "Iranian Rial", isoName: "IRR" },
        { currencyName: "Icelandic Krone", isoName: "ISK" },
        { currencyName: "Jersey Sterling Pound", isoName: "JEP" },
        { currencyName: "Jamaica Dollar", isoName: "JMD" },
        { currencyName: "Jordanian Dinar", isoName: "JOD" },
        { currencyName: "Japanese Yen", isoName: "JPY" },
        { currencyName: "Kenian Schilling", isoName: "KES" },
        { currencyName: "Som", isoName: "KGS" },
        { currencyName: "Cambodian Riel", isoName: "KHR" },
        { currencyName: "Kiribati Dollar", isoName: "KID" },
        { currencyName: "Comorian Franc", isoName: "KMF" },
        { currencyName: "North Korean Won", isoName: "KPW" },
        { currencyName: "South Korean Won", isoName: "KPR" },
        { currencyName: "Kuwaiti Dinar", isoName: "KWD" },
        { currencyName: "Cayman Dollar", isoName: "KYD" },
        { currencyName: "Tenge", isoName: "KZT" },
        { currencyName: "Kip", isoName: "LAK" },
        { currencyName: "Lebanese Pound", isoName: "LBP" },
        { currencyName: "Sri Lanka Rupee", isoName: "LKR" },
        { currencyName: "Liberian Dollar", isoName: "LRD" },
        { currencyName: "Lesotho Loti", isoName: "LSL" },
        { currencyName: "Libyan Dinar", isoName: "LYD" },
        { currencyName: "Moroccan Dirham", isoName: "MAD" },
        { currencyName: "Leu", isoName: "MDL" },
        { currencyName: "Malagasy Ariary", isoName: "MGA" },
        { currencyName: "Denar", isoName: "MKD" },
        { currencyName: "Kyat", isoName: "MMK" },
        { currencyName: "Tugrik", isoName: "MNT" },
        { currencyName: "Macanese Pataca", isoName: "MOP" },
        { currencyName: "Ouguiya", isoName: "MRO" },
        { currencyName: "Mauritian Rupee", isoName: "MUR" },
        { currencyName: "Maldivian Rufiyaa", isoName: "MVR" },
        { currencyName: "Kwacha", isoName: "MWK" },
        { currencyName: "Mexican Peso", isoName: "MXN" },
        { currencyName: "Ringgit", isoName: "MYR" },
        { currencyName: "Metical", isoName: "MZN" },
        { currencyName: "Namibian Dollar", isoName: "NAD" },
        { currencyName: "Naira", isoName: "NGN" },
        { currencyName: "C贸rdoba Oro", isoName: "NIO" },
        { currencyName: "Norwegian Krone", isoName: "NOK" },
        { currencyName: "Nepalese Rupee", isoName: "NPR" },
        { currencyName: "New Zealand Dollar", isoName: "NZD" },
        { currencyName: "Omani Rial", isoName: "OMR" },
        { currencyName: "Panamanian Balboa", isoName: "PAB" },
        { currencyName: "Nuevo Sol", isoName: "PEN" },
        { currencyName: "Kina", isoName: "PGK" },
        { currencyName: "Philippine Peso", isoName: "PHP" },
        { currencyName: "Pakistanian Rupee", isoName: "PKR" },
        { currencyName: "Zloty", isoName: "PLN" },
        { currencyName: "Guaran铆", isoName: "PYG" },
        { currencyName: "Qatari Rial", isoName: "QAR" },
        { currencyName: "Leu", isoName: "RON" },
        { currencyName: "Serbian Dinar", isoName: "RSD" },
        { currencyName: "Russian Rubel", isoName: "RUB" },
        { currencyName: "Rwandan Franc", isoName: "RWF" },
        { currencyName: "Saudi Rial", isoName: "SAR" },
        { currencyName: "Salomon Dollar", isoName: "SBD" },
        { currencyName: "Seychelles Rupee", isoName: "SCR" },
        { currencyName: "Sudanese Pound", isoName: "SDG" },
        { currencyName: "Swedish Krone", isoName: "SEK" },
        { currencyName: "Singapore Dollar", isoName: "SGD" },
        { currencyName: "St. Helena Pound", isoName: "SHP" },
        { currencyName: "Leone", isoName: "SLL" },
        { currencyName: "Somalian Shilling", isoName: "SOS" },
        { currencyName: "Surinam Dollar", isoName: "SRD" },
        { currencyName: "South Sudanese Pound", isoName: "SSP" },
        { currencyName: "Dobra", isoName: "STD" },
        { currencyName: "Syrian Pound", isoName: "SYP" },
        { currencyName: "Swazi Lilangeni", isoName: "SZL" },
        { currencyName: "Thai Baht", isoName: "THB" },
        { currencyName: "Somoni", isoName: "TJS" },
        { currencyName: "Manat", isoName: "TMT" },
        { currencyName: "Tunesian Dinar", isoName: "TND" },
        { currencyName: "Pa'anga", isoName: "TOP" },
        { currencyName: "Turkish Lira", isoName: "TRY" },
        { currencyName: "Trinidad and Tobago Dollar", isoName: "TTD" },
        { currencyName: "Tuvaluan Dollar", isoName: "TVD" },
        { currencyName: "New Taiwan Dollar", isoName: "TWD" },
        { currencyName: "Tansanian Shilling", isoName: "TZS" },
        { currencyName: "Hrywnja", isoName: "UAH" },
        { currencyName: "Ugandan Schilling", isoName: "UGX" },
        { currencyName: "US Dollar", isoName: "USD" },
        { currencyName: "Uruguay Peso", isoName: "UYU" },
        { currencyName: "Uzbekistan Sum", isoName: "UZS" },
        { currencyName: "Bol铆var fuerte", isoName: "VEF" },
        { currencyName: "Dong", isoName: "VND" },
        { currencyName: "Vatu", isoName: "VUV" },
        { currencyName: "Tala", isoName: "WST" },
        { currencyName: "Central African Franc", isoName: "XAF" },
        { currencyName: "East Caribbean Dollar", isoName: "XCD" },
        { currencyName: "West African Franc", isoName: "XOF" },
        { currencyName: "Pacific Franc", isoName: "XPF" },
        { currencyName: "Jemen Rial", isoName: "YER" },
        { currencyName: "South African Rand", isoName: "ZAR" },
        { currencyName: "Zambian Kwacha", isoName: "ZMW" },
        { currencyName: "Zimbabwe Dollar", isoName: "ZWL" }
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
                                {/* <Image source={ item.countryIcon } style={{ height: 20, width: 30, resizeMode : 'stretch', marginRight: 15, elevation: 10, borderWidth: 1, borderColor: '#777' }}/> */}
                                <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold' }}>{ item.currencyName }</Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#777', fontWeight: 'bold' }}>{ item.isoName }</Text>
                        </View>
                    </Card>
                }
                keyExtractor={item => item.countryId} 
            />
        </>
    )
}

export default SelectCurrency 