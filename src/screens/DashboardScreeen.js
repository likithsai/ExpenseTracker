import React from 'react'
import { View, Text, Vibration, ScrollView, processColor } from 'react-native'
import HeaderWithIcons from '../component/HeaderWithIcons'
import {BarChart, PieChart} from 'react-native-charts-wrapper'
import Card from '../component/Card'

const DashboardScreen = ({ navigation }) => {
    return (
        <>
            <HeaderWithIcons
                headerTitle="Expense Tracker"
                onRightIconPressed = {() => {
                    Vibration.vibrate(50)
                    navigation.navigate('Settings')
                }}
            />
            <ScrollView>
                <Card style={{ elevation: 5, borderBottomWidth: 0.7, borderBottomColor: '#ccc', height: 300, paddingVertical: 20, marginBottom: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Annual Expense</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#999' }}>Representation of annual expenses in bar chart</Text>
                    <BarChart
                        style={{ width: '100%', height: '80%' }}
                        data={{
                            dataSets: [{
                                values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}, {y: 99}, {y: 95}, {y: 105}, {y: 99}, {y: 95}],
                                label: '',
                                config: {
                                    color: [ 
                                        processColor('#C0FF8C'), 
                                        processColor('#FFF78C'), 
                                        processColor('#FFD08C'), 
                                        processColor('#11998ecc'), 
                                        processColor('#FF8C9D')
                                    ],
                                    barShadowColor: processColor('lightgrey'),
                                    highlightAlpha: 90,
                                    highlightColor: processColor('#11998ecc'),
                                }
                            }]
                        }}
                        yAxis={{
                            left : {
                                enabled: false
                            },
                            right : {
                                enabled: false
                            },
                            textColor: '#fff'
                        }}
                        xAxis={{
                            position: 'BOTTOM',
                            drawAxisLines: false,
                            drawGridLines: false,
                            valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            granularityEnabled: true,
                            granularity : 1,
                            textColor: '#fff'
                        }}
                        chartDescription={{
                            text: ''
                        }}
                        legend={{
                            enabled: false,
                        }}
                        drawBarShadow={false}
                        drawValueAboveBar={false}
                        drawHighlightArrow={false}
                        onSelect={(event) => {
                            console.log(event.nativeEvent)
                        }}
                        onChange={(event) => console.log(event.nativeEvent)}
                    />
                </Card>
                <Card style={{ elevation: 5, height: 300, paddingVertical: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Expense By Category</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#999' }}>Representation of overall category expense</Text>
                    <PieChart
                        style={{ width: '100%', height: '100%', padding: 20 }}
                        data={{
                            dataSets: [{
                                values: [
                                    {value: 45, label: 'Sandwiches'},
                                    {value: 21, label: 'Salads'},
                                ],
                                config: {
                                    colors: [
                                        processColor('#C0FF8C'), 
                                        processColor('#FFF78C'), 
                                        processColor('#FFD08C'), 
                                        processColor('#8CEAFF'), 
                                        processColor('#FF8C9D')
                                    ],
                                    valueTextSize: 15,
                                    sliceSpace: 5,
                                    selectionShift: 13,
                                    valueFormatter: "#.#'%'",
                                    valueLinePart1Length: 0.5
                                }
                            }],
                        }}
                        chartDescription={{
                            text: ''
                        }}
                        extraOffsets={{left: 20, top: 20, right: 20, bottom: 20}}
                        entryLabelColor={processColor('#11998e')}
                        entryLabelTextSize={20}
                        drawEntryLabels={true}
                        rotationEnabled={true}
                        usePercentValues={true}
                        holeRadius={0}
                        maxAngle={360}
                        onChange={(event) => console.log(event.nativeEvent)}
                    />
                </Card>
            </ScrollView>
        </>
    )
}

export default DashboardScreen