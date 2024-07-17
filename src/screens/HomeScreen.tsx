/* eslint-disable react/no-unstable-nested-components */
import React, { Fragment, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import MapView, { MapMarker } from 'react-native-maps';
import { IconButton, Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { FlashList } from '@shopify/flash-list';

import { useAppContext } from '../components/AppContext';
import SchoolListItem from '../components/SchoolListItem';

export default function HomeScreen({
  navigation,
}: NativeStackScreenProps<any, 'Home'>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { schools, selectedSchool, onChangeSelectedSchool } = useAppContext();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          size={28}
          icon="plus"
          iconColor="#FFFFFF"
          onPress={() => navigation.navigate('Add')}
        />
      ),
    });
  }, [navigation, selectedSchool]);

  useEffect(() => {
    actionSheetRef.current?.show();
  }, [selectedSchool]);

  return (
    <Fragment>
      <MapView
        userInterfaceStyle="light"
        region={{
          latitude: selectedSchool?.getLatitude() ?? 0,
          longitude: selectedSchool?.getLongitude() ?? 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        style={styles.maps}>
        {schools.map(school => (
          <MapMarker
            key={school.getId()}
            coordinate={{
              latitude: school.getLatitude(),
              longitude: school.getLongitude(),
            }}
            title={school.getName()}
            description={school.getAddress()}
          />
        ))}
      </MapView>
      {schools.length > 0 && (
        <View style={styles.listContainer}>
          <View>
            <Text variant="labelMedium" style={styles.info}>
              Tekan dan tahan untuk melihat detail sekolah
            </Text>
          </View>
          <FlashList
            data={schools}
            extraData={selectedSchool}
            estimatedItemSize={50}
            keyExtractor={item => item.getId()}
            renderItem={({ item }) => (
              <SchoolListItem
                name={item.getName()}
                address={item.getAddress()}
                selected={selectedSchool?.getId() === item.getId()}
                onPress={() => onChangeSelectedSchool(item)}
                onLongPress={() => {
                  navigation.navigate('Detail', { school: item });
                }}
              />
            )}
          />
        </View>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  maps: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  info: {
    padding: 16,
    textAlign: 'center',
  },
});
