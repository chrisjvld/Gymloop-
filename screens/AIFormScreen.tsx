import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface AIFormScreenProps {
  navigation: any;
}

export default function AIFormScreen({ navigation }: AIFormScreenProps) {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    fitnessGoal: '',
    workoutFrequency: '',
    sessionLength: '',
    injuryHistory: '',
  });

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const fitnessGoalOptions = [
    { label: 'Muscle Gain', value: 'muscle_gain' },
    { label: 'Fat Loss', value: 'fat_loss' },
    { label: 'Endurance', value: 'endurance' },
  ];

  const workoutFrequencyOptions = [
    { label: '1 day per week', value: '1' },
    { label: '2 days per week', value: '2' },
    { label: '3 days per week', value: '3' },
    { label: '4 days per week', value: '4' },
    { label: '5 days per week', value: '5' },
    { label: '6 days per week', value: '6' },
    { label: '7 days per week', value: '7' },
  ];

  const handleSubmit = () => {
    // Validate all fields are filled
    if (!formData.gender || !formData.age || !formData.fitnessGoal || 
        !formData.workoutFrequency || !formData.sessionLength) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Validate age is a number
    if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 100) {
      Alert.alert('Error', 'Please enter a valid age (1-100)');
      return;
    }

    // Validate session length is a number
    if (isNaN(Number(formData.sessionLength)) || Number(formData.sessionLength) < 10 || Number(formData.sessionLength) > 300) {
      Alert.alert('Error', 'Please enter a valid session length (10-300 minutes)');
      return;
    }

    // Navigate to plan screen with form data
    navigation.navigate('Plan', { formData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Workout Plan</Text>
          <Text style={styles.subtitle}>Tell us about yourself to create your perfect plan</Text>
        </View>

        <View style={styles.form}>
          {/* Gender */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Gender *</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setFormData({...formData, gender: value})}
                items={genderOptions}
                placeholder={{ label: 'Select your gender', value: null }}
                style={pickerSelectStyles}
                value={formData.gender}
              />
            </View>
          </View>

          {/* Age */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Age *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              value={formData.age}
              onChangeText={(value) => setFormData({...formData, age: value})}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          {/* Fitness Goal */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Fitness Goal *</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setFormData({...formData, fitnessGoal: value})}
                items={fitnessGoalOptions}
                placeholder={{ label: 'Select your primary goal', value: null }}
                style={pickerSelectStyles}
                value={formData.fitnessGoal}
              />
            </View>
          </View>

          {/* Workout Frequency */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Workout Frequency *</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setFormData({...formData, workoutFrequency: value})}
                items={workoutFrequencyOptions}
                placeholder={{ label: 'How many days per week?', value: null }}
                style={pickerSelectStyles}
                value={formData.workoutFrequency}
              />
            </View>
          </View>

          {/* Session Length */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Workout Session Length (minutes) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 60"
              value={formData.sessionLength}
              onChangeText={(value) => setFormData({...formData, sessionLength: value})}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          {/* Injury History */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Injury History (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Any injuries or physical limitations we should know about?"
              value={formData.injuryHistory}
              onChangeText={(value) => setFormData({...formData, injuryHistory: value})}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Generate My Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 100,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: '#333',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
}; 