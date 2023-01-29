import React from "react";
import { StyleSheet, View } from "react-native";
import Lottie from 'lottie-react-native';

export default function Loader() {
  return (
      <View style={styles.container}>
          <Lottie resizeMode="contain" speed={2} style={styles.lottie} source={{uri: 'https://ik.imagekit.io/marQofy034/130591-loading-cofee.json?ik-sdk-version=javascript-1.4.3&updatedAt=1671689063011'}} autoPlay loop />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: 'white'},
    lottie: { width: '100%', marginLeft: 'auto', padding: 10},
});