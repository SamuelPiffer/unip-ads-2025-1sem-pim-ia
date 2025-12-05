// Messages functionality
let conversations = [];
let currentConversation = null;
let isTyping = false;

// Sample conversations for demonstration
const sampleConversations = [
    {
        id: 1,
        type: 'ai',
        name: 'StudyAI Assistant',
        subject: 'Geral',
        lastMessage: 'Como posso ajudá-lo hoje?',
        timestamp: new Date().toISOString(),
        messages: [
            {
                id: 1,
                sender: 'ai',
                content: 'Olá! Sou seu assistente de estudos. Como posso ajudá-lo hoje?',
                timestamp: new Date(Date.now() - 3600000).toISOString()
            }
        ]
    },
    {
        id: 2,
        type: 'ai',
        name: 'Matemática - Álgebra',
        subject: 'math',
        lastMessage: 'Vamos resolver mais exercícios?',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        messages: [
            {
                id: 1,
                sender: 'user',
                content: 'Preciso de ajuda com equações do segundo grau',
                timestamp: new Date(Date.now() - 7200000).toISOString()
            },
            {
                id: 2,
                sender: 'ai',
                content: 'Claro! Equações do segundo grau têm a forma ax² + bx + c = 0. Vamos começar com um exemplo prático?',
                timestamp: new Date(Date.now() - 7100000).toISOString()
            },
            {
                id: 3,
                sender: 'ai',
                content: 'Vamos resolver mais exercícios?',
                timestamp: new Date(Date.now() - 7000000).toISOString()
            }
        ]
    },
    {
        id: 3,
        type: 'study-group',
        name: 'Grupo - Física Quântica',
        subject: 'science',
        lastMessage: 'Alguém entendeu o princípio da incerteza?',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        messages: [
            {
                id: 1,
                sender: 'user',
                content: 'Vamos estudar física quântica juntos?',
                timestamp: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 2,
                sender: 'other',
                content: 'Ótima ideia! Por onde começamos?',
                timestamp: new Date(Date.now() - 86300000).toISOString()
            },
            {
                id: 3,
                sender: 'other',
                content: 'Alguém entendeu o princípio da incerteza?',
                timestamp: new Date(Date.now() - 86200000).toISOString()
            }
        ]
    }
];

// Initialize messages functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('messages.html')) {
        initializeMessages();
        setupMessageEventListeners();
        loadConversations();
        
        // Set default conversation (StudyAI Assistant)
        if (conversations.length > 0) {
            selectConversation(conversations[0]);
        }
    }
});

function initializeMessages() {
    // Load conversations from localStorage or use sample data
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
        conversations = JSON.parse(savedConversations);
    } else {
        conversations = [...sampleConversations];
        localStorage.setItem('conversations', JSON.stringify(conversations));
    }
}

function setupMessageEventListeners() {
    // Send message
    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // New conversation
    document.getElementById('newConversationBtn').addEventListener('click', () => {
        openModal('newConversationModal');
    });
    
    // Conversation form
    document.getElementById('conversationForm').addEventListener('submit', handleNewConversation);
    
    // Search conversations
    document.getElementById('searchConversations').addEventListener('input', searchConversations);
    
    // Auto-resize message input
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
}

function loadConversations() {
    const conversationsList = document.getElementById('conversationsList');
    conversationsList.innerHTML = '';
    
    conversations.forEach(conversation => {
        const conversationElement = createConversationElement(conversation);
        conversationsList.appendChild(conversationElement);
    });
}

function createConversationElement(conversation) {
    const element = document.createElement('div');
    element.className = 'conversation-item';
    element.dataset.conversationId = conversation.id;
    
    const avatarClass = conversation.type === 'ai' ? 'ai' : 
                       conversation.type === 'study-group' ? 'group' : 'user';
    
    const avatarIcon = conversation.type === 'ai' ? 'fas fa-robot' :
                      conversation.type === 'study-group' ? 'fas fa-users' : 'fas fa-user';
    
    element.innerHTML = `
        <div class="conversation-avatar ${avatarClass}">
            <i class="${avatarIcon}"></i>
        </div>
        <div class="conversation-info">
            <div class="conversation-name">${conversation.name}</div>
            <div class="conversation-preview">${conversation.lastMessage}</div>
        </div>
        <div class="conversation-time">${formatMessageTime(conversation.timestamp)}</div>
    `;
    
    element.addEventListener('click', () => selectConversation(conversation));
    
    return element;
}

