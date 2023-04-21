import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Expo Google Auth</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
