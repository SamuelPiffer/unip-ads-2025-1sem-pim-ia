// Profile Page JavaScript

// Global state
let currentUser = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    avatar: 'JS',
    joinDate: '2023-01-15',
    stats: {
        questionsAsked: 45,
        answersGiven: 128,
        bestAnswers: 67,
        points: 2450,
        streak: 15,
        helpfulVotes: 234
    },
    subjects: ['Matemática', 'Física', 'Química'],
    notifications: {
        email: true,
        push: true,
        answers: true,
        comments: true,
        achievements: true
    }
};

let recentActivity = [
    {
        type: 'answer',
        icon: '💡',
        text: 'Respondeu uma pergunta sobre "Equações do 2º grau"',
        time: '2 horas atrás'
    },
    {
        type: 'question',
        icon: '❓',
        text: 'Fez uma pergunta sobre "Leis de Newton"',
        time: '1 dia atrás'
    },
    {
        type: 'achievement',
        icon: '🏆',
        text: 'Conquistou o badge "Especialista em Matemática"',
        time: '2 dias atrás'
    },
    {
        type: 'vote',
        icon: '👍',
        text: 'Recebeu 5 votos positivos em uma resposta',
        time: '3 dias atrás'
    }
];

let achievements = [
    {
        id: 1,
        name: 'Primeira Pergunta',
        description: 'Fez sua primeira pergunta na plataforma',
        icon: '🎯',
        earned: true,
        earnedDate: '2023-01-15'
    },
    {
        id: 2,
        name: 'Especialista em Matemática',
        description: 'Respondeu 50 perguntas de matemática',
        icon: '🧮',
        earned: true,
        earnedDate: '2023-11-20'
    },
    {
        id: 3,
        name: 'Mentor Dedicado',
        description: 'Ajudou 100 estudantes com suas dúvidas',
        icon: '👨‍🏫',
        earned: true,
        earnedDate: '2023-12-01'
    },
    {
        id: 4,
        name: 'Streak Master',
        description: 'Manteve uma sequência de 30 dias ativos',
        icon: '🔥',
        earned: false,
        progress: '15/30 dias'
    },
    {
        id: 5,
        name: 'Super Colaborador',
        description: 'Recebeu 500 votos positivos',
        icon: '⭐',
        earned: false,
        progress: '234/500 votos'
    },
    {
        id: 6,
        name: 'Gênio da Física',
        description: 'Respondeu 100 perguntas de física',
        icon: '⚛️',
        earned: false,
        progress: '23/100 respostas'
    }
];

// Initialize profile page
function initProfile() {
    loadUserData();
    setupEventListeners();
    showSection('overview');
}

// Load user data into the interface
function loadUserData() {
    // Update profile card
    document.querySelector('.profile-name').textContent = currentUser.name;
    document.querySelector('.profile-email').textContent = currentUser.email;
    document.querySelector('.profile-avatar').textContent = currentUser.avatar;
    
    // Update stats
    document.querySelector('[data-stat="questions"] .stat-number').textContent = currentUser.stats.questionsAsked;
    document.querySelector('[data-stat="answers"] .stat-number').textContent = currentUser.stats.answersGiven;
    document.querySelector('[data-stat="points"] .stat-number').textContent = currentUser.stats.points;
    
    // Load form data
    loadFormData();
}

// Setup event listeners
function setupEventListeners() {
    // Menu navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            showSection(section);
            
            // Update active menu item
            document.querySelectorAll('.menu-item').forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Form submissions
    document.getElementById('personalForm').addEventListener('submit', handlePersonalFormSubmit);
    document.getElementById('preferencesForm').addEventListener('submit', handlePreferencesFormSubmit);
    document.getElementById('notificationsForm').addEventListener('submit', handleNotificationsFormSubmit);
    
    // Avatar edit button
    document.querySelector('.avatar-edit-btn').addEventListener('click', handleAvatarEdit);
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Load section-specific content
        switch(sectionName) {
            case 'overview':
                loadOverviewContent();
                break;
            case 'questions':
                loadQuestionsContent();
                break;
            case 'answers':
                loadAnswersContent();
                break;
            case 'achievements':
                loadAchievementsContent();
                break;
        }
    }
}

