// Global State
let currentUser = null;
let questions = [];
let isLoggedIn = false;

// Sample data for demonstration
const sampleQuestions = [
    {
        id: 1,
        title: "Como resolver equações do segundo grau?",
        content: "Estou com dificuldade para entender o método de resolução de equações quadráticas. Podem me ajudar?",
        category: "Matemática",
        author: "Maria Silva",
        timestamp: "2024-01-15T10:30:00Z",
        answers: 3,
        likes: 12,
        aiAnswer: "Para resolver equações do segundo grau (ax² + bx + c = 0), você pode usar a fórmula de Bhaskara: x = (-b ± √(b² - 4ac)) / 2a."
    },
    {
        id: 2,
        title: "Qual a diferença entre mitose e meiose?",
        content: "Preciso entender as principais diferenças entre esses dois processos de divisão celular para minha prova de biologia.",
        category: "Ciências",
        author: "João Santos",
        timestamp: "2024-01-15T09:15:00Z",
        answers: 5,
        likes: 8,
        aiAnswer: "A mitose é um processo de divisão celular que produz duas células filhas geneticamente idênticas à célula mãe."
    },
    {
        id: 3,
        title: "Como usar vírgulas corretamente?",
        content: "Sempre tenho dúvidas sobre quando usar vírgulas em textos. Quais são as regras principais?",
        category: "Português",
        author: "Ana Costa",
        timestamp: "2024-01-15T08:45:00Z",
        answers: 2,
        likes: 15,
        aiAnswer: "As vírgulas têm várias funções: 1) Separar elementos de uma enumeração; 2) Isolar vocativos; 3) Separar apostos."
    },
    {
        id: 4,
        title: "Quais foram as causas da Primeira Guerra Mundial?",
        content: "Estou estudando para o vestibular e preciso entender os fatores que levaram ao início da Primeira Guerra Mundial.",
        category: "História",
        author: "Pedro Oliveira",
        timestamp: "2024-01-16T09:15:00Z",
        answers: 4,
        likes: 9,
        aiAnswer: "As principais causas da Primeira Guerra Mundial incluem: 1) Imperialismo e disputa por colônias; 2) Nacionalismo exacerbado."
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadQuestions();
});

function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateUIForLoggedInUser();
    }
    
    // Load questions from localStorage or use sample data
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
        questions = JSON.parse(savedQuestions);
    } else {
        questions = [...sampleQuestions];
        localStorage.setItem('questions', JSON.stringify(questions));
    }
}

function setupEventListeners() {
    // Auth buttons
    document.getElementById('loginBtn').addEventListener('click', () => openModal('loginModal'));
    document.getElementById('registerBtn').addEventListener('click', () => openModal('registerModal'));
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Navigation
    document.getElementById('questionsLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.questions-feed').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Modal switches
    document.getElementById('switchToRegister').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('loginModal');
        openModal('registerModal');
    });
    
    document.getElementById('switchToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('registerModal');
        openModal('loginModal');
    });
    
    // Forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Ask question
    document.getElementById('askBtn').addEventListener('click', handleAskQuestion);
    document.getElementById('questionInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAskQuestion();
        }
    });
    
    // Close modals
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = e.target.closest('.close-btn').dataset.modal;
            closeModal(modalId);
        });
    });
    
    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

// Authentication functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                currentUser = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                };
                
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                isLoggedIn = true;
                updateUIForLoggedInUser();
                closeModal('loginModal');
                showNotification('Login realizado com sucesso!', 'success');
            } else {
                showNotification(data.error || 'Credenciais inválidas.', 'error');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            showNotification('Erro de conexão. Verifique se o servidor está rodando.', 'error');
        });
    } else {
        showNotification('Por favor, preencha todos os campos.', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (name && email && password) {
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                currentUser = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                };
                
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                isLoggedIn = true;
                updateUIForLoggedInUser();
                closeModal('registerModal');
                showNotification('Cadastro realizado com sucesso!', 'success');
            } else {
                showNotification(data.error || 'Erro ao cadastrar. Tente novamente.', 'error');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            showNotification('Erro de conexão. Verifique se o servidor está rodando.', 'error');
        });
    } else {
        showNotification('Por favor, preencha todos os campos.', 'error');
    }
}

function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('currentUser');
    updateUIForLoggedOutUser();
    showNotification('Logout realizado com sucesso!', 'success');
}

function updateUIForLoggedInUser() {
    document.querySelector('.auth-buttons').style.display = 'none';
    document.getElementById('userMenu').style.display = 'block';
    document.getElementById('userName').textContent = currentUser.name;
}

function updateUIForLoggedOutUser() {
    document.querySelector('.auth-buttons').style.display = 'flex';
    document.getElementById('userMenu').style.display = 'none';
}