function selectConversation(conversation) {
    currentConversation = conversation;
    
    // Update active conversation in sidebar
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`[data-conversation-id="${conversation.id}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
    
    // Update chat header
    updateChatHeader(conversation);
    
    // Load messages
    loadMessages(conversation);
}

function updateChatHeader(conversation) {
    const chatHeader = document.getElementById('chatHeader');
    const avatarClass = conversation.type === 'ai' ? 'ai' : 
                       conversation.type === 'study-group' ? 'group' : 'user';
    
    const avatarIcon = conversation.type === 'ai' ? 'fas fa-robot' :
                      conversation.type === 'study-group' ? 'fas fa-users' : 'fas fa-user';
    
    chatHeader.innerHTML = `
        <div class="chat-info">
            <div class="chat-avatar ${avatarClass}">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="chat-details">
                <h3>${conversation.name}</h3>
                <span class="status online">Online</span>
            </div>
        </div>
        <div class="chat-actions">
            <button class="btn btn-outline btn-sm">
                <i class="fas fa-info-circle"></i>
            </button>
        </div>
    `;
}

function loadMessages(conversation) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    if (conversation.messages && conversation.messages.length > 0) {
        conversation.messages.forEach(message => {
            const messageElement = createMessageElement(message);
            chatMessages.appendChild(messageElement);
        });
    } else {
        // Show welcome message for new conversations
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = `
            <div class="ai-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <h3>Bem-vindo!</h3>
                <p>Esta é uma nova conversa. Como posso ajudá-lo?</p>
            </div>
        `;
        chatMessages.appendChild(welcomeMessage);
    }
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function createMessageElement(message) {
    const element = document.createElement('div');
    element.className = `message-bubble ${message.sender}`;
    
    if (message.sender === 'ai') {
        element.innerHTML = `
            <div class="ai-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-text">${message.content}</div>
        `;
    } else {
        element.innerHTML = `
            <div class="message-text">${message.content}</div>
        `;
    }
    
    return element;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value.trim();
    
    if (!content) return;
    
    if (!currentConversation) {
        showNotification('Selecione uma conversa primeiro.', 'error');
        return;
    }
    
    // Create user message
    const userMessage = {
        id: Date.now(),
        sender: 'user',
        content: content,
        timestamp: new Date().toISOString()
    };
    
    // Add message to conversation
    if (!currentConversation.messages) {
        currentConversation.messages = [];
    }
    currentConversation.messages.push(userMessage);
    
    // Update conversation timestamp and last message
    currentConversation.timestamp = userMessage.timestamp;
    currentConversation.lastMessage = content;
    
    // Display user message
    const chatMessages = document.getElementById('chatMessages');
    const userMessageElement = createMessageElement(userMessage);
    chatMessages.appendChild(userMessageElement);
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show typing indicator for AI response
    if (currentConversation.type === 'ai') {
        showTypingIndicator();
        
        // Simulate AI response delay
        setTimeout(() => {
            hideTypingIndicator();
            generateAIResponse(content);
        }, 1500 + Math.random() * 1000);
    }
    
    // Save conversations
    saveConversations();
    
    // Update conversations list
    loadConversations();
    selectConversation(currentConversation);
}

function showTypingIndicator() {
    if (isTyping) return;
    
    isTyping = true;
    const chatMessages = document.getElementById('chatMessages');
    
    const typingElement = document.createElement('div');
    typingElement.className = 'typing-indicator';
    typingElement.id = 'typingIndicator';
    typingElement.innerHTML = `
        <div class="ai-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateAIResponse(userMessage) {
    const aiResponse = getAIResponse(userMessage);
    
    const aiMessage = {
        id: Date.now(),
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date().toISOString()
    };
    
    // Add AI message to conversation
    currentConversation.messages.push(aiMessage);
    currentConversation.timestamp = aiMessage.timestamp;
    currentConversation.lastMessage = aiResponse;
    
    // Display AI message
    const chatMessages = document.getElementById('chatMessages');
    const aiMessageElement = createMessageElement(aiMessage);
    chatMessages.appendChild(aiMessageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Save conversations
    saveConversations();
    
    // Update conversations list
    loadConversations();
    selectConversation(currentConversation);
}

function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde') || lowerMessage.includes('boa noite')) {
        return 'Olá! É um prazer conversar com você. Como posso ajudá-lo com seus estudos hoje?';
    }
    
    // Math responses
    if (lowerMessage.includes('matemática') || lowerMessage.includes('equação') || lowerMessage.includes('cálculo') || lowerMessage.includes('álgebra')) {
        return 'Matemática é uma área fascinante! Posso ajudá-lo com álgebra, geometria, cálculo, estatística e muito mais. Qual tópico específico você gostaria de estudar?';
    }
    
    // Science responses
    if (lowerMessage.includes('física') || lowerMessage.includes('química') || lowerMessage.includes('biologia') || lowerMessage.includes('ciência')) {
        return 'As ciências são fundamentais para entender o mundo ao nosso redor. Posso explicar conceitos de física, química, biologia e outras áreas científicas. Sobre qual assunto você tem dúvidas?';
    }
    
    // Language responses
    if (lowerMessage.includes('português') || lowerMessage.includes('gramática') || lowerMessage.includes('redação') || lowerMessage.includes('literatura')) {
        return 'O domínio da língua portuguesa é essencial! Posso ajudá-lo com gramática, interpretação de texto, redação, literatura e muito mais. Qual aspecto da língua você gostaria de melhorar?';
    }
    
    // History responses
    if (lowerMessage.includes('história') || lowerMessage.includes('histórico')) {
        return 'A história nos ajuda a compreender o presente através do passado. Posso explicar eventos históricos, contextos sociais, políticos e culturais. Qual período ou evento histórico te interessa?';
    }
    
    // Study tips
    if (lowerMessage.includes('como estudar') || lowerMessage.includes('dicas de estudo') || lowerMessage.includes('método de estudo')) {
        return 'Ótima pergunta! Algumas dicas eficazes de estudo incluem: 1) Criar um cronograma de estudos, 2) Fazer resumos e mapas mentais, 3) Praticar exercícios regularmente, 4) Ensinar o conteúdo para outras pessoas, 5) Fazer pausas regulares. Quer que eu detalhe alguma dessas técnicas?';
    }
    
    // Help responses
    if (lowerMessage.includes('ajuda') || lowerMessage.includes('socorro') || lowerMessage.includes('não entendo')) {
        return 'Estou aqui para ajudar! Não se preocupe, aprender pode ser desafiador às vezes. Vamos quebrar o problema em partes menores. Pode me contar especificamente onde está com dificuldade?';
    }
    
    // Thank you responses
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada') || lowerMessage.includes('valeu') || lowerMessage.includes('muito obrigado')) {
        return 'De nada! Fico feliz em poder ajudar. Se tiver mais dúvidas ou quiser estudar outros tópicos, estarei sempre aqui. Bons estudos!';
    }
    
    // Default response
    return 'Interessante pergunta! Para te dar a melhor resposta possível, você poderia fornecer mais detalhes sobre o que especificamente gostaria de saber? Assim posso explicar de forma mais clara e direcionada.';
}

function handleNewConversation(e) {
    e.preventDefault();
    
    const type = document.getElementById('conversationType').value;
    const subject = document.getElementById('conversationSubject').value;
    const topic = document.getElementById('conversationTopic').value;
    
    if (!type || !subject || !topic) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    const newConversation = {
        id: Date.now(),
        type: type,
        name: type === 'ai' ? `IA - ${topic}` : 
              type === 'study-group' ? `Grupo - ${topic}` : 
              `Tutor - ${topic}`,
        subject: subject,
        lastMessage: 'Nova conversa iniciada',
        timestamp: new Date().toISOString(),
        messages: []
    };
    
    conversations.unshift(newConversation);
    saveConversations();
    loadConversations();
    selectConversation(newConversation);
    
    closeModal('newConversationModal');
    document.getElementById('conversationForm').reset();
    showNotification('Nova conversa criada!', 'success');
}

function searchConversations() {
    const searchTerm = document.getElementById('searchConversations').value.toLowerCase();
    const conversationItems = document.querySelectorAll('.conversation-item');
    
    conversationItems.forEach(item => {
        const name = item.querySelector('.conversation-name').textContent.toLowerCase();
        const preview = item.querySelector('.conversation-preview').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || preview.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function saveConversations() {
    localStorage.setItem('conversations', JSON.stringify(conversations));
}

function formatMessageTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 2) {
        return 'Ontem';
    } else if (diffDays < 7) {
        return `${diffDays} dias`;
    } else {
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMessages,
        sendMessage,
        generateAIResponse
    };
}