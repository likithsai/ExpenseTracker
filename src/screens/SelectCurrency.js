// https://www.worlddata.info/currencies/

import React from 'react'
import { FlatList, Text, View, Image, Vibration } from 'react-native'
import Card from '../component/Card'
import HeaderCompStart from '../component/HeaderCompStart'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectCurrency = ({ navigation }) => {
    const countries = [
        { currencyName: 'Arabic Dirham', isoName: 'AED' },
        { currencyName: 'Afghani', isoName: 'AFN' },
        { currencyName: 'Lek', isoName: 'ALL' },
        { currencyName: 'Dram', isoName: 'AMD' },
        { currencyName: 'Netherlands Antillean Guilder', isoName: 'ANG' },
        { currencyName: 'Kwanza', isoName: 'AOA' },
        { currencyName: 'Argentina Peso', isoName: 'ARS' },
        { currencyName: 'Australian Dollar', isoName: 'AUD' },
        { currencyName: 'Guilder', isoName: 'AWG' },
        { currencyName: 'Manat', isoName: 'AZN' },
        { currencyName: 'Convertible Mark', isoName: 'BAM' },
        { currencyName: 'Barbadian Dollar', isoName: 'BBD' },
        { currencyName: 'Taka', isoName: 'BDT' },
        { currencyName: 'Bulgarian Lev', isoName: 'BGN' },
        { currencyName: 'Bahrain Dinar', isoName: 'BHD' },
        { currencyName: 'Burundi Franc', isoName: 'BIF' },
        { currencyName: 'Bermudian Dollar', isoName: 'BMD' },
        { currencyName: 'Brunei Dollar', isoName: 'BND' },
        { currencyName: 'Boliviano', isoName: 'BOB' },
        { currencyName: 'Real', isoName: 'BRL' },
        { currencyName: 'Bahamian Dollar', isoName: 'BSD' },
        { currencyName: 'Ngultrum', isoName: 'BTN' },
        { currencyName: 'Pula', isoName: 'BWP' },
        { currencyName: 'Belarun Rubel', isoName: 'BYR' },
        { currencyName: 'Belize Dollar', isoName: 'BZD' },
        { currencyName: 'Canadian Dollar', isoName: 'CAD' },
        { currencyName: 'Congolais Franc', isoName: 'CDF' },
        { currencyName: 'Swiss Franc', isoName: 'CHF' },
        { currencyName: 'Cook Dollar', isoName: 'CKD' },
        { currencyName: 'Chilean Peso', isoName: 'CLP' },
        { currencyName: 'Renminbi Yyan', isoName: 'CNY' },
        { currencyName: 'Columbian Peso', isoName: 'CDP' },
        { currencyName: 'Colón', isoName: 'CRC' },
        { currencyName: 'Cuban Peso', isoName: 'CUP' },
        { currencyName: 'Cape Verdean Escudo', isoName: 'CVE' },
        { currencyName: 'Czech Krone', isoName: 'CZK' },
        { currencyName: 'Djibouti Franc', isoName: 'DJF' },
        { currencyName: 'Danish Krone', isoName: 'DKK' },
        { currencyName: 'Dominican Peso', isoName: 'DOP' },
        { currencyName: 'Algerian Dinar', isoName: 'DZD' },
        { currencyName: 'Egypt Pound', isoName: 'EGP' },
        { currencyName: 'Nakfa', isoName: 'ERN' },
        { currencyName: 'Birr', isoName: 'ETB' },
        { currencyName: 'Euro', isoName: 'EUR' },
        { currencyName: 'Fidschi Dollar', isoName: 'FJD' },
        { currencyName: 'Falklands Pound', isoName: 'FKP' },
        { currencyName: 'Foroese Krona', isoName: 'FOK' },
        { currencyName: 'Sterling Pound', isoName: 'GBP' },
        { currencyName: 'Georgian Lari', isoName: 'GEL' },
        { currencyName: 'Guensey Pound', isoName: 'GGP' },
        { currencyName: 'Ghana Cedi', isoName: 'GHS' },
        { currencyName: 'Gibraltar Pound', isoName: 'GIP' },
        { currencyName: 'Dalasi', isoName: 'GMD' },
        { currencyName: 'Guinea Franc', isoName: 'GNF' },
        { currencyName: 'Quetzal', isoName: 'GTQ' },
        { currencyName: 'Guyana Dollar', isoName: 'GYD' },
        { currencyName: 'Hong Kong Dollar', isoName: 'HKD' },
        { currencyName: 'Lempira', isoName: 'HNL' },
        { currencyName: 'Kuna', isoName: 'HRK' },
        { currencyName: 'Gourde', isoName: 'HTG' },
        { currencyName: 'Hungarian Forint', isoName: 'HUF' },
        { currencyName: 'Indonesian Rupaih', isoName: 'IDR' },
        { currencyName: 'Israli Shekel', isoName: 'ILS' },
        { currencyName: 'Manx Pound', isoName: 'IMP' },
        { currencyName: 'Indian Rupee', isoName: 'INR' },
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