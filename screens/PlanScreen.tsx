import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

interface PlanScreenProps {
  navigation: any;
  route: any;
}

export default function PlanScreen({ navigation, route }: PlanScreenProps) {
  const { formData } = route.params || {};

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

      <View style={styles.content}>
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

        <Text style={styles.comingSoonText}>
          OpenAI integration coming soon!
        </Text>
      </View>
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  comingSoonText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
}); 