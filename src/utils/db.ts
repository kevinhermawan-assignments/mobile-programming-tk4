import { open } from 'react-native-quick-sqlite';

import School from '../models/School';

function createConnection() {
  return open({ name: 'BantuSekolah.sqlite', location: 'default' });
}

export async function createTables() {
  const db = createConnection();
  const result = await db.executeAsync(
    'CREATE TABLE IF NOT EXISTS schools (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, latitude INTEGER, longitude INTEGER, isEligible BOOLEAN);',
  );

  return result;
}

export async function insertSchool(
  name: string,
  address: string,
  latitude: number,
  longitude: number,
  isEligible: boolean,
) {
  const db = createConnection();
  const { insertId } = await db.executeAsync(
    'INSERT INTO schools (name, address, latitude, longitude, isEligible) VALUES (?, ?, ?, ?, ?);',
    [name, address, latitude, longitude, isEligible],
  );

  const school = new School(
    insertId ?? 0,
    name,
    address,
    latitude,
    longitude,
    isEligible,
  );

  return school;
}

export async function updateSchool(school: School) {
  const db = createConnection();
  await db.executeAsync(
    'UPDATE schools SET name = ?, address = ?, latitude = ?, longitude = ?, isEligible = ? WHERE id = ?;',
    [
      school.getName(),
      school.getAddress(),
      school.getLatitude(),
      school.getLongitude(),
      school.getIsEligible(),
      school.getId(),
    ],
  );

  return school;
}

export async function getSchools() {
  const schools: School[] = [];

  const db = createConnection();
  const result = await db.executeAsync('SELECT * FROM schools;');

  for (let i = 0; i < (result.rows?.length ?? 0); i++) {
    const item = result.rows?.item(i);
    const school = new School(
      item.id,
      item.name,
      item.address,
      item.latitude,
      item.longitude,
      item.isEligible,
    );

    schools.push(school);
  }

  return schools;
}

export async function deleteSchool(school: School) {
  const db = createConnection();
  await db.executeAsync('DELETE FROM Schools WHERE id = ?;', [school.getId()]);

  return school;
}
