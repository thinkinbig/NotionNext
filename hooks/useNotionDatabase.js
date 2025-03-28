import { useState, useEffect, useCallback } from 'react'

export function useNotionDatabase(databaseId) {
  const [status, setStatus] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchDatabase = useCallback(async () => {
    if (!databaseId) {
      setError('请输入数据库ID')
      return
    }

    setStatus('正在获取数据...')
    setError(null)

    try {
      const response = await fetch(`/api/get-database?databaseId=${databaseId}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '获取数据失败')
      }

      setData(result.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setStatus('')
    }
  }, [databaseId])

  // 首次加载时获取数据
  useEffect(() => {
    fetchDatabase()
  }, [fetchDatabase])

  return {
    status,
    data,
    error,
    refetch: fetchDatabase
  }
} 