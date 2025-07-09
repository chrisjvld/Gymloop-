// OpenAI integration for generating AI workout plans

export interface WorkoutPlanData {
  gender: string;
  age: string;
  fitnessGoal: string;
  workoutFrequency: string;
  sessionLength: string;
  injuryHistory?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  fullPlan: string;
}

export async function generateWorkoutPlan(userData: WorkoutPlanData): Promise<WorkoutPlan> {
  try {
    const prompt = `Create a personalized workout plan for a ${userData.age}-year-old ${userData.gender} with the following preferences:

- Primary goal: ${userData.fitnessGoal}
- Workout frequency: ${userData.workoutFrequency} days per week
- Session length: ${userData.sessionLength} minutes
${userData.injuryHistory ? `- Injury history: ${userData.injuryHistory}` : '- No injury history mentioned'}

Please provide:
1. A workout plan name
2. A brief description of the plan approach
3. Weekly workout schedule with specific exercises, sets, reps, and rest periods
4. Any important notes or modifications based on their goals and constraints

Format the response in a clear, easy-to-follow structure that someone can take to the gym and use immediately.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional fitness trainer and workout plan designer. Create detailed, safe, and effective workout plans based on user requirements.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const planContent = data.choices[0].message.content || "Unable to generate plan";
    
    return {
      id: `plan_${Date.now()}`,
      name: `Personalized ${userData.fitnessGoal.replace('_', ' ')} Plan`,
      description: `${userData.workoutFrequency} days/week, ${userData.sessionLength} min sessions`,
      duration: `${userData.workoutFrequency} days per week`,
      fullPlan: planContent,
    };
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate workout plan. Please try again.');
  }
} 