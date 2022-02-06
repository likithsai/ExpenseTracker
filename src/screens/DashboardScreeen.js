import React, { useState, useEffect } from 'react'
import { Text, Vibration, ScrollView, processColor, RefreshControl, TouchableOpacity, View } from 'react-native'
import HeaderWithIcons from '../component/HeaderWithIcons'
import { BarChart, PieChart } from 'react-native-charts-wrapper'
import Card from '../component/Card'
import Icon from 'react-native-ionicons'
import { openDatabase } from 'react-native-sqlite-storage'

var db = openDatabase({ name: 'data.db' }, () => {}, (err) => {
    console.log('SQL Error : ' + err.message)
})

const DashboardScreen = ({ navigation }) => {
    const [ refreshing, setRefreshing ] = useState()
    const [ categoryPieChartData, setCategoryPieChartData ] = useState([])

    const loadCategoryItem = () => {
        let temp = []
    
        db.transaction(tx => {
            tx.executeSql("SELECT c.category_name Category, SUM(e.expense_amt) Amount FROM tbl_category c INNER JOIN tbl_expense e ON e.expense_category = c.category_id GROUP BY c.category_id", [], (tx, results) => {
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push({ value: results.rows.item(i).Amount, label: results.rows.item(i).Category })
                }
                setCategoryPieChartData(temp)
            })
        })
    }

    useEffect(() => {
        loadCategoryItem()
    })
    
    return (
        <>
            <HeaderWithIcons
                style={{ elevation: 10, borderBottomWidth: 0 }}
                headerTitle="Expense Tracker"
                onRightIconPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.navigate('Settings')
                }}
            />
            <ScrollView
                // refreshControl={
                //     <RefreshControl
                //       refreshing={refreshing}
                //       onRefresh={() => {
                //           setRefreshing(true)
                //           setInterval(() => {
                //               setRefreshing(false)
                //           }, 3000)
                //       }}
                //       tintColor="#fff" 
                //       titleColor="#fff" 
                //       colors={["#11998e"]}
                //     />
                // }
            >
                <Card style={{ elevation: 5, borderBottomWidth: 0.7, borderBottomColor: '#ccc', height: 400, paddingVertical: 20, marginBottom: 1, flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Annual Expense</Text>
                    <Text style={{ fontSize: 15, color: '#555' }}>Representation of expenses anually</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginVertical: 20 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View>
                                    <Text style={{ color: '#555', fontSize: 15 }}>Income</Text>
                                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 25 }}>200</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderWidth: 1, height: 50, borderColor: '#ccc', marginHorizontal: 20 }} />
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View>
                                    <Text style={{ color: '#555', fontSize: 15 }}>Expense</Text>
                                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 25 }}>200</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#11998e', borderRadius: 40, maxHeight: 50, paddingVertical: 10, paddingHorizontal: 20 }} onPress={() => {
                                navigation.navigate('AddExpenses', {})
                            }}>
                                <Icon name="wallet" color="#fff" size={20} style={{ marginRight: 10 }}/>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>ADD EXPENSE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <BarChart
                        extraOffsets={{
                            bottom: 20
                        }}
                        style={{ width: '100%', height: '60%' }}
                        data={{
                            dataSets: [{
                                values: [
                                    { y: [ 10, 20 ] }, 
                                    { y: [ 105, 30 ] }, 
                                    { y: [ 102, 26 ] },
                                    { y: [ 110, 10 ] }, 
                                    { y: [ 114, 20 ] }, 
                                    { y: [ 109, 30 ] }, 
                                    { y: [ 105, 45 ] }, 
                                    { y: [ 99, 32 ] }, 
                                    { y: [ 95, 12 ] }, 
                                    { y: [ 105, 2 ] }, 
                                    { y: [ 99, 22 ] }, 
                                    { y: [ 95, 20 ] }
                                ],
                                label: '',
                                config: {
                                    colors: [
                                        processColor('#11998e'), 
                                        processColor('#11998ecc')
                                    ],
                                    barShadowColor: processColor('lightgrey'),
                                    highlightAlpha: 90,
                                    highlightColor: processColor('#ffff00'),
                                    stackLabels: ['Income', 'Expense']
                                }
                            }]
                        }}
                        yAxis={{
                            left : {
                                spaceBottom: 0.0,
                                enabled: false,
                                zeroLine: {
                                    enabled: true
                                }
                            },
                            right : {
                                enabled: false,
                                zeroLine: {
                                    enabled: true
                                }
                            }
                        }}
                        xAxis={{
                            position: 'BOTTOM',
                            drawAxisLines: false,
                            drawGridLines: false,
                            valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            granularityEnabled: true,
                            granularity : 1,
                            textColor: '#fff',
                            axisLineColor: '#fff',
                            axisLineWidth: 0
                        }}
                        chartDescription={{
                            text: ''
                        }}
                        animation={{
                            durationY: 1000,
                            easingX: 'EaseInExpo'
                        }}
                        legend={{
                            enabled: true,
                            fontWeight: 'bold',
                            textSize: 12,
                            xEntrySpace: 10,
                            yEntrySpace: 5,
                            form: 'SQUARE',
                            maxSizePercent: 0.5,
                            wordWrapEnabled: true,
                            horizontalAlignment: 'CENTER',
                            formToTextSpace: 12
                        }}
                        drawAxisLines={false}
                        drawBarShadow={false}
                        drawValueAboveBar={false}
                        drawHighlightArrow={false}
                        onSelect={(event) => {
                            console.log(event.nativeEvent)
                        }}
                        onChange={(event) => console.log(event.nativeEvent)}
                    />
                </Card>
                <Card style={{ elevation: 5, height: 400, flex: 1, borderBottomWidth: 0.7, borderBottomColor: '#ccc' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Category Expenses</Text>
                    <Text style={{ fontSize: 15, color: '#555' }}>Representation of overall category expense</Text>    
                    <PieChart
                        style={{ width: '100%', height: '80%', marginVertical: 20 }}
                        data={{
                            dataSets: [{
                                values: categoryPieChartData,
                                config: {
                                    colors: [
                                        processColor('#11998eff'), 
                                        processColor('#11998ecc'), 
                                        processColor('#11998e99'), 
                                        processColor('#11998e66'), 
                                        processColor('#11998e33')
                                    ],
                                    valueTextSize: 15,
                                    valueTextColor: '#fff',
                                    valueFormatter: "#.#'%'"
                                }
                            }],
                        }}
                        chartDescription={{
                            text: ''
                        }}
                        extraOffsets={{ left: 20, top: 20, right: 20, bottom: 20 }}
                        entryLabelColor={processColor('#fffs')}
                        entryLabelTextSize={20}
                        drawEntryLabels={false}
                        rotationEnabled={false}
                        usePercentValues={true}
                        holeRadius={55}
                        maxAngle={360}
                        animation={{
                            durationY: 1000,
                            easingX: 'EaseInExpo'
                        }}
                        legend={{
                            enabled: true,
                            textSize: 15,
                            form: 'SQUARE',
                            horizontalAlignment: "CENTER",
                            verticalAlignment: "BOTTOM",
                            wordWrapEnabled: true,
                            fontWeight: 'bold',
                            textSize: 12,
                            // maxSizePercent: 0.5,
                            formToTextSpace: 10
                        }}
                        onChange={(event) => console.log(event.nativeEvent)}
                        styledCenterText={{
                            text: 'Categories:\n' + categoryPieChartData.length, 
                            color: processColor('#000'),
                            size: 15
                        }}
                    />
                </Card>
            </ScrollView>
        </>
    )
}

export default DashboardScreen