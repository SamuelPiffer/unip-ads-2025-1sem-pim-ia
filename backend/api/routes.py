from flask import Blueprint, render_template, jsonify, request
from datetime import datetime
from config.config import BASE_DIR
from backend.models.database import get_db_connection

routes_bp = Blueprint('routes', __name__)

# Rotas para páginas HTML específicas

# Rotas amigáveis para páginas específicas
@routes_bp.route("/messages")
def messages_page():
    """Página de mensagens"""
    return render_template('messages.html')

@routes_bp.route("/achievements")
def achievements_page():
    """Página de conquistas"""
    return render_template('achievements.html')

@routes_bp.route("/profile")
def profile_page():
    """Página de perfil"""
    return render_template('profile.html')

@routes_bp.route("/settings")
def settings_page():
    """Página de configurações"""
    return render_template('settings.html')

@routes_bp.route("/community")
def community_page():
    """Página da comunidade"""
    return render_template('community.html')

# API Routes for Questions
@routes_bp.route("/api/questions", methods=['GET'])
def get_questions():
    """Obter todas as perguntas"""
    try:
        conn = get_db_connection()
        questions = conn.execute('''
            SELECT q.*, u.name as author_name, u.avatar_url,
                   COUNT(a.id) as answer_count,
                   COUNT(CASE WHEN a.is_ai = 1 THEN 1 END) as ai_answer_count
            FROM questions q
            JOIN users u ON q.user_id = u.id
            LEFT JOIN answers a ON q.id = a.question_id
            GROUP BY q.id
            ORDER BY q.created_at DESC
        ''').fetchall()
        
        questions_list = []
        for question in questions:
            questions_list.append({
                'id': question['id'],
                'title': question['title'],
                'content': question['content'],
                'category': question['category'],
                'author_name': question['author_name'],
                'avatar_url': question['avatar_url'],
                'answer_count': question['answer_count'],
                'ai_answer_count': question['ai_answer_count'],
                'created_at': question['created_at'],
                'status': question['status']
            })
        
        conn.close()
        return jsonify({'questions': questions_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@routes_bp.route("/api/questions", methods=['POST'])
def create_question():
    """Criar nova pergunta"""
    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        category = data.get('category')
        user_id = data.get('user_id', 1)  # Temporário - usar ID fixo
        
        if not title or not content or not category:
            return jsonify({'error': 'Título, conteúdo e categoria são obrigatórios'}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO questions (title, content, category, user_id, created_at)
            VALUES (?, ?, ?, ?, ?)
        ''', (title, content, category, user_id, datetime.utcnow().isoformat()))
        conn.commit()
        
        question_id = cursor.lastrowid
        conn.close()
        
        return jsonify({
            'id': question_id,
            'title': title,
            'content': content,
            'category': category,
            'message': 'Pergunta criada com sucesso!'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check
@routes_bp.route("/health")
def health():
    """Verificação de saúde da aplicação"""
    return {"status": "ok", "message": "Aplicação funcionando corretamente"}