import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с мемами - получение списка и голосование
    Args: event с httpMethod, queryStringParameters, body
    Returns: JSON с мемами или результат голосования
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    
    if method == 'GET':
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute('SELECT id, title, image_url, votes, category, created_at FROM memes ORDER BY votes DESC')
        memes = cursor.fetchall()
        cursor.close()
        conn.close()
        
        memes_list = []
        for meme in memes:
            memes_list.append({
                'id': meme['id'],
                'title': meme['title'],
                'image': meme['image_url'],
                'votes': meme['votes'],
                'category': meme['category']
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'memes': memes_list})
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        meme_id = body_data.get('id')
        vote_value = body_data.get('value', 0)
        
        cursor = conn.cursor()
        cursor.execute(
            'UPDATE memes SET votes = votes + ' + str(int(vote_value)) + ' WHERE id = ' + str(int(meme_id))
        )
        conn.commit()
        
        cursor.execute('SELECT votes FROM memes WHERE id = ' + str(int(meme_id)))
        result = cursor.fetchone()
        new_votes = result[0] if result else 0
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'votes': new_votes})
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }
