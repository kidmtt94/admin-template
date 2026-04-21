'use server';

import { redirect } from 'next/navigation';
import { authService } from '@/services/auth';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const success = await authService.login(email, password);
    if (!success) {
      redirect('/login?error=invalid');
    }
  } catch (error) {
    // If login throws an error
    redirect('/login?error=invalid');
  }
  
  // Navigate to dashboard if success
  redirect('/dashboard');
}
