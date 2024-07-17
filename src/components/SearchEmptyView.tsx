import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type SearchEmptyViewProps = {
  query: string;
};

export default function SearchEmptyView({ query }: SearchEmptyViewProps) {
  if (query.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Silakan masukkan kata kunci untuk mencari</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Maaf, hasil pencarian untuk "{query}" tidak ditemukan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
