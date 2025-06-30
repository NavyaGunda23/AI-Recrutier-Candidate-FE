// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yfwgrlomilroyvzmqwql.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmd2dybG9taWxyb3l2em1xd3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Njk1NzAsImV4cCI6MjA2NjM0NTU3MH0.fSn6H0EEJgdgwZIZc3xovyR8l-yclhoxAW7J8bQeboI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
