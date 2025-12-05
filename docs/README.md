# StudyAI - Plataforma de Estudos com Inteligência Artificial

## Descrição

O StudyAI é uma plataforma educacional moderna que integra inteligência artificial para auxiliar estudantes em suas dúvidas acadêmicas. A aplicação permite que usuários façam perguntas, recebam respostas da IA e interajam com uma comunidade de estudantes.

## Características Principais

- **Sistema de Autenticação**: Registro e login de usuários com segurança
- **Perguntas e Respostas com IA**: Interface para fazer perguntas e receber respostas inteligentes
- **Feed de Perguntas**: Visualize perguntas recentes da comunidade
- **Filtros e Busca**: Filtre perguntas por categoria e use busca avançada
- **Interface Responsiva**: Design moderno e adaptável para dispositivos móveis
- **Dashboard de Usuário**: Perfil pessoal, conquistas e configurações

## Tecnologias Utilizadas

### Backend
- **Python 3.8+**
- **Flask 2.3.3**: Framework web
- **SQLite**: Banco de dados
- **Werkzeug**: Segurança de senhas
- **Flask-CORS**: Suporte a CORS

### Frontend
- **HTML5, CSS3, JavaScript ES6+**
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter
- **Design Responsivo**: Mobile-first

## Estrutura do Projeto

```
StudyAI/
├── backend/                    # Código do servidor
│   ├── api/                   # Rotas e controllers
│   │   ├── auth.py           # Autenticação (registro/login)
│   │   └── routes.py         # Rotas principais
│   ├── models/                # Modelos de dados
│   │   └── database.py       # Conexão e operações do banco
│   ├── services/              # Lógica de negócios
│   └── utils/                 # Utilitários
├── frontend/                  # Código do cliente
│   ├── static/               # Arquivos estáticos
│   │   ├── css/              # Estilos
│   │   ├── js/               # JavaScript
│   │   └── images/           # Imagens
│   └── templates/            # Templates HTML
├── config/                    # Configurações
│   └── config.py             # Configurações da aplicação
├── docs/                      # Documentação
├── tests/                     # Testes
├── database.db               # Banco de dados SQLite
├── app.py                    # Aplicação principal
├── app_debug.py              # Versão debug para desenvolvimento
├── main.py                   # Entry point alternativo
└── requirements.txt          # Dependências Python
```

## Instalação e Configuração

### Pré-requisitos
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd StudyAI
   ```

2. **Crie um ambiente virtual**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # ou
   venv\Scripts\activate  # Windows
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Inicie a aplicação**
   ```bash
   python app.py
   ```

5. **Acesse a aplicação**
   Abra seu navegador e acesse: `http://localhost:5000`

## Uso da Aplicação

### Para Usuários
1. **Registro**: Crie uma conta com nome, email e senha
2. **Login**: Acesse sua conta existente
3. **Fazer Perguntas**: Use a caixa de busca na página inicial
4. **Explorar**: Navegue pelas perguntas da comunidade
5. **Perfil**: Gerencie suas informações e conquistas

### Para Desenvolvedores
- **Modo Debug**: Use `app_debug.py` para desenvolvimento
- **API Endpoints**: Documentação disponível em `/health`
- **Banco de Dados**: SQLite com esquema simples e eficiente

## API Endpoints

### Autenticação
- `POST /api/register` - Registro de novo usuário
- `POST /api/login` - Login de usuário existente

### Utilitários
- `GET /health` - Verificação de saúde da aplicação

## Segurança

- Senhas são hasheadas usando Werkzeug
- Validação de entrada de dados
- Proteção contra SQL injection
- CORS configurado para segurança

## Desenvolvimento

### Estrutura de Branches
- `main`: Código estável em produção
- `develop`: Código em desenvolvimento
- `feature/*`: Novas funcionalidades

### Padrões de Código
- PEP 8 para Python
- Nomes descritivos para funções e variáveis
- Comentários em português
- Estrutura modular e organizada

## Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

Para dúvidas e suporte, entre em contato através do email: suporte@studyai.com

---

**StudyAI** - Transformando a forma como estudantes aprendem com IA.