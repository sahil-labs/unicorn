'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api'

export default function ApiTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await apiClient.get('/health')
        setMessage(response.data.message || 'API is connected!')
        setStatus('success')
      } catch (error) {
        setMessage('Failed to connect to API. Make sure the server is running.')
        setStatus('error')
      }
    }

    testConnection()
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">API Connection Test</h1>
        
        <div className={`p-6 rounded-lg ${
          status === 'loading' ? 'bg-gray-100' :
          status === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <div className="text-center">
            <div className="text-4xl mb-4">
              {status === 'loading' ? '⏳' : status === 'success' ? '✅' : '❌'}
            </div>
            <p className="text-lg font-semibold mb-2">
              {status === 'loading' ? 'Testing connection...' : 
               status === 'success' ? 'Connected!' : 'Connection Failed'}
            </p>
            <p className="text-gray-700">{message}</p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}

