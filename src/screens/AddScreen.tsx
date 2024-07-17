import React, { Fragment, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  RadioButton,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';

import { useAppContext } from '../components/AppContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import SearchSchoolView from '../components/SearchSchoolView';

export default function AddScreen({
  route,
  navigation,
}: NativeStackScreenProps<any, 'Add'>) {
  const school = route.params?.school;

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { onAddSchool, onUpdateSchool, onChangeSelectedSchool } =
    useAppContext();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (school) {
      setName(school.name);
      setAddress(school.address);
      setLatitude(school.latitude);
      setLongitude(school.longitude);
      setIsEligible(school.isEligible);

      navigation.setOptions({ title: 'Edit Sekolah' });
    }

    return () => {
      onChangeSelectedSchool(null);
    };
  }, [navigation, school, onChangeSelectedSchool]);

  async function save() {
    if (school) {
      school.name = name;
      school.address = address;
      school.latitude = latitude;
      school.longitude = longitude;
      school.isEligible = isEligible;

      await onUpdateSchool(school);
    } else {
      await onAddSchool(name, address, latitude, longitude, isEligible);
    }

    setName('');
    setAddress('');
    setLatitude(0);
    setLongitude(0);
    setIsEligible(false);
    setIsSaved(true);
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <View>
          <TextInput
            disabled={true}
            mode="outlined"
            label="Nama Sekolah"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            disabled={true}
            mode="outlined"
            label="Alamat Sekolah"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <Button
            mode="contained"
            style={styles.schoolPickerButton}
            onPress={() => actionSheetRef.current?.show()}>
            Cari Sekolah
          </Button>
          <View>
            <Text variant="bodyLarge">Apakah layak menerima bantuan?</Text>
            <RadioButton.Group
              value={isEligible === true ? 'yes' : 'no'}
              onValueChange={value => {
                setIsEligible(value === 'yes' ? true : false);
              }}>
              <RadioButton.Item label="Layak" value="yes" />
              <RadioButton.Item label="Tidak Layak" value="no" />
            </RadioButton.Group>
          </View>
        </View>
        <View>
          <Button
            mode="contained"
            disabled={name.length === 0 && address.length === 0}
            style={styles.button}
            onPress={save}>
            Simpan
          </Button>
          <Snackbar visible={isSaved} onDismiss={() => setIsSaved(false)}>
            {school
              ? 'Sekolah berhasil diperbarui.'
              : 'Sekolah berhasil ditambahkan.'}
          </Snackbar>
        </View>
      </View>
      <ActionSheet ref={actionSheetRef}>
        <SearchSchoolView
          onResultPress={result => {
            setName(result.getName());
            setAddress(result.getAddress());
            setLatitude(result.getLatitude());
            setLongitude(result.getLongitude());

            actionSheetRef.current?.hide();
          }}
        />
      </ActionSheet>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    padding: 4,
    borderRadius: 8,
  },
  schoolPickerButton: {
    padding: 4,
    borderRadius: 8,
    marginBottom: 16,
  },
});
