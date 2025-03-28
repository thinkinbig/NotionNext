import { queryDatabase } from '../../lib/notion/getNotionService'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { databaseId, pageSize, sortBy, sortDirection } = req.query

  if (!databaseId) {
    return res.status(400).json({ success: false, error: 'Database ID is required' })
  }

  try {
    const response = await queryDatabase(databaseId, {
      pageSize: parseInt(pageSize) || 100,
      sorts: [
        {
          timestamp: sortBy || 'created_time',
          direction: sortDirection || 'descending'
        }
      ]
    })

    return res.status(200).json({
      success: true,
      data: response
    })
  } catch (error) {
    console.error('Error fetching database:', error)
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch database'
    })
  }
} 