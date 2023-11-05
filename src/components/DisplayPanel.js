import React, { useState, useRef, useMemo, useCallback } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { Text, View, ScrollView, StyleSheet, Button, Dimensions, Alert } from 'react-native';
const { width, height } = Dimensions.get('window');
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';

export const Monitoring = () => {
    const ReadData = ({ children, type, value }) => {
        const [date, setDate] = useState('black');
        var textColor;
        switch (type) {
            case 'ph':
                if (value >= 11 || value <= 3) {
                    textColor = 'red';
                } else if (value >= 8 || value <= 6) {
                    textColor = 'yellow';
                } else {
                    textColor = 'green';
                }
                break;
            case 'turbidity':
                if (value >= 100 || value <= 0) {
                    textColor = 'red';
                } else if (value >= 75 || value <= 25) {
                    textColor = 'yellow';
                } else {
                    textColor = 'green';
                }
                break;
            case 'volume':
                if (value >= 100 || value <= 0) {
                    textColor = 'red';
                } else if (value >= 75 || value <= 25) {
                    textColor = 'yellow';
                } else {
                    textColor = 'green';
                }
                break;
        }

        return (
            <Text style={[styles.monitorText, { color: textColor}]}>{value} {children}</Text>
        );
    }

    return (
        <View style={styles.innerContainer}>
            <Text style={[styles.displayTitle, {paddingBottom: 50 }]}>Monitoring</Text>
            {/* <Row>
                <Col numRows={2}><Text>10*</Text></Col>
                <Col numRows={1}><FontAwesome5 name="temperature-high" size={30} /></Col>
                <Col numRows={2}><Text>Temperature</Text></Col>
            </Row> */}
            <Row>
                <View style={[styles.column, { flex: 2, alignItems: 'flex-end' }]}>
                    <ReadData type='ph' value={7}>PH</ReadData>
                </View>
                <View style={[styles.column, { flex: 1, alignItems: 'center' }]}>
                    <FontAwesome5 name="water" size={30} />
                </View>
                <View style={[styles.column, { flex: 2, alignItems: 'flex-start' }]}>
                    <Text style={styles.monitorText}>Ph Level</Text>
                </View>
            </Row>
            <Row>
                <View style={[styles.column, { flex: 2, alignItems: 'flex-end' }]}>
                    <ReadData type='turbidity' value={200} >NTU</ReadData>
                    {/* <Text>20 NTU</Text> */}
                </View>
                <View style={[styles.column, { flex: 1, alignItems: 'center' }]}>
                    <Ionicon name="water-outline" size={30} />
                </View>
                <View style={[styles.column, { flex: 2, alignItems: 'flex-start' }]}>
                    <Text style={styles.monitorText}>Turbidity</Text>
                </View>
            </Row>
            <Row>
                <View style={[styles.column, { flex: 2, alignItems: 'flex-end' }]}>
                    <ReadData type='turbidity' value={80}>%</ReadData>
                    {/* <Text>50%</Text> */}
                </View>
                <View style={[styles.column, { flex: 1, alignItems: 'center' }]}>
                    <Ionicon name="beaker" size={30} />
                </View>
                <View style={[styles.column, { flex: 2, alignItems: 'flex-start' }]}>
                    <Text style={styles.monitorText}>Food Volume</Text>
                </View>
            </Row>
        </View>
    )
};

export const Timer = () => {
    const [date, setDate] = useState(new Date());
    return (
        <View style={styles.innerContainer}>
            <Text style={styles.displayTitle}>Feed Timer</Text>
            <Button
                title="FEED NOW!"
                onPress={feedNowAlert}
                color='#1c4ae0'
            />
            <DatePicker date={date} onDateChange={setDate} mode="time" />
            <Text>Last Feed: {format(date, 'HH:mma - MM/dd/yyyy')}</Text>
        </View>
    )
};

const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
);

const feedNowAlert = () =>
    Alert.alert('Are you sure you want to feed the fish', '', [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        { text: 'CONFIRM', onPress: () => console.log('OK Pressed') },
    ]);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c4c4c48f',
        height: height * 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: 200,
        borderTopStartRadius: 200,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        rowGap: 40,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        justifyContent: 'center',
    },
    displayTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 50
    },
    sheetContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    monitorText:{
        fontSize: 18,
        color: 'black'
    }
});