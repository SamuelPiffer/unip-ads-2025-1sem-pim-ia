import sqlite3
import os
from datetime import datetime
from config.config import DB_PATH

def get_db_connection():
    """Obtém uma conexão com o banco de dados"""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        raise

def init_db():
    """Inicializa o banco de dados com as tabelas necessárias"""
    try:
        conn = get_db_connection()
        
        # Criar tabela de usuários
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                avatar_url TEXT,
                created_at TEXT NOT NULL
            )
        """)
        
        # Criar tabela de mensagens (para futura implementação)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sender_id INTEGER NOT NULL,
                receiver_id INTEGER NOT NULL,
                content TEXT NOT NULL,
                created_at TEXT NOT NULL,
                read_at TEXT,
                FOREIGN KEY (sender_id) REFERENCES users (id),
                FOREIGN KEY (receiver_id) REFERENCES users (id)
            )
        """)
        
        # Criar tabela de conquistas (para futura implementação)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS achievements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                achieved_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        """)
        
        # Criar tabela de perguntas
        conn.execute("""
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                category TEXT NOT NULL,
                user_id INTEGER NOT NULL,
                status TEXT DEFAULT 'open',
                created_at TEXT NOT NULL,
                updated_at TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        """)
        
        # Criar tabela de respostas
        conn.execute("""
            CREATE TABLE IF NOT EXISTS answers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question_id INTEGER NOT NULL,
                user_id INTEGER,
                content TEXT NOT NULL,
                is_ai BOOLEAN DEFAULT 0,
                created_at TEXT NOT NULL,
                updated_at TEXT,
                FOREIGN KEY (question_id) REFERENCES questions (id),
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        """)
        
        conn.commit()
        print("Banco de dados inicializado com sucesso!")
        
    except sqlite3.Error as e:
        print(f"Erro ao inicializar banco de dados: {e}")
        raise
    finally:
        conn.close()

def get_user_by_email(email):
    """Busca usuário por email"""
    try:
        conn = get_db_connection()
        user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
        return user
    except sqlite3.Error as e:
        print(f"Erro ao buscar usuário: {e}")
        return None
    finally:
        conn.close()

def create_user(name, email, password_hash, avatar_url=None):
    """Cria um novo usuário"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO users (name, email, password_hash, avatar_url, created_at) VALUES (?, ?, ?, ?, ?)",
            (name, email, password_hash, avatar_url, datetime.utcnow().isoformat()),
        )
        
        conn.commit()
        return cursor.lastrowid
    except sqlite3.IntegrityError as e:
        return None
    except sqlite3.Error as e:
        print(f"Erro ao criar usuário: {e}")
        return None
    finally:
        conn.close()