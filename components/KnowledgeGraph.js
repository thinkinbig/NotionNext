'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function KnowledgeGraph({ data }) {
  const svgRef = useRef()

  useEffect(() => {
    if (!data || !data.nodes || !data.links) return

    // 清除之前的图表
    d3.select(svgRef.current).selectAll("*").remove()

    const width = 800
    const height = 600
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }

    // 创建 SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // 创建力导向图
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))

    // 创建箭头
    svg.append('defs').selectAll('marker')
      .data(['link'])
      .enter().append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999')

    // 创建链接
    const link = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('marker-end', 'url(#arrow)')

    // 创建节点
    const node = svg.append('g')
      .selectAll('g')
      .data(data.nodes)
      .enter().append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    // 添加节点圆圈
    node.append('circle')
      .attr('r', 5)
      .attr('fill', '#69b3a2')

    // 添加节点文本
    node.append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(d => d.title)
      .style('font-size', '12px')

    // 添加节点链接
    node.append('a')
      .attr('href', d => d.url)
      .attr('target', '_blank')
      .append('text')
      .attr('dx', 12)
      .attr('dy', '1.5em')
      .text(d => '🔗')
      .style('font-size', '12px')
      .style('cursor', 'pointer')

    // 更新力导向图
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node
        .attr('transform', d => `translate(${d.x},${d.y})`)
    })

    // 拖拽函数
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

  }, [data])

  return (
    <div className="w-full overflow-auto">
      <svg ref={svgRef} className="border rounded-lg bg-white"></svg>
    </div>
  )
} 