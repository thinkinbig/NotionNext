import { useEffect, useState } from 'react'

export default function TestPage() {
  const [status, setStatus] = useState('正在测试...')
  const [error, setError] = useState(null)

  useEffect(() => {
    async function testNotionAPI() {
      try {
        const response = await fetch('/api/test-token')
        const result = await response.json()
        
        if (result.success) {
          setStatus('API 连接成功！')
          console.log('页面数据：', result.user)
        } else {
          setStatus('API 连接失败！')
          setError(result.error)
        }
      } catch (err) {
        setStatus('API 连接失败！')
        setError(err.message)
        console.error('错误：', err)
      }
    }

    testNotionAPI()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Notion API 测试</h1>
      <div className="p-4 bg-gray-100 rounded">
        <p>状态：{status}</p>
        {error && (
          <p className="text-red-500 mt-2">错误信息：{error}</p>
        )}
      </div>
    </div>
  )
} 