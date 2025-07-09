import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hgldrvjwmsjjeunczatt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnbGRydmp3bXNqamV1bmN6YXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MzM0NzYsImV4cCI6MjA2NzQwOTQ3Nn0.G6MX-HvVcoDamzma9rx8QuA2CrKHsAu6VY-YLswwTjY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);