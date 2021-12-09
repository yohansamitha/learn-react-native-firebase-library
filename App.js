/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';

const App = () => {
  const [age, setAge] = useState('');
  const reference = database().ref('/users/123');

  useEffect(() => {
    database()
      .ref('/users')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
      });
  }, []);

  return (
    <SafeAreaView>
      <Text>Input Your Age {age} </Text>
      <TextInput
        placeholder="Type here to translate!"
        onChangeText={text => setAge(text)}
        value={age}
      />
      <TouchableOpacity style={styles.button} onPress={setData()}>
        <Text>Set Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pushData()}>
        <Text>Push Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  function setData(params) {
    database()
      .ref('/users')
      .set({
        age: age,
      })
      .then(() => console.log('Data set.'));
  }

  function pushData(params) {
    const newReference = database().ref('/users').push();
    console.log('Auto generated key: ', newReference.key);
    newReference
      .set({
        age: age,
      })
      .then(() => console.log('Data updated.'));
  }
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default App;
