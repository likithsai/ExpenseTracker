// SELECT 
// 	CASE strftime('%m', expense_date) 
// 		when '01' then 'January' 
// 		when '02' then 'Febuary' 
// 		when '03' then 'March'
// 		when '04' then 'April'
// 		when '05' then 'May' 
// 		when '06' then 'June' 
// 		when '07' then 'July' 
// 		when '08' then 'August' 
// 		when '09' then 'September' 
// 		when '10' then 'October' 
// 		when '11' then 'November' 
// 		when '12' then 'December' 
// 		else '' 
// end as 'Month' ,
// TOTAL(CASE WHEN LOWER(expense_type) = 'income' THEN expense_amt END) as 'Income',
// TOTAL(CASE WHEN LOWER(expense_type) = 'expense' THEN expense_amt END) as 'Expense'
// FROM tbl_expense
// WHERE strftime('%Y', expense_date) = '2022'
// GROUP BY strftime('%m', expense_date)

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
    const [ currentYear, setCurrentYear ] = useState(new Date().getFullYear())
    const [ annualIncome, setAnnualIncome ] = useState(0)
    const [ annualExpense, setAnnualExpense ] = useState(0)
    const [ annualBarChart, setAnnualBarChart ] = useState([])
    const [ categoryPieChartData, setCategoryPieChartData ] = useState([])
    const [ ChartMonth, setChartMonth ] = useState([])
    const [ refreshing, setRefreshing ] = useState(false)

    const loadAnnualData = (currentYear) => {
        let temp = [], MonthLabels = [], income = 0, expense = 0
    
        db.transaction(tx => {
            //     SELECT 
            //     c.month_name as "Month",
            //     TOTAL(CASE WHEN LOWER(expense_type) = 'income' THEN expense_amt END) as 'Income',
            //     TOTAL(CASE WHEN LOWER(expense_type) = 'expense' THEN expense_amt END) as 'Expense'
            //     FROM cte c LEFT JOIN tbl_expense e
            //     ON strftime('%m', e.expense_date) = c.month
            //     AND strftime('%Y', e.expense_date) = '${currentYear}'
            //     GROUP BY c.month_name
            //     ORDER BY c.month
            tx.executeSql(`
                SELECT 
                    CASE strftime('%m', expense_date) 
                        when '01' then 'January' 
                        when '02' then 'Febuary' 
                        when '03' then 'March'
                        when '04' then 'April'
                        when '05' then 'May' 
                        when '06' then 'June' 
                        when '07' then 'July' 
                        when '08' then 'August' 
                        when '09' then 'September' 
                        when '10' then 'October' 
                        when '11' then 'November' 
                        when '12' then 'December' 
                        else '' 
                end as 'Month' ,
                TOTAL(CASE WHEN LOWER(expense_type) = 'income' THEN expense_amt END) as 'Income',
                TOTAL(CASE WHEN LOWER(expense_type) = 'expense' THEN expense_amt END) as 'Expense'
                FROM tbl_expense
                WHERE strftime('%Y', expense_date) = '${currentYear}'
                GROUP BY strftime('%m', expense_date)
            `, [], (tx, results) => {
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push({ y: [ results.rows.item(i).Income, results.rows.item(i).Expense ] })
                    income = income + results.rows.item(i).Income
                    expense = expense + results.rows.item(i).Expense
                    MonthLabels.push(results.rows.item(i).Month)
                    setAnnualIncome(income)
                    setAnnualExpense(expense)
                }
                setAnnualBarChart(temp)
                setChartMonth(MonthLabels)
                // console.log(JSON.stringify(MonthLabels))
            })
        })
    }

    const loadCategoryItem = (currentYear) => {
        let temp = []
    
        db.transaction(tx => {
            tx.executeSql(`
                SELECT c.category_name Category, SUM(e.expense_amt) Amount 
                FROM tbl_category c 
                INNER JOIN tbl_expense e 
                ON e.expense_category = c.category_id 
                AND strftime('%Y', e.expense_date) = '${currentYear}' 
                GROUP BY c.category_id
            `, [], (tx, results) => {
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push({ value: results.rows.item(i).Amount, label: results.rows.item(i).Category })
                }
                setCategoryPieChartData(temp)
            })
        })
    }

    useEffect(() => {
        console.log('called')
        loadAnnualData(currentYear)
        loadCategoryItem(currentYear)
    }, [refreshing, currentYear])
    
    return (
        <>
            <HeaderWithIcons
                headerTitle="Expense Tracker"
                onRightIconPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.navigate('Settings')
                }}
            />
            <Card style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#11998e', elevation: 10, paddingVertical: 15, borderWidth: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="calendar" color="#fff" size={20} style={{ marginRight: 10 }} />
                    <Text style={{ color: '#fff', fontSize: 18 }}>Year</Text>
                </View>
                <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {
                        setCurrentYear(currentYear - 1)
                    }}>
                        <Icon name="arrow-dropleft" color="#fff" size={30} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 18 }}>{ currentYear }</Text>
                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => {
                        setCurrentYear(currentYear + 1)
                    }}>
                        <Icon name="arrow-dropright" color="#fff" size={30}/>
                    </TouchableOpacity>
                </View>
            </Card>
            <ScrollView
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => {
                          setRefreshing(true)
                          setRefreshing(false)
                      }}
                      tintColor="#fff" 
                      titleColor="#fff" 
                      colors={["#11998e"]}
                    />
                }
            >
                <Card style={{ elevation: 5, borderBottomWidth: 0.7, borderBottomColor: '#ccc', height: 400, paddingVertical: 20, marginBottom: 1, flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Annual Expense</Text>
                    <Text style={{ fontSize: 15, color: '#555' }}>Representation of expenses anually</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginVertical: 20 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View>
                                    <Text style={{ color: '#555', fontSize: 15 }}>Income</Text>
                                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 25 }}>{ annualIncome}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderWidth: 1, height: 50, borderColor: '#ccc', marginHorizontal: 20 }} />
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View>
                                    <Text style={{ color: '#555', fontSize: 15 }}>Expense</Text>
                                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 25 }}>{ annualExpense }</Text>
                                </View>
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
                                values: annualBarChart,
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
                            valueFormatter: ChartMonth,
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