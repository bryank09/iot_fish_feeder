import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import MQTT from 'sp-react-native-mqtt';

export const MQTT = () => {
    useEffect(() => {
      testMqttConnection();
    }, []);
  
    const testMqttConnection = () => {
      const brokerUrl = 'mqtt://your-broker-url'; // Replace with the actual MQTT broker URL
  
      mqtt.createClient({
        uri: brokerUrl,
        clientId: 'your-client-id', // Replace with your desired client ID
      }).then((client) => {
        client.on('connect', () => {
          console.log('Connected to MQTT broker');
  
          const topic = 'test/topic';
          const message = 'This is a test message';
  
          client.publish(topic, message)
            .then(() => {
              console.log('Test message published successfully');
            })
            .catch((err) => {
              console.error('Error publishing test message:', err);
            })
            .finally(() => {
              client.disconnect(); // Disconnect from the MQTT broker after publishing the test message
            });
        });
  
        client.on('error', (err) => {
          console.error('Error connecting to MQTT broker:', err);
        });
  
        client.connect();
      });
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Testing MQTT Connection...</Text>
      </View>
    );
  };