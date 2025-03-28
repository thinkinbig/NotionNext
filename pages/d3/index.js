import { useState } from 'react'
import { useRouter } from 'next/router'
import D3Layout from '../../components/layouts/D3Layout'

export default function D3Guide() {
  const [databaseId, setDatabaseId] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (databaseId) {
      router.push(`/d3/concept-graph?id=${databaseId}`)
    }
  }

  return (
    <D3Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Notion 知识图谱生成器</h1>
        
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">如何获取 Notion 数据库 ID</h2>
            <ol className="list-decimal list-inside space-y-3">
              <li>在 Notion 中打开你的数据库页面</li>
              <li>点击右上角的 "Share" 按钮，确保数据库已经开启了公开访问</li>
              <li>在浏览器地址栏中，找到类似这样的URL：<br/>
                <code className="bg-gray-100 px-2 py-1 rounded">https://www.notion.so/workspace/1bfc87ff7aa48059b644d97dc5dd1923</code>
              </li>
              <li>其中最后一段 <code className="bg-gray-100 px-2 py-1 rounded">1bfc87ff7aa48059b644d97dc5dd1923</code> 就是数据库 ID</li>
            </ol>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">数据库要求</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>必须包含一个 <code className="bg-gray-100 px-2 py-1 rounded">Term</code> 属性（类型：Title）作为节点标题</li>
              <li>必须包含一个 <code className="bg-gray-100 px-2 py-1 rounded">Related Concepts</code> 属性（类型：Relation）用于建立节点之间的关系</li>
              <li>数据库必须设置为公开访问</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">生成知识图谱</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="databaseId" className="block text-sm font-medium text-gray-700">
                  输入数据库 ID
                </label>
                <input
                  type="text"
                  id="databaseId"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="例如：1bfc87ff7aa48059b644d97dc5dd1923"
                  value={databaseId}
                  onChange={(e) => setDatabaseId(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={!databaseId}
              >
                生成知识图谱
              </button>
            </form>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">在 Notion 中使用</h2>
            <p className="mb-3">你可以通过以下两种方式在 Notion 中快速访问知识图谱：</p>
            <ol className="list-decimal list-inside space-y-3">
              <li>使用直接链接：<br/>
                <code className="bg-gray-100 px-2 py-1 rounded">你的域名/d3/concept-graph?id=你的数据库ID</code>
              </li>
              <li>使用简短链接：<br/>
                <code className="bg-gray-100 px-2 py-1 rounded">你的域名/g/你的数据库ID</code>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </D3Layout>
  )
} 