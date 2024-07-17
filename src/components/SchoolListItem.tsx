/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

type SchoolListItemProps = {
  name: string;
  address: string;
  selected?: boolean;
  onPress: () => void;
  onLongPress?: () => void;
};

export default function SchoolListItem({
  name,
  address,
  selected,
  onPress,
  onLongPress,
}: SchoolListItemProps) {
  return (
    <Card
      mode="outlined"
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        ...styles.container,
        borderColor: selected ? '#2196F3' : '#E0E0E0',
      }}>
      <Card.Content>
        <Text variant="titleMedium">{name}</Text>
        <Text variant="bodyMedium">{address}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
});
