import { useEffect, useState } from 'react'

export default function TestToken() {
  const [status, setStatus] = useState('正在验证 Token...')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function testToken() {
      try {
        const response = await fetch('/api/test-token')
        const result = await response.json()
        
        if (result.success) {
          setStatus('Token 验证成功！')
          setData(result.user)
        } else {
          setStatus('Token 验证失败！')
          setError(result.error)
        }
      } catch (err) {
        setStatus('Token 验证失败！')
        setError(err.message)
      }
    }

    testToken()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Notion Token 测试</h1>
      <div className="p-4 bg-gray-100 rounded">
        <p className="font-bold">状态：{status}</p>
        
        {data && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">用户信息：</h2>
            <pre className="bg-white p-4 rounded overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
        
        {error && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-red-500">错误信息：</h2>
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
} 