import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function D3Guide() {
  const router = useRouter()

  useEffect(() => {
    // 直接跳转到知识图谱页面
    router.push('/d3/concept-graph?id=1bfc87ff7aa48059b644d97dc5dd1923')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">正在加载知识图谱...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
    </div>
  )
} 