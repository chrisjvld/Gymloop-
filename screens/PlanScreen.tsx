import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { generateWorkoutPlan, WorkoutPlan } from '../lib/openai';

interface PlanScreenProps {
  navigation: any;
  route: any;
}

export default function PlanScreen({ navigation, route }: PlanScreenProps) {
  const { formData } = route.params || {};
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formData) {
      generatePlan();
    } else {
      setError('No form data available');
      setIsLoading(false);
    }
  }, [formData]);

  const generatePlan = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const plan = await generateWorkoutPlan(formData);
      setWorkoutPlan(plan);
    } catch (err) {
      console.error('Error generating plan:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate workout plan');
      Alert.alert('Error', 'Failed to generate your workout plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    generatePlan();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Your AI Plan</Text>
        </View>

        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
          <Text style={styles.generateText}>Generating your plan...</Text>
          <Text style={styles.subText}>
            Our AI is creating a personalized workout plan based on your preferences
          </Text>

          {formData && (
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Plan Details:</Text>
              <Text style={styles.summaryItem}>Gender: {formData.gender}</Text>
              <Text style={styles.summaryItem}>Age: {formData.age}</Text>
              <Text style={styles.summaryItem}>Goal: {formData.fitnessGoal?.replace('_', ' ')}</Text>
              <Text style={styles.summaryItem}>Frequency: {formData.workoutFrequency} days/week</Text>
              <Text style={styles.summaryItem}>Session Length: {formData.sessionLength} minutes</Text>
              {formData.injuryHistory && (
                <Text style={styles.summaryItem}>Injuries: {formData.injuryHistory}</Text>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Your AI Plan</Text>
        </View>

        <View style={styles.errorContent}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your AI Plan</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {workoutPlan && (
          <View style={styles.planContent}>
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>{workoutPlan.name}</Text>
              <Text style={styles.planDescription}>{workoutPlan.description}</Text>
            </View>

            <View style={styles.planBody}>
              <Text style={styles.planText}>{workoutPlan.fullPlan}</Text>
            </View>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Plan</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    marginRight: 15,
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  planContent: {
    padding: 20,
  },
  planHeader: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  planDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  planBody: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  planText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginBottom: 20,
  },
  generateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  summaryItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
}); 