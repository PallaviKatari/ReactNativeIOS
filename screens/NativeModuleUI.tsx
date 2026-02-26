import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import DeviceInfo from "react-native-device-info";

const DeviceInfoDemo = () => {
  const [deviceName, setDeviceName] = useState("");

  const fetchDeviceName = async () => {
    const name = await DeviceInfo.getDeviceName();
    setDeviceName(name);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Device Info Demo" />
        <Card.Content>
          <Button mode="contained" onPress={fetchDeviceName}>
            Get Device Name
          </Button>
          {deviceName ? <Text style={styles.result}>Device: {deviceName}</Text> : null}
        </Card.Content>
      </Card>
    </View>
  );
};

export default DeviceInfoDemo;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  card: { padding: 16, borderRadius: 12 },
  result: { marginTop: 16, fontSize: 16 },
});