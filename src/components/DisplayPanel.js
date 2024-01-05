import React, { useState, useEffect, useMemo, useCallback } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { Text, View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
const { width, height } = Dimensions.get('window');
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';

const fetchFirebaseData = (sensor, setSensorData) => {
    database()
        .ref('/username/bryankeane/sensors/' + sensor)
        .once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                const pushKey = Object.keys(data)[0];
                const lastAddedData = data[pushKey];
                setSensorData(lastAddedData);
            }
        })
        .catch((error) => {
            console.error('Error fetching ' + sensor + ' data from Firebase: ', error);
        });
};

export const Monitoring = () => {

    const [phSensor, setPhSensor] = useState(null);
    const [turbiditySensor, setTurbiditySensor] = useState(null);
    const [volumeSensor, setVolumeSensor] = useState(null);
    const [phTextColor, setPhTextColor] = useState('black');
    const [turbidityTextColor, setTurbidityTextColor] = useState('black');
    const [volumeTextColor, setVolumeTextColor] = useState('black');

    useEffect(() => {
        fetchFirebaseData('ph', setPhSensor);
        fetchFirebaseData('turbidity', setTurbiditySensor);
        fetchFirebaseData('volume', setVolumeSensor);

        const intervalId = setInterval(() => {
            fetchFirebaseData('ph', setPhSensor);
            fetchFirebaseData('turbidity', setTurbiditySensor);
            fetchFirebaseData('volume', setVolumeSensor);
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        if (phSensor != null) {
            setPhSensor(phSensor);
            if (phSensor >= 11 || phSensor <= 3) {
                setPhTextColor('red');
            } else if (phSensor >= 8 || phSensor <= 6) {
                setPhTextColor('yellow');
            } else {
                setPhTextColor('green');
            }
        }
        if (turbiditySensor != null) {
            setTurbiditySensor(turbiditySensor);
            if (turbiditySensor >= 0 && turbiditySensor <= 25) {
                setTurbidityTextColor('red');
            } else if (turbiditySensor >= 25 || turbiditySensor <= 75) {
                setTurbidityTextColor('yellow');
            } else {
                setTurbidityTextColor('green');
            }
        }
        if (volumeSensor != null) {
            setVolumeSensor(volumeSensor);
            if (volumeSensor >= 0 && volumeSensor <= 25) {
                setVolumeTextColor('red');
            } else if (volumeSensor >= 25 && volumeSensor <= 75) {
                setVolumeTextColor('yellow');
            } else {
                setVolumeTextColor('green');
            }
        }

    }, [phSensor, turbiditySensor, volumeSensor]);

    return (
        <View style={styles.innerContainer}>
            <Text style={[styles.displayTitle, { paddingBottom: 50 }]}>Monitoring</Text>
            {/* <Row>
                <Col numRows={2}><Text>10*</Text></Col>
                <Col numRows={1}><FontAwesome5 name="temperature-high" size={30} /></Col>
                <Col numRows={2}><Text>Temperature</Text></Col>
            </Row> */}
            <Row>
                <View style={[styles.column, { flex: 2, alignItems: 'flex-end' }]}>
                    <Text style={[styles.monitorText, { color: phTextColor }]}>{phSensor} PH</Text>
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
                    <Text style={[styles.monitorText, { color: turbidityTextColor }]}>{turbiditySensor} NTU</Text>
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
                    <Text style={[styles.monitorText, { color: volumeTextColor }]}>{volumeSensor} %</Text>
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

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync: {}
});

export const Timer = () => {
    const [date, setDate] = useState(new Date());
    const [connected, setConnected] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showError, setShowError] = useState(false);
    const [client, setClient] = useState(null);

    function onConnect() {
        console.log("onConnect");
        setConnected(true);
        setShowError(false);
        // displayErrorMsg("MQTT connection lost. Please check your network and reconnect.");
    }

    function onFailed() {
        console.log("onFailedConnection");
        displayErrorMsg("Failed in connecting to the MQTT broker");
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
            setConnected(false)
            displayErrorMsg("MQTT broker connection lost. Please check your network and reconnect");
        }
    }

    useEffect(() => {
        const newClient = new Paho.MQTT.Client('c92518f55f1a470a9811ddd925721d5a.s1.eu.hivemq.cloud',
            8884,
            "clientID-" + parseInt(Math.random() * 100));
        newClient.connect({
            onSuccess: onConnect,
            onFailure: onFailed,
            useSSL: true,
            reconnect: true,
            userName: "bryankeane",
            password: "Password123",
        });

        newClient.onConnectionLost = onConnectionLost;

        setClient(newClient);
    }, []);

    const sendESPCommand = () => {
        if (connected) {
                const message = new Paho.MQTT.Message('Rotate Motor');
                message.destinationName = 'reactnative/aquaconnect';
                client.send(message);
        } else
            noESPConnection('You are not connected to the your device');
    };

    const noESPConnection = (msg) => {
        Alert.alert(msg, '', [
            {
                text: 'OK'
            },
        ])
    };

    const displayErrorMsg = (msg) => {
        setErrorMsg(msg);
        setShowError(true);
    }

    return (
        <View style={styles.innerContainer}>
            <Text style={styles.displayTitle}>Feed Timer</Text>
            <Button
                title="FEED NOW!"
                onPress={sendESPCommand}
                color='#1c4ae0'
            />
            <DatePicker date={date} onDateChange={setDate} mode="time" />
            <View>
                <Text>Last Feed: {format(date, 'HH:mma - MM/dd/yyyy')}</Text>
                {showError && (
                    <Text style={{ color: 'red' }}>
                        {errorMsg}
                    </Text>
                )}
            </View>
        </View>
    )
};

const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
);

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
    monitorText: {
        fontSize: 18,
        color: 'black'
    }
});