// Achievements Page JavaScript

// Achievement data structure
const achievementsData = {
    study: [
        { id: 'first-question', name: 'Primeiro Passo', description: 'Faça sua primeira pergunta', xp: 50, unlocked: true },
        { id: 'dedicated-student', name: 'Estudante Dedicado', description: 'Estude por 7 dias consecutivos', xp: 200, unlocked: true },
        { id: 'math-master', name: 'Mestre da Matemática', description: 'Responda 50 perguntas de matemática', xp: 300, unlocked: true },
        { id: 'physics-expert', name: 'Físico Experiente', description: 'Responda 100 perguntas de física', xp: 500, unlocked: false, progress: 67, total: 100 },
        { id: 'ai-genius', name: 'Gênio da IA', description: 'Use a IA para responder 200 perguntas', xp: 600, unlocked: false, progress: 127, total: 200 }
    ],
    social: [
        { id: 'first-like', name: 'Primeira Curtida', description: 'Receba sua primeira curtida', xp: 25, unlocked: true },
        { id: 'collaborator', name: 'Colaborador', description: 'Ajude 5 pessoas com suas respostas', xp: 150, unlocked: true },
        { id: 'mentor', name: 'Mentor', description: 'Ajude 25 pessoas com suas respostas', xp: 400, unlocked: false, progress: 8, total: 25 },
        { id: 'conversationalist', name: 'Conversador', description: 'Envie 100 mensagens', xp: 250, unlocked: false, progress: 45, total: 100 }
    ],
    special: [
        { id: 'founding-member', name: 'Membro Fundador', description: 'Um dos primeiros 100 usuários', xp: 1000, unlocked: true, special: true },
        { id: 'on-fire', name: 'Em Chamas', description: 'Mantenha uma sequência de 30 dias', xp: 750, unlocked: true, special: true }
    ],
    progress: [
        { id: 'level-10', name: 'Nível 10', description: 'Alcance o nível 10', xp: 300, unlocked: true },
        { id: 'champion', name: 'Campeão', description: 'Alcance o nível 25', xp: 1000, unlocked: false, progress: 12, total: 25 }
    ]
};

// User progress data
let userProgress = {
    level: 12,
    currentXP: 2450,
    nextLevelXP: 3000,
    totalAchievements: 23,
    unlockedAchievements: 0,
    streakDays: 15,
    questionsAnswered: 127,
    peopleHelped: 8
};

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const achievementCards = document.querySelectorAll('.achievement-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter achievements
            filterAchievements(targetCategory, document.getElementById('achievementFilter').value);
        });
    });
}

// Filter functionality
function initializeFilters() {
    const filterSelect = document.getElementById('achievementFilter');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
            filterAchievements(activeTab, e.target.value);
        });
    }
}

function filterAchievements(category, filter) {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const isUnlocked = card.classList.contains('unlocked');
        const isRecent = card.classList.contains('recent');
        
        let showCard = true;
        
        // Category filter
        if (category !== 'all' && cardCategory !== category) {
            showCard = false;
        }
        
        // Status filter
        switch (filter) {
            case 'unlocked':
                if (!isUnlocked) showCard = false;
                break;
            case 'locked':
                if (isUnlocked) showCard = false;
                break;
            case 'recent':
                if (!isRecent) showCard = false;
                break;
        }
        
        card.style.display = showCard ? 'flex' : 'none';
    });
}

// Achievement interactions
function initializeAchievementInteractions() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('click', () => {
            showAchievementDetails(card);
        });
    });
}

function showAchievementDetails(card) {
    const title = card.querySelector('.achievement-info h3').textContent;
    const description = card.querySelector('.achievement-info p').textContent;
    const xp = card.querySelector('.achievement-reward span').textContent;
    const isUnlocked = card.classList.contains('unlocked');
    
    let detailsHTML = `
        <div class="achievement-details">
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="achievement-status">
                <span class="status ${isUnlocked ? 'unlocked' : 'locked'}">
                    ${isUnlocked ? '✓ Desbloqueada' : '🔒 Bloqueada'}
                </span>
                <span class="xp-reward">${xp}</span>
            </div>
        </div>
    `;
    
    // Show details in a tooltip or modal
    showNotification(detailsHTML, 'info', 5000);
}

// Progress tracking
function updateProgress() {
    // Update XP bar
    const xpProgress = document.querySelector('.xp-progress');
    const xpPercentage = (userProgress.currentXP / userProgress.nextLevelXP) * 100;
    if (xpProgress) {
        xpProgress.style.width = `${xpPercentage}%`;
    }
    
    // Update stats
    updateStatCards();
    
    // Count unlocked achievements
    userProgress.unlockedAchievements = document.querySelectorAll('.achievement-card.unlocked').length;
}

function updateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    const stats = [
        userProgress.unlockedAchievements || 23,
        userProgress.streakDays,
        userProgress.questionsAnswered,
        userProgress.peopleHelped
    ];
    
    statCards.forEach((card, index) => {
        const statValue = card.querySelector('h3');
        if (statValue && stats[index] !== undefined) {
            animateNumber(statValue, 0, stats[index], 1000);
        }
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Achievement unlock simulation
function simulateAchievementUnlock(achievementId) {
    const achievement = findAchievementById(achievementId);
    if (!achievement) return;
    
    showAchievementUnlockModal(achievement);
    
    // Update user progress
    userProgress.currentXP += achievement.xp;
    achievement.unlocked = true;
    
    // Check for level up
    checkLevelUp();
    
    // Update UI
    updateProgress();
    markAchievementAsUnlocked(achievementId);
}

function findAchievementById(id) {
    for (const category in achievementsData) {
        const achievement = achievementsData[category].find(a => a.id === id);
        if (achievement) return achievement;
    }
    return null;
}

function showAchievementUnlockModal(achievement) {
    const modal = document.getElementById('achievementModal');
    const title = document.getElementById('unlockTitle');
    const description = document.getElementById('unlockDescription');
    const xp = document.getElementById('unlockXP');
    
    if (modal && title && description && xp) {
        title.textContent = achievement.name;
        description.textContent = achievement.description;
        xp.textContent = `+${achievement.xp} XP`;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Play unlock sound (if available)
        playUnlockSound();
    }
}

function closeAchievementUnlockModal() {
    const modal = document.getElementById('achievementModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function markAchievementAsUnlocked(achievementId) {
    const achievementCard = document.querySelector(`[data-achievement-id="${achievementId}"]`);
    if (achievementCard) {
        achievementCard.classList.remove('locked');
        achievementCard.classList.add('unlocked');
        
        // Update progress text
        const progressElement = achievementCard.querySelector('.achievement-progress');
        if (progressElement) {
            progressElement.innerHTML = '<span>Concluído</span>';
        }
    }
}

function checkLevelUp() {
    if (userProgress.currentXP >= userProgress.nextLevelXP) {
        userProgress.level++;
        userProgress.currentXP -= userProgress.nextLevelXP;
        userProgress.nextLevelXP = calculateNextLevelXP(userProgress.level);
        
        showLevelUpNotification();
        
        // Check for level-based achievements
        checkLevelAchievements();
    }
}

function calculateNextLevelXP(level) {
    return Math.floor(1000 + (level * 200)); // Progressive XP requirement
}

function showLevelUpNotification() {
    showNotification(`🎉 Parabéns! Você alcançou o nível ${userProgress.level}!`, 'success', 4000);
}

function checkLevelAchievements() {
    if (userProgress.level === 15) {
        simulateAchievementUnlock('level-15');
    } else if (userProgress.level === 25) {
        simulateAchievementUnlock('champion');
    }
}

function playUnlockSound() {
    // Create a simple audio context for achievement sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio not supported');
    }
}

// Progress simulation for locked achievements
function simulateProgressUpdate() {
    // Simulate progress on locked achievements
    const lockedCards = document.querySelectorAll('.achievement-card.locked');
    
    lockedCards.forEach(card => {
        const progressBar = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.achievement-progress span');
        
        if (progressBar && progressText) {
            // Randomly increase progress
            const currentWidth = parseFloat(progressBar.style.width) || 0;
            const increase = Math.random() * 5; // Random increase up to 5%
            const newWidth = Math.min(currentWidth + increase, 95); // Cap at 95%
            
            progressBar.style.width = `${newWidth}%`;
            
            // Update text if it contains numbers
            const match = progressText.textContent.match(/(\d+)\/(\d+)/);
            if (match) {
                const current = parseInt(match[1]);
                const total = parseInt(match[2]);
                const newCurrent = Math.floor((newWidth / 100) * total);
                progressText.textContent = `${newCurrent}/${total}`;
                
                // Check if achievement should be unlocked
                if (newCurrent >= total) {
                    const achievementId = card.getAttribute('data-achievement-id');
                    if (achievementId) {
                        setTimeout(() => simulateAchievementUnlock(achievementId), 500);
                    }
                }
            }
        }
    });
}

// Modal event listeners
function initializeModals() {
    const closeBtn = document.getElementById('closeUnlockModal');
    const modal = document.getElementById('achievementModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAchievementUnlockModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAchievementUnlockModal();
            }
        });
    }
}

// Utility function for notifications
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    if (typeof message === 'string') {
        notification.textContent = message;
    } else {
        notification.innerHTML = message;
    }
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after duration
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Add achievement IDs to cards for easier tracking
function addAchievementIds() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    const allAchievements = [];
    
    // Flatten all achievements
    for (const category in achievementsData) {
        allAchievements.push(...achievementsData[category]);
    }
    
    achievementCards.forEach((card, index) => {
        if (allAchievements[index]) {
            card.setAttribute('data-achievement-id', allAchievements[index].id);
        }
    });
}

// Demo functionality - simulate user actions
function initializeDemoActions() {
    // Simulate progress updates every 10 seconds
    setInterval(simulateProgressUpdate, 10000);
    
    // Add click handlers for demo achievements
    setTimeout(() => {
        const lockedCards = document.querySelectorAll('.achievement-card.locked');
        if (lockedCards.length > 0) {
            showNotification('💡 Dica: Continue estudando para desbloquear mais conquistas!', 'info', 4000);
        }
    }, 3000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeFilters();
    initializeAchievementInteractions();
    initializeModals();
    addAchievementIds();
    updateProgress();
    initializeDemoActions();
    
    // Mark recent achievements
    const recentAchievements = ['math-master', 'on-fire', 'level-10'];
    recentAchievements.forEach(id => {
        const card = document.querySelector(`[data-achievement-id="${id}"]`);
        if (card) {
            card.classList.add('recent');
        }
    });
    
    console.log('Achievements page initialized successfully!');
});