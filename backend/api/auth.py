from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from backend.models.database import get_user_by_email, create_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/api/register", methods=['POST'])
def api_register():
    """Registra um novo usuário"""
    try:
        data = request.get_json(silent=True) or {}
        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""

        # Validações
        if not name or not email or not password:
            return jsonify({"error": "Campos obrigatórios: name, email, password"}), 400

        if len(password) < 6:
            return jsonify({"error": "Senha deve ter pelo menos 6 caracteres"}), 400

        if "@" not in email or "." not in email:
            return jsonify({"error": "Email inválido"}), 400

        # Verificar se email já existe
        existing_user = get_user_by_email(email)
        if existing_user:
            return jsonify({"error": "Email já cadastrado"}), 409

        # Criar hash da senha
        password_hash = generate_password_hash(password)

        # Criar usuário
        user_id = create_user(name, email, password_hash)
        if not user_id:
            return jsonify({"error": "Erro ao criar usuário"}), 500

        return jsonify({
            "id": user_id, 
            "name": name, 
            "email": email,
            "message": "Usuário criado com sucesso!"
        }), 201

    except Exception as e:
        return jsonify({"error": "Erro interno no servidor"}), 500

@auth_bp.route("/api/login", methods=['POST'])
def api_login():
    """Realiza login do usuário"""
    try:
        data = request.get_json(silent=True) or {}
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""

        # Validações
        if not email or not password:
            return jsonify({"error": "Campos obrigatórios: email, password"}), 400

        # Buscar usuário
        user = get_user_by_email(email)
        if not user or not check_password_hash(user["password_hash"], password):
            return jsonify({"error": "Credenciais inválidas"}), 401

        return jsonify({
            "id": user["id"], 
            "name": user["name"], 
            "email": user["email"],
            "message": "Login realizado com sucesso!"
        }), 200

    except Exception as e:
        print(f"Erro no login: {e}")
        return jsonify({"error": "Erro interno no servidor"}), 500