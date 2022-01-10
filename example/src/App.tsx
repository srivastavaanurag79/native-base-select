/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { BTSingleSelect, BTMultiSelect } from '../../src/index';

export default function App() {
  const [language, setLanguage] = React.useState({
    value: '',
    list: [
      { _id: '1', name: 'Hindi' },
      { _id: '2', name: 'English' },
      { _id: '3', name: 'Bengali' },
      { _id: '4', name: 'Marathi' },
      { _id: '5', name: 'Telugu' },
      { _id: '6', name: 'Tamil' },
      { _id: '7', name: 'Gujarati' },
      { _id: '8', name: 'Urdu' },
      { _id: '9', name: 'Kannada' },
      { _id: '10', name: 'Odia' },
      { _id: '11', name: 'Malayalam' },
      { _id: '12', name: 'Punjabi' },
      { _id: '13', name: 'Assamese' },
      { _id: '14', name: 'Maithili' },
      { _id: '15', name: 'Sanskrit' },
      { _id: '16', name: 'Nepali' },
      { _id: '17', name: 'Dzongkha' },
      { _id: '18', name: 'Bhojpuri' },
      { _id: '19', name: 'Tibetan' },
      { _id: '20', name: 'Sinhalese' },
      { _id: '21', name: 'Khasi' },
    ],
    selectedList: [],
    error: '',
  });
  const [gender, setGender] = React.useState({
    value: '',
    list: [
      { _id: 'Male', name: 'Male' },
      { _id: 'Female', name: 'Female' },
      { _id: 'Other', name: 'Other' },
    ],
    selectedList: [],
    error: '',
  });
  return (
    <View style={styles.container}>
      <BTMultiSelect
        label="Language"
        placeholder="Select at least 2 Language"
        list={language.list}
        selectedList={language.selectedList}
        onSelection={(value: any) => {
          setLanguage({
            ...language,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        errorText={language.error}
        pillStyle={{ backgroundColor: 'yellow' }}
        errorStyle={{ textColor: 'red' }}
      />
      <BTSingleSelect
        label="Gender"
        placeholder="Select your gender"
        list={gender.list}
        selectedList={gender.selectedList}
        onSelection={(value: any) => {
          setGender({
            ...gender,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        errorText={gender.error}
        pillStyle={{ backgroundColor: 'yellow' }}
        errorStyle={{ textColor: 'red' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
});