// Question handling
async function handleAskQuestion() {
    const questionText = document.getElementById('questionInput').value.trim();
    
    if (!questionText) {
        showNotification('Por favor, digite sua pergunta.', 'error');
        return;
    }
    
    if (!isLoggedIn) {
        showNotification('Faça login para fazer perguntas.', 'error');
        openModal('loginModal');
        return;
    }
    
    try {
        // Detectar categoria da pergunta
        const category = detectCategory(questionText);
        
        // Criar pergunta na API
        const response = await fetch('/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: questionText.substring(0, 100), // Primeiros 100 caracteres como título
                content: questionText,
                category: category,
                user_id: currentUser.id
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Pergunta criada com sucesso!', 'success');
            document.getElementById('questionInput').value = '';
            
            // Recarregar perguntas
            loadQuestions();
            
            // Obter resposta da IA
            getAIAnswer(questionText);
        } else {
            showNotification(data.error || 'Erro ao criar pergunta.', 'error');
        }
    } catch (error) {
        console.error('Erro ao criar pergunta:', error);
        showNotification('Erro de conexão. Tente novamente.', 'error');
    }
}

function getAIAnswer(question, questionId = null) {
    const aiAnswers = {
        "matematica": "Para problemas de matemática, recomendo revisar os conceitos básicos e praticar com exercícios similares.",
        "ciencias": "Ciências são fundamentais para entender o mundo ao nosso redor. Tente relacionar os conceitos com situações do cotidiano.",
        "portugues": "A língua portuguesa tem suas particularidades. A prática regular de leitura e escrita ajuda muito.",
        "historia": "História nos ajuda a entender como chegamos até aqui. Tente fazer conexões entre diferentes períodos e eventos."
    };
    
    const category = detectCategory(question);
    const answer = aiAnswers[category] || "Ótima pergunta! Continue explorando e buscando conhecimento.";
    
    showNotification(`Resposta da IA: ${answer}`, 'success');
}

function detectCategory(question) {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('equação') || lowerQuestion.includes('matemática')) return 'matematica';
    if (lowerQuestion.includes('célula') || lowerQuestion.includes('biologia')) return 'ciencias';
    if (lowerQuestion.includes('gramática') || lowerQuestion.includes('português')) return 'portugues';
    if (lowerQuestion.includes('guerra') || lowerQuestion.includes('história')) return 'historia';
    return 'geral';
}

// UI Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function createQuestionElement(question) {
    const element = document.createElement('div');
    element.className = 'question-card';
    
    // Verificar se há respostas da IA
    const hasAIAnswer = question.ai_answer_count > 0;
    
    element.innerHTML = `
        <div class="question-header">
            <div>
                <h3 class="question-title">${question.title}</h3>
                <span class="question-category">${question.category}</span>
            </div>
        </div>
        <p class="question-content">${question.content}</p>
        ${hasAIAnswer ? `
            <div class="ai-answer">
                <div class="ai-answer-header">
                    <i class="fas fa-robot"></i>
                    <span>Resposta da IA</span>
                </div>
                <p>Esta pergunta já possui ${question.ai_answer_count} resposta(s) da IA</p>
            </div>
        ` : `
            <div class="no-ai-answer">
                <p><i class="fas fa-clock"></i> Aguardando resposta da IA...</p>
            </div>
        `}
        <div class="question-actions">
            <button class="action-btn like-btn" onclick="toggleLike(${question.id})">
                <i class="fas fa-heart"></i>
                <span>0</span>
            </button>
            <button class="action-btn comment-btn">
                <i class="fas fa-comment"></i>
                <span>${question.answer_count}</span>
            </button>
            <button class="action-btn share-btn">
                <i class="fas fa-share"></i>
                <span>Compartilhar</span>
            </button>
        </div>
        <div class="question-meta">
            <div class="question-author">
                <i class="fas fa-user"></i>
                <span>${question.author_name}</span>
            </div>
            <div class="question-time">
                <i class="fas fa-clock"></i>
                <span>${formatDate(question.created_at)}</span>
            </div>
        </div>
    `;
    
    return element;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Hoje';
    } else if (diffDays === 2) {
        return 'Ontem';
    } else if (diffDays < 7) {
        return `${diffDays} dias atrás`;
    } else {
        return date.toLocaleDateString('pt-BR');
    }
}

async function loadQuestions() {
    const questionsList = document.getElementById('questionsList');
    if (!questionsList) {
        console.log('questionsList element not found');
        return;
    }
    
    try {
        // Carregar perguntas da API
        const response = await fetch('/api/questions');
        const data = await response.json();
        
        if (data.questions) {
            questionsList.innerHTML = '';
            
            data.questions.forEach(question => {
                const questionElement = createQuestionElement(question);
                questionsList.appendChild(questionElement);
            });
        } else {
            console.log('No questions found');
            questionsList.innerHTML = '<p>Nenhuma pergunta encontrada.</p>';
        }
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
        questionsList.innerHTML = '<p>Erro ao carregar perguntas.</p>';
    }
}