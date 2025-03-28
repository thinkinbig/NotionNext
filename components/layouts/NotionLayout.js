import Head from 'next/head'

export default function NotionLayout({ children }) {
  return (
    <>
      <Head>
        <title>Notion 数据库可视化</title>
        <meta name="description" content="Notion 数据库知识图谱可视化" />
      </Head>
      {children}
    </>
  )
} 