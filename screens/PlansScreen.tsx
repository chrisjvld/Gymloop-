import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import { supabase } from '../lib/supabase';

interface PlansScreenProps {
  navigation: any;
}

interface Plan {
  id: string;
  name: string;
  description?: string;
  goal?: string;
  plan_text?: string;
  user_id?: string;
  created_at?: string;
}

interface Workout {
  id: string;
  name: string;
  exercises?: string;
  created_at?: string;
}

export default function PlansScreen({ navigation }: PlansScreenProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchPlans(), fetchWorkouts()]);
    setLoading(false);
  };

  const fetchPlans = async () => {
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching plans:', error);
        return;
      }
      
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchWorkouts = async () => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching workouts:', error);
        return;
      }
      
      setWorkouts(data || []);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleAddPlan = () => {
    Alert.alert('Add Plan', 'This will open the plan creation screen');
    // TODO: Navigate to plan creation screen
    // navigation.navigate('CreatePlan');
  };

  const handleAddWorkout = () => {
    Alert.alert('Add Workout', 'This will open the workout creation screen');
    // TODO: Navigate to workout creation screen
    // navigation.navigate('CreateWorkout');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const renderPlanItem = ({ item }: { item: Plan }) => {
    // Create a preview of the plan text (first 150 characters)
    const planPreview = item.plan_text 
      ? item.plan_text.length > 150 
        ? item.plan_text.substring(0, 150) + '...'
        : item.plan_text
      : item.description || 'No preview available';

    return (
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.itemTitle}>
          {item.goal || item.name}
        </Text>
        <Text style={styles.itemDescription}>
          {planPreview}
        </Text>
        {item.created_at && (
          <Text style={styles.itemDate}>
            Created: {new Date(item.created_at).toLocaleDateString()}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <TouchableOpacity style={styles.listItem}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      {item.exercises && (
        <Text style={styles.itemDescription}>{item.exercises}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Plans</Text>
      </View>

      <View style={styles.content}>
        {/* Workout Week Split Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Workout Week Split</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddPlan}>
              <Text style={styles.addButtonText}>➕</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={plans}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPlanItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {loading ? 'Loading plans...' : 'No workout plans found.'}
              </Text>
            }
            style={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>

        {/* Workouts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Workouts</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
              <Text style={styles.addButtonText}>➕</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderWorkoutItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {loading ? 'Loading workouts...' : 'No workouts found.'}
              </Text>
            }
            style={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
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
  },
  section: {
    flex: 1,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 8,
  },
  addButtonText: {
    fontSize: 24,
    color: '#007AFF',
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 40,
  },
}); 