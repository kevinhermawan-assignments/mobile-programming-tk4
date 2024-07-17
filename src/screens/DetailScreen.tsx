import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  DefaultTheme,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppContext } from '../components/AppContext';
import School from '../models/School';

export default function DetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<any, 'Detail'>) {
  const school = route.params?.school as School;
  const { onDeleteSchool, onChangeSelectedSchool } = useAppContext();
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  useEffect(() => {
    navigation.setOptions({ title: school.getName() });

    return () => {
      onChangeSelectedSchool(null);
    };
  }, [navigation, school, onChangeSelectedSchool]);

  async function deleteSchool() {
    await onDeleteSchool(school);
    setDeleteConfirmationVisible(false);

    navigation.goBack();
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <View>
          <Card mode="outlined" style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{school.getName()}</Text>
              <Text variant="bodyMedium">{school.getAddress()}</Text>
            </Card.Content>
          </Card>
          <Card mode="outlined" style={styles.card}>
            <Card.Content>
              <Text
                variant="bodyMedium"
                style={{
                  ...styles.eligible,
                  color: school.getIsEligible()
                    ? DefaultTheme.colors.primary
                    : DefaultTheme.colors.error,
                }}>
                {school.getIsEligible()
                  ? 'Layak Mendapatkan Bantuan'
                  : 'Tidak Layak Mendapatkan Bantuan'}
              </Text>
            </Card.Content>
          </Card>
        </View>
        <View>
          <Button
            mode="outlined"
            textColor={DefaultTheme.colors.primary}
            onPress={() => navigation.navigate('Add', { school })}
            style={styles.updateButton}>
            Edit Sekolah
          </Button>
          <Button
            mode="outlined"
            textColor={DefaultTheme.colors.error}
            onPress={() => setDeleteConfirmationVisible(true)}
            style={styles.deleteButton}>
            Hapus Sekolah
          </Button>
        </View>
      </View>
      <Portal>
        <Dialog
          visible={isDeleteConfirmationVisible}
          onDismiss={() => setDeleteConfirmationVisible(false)}>
          <Dialog.Title>Hapus Sekolah</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Apakah Anda yakin ingin menghapus sekolah ini?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteConfirmationVisible(false)}>
              Batal
            </Button>
            <Button onPress={deleteSchool}>Hapus</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  card: {
    borderColor: '#E0E0E0',
    marginBottom: 8,
  },
  eligible: {
    fontWeight: 'bold',
  },
  updateButton: {
    padding: 4,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: DefaultTheme.colors.primary,
  },
  deleteButton: {
    padding: 4,
    borderRadius: 8,
    borderColor: DefaultTheme.colors.error,
  },
});
