'use client';

import { useUser, useSession } from '@clerk/nextjs';
import { useState } from 'react';

export default function DashboardPage() {
  const { user } = useUser();
  const { session } = useSession();
  const [loading, setLoading] = useState(false);
  const [frontendUrl, setFrontendUrl] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createProject = async () => {
    if (!user) return;

    // Validate URL (must start with https://)
    if (!frontendUrl.startsWith('https://')) {
      setError('Please enter a valid frontend URL starting with https://');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const token = await session?.getToken();

      // --- Sample Request Payload ---
      // {
      //   userId: "user_123",
      //   email: "test@email.com",
      //   fullName: "John Doe",
      //   frontendUrl: "https://example.com"
      // }

      const res = await fetch('http://localhost:3000/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.emailAddresses[0].emailAddress,
          fullName: user.fullName,
          frontendUrl, // 👈 sent exactly like this
        }),
      });

      let data;
      if (res.ok) {
        data = await res.json();
      } else {
        const text = await res.text(); // backend returned HTML/error
        throw new Error(text);
      }

      setResponse(data);
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-10 text-center text-red-500">
        Please sign in to access your dashboard.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* User Details (for dev/debug) */}
      <div className="p-4 rounded-lg bg-gray-900 text-white shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">User Details</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {JSON.stringify(
            {
              userId: user.id,
              email: user.emailAddresses[0].emailAddress,
              fullName: user.fullName,
            },
            null,
            2
          )}
        </pre>
      </div>

      {/* Frontend URL Input */}
      <div className="flex gap-3 mb-4">
        <input
          type="url"
          placeholder="Enter your frontend URL (https://...)"
          value={frontendUrl}
          onChange={(e) => setFrontendUrl(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Create Project Button */}
      <button
        onClick={createProject}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Project'}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/20 text-red-600">
          {error}
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div className="mt-6 p-4 rounded-lg bg-gray-800 text-white">
          <h2 className="text-lg font-semibold mb-2">API Response</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
