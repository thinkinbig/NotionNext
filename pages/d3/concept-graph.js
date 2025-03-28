'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useNotionDatabase } from '../../hooks/useNotionDatabase'
import NotionLayout  from '../../components/layouts/NotionLayout'

// 动态导入知识图谱组件，禁用 SSR
const KnowledgeGraph = dynamic(() => import('../../components/KnowledgeGraph'), {
  ssr: false
})

export default function NotionVisualization() {
  const { data } = useNotionDatabase('1bfc87ff7aa48059b644d97dc5dd1923')

  // 处理数据为知识图谱格式
  const graphData = useMemo(() => {
    if (!data?.results) return null

    const nodes = data.results.map(page => ({
      id: page.id,
      title: page.properties.Term.title[0]?.plain_text || 'Untitled',
      url: page.url
    }))

    const links = []
    data.results.forEach(page => {
      const relatedConcepts = page.properties['Related Concepts']?.relation || []
      relatedConcepts.forEach(concept => {
        links.push({
          source: page.id,
          target: concept.id
        })
      })
    })

    return {
      nodes,
      links
    }
  }, [data])

  if (!graphData) return null

  return (
    <NotionLayout>
      <KnowledgeGraph 
        data={graphData}
        config={{
          width: window.innerWidth,
          height: window.innerHeight,
          nodeColor: '#4a90e2',
          linkColor: '#666'
        }}
      />
    </NotionLayout>
  )
} 