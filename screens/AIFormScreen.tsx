import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

interface QuestionFlowScreenProps {
  navigation: any;
}

interface UserAnswers {
  gender: string;
  age: string;
  fitnessGoal: string;
  workoutFrequency: string;
  sessionLength: string;
  injuryHistory: string;
}

// QuestionCard component (inline for now)
interface QuestionCardProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
  onNext: () => void;
  nextDisabled?: boolean;
  onBack?: () => void;
  onExit?: () => void;
}

function QuestionCard({
  title,
  currentStep,
  totalSteps,
  children,
  onNext,
  nextDisabled = false,
  onBack,
  onExit,
}: QuestionCardProps) {
  return (
    <SafeAreaView style={questionCardStyles.container}>
      {/* Progress Header */}
      <View style={questionCardStyles.header}>
        <View style={questionCardStyles.progressContainer}>
          <Text style={questionCardStyles.progressText}>
            {currentStep} of {totalSteps}
          </Text>
          <View style={questionCardStyles.progressBar}>
            <View
              style={[
                questionCardStyles.progressFill,
                { width: `${(currentStep / totalSteps) * 100}%` },
              ]}
            />
          </View>
        </View>
        <View style={questionCardStyles.headerButtons}>
          {onBack ? (
            <TouchableOpacity style={questionCardStyles.backButton} onPress={onBack}>
              <Text style={questionCardStyles.backText}>← Back</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {onExit && (
            <TouchableOpacity style={questionCardStyles.exitButton} onPress={onExit}>
              <Text style={questionCardStyles.exitText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Question Content */}
      <View style={questionCardStyles.content}>
        <Text style={questionCardStyles.title}>{title}</Text>
        <View style={questionCardStyles.inputContainer}>
          {children}
        </View>
      </View>

      {/* Next Button */}
      <View style={questionCardStyles.footer}>
        <TouchableOpacity
          style={[questionCardStyles.nextButton, nextDisabled && questionCardStyles.nextButtonDisabled]}
          onPress={onNext}
          disabled={nextDisabled}
        >
          <Text style={[questionCardStyles.nextButtonText, nextDisabled && questionCardStyles.nextButtonTextDisabled]}>
            {currentStep === totalSteps ? 'Generate Plan' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function AIFormScreen({ navigation }: QuestionFlowScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<UserAnswers>({
    gender: '',
    age: '',
    fitnessGoal: '',
    workoutFrequency: '',
    sessionLength: '',
    injuryHistory: '',
  });

  const totalSteps = 6;

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1: return answers.gender !== '';
      case 2: return answers.age !== '';
      case 3: return answers.fitnessGoal !== '';
      case 4: return answers.workoutFrequency !== '';
      case 5: return answers.sessionLength !== '';
      case 6: return answers.injuryHistory !== '';
      default: return false;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      Alert.alert('Error', 'Please complete this question before continuing');
      return;
    }

    if (currentStep === totalSteps) {
      // Navigate to Plan screen with answers
      navigation.navigate('Plan', { formData: answers });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExit = () => {
    navigation.navigate('Home');
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            title="What is your gender?"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            nextDisabled={!validateCurrentStep()}
            onExit={handleExit}
          >
            <View style={styles.buttonGroup}>
              {['Male', 'Female', 'Other'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    answers.gender === option.toLowerCase() && styles.optionButtonSelected,
                  ]}
                  onPress={() => setAnswers({ ...answers, gender: option.toLowerCase() })}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      answers.gender === option.toLowerCase() && styles.optionButtonTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard
            title="What is your age group?"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            nextDisabled={!validateCurrentStep()}
            onExit={handleExit}
          >
            <View style={styles.buttonGroup}>
              {[
                { label: '14-17', value: '14-17' },
                { label: '18-25', value: '18-25' },
                { label: '25-30', value: '25-30' },
                { label: '30-40', value: '30-40' },
                { label: '50+', value: '50+' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    answers.age === option.value && styles.optionButtonSelected,
                  ]}
                  onPress={() => setAnswers({ ...answers, age: option.value })}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      answers.age === option.value && styles.optionButtonTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard
            title="What is your fitness goal?"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            nextDisabled={!validateCurrentStep()}
            onExit={handleExit}
          >
            <View style={styles.buttonGroup}>
              {[
                { label: 'Muscle Gain', value: 'muscle_gain' },
                { label: 'Fat Loss', value: 'fat_loss' },
                { label: 'Endurance', value: 'endurance' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    answers.fitnessGoal === option.value && styles.optionButtonSelected,
                  ]}
                  onPress={() => setAnswers({ ...answers, fitnessGoal: option.value })}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      answers.fitnessGoal === option.value && styles.optionButtonTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard
            title="How many days per week do you want to train?"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            nextDisabled={!validateCurrentStep()}
            onExit={handleExit}
          >
            <View style={styles.numberButtonGroup}>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.numberButton,
                    answers.workoutFrequency === num.toString() && styles.numberButtonSelected,
                  ]}
                  onPress={() => setAnswers({ ...answers, workoutFrequency: num.toString() })}
                >
                  <Text
                    style={[
                      styles.numberButtonText,
                      answers.workoutFrequency === num.toString() && styles.numberButtonTextSelected,
                    ]}
                  >
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard
            title="How long should each session be?"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            nextDisabled={!validateCurrentStep()}
            onExit={handleExit}
          >
            <View style={styles.buttonGroup}>
              {[
                { label: '0-30 minutes', value: '0-30' },
                { label: '30-60 minutes', value: '30-60' },
                { label: '60-90 minutes', value: '60-90' },
                { label: '90-120 minutes', value: '90-120' },
                { label: '120+ minutes', value: '120+' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    answers.sessionLength === option.value && styles.optionButtonSelected,
                  ]}
                  onPress={() => setAnswers({ ...answers, sessionLength: option.value })}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      answers.sessionLength === option.value && styles.optionButtonTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </QuestionCard>
        );

      case 6:
        return (
          <QuestionCard
            title="Do you have any injury history?"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            nextDisabled={!validateCurrentStep()}
            onExit={handleExit}
          >
            <View style={styles.buttonGroup}>
              {[
                { label: 'None', value: 'none' },
                { label: 'Lower back pain', value: 'lower_back_pain' },
                { label: 'Shoulders', value: 'shoulders' },
                { label: 'Knees', value: 'knees' },
                { label: 'Wrist/elbow', value: 'wrist_elbow' },
                { label: 'Chronic Joint pain', value: 'chronic_joint_pain' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    answers.injuryHistory === option.value && styles.optionButtonSelected,
                  ]}
                  onPress={() => setAnswers({ ...answers, injuryHistory: option.value })}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      answers.injuryHistory === option.value && styles.optionButtonTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </QuestionCard>
        );

      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderQuestion()}</View>;
}

const questionCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  progressContainer: {
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
  },
  exitButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  exitText: {
    color: '#007AFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
  },
  inputContainer: {
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonTextDisabled: {
    color: '#999',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 300,
  },
  optionButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  optionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  optionButtonTextSelected: {
    color: '#007AFF',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 18,
    fontSize: 24,
    fontWeight: '600',
    backgroundColor: 'white',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    height: 120,
    width: 300,
    textAlignVertical: 'top',
    fontSize: 16,
    fontWeight: 'normal',
  },
  numberButtonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 280,
  },
  numberButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 50,
    width: 60,
    height: 60,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  numberButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  numberButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  numberButtonTextSelected: {
    color: '#007AFF',
  },
  inputWithLabel: {
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 18,
    color: '#666',
    marginTop: 12,
    fontWeight: '500',
  },
}); 