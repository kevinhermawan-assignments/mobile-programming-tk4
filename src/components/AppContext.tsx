import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import School from '../models/School';
import {
  createTables,
  deleteSchool,
  getSchools,
  insertSchool,
  updateSchool,
} from '../utils/db';

type User = Record<string, any> | null;

type AppContextType = {
  user: User;
  schools: School[];
  selectedSchool: School | null;
  onAuthStateChanged: (user: User) => void;
  onChangeSelectedSchool: (school: School | null) => void;
  onAddSchool: (
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    isEligible: boolean,
  ) => Promise<void>;
  onUpdateSchool: (school: School) => Promise<void>;
  onDeleteSchool: (school: School) => Promise<void>;
};

const AppContext = createContext<AppContextType>({
  user: null,
  schools: [],
  selectedSchool: null,
  onAuthStateChanged: () => {},
  onChangeSelectedSchool: () => {},
  onAddSchool: async () => {},
  onUpdateSchool: async () => {},
  onDeleteSchool: async () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  useEffect(() => {
    createTables().then(async () => {
      const data = await getSchools();
      const sortedData = data.sort((a, b) => {
        return Number(b.getId()) - Number(a.getId());
      });

      setSchools(sortedData);
    });
  }, []);

  useEffect(() => {
    if (schools.length > 0) {
      setSelectedSchool(schools[0]);
    }
  }, [schools]);

  function onChangeSelectedSchool(school: School | null) {
    if (school) {
      setSelectedSchool(school);
    } else {
      setSelectedSchool(null);

      setTimeout(() => {
        setSelectedSchool(schools[0]);
      }, 500);
    }
  }

  function onAuthStateChanged(data: User) {
    setUser(data);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  async function onAddSchool(
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    isEligible: boolean,
  ) {
    const school = await insertSchool(
      name,
      address,
      latitude,
      longitude,
      isEligible,
    );

    const updatedSchools = [school, ...schools];

    setSchools(updatedSchools);
  }

  async function onUpdateSchool(data: School) {
    const school = await updateSchool(data);
    const updatedSchools = schools.map(s => {
      if (s.getId() === school.getId()) {
        return school;
      }

      return s;
    });

    setSchools(updatedSchools);
  }

  async function onDeleteSchool(data: School) {
    const school = await deleteSchool(data);
    const updatedSchools = schools.filter(s => s.getId() !== school.getId());

    setSchools(updatedSchools);
  }

  return (
    <AppContext.Provider
      value={{
        user,
        schools,
        selectedSchool,
        onAuthStateChanged,
        onChangeSelectedSchool,
        onAddSchool,
        onUpdateSchool,
        onDeleteSchool,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
