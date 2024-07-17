import debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { FlashList } from '@shopify/flash-list';

import SchoolListItem from './SchoolListItem';
import SearchEmptyView from './SearchEmptyView';
import School from '../models/School';

type SearchSchoolViewProps = {
  onResultPress: (result: School) => void;
};

type SearchResult = {
  sekolah: string;
  alamat_jalan: string;
  lintang: number;
  bujur: number;
};

export default function SearchSchoolView({
  onResultPress,
}: SearchSchoolViewProps) {
  const { height } = Dimensions.get('window');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const debouncedFetchRef = useRef(
    debounce(async query => {
      if (query.trim() === '') {
        setSearchResults([]);

        return;
      }

      try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
          `https://api-sekolah-indonesia.vercel.app/sekolah/s?sekolah=${encodedQuery}`,
        );

        const data = await response.json();
        setSearchResults(data.dataSekolah || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }, 300),
  );

  useEffect(() => {
    debouncedFetchRef.current(searchQuery);
  }, [searchQuery]);

  function handleResultPress(item: SearchResult) {
    const defaultId = 0;
    const defaultIsEligible = false;

    const school = new School(
      defaultId,
      item.sekolah,
      item.alamat_jalan,
      item.lintang,
      item.bujur,
      defaultIsEligible,
    );

    onResultPress(school);
  }

  return (
    <View style={{ ...styles.container, height: height / 1.2 }}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchbar}
      />
      <FlashList
        data={searchResults}
        estimatedItemSize={50}
        renderItem={({ item }) => (
          <SchoolListItem
            name={item.sekolah}
            address={item.alamat_jalan}
            onPress={() => handleResultPress(item)}
          />
        )}
        ListEmptyComponent={SearchEmptyView({ query: searchQuery })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
  },
});
