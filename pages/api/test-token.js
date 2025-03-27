import { Client } from '@notionhq/client'

export default async function handler(req, res) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN_V2
    })

    // 测试获取用户信息
    const response = await notion.users.me()
    
    res.status(200).json({
      success: true,
      message: 'Token 验证成功！',
      user: response
    })
  } catch (error) {
    console.error('Token 验证失败:', error)
    res.status(500).json({
      success: false,
      message: 'Token 验证失败',
      error: error.message
    })
  }
} 