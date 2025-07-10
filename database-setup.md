# Database Setup for GymLoop++

## Required Supabase Tables

### 1. Plans Table

```sql
CREATE TABLE plans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  plan_text text,
  goal text,
  description text,
  form_data jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Create policy so users can only see their own plans
CREATE POLICY "Users can view their own plans" ON plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own plans" ON plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own plans" ON plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own plans" ON plans
  FOR DELETE USING (auth.uid() = user_id);
```

### 2. Workouts Table

```sql
CREATE TABLE workouts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  exercises text,
  duration integer,
  difficulty text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Create policy so users can only see their own workouts
CREATE POLICY "Users can view their own workouts" ON workouts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workouts" ON workouts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workouts" ON workouts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workouts" ON workouts
  FOR DELETE USING (auth.uid() = user_id);
```

## How to Set Up

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste each table creation script above
4. Execute each script to create the tables and policies

## Data Structure

### Plans Table Fields:
- `id`: Unique identifier for the plan
- `user_id`: Links to the authenticated user
- `name`: Display name for the plan (e.g., "Personalized muscle gain Plan")
- `plan_text`: Full AI-generated workout plan text
- `goal`: Summary of fitness goal (e.g., "muscle gain - 3 days/week, 60 min sessions")
- `description`: Brief description of the plan
- `form_data`: JSON object containing the original form responses
- `created_at`: When the plan was created
- `updated_at`: When the plan was last modified

### Workouts Table Fields:
- `id`: Unique identifier for the workout
- `user_id`: Links to the authenticated user
- `name`: Name of the workout
- `exercises`: Description of exercises in the workout
- `duration`: Length of workout in minutes
- `difficulty`: Difficulty level (beginner, intermediate, advanced)
- `created_at`: When the workout was created
- `updated_at`: When the workout was last modified

## Security

Both tables use Row Level Security (RLS) to ensure users can only access their own data. The policies automatically filter results based on the authenticated user's ID. 