// Load overview content
function loadOverviewContent() {
    // Update detailed stats
    document.querySelector('[data-detailed-stat="questions"] h3').textContent = currentUser.stats.questionsAsked;
    document.querySelector('[data-detailed-stat="answers"] h3').textContent = currentUser.stats.answersGiven;
    document.querySelector('[data-detailed-stat="best-answers"] h3').textContent = currentUser.stats.bestAnswers;
    document.querySelector('[data-detailed-stat="points"] h3').textContent = currentUser.stats.points;
    
    // Load recent activity
    const activityList = document.querySelector('.activity-list');
    activityList.innerHTML = '';
    
    recentActivity.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

// Load questions content
function loadQuestionsContent() {
    const questionsContainer = document.querySelector('#questions .section-content');
    if (!questionsContainer.querySelector('.questions-list')) {
        questionsContainer.innerHTML = `
            <div class="questions-list">
                <div class="question-item">
                    <h3>Como resolver equações do 2º grau?</h3>
                    <p>Matemática • 3 respostas • 15 visualizações</p>
                    <span class="question-date">Há 2 dias</span>
                </div>
                <div class="question-item">
                    <h3>Qual a diferença entre velocidade e aceleração?</h3>
                    <p>Física • 5 respostas • 28 visualizações</p>
                    <span class="question-date">Há 1 semana</span>
                </div>
                <div class="question-item">
                    <h3>Como balancear equações químicas?</h3>
                    <p>Química • 2 respostas • 12 visualizações</p>
                    <span class="question-date">Há 2 semanas</span>
                </div>
            </div>
        `;
    }
}

// Load answers content
function loadAnswersContent() {
    const answersContainer = document.querySelector('#answers .section-content');
    if (!answersContainer.querySelector('.answers-list')) {
        answersContainer.innerHTML = `
            <div class="answers-list">
                <div class="answer-item">
                    <h3>Resposta para: "Como calcular derivadas?"</h3>
                    <p>Matemática • 12 votos positivos • Melhor resposta</p>
                    <span class="answer-date">Há 1 dia</span>
                </div>
                <div class="answer-item">
                    <h3>Resposta para: "O que são ondas eletromagnéticas?"</h3>
                    <p>Física • 8 votos positivos</p>
                    <span class="answer-date">Há 3 dias</span>
                </div>
                <div class="answer-item">
                    <h3>Resposta para: "Como funciona a fotossíntese?"</h3>
                    <p>Biologia • 15 votos positivos • Melhor resposta</p>
                    <span class="answer-date">Há 1 semana</span>
                </div>
            </div>
        `;
    }
}

// Load achievements content
function loadAchievementsContent() {
    const achievementsGrid = document.querySelector('.achievements-grid');
    achievementsGrid.innerHTML = '';
    
    achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = `achievement-card ${achievement.earned ? 'earned' : ''}`;
        
        const statusText = achievement.earned 
            ? `<span class="achievement-date">Conquistado em ${formatDate(achievement.earnedDate)}</span>`
            : `<span class="achievement-progress">${achievement.progress}</span>`;
        
        achievementCard.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <h3>${achievement.name}</h3>
            <p>${achievement.description}</p>
            ${statusText}
        `;
        
        achievementsGrid.appendChild(achievementCard);
    });
}

// Load form data
function loadFormData() {
    // Personal information
    document.getElementById('fullName').value = currentUser.name;
    document.getElementById('email').value = currentUser.email;
    
    // Study preferences
    currentUser.subjects.forEach(subject => {
        const checkbox = document.querySelector(`input[value="${subject}"]`);
        if (checkbox) checkbox.checked = true;
    });
    
    // Notifications
    Object.keys(currentUser.notifications).forEach(key => {
        const toggle = document.getElementById(key);
        if (toggle) toggle.checked = currentUser.notifications[key];
    });
}

// Handle personal form submission
function handlePersonalFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    currentUser.name = formData.get('fullName');
    currentUser.email = formData.get('email');
    
    // Update avatar initials
    const nameParts = currentUser.name.split(' ');
    currentUser.avatar = nameParts.map(part => part[0]).join('').toUpperCase().slice(0, 2);
    
    loadUserData();
    showNotification('Informações pessoais atualizadas com sucesso!', 'success');
}

// Handle preferences form submission
function handlePreferencesFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    currentUser.subjects = formData.getAll('subjects');
    
    showNotification('Preferências de estudo atualizadas com sucesso!', 'success');
}

// Handle notifications form submission
function handleNotificationsFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Update notification preferences
    Object.keys(currentUser.notifications).forEach(key => {
        currentUser.notifications[key] = formData.has(key);
    });
    
    showNotification('Preferências de notificação atualizadas com sucesso!', 'success');
}

// Handle avatar edit
function handleAvatarEdit() {
    const newInitials = prompt('Digite suas iniciais (máximo 2 caracteres):', currentUser.avatar);
    if (newInitials && newInitials.length <= 2) {
        currentUser.avatar = newInitials.toUpperCase();
        document.querySelector('.profile-avatar').textContent = currentUser.avatar;
        showNotification('Avatar atualizado com sucesso!', 'success');
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    }
    
    .notification.success {
        border-left: 4px solid #10b981;
    }
    
    .notification.error {
        border-left: 4px solid #ef4444;
    }
    
    .notification.info {
        border-left: 4px solid #6366f1;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #64748b;
        padding: 0;
        margin-left: 1rem;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfile);
} else {
    initProfile();
}