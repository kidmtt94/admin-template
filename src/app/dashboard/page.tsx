import { redirect } from 'next/navigation';
import { authService } from '@/services/auth';

export default function DashboardPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard / Management Page</h1>
        <p className="text-gray-600 mt-4">Welcome to the admin area.</p>
        <form action={async () => {
          'use server';
          await authService.logout();
          redirect('/login');
        }}>
          <button type="submit" className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
