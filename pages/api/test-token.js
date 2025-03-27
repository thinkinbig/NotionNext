import notionAPI from '@/lib/notion/getNotionAPI'
import BLOG from '@/blog.config'

export default async function handler(req, res) {
  try {
    // 测试获取用户信息
    const user = await notionAPI.getUser()
    
    res.status(200).json({
      success: true,
      message: 'Token 验证成功！',
      user: user
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