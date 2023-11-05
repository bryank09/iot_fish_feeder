import React, { useState, useEffect, Component } from 'react'
import { Text, View, FlatList, SectionList, Alert, Switch, TextInput, Modal, Pressable, StyleSheet, Button } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNSpeedometer from 'react-native-speedometer';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
// import { MQTT } from '../actions/mqtt.js';

const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
);

export const Charts = () => {
    state = {
        value: 50,
    };

    onChange = (value) => this.setState({ value: parseInt(value) });
    const labels = [
        {
            name: 'Low Risk',
            labelColor: '#ff2900',
            activeBarColor: '#ff2900',
        },
        {
            name: 'Medium Risk',
            labelColor: '#f4ab44',
            activeBarColor: '#f4ab44',
        },
        {
            name: 'High Risk',
            labelColor: '#00ff6b',
            activeBarColor: '#00ff6b',
        },
    ];
    const size = 200;
    return (
        <View style={{ flex: 1, flexDirection: 'column', rowGap: 40 }}>
            <Row>
                <View style={[styles.col, { flex: 1 }]}>
                    <Text style={styles.chartTitle}>Food Volume Measurement</Text>
                    <CircularProgress
                        value={50}
                        activeStrokeColor={'#000046'}
                        activeStrokeSecondaryColor={'#1CB5E0'}
                        radius={80}
                        activeStrokeWidth={20}
                        inActiveStrokeWidth={20}
                        valueSuffix={'%'}
                    />
                </View>
            </Row>
            <Row>
                <View style={[styles.col, { flex: 1, paddingBottom: 50 }]}>
                    <Text style={styles.chartTitle}>Water Turbidity Measurement</Text>
                    <RNSpeedometer
                        value={this.state.value}
                        size={size}
                        labels={labels} />
                </View>
            </Row>
            <Row>
                <View style={[styles.col, { flex: 1 }]}>
                    {/* <TextInput placeholder="Speedometer Value" style={styles.textInput} onChangeText={this.onChange} /> */}
                    <Text style={styles.chartTitle}>Ph Level Measurement</Text>
                    {/* https://github.com/pritishvaidya/react-native-speedometer#defaults */}
                    <RNSpeedometer
                        // value={this.state.value}
                        value={90}
                        size={size}
                        labels={labels} />
                </View>
            </Row>
        </View>
    )
};

export const Alarm = () => {
    const showSection = (section) => {
        // switch (section) {
        //     case 'Alarm':
        //         this.setState({ showAlarm: true });
        //         this.setState({ showHistory: false });
        //         this.setState({ showAutoConfig: false });
        //         break;
        //     case 'History':
        //         this.setState({ showAlarm: false });
        //         this.setState({ showHistory: true });
        //         this.setState({ showAutoConfig: false });
        //         break;
        //     case 'ShwoAutoConfig':
        //         this.setState({ showAlarm: false });
        //         this.setState({ showHistory: false });
        //         this.setState({ showAutoConfig: true });
        //         break;
        // }
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', rowGap: 10, paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', columnGap: 10 }}>
                <Pressable
                    onPress={() => showSection("History")}>
                    <MaterialIcon name='library-books' size={20} />
                </Pressable>
                <Pressable
                    onPress={() => showSection("AutoConfig")}>
                    <FontAwesome name='gears' size={20} />
                </Pressable>
            </View>
            <AlarmList />
            {/* <History /> */}
            {/* <AutoConfig /> */}
        </View>
    )
};

const AutoConfig = () => {
    const createAutoConfig = () =>
        Alert.alert('Do you want to create a auto configuration for your tank?', '', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'CONFIRM', onPress: () => console.log("config tank") },
        ]);
    return (
        <View style={{ flexDirection: 'column', rowGap: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 30 , color: "#e56b6f"}}>AUTO CONFIGURATION</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 , color: "#1CB5E0"}}>Fish Type</Text>
            <TextInput style={styles.inputContainer} inputMode='text' placeholder="Fish Type"></TextInput>
            <Text style={{ fontWeight: 'bold', fontSize: 20 , color: "#1CB5E0"}}>Living Condition</Text>
            <TextInput style={styles.inputContainer} placeholder="Salt Water / Sea Water"></TextInput>
            <Text style={{ fontWeight: 'bold', fontSize: 20 , color: "#1CB5E0"}}>Fish Number</Text>
            <TextInput style={styles.inputContainer} inputMode='numeric' placeholder="Total Fish"></TextInput>
            <Button
                onPress={createAutoConfig}
                title="Configure"
                color="#1c4ae0"
            />
        </View>
    )
}

const History = () => {
    const DATA = [
        {
            title: 'Thursday, 2022/12/20',
            data: ['10:20AM', '2:00PM', '6:30PM'],
        },
        {
            title: 'Wednesday, 2022/12/19',
            data: ['10:20AM', '2:00PM', '6:30PM'],
        },
        // {
        //     title: 'Tuesday, 2022/12/18',
        //     data: ['10:20AM', '2:00PM', '6:30PM'],
        // },
    ];
    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 30 , color: "#e56b6f"}}>HISTORY</Text>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
    )
}

const AlarmList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [alarmTimes, setAlarmTimes] = useState([]);

    useEffect(() => {
        // clearAlarmTimes();
        loadAlarmTimes();
    }, []);

    useEffect(() => {
        saveAlarmTimes();
    }, [alarmTimes]);

    // const clearAlarmTimes = async () => {
    //     try {
    //         await AsyncStorage.removeItem('alarmTimes');
    //         console.log('Alarm times cleared from local storage.');
    //     } catch (error) {
    //         console.log('Error clearing alarm times from local storage:', error);
    //     }
    // };
    const loadAlarmTimes = async () => {
        try {
            const storedTimes = await AsyncStorage.getItem('alarmTimes');
            if (storedTimes) {
                console.log(storedTimes);
                setAlarmTimes(JSON.parse(storedTimes));
            }
        } catch (error) {
            console.log('Error loading alarm times from local storage:', error);
        }
    };

    const saveAlarmTimes = async () => {
        try {
            await AsyncStorage.setItem('alarmTimes', JSON.stringify(alarmTimes));
        } catch (error) {
            console.log('Error saving alarm times to local storage:', error);
        }
    };

    const createAlarm = () => {
        setModalVisible(true);
    };

    const saveAlarm = () => {
        const selectedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newAlarm = {
            title: selectedTime,
            dateTime: 'everyday',
            isEnabled: true,
        };
        setAlarmTimes((prevTimes) => [...prevTimes, newAlarm]);
        setModalVisible(false);
    };

    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 30 , color: "#e56b6f", paddingBottom: 10}}>Feeding Alarms</Text>
            <Button onPress={createAlarm} title="Create Alarm" color="#1c4ae0" />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { rowGap: 10 }]}>
                        <Text style={styles.modalText}>Create Your New Alarm🎉!</Text>
                        <DatePicker date={date} onDateChange={setDate} mode="time" />
                        <View style={{ flexDirection: "row", columnGap: 10 }}>
                            <View style={[styles.dateText, { backgroundColor: "#c4c4c4", borderRadius: 50 }]}><Text style={{ color: 'red' }}>S</Text></View>
                            <View style={styles.dateText}><Text>M</Text></View>
                            <View style={styles.dateText}><Text>T</Text></View>
                            <View style={styles.dateText}><Text>W</Text></View>
                            <View style={[styles.dateText, { backgroundColor: "#c4c4c4", borderRadius: 50 }]}><Text>T</Text></View>
                            <View style={styles.dateText}><Text>F</Text></View>
                            <View style={styles.dateText}><Text>S</Text></View>
                        </View>
                        <Button onPress={saveAlarm} title="Create Alarm" color="#1c4ae0" />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.textStyle}>CLOSE</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <AlarmFormats alarms={alarmTimes} setAlarms={setAlarmTimes} saveAlarms={saveAlarmTimes} />
        </View>
    );
};

const AlarmFormats = ({ alarms, setAlarms, saveAlarms }) => {
    const toggleSwitch = (index) => {
        const updatedAlarms = [...alarms];
        updatedAlarms[index].isEnabled = !updatedAlarms[index].isEnabled;
        setAlarms(updatedAlarms);
        saveAlarms(); // Save the updated alarms using the saveAlarmTimes function from the parent component
    };

    const Item = ({ title, dateTime, isEnabled, index }) => (
        <View style={styles.item}>
            <View style={{ flex: 2, flexDirection: 'column' }}>
                <Text style={styles.title}>{title}</Text>
                <Text>{dateTime}</Text>
            </View>
            <Switch
                trackColor={{ false: '#767577', true: '#e56b6f' }}
                thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                onValueChange={() => toggleSwitch(index)}
                value={isEnabled}
            />
        </View>
    );

    return (
        <FlatList
            data={alarms}
            renderItem={({ item, index }) => (
                <Item
                    title={item.title}
                    dateTime={item.dateTime}
                    isEnabled={item.isEnabled}
                    index={index}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 40
    },
    input: {
        height: 70,
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        alignItems: 'center'
    },
    chartTitle: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#1CB5E0',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    dateText: {
        flex: 1,
        alignItems: "center",
    }
})