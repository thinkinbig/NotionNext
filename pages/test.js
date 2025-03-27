import { useEffect, useState } from 'react'
import notionAPI from '@/lib/notion/getNotionAPI'
import BLOG from '@/blog.config'

export default function TestPage() {
  const [status, setStatus] = useState('正在测试...')
  const [error, setError] = useState(null)

  useEffect(() => {
    async function testNotionAPI() {
      try {
        const pageId = BLOG.NOTION_PAGE_ID.split(',')[0]
        const page = await notionAPI.getPage(pageId)
        setStatus('API 连接成功！')
        console.log('页面数据：', page)
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