// Settings Page JavaScript

// Settings data structure
let settingsData = {
    account: {
        fullName: 'João Silva',
        email: 'joao@email.com',
        username: 'joaosilva',
        bio: 'Estudante de Engenharia apaixonado por tecnologia e aprendizado.',
        twoFactor: false
    },
    privacy: {
        publicProfile: true,
        showStats: true,
        showAchievements: true,
        allowMessages: true,
        allowGroupInvites: true
    },
    notifications: {
        pushNotifications: true,
        messageNotifications: true,
        answerNotifications: true,
        achievementNotifications: true,
        weeklyDigest: true,
        studyReminders: true
    },
    appearance: {
        theme: 'light',
        fontSize: 'medium',
        accentColor: 'blue',
        animations: true
    },
    ai: {
        personality: 'professional',
        responseLength: 'detailed',
        autoSuggestions: true,
        autoCorrection: true,
        learningStyle: 'reading',
        difficultyLevel: 'intermediate',
        adaptiveLearning: true
    },
    data: {
        autoBackup: true,
        backupFrequency: 'daily'
    },
    advanced: {
        highPerformance: false,
        smartCache: true,
        betaAI: false,
        experimentalUI: false,
        developerMode: false,
        apiEndpoint: 'https://api.studyai.com'
    }
};

// Current active section
let currentSection = 'account';

// Initialize settings page
function initializeSettings() {
    initializeNavigation();
    loadSettingsData();
    initializeThemeOptions();
    initializeColorOptions();
    initializeFormHandlers();
    initializeToggleSwitches();
    
    console.log('Settings page initialized successfully!');
}

// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.settings-nav-btn');
    const panels = document.querySelectorAll('.settings-panel');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            switchToSection(targetSection);
        });
    });
}

function switchToSection(sectionName) {
    // Update navigation
    const navButtons = document.querySelectorAll('.settings-nav-btn');
    const panels = document.querySelectorAll('.settings-panel');
    
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${sectionName}-panel`) {
            panel.classList.add('active');
        }
    });
    
    currentSection = sectionName;
    
    // Load section-specific data
    loadSectionData(sectionName);
}

// Load settings data into forms
function loadSettingsData() {
    loadSectionData(currentSection);
}

function loadSectionData(section) {
    const sectionData = settingsData[section];
    if (!sectionData) return;
    
    // Load data based on section
    switch (section) {
        case 'account':
            loadAccountData(sectionData);
            break;
        case 'privacy':
            loadPrivacyData(sectionData);
            break;
        case 'notifications':
            loadNotificationData(sectionData);
            break;
        case 'appearance':
            loadAppearanceData(sectionData);
            break;
        case 'ai':
            loadAIData(sectionData);
            break;
        case 'data':
            loadDataData(sectionData);
            break;
        case 'advanced':
            loadAdvancedData(sectionData);
            break;
    }
}

function loadAccountData(data) {
    document.getElementById('fullName').value = data.fullName || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('username').value = data.username || '';
    document.getElementById('bio').value = data.bio || '';
    document.getElementById('twoFactor').checked = data.twoFactor || false;
}

function loadPrivacyData(data) {
    document.getElementById('publicProfile').checked = data.publicProfile;
    document.getElementById('showStats').checked = data.showStats;
    document.getElementById('showAchievements').checked = data.showAchievements;
    document.getElementById('allowMessages').checked = data.allowMessages;
    document.getElementById('allowGroupInvites').checked = data.allowGroupInvites;
}

function loadNotificationData(data) {
    document.getElementById('pushNotifications').checked = data.pushNotifications;
    document.getElementById('messageNotifications').checked = data.messageNotifications;
    document.getElementById('answerNotifications').checked = data.answerNotifications;
    document.getElementById('achievementNotifications').checked = data.achievementNotifications;
    document.getElementById('weeklyDigest').checked = data.weeklyDigest;
    document.getElementById('studyReminders').checked = data.studyReminders;
}

function loadAppearanceData(data) {
    // Set theme
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === data.theme) {
            option.classList.add('active');
        }
    });
    
    // Set other appearance settings
    document.getElementById('fontSize').value = data.fontSize;
    document.getElementById('animations').checked = data.animations;
    
    // Set accent color
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-color') === data.accentColor) {
            option.classList.add('active');
        }
    });
}

function loadAIData(data) {
    document.getElementById('aiPersonality').value = data.personality;
    document.getElementById('responseLength').value = data.responseLength;
    document.getElementById('autoSuggestions').checked = data.autoSuggestions;
    document.getElementById('autoCorrection').checked = data.autoCorrection;
    document.getElementById('learningStyle').value = data.learningStyle;
    document.getElementById('difficultyLevel').value = data.difficultyLevel;
    document.getElementById('adaptiveLearning').checked = data.adaptiveLearning;
}

function loadDataData(data) {
    document.getElementById('autoBackup').checked = data.autoBackup;
    document.getElementById('backupFrequency').value = data.backupFrequency;
}

function loadAdvancedData(data) {
    document.getElementById('highPerformance').checked = data.highPerformance;
    document.getElementById('smartCache').checked = data.smartCache;
    document.getElementById('betaAI').checked = data.betaAI;
    document.getElementById('experimentalUI').checked = data.experimentalUI;
    document.getElementById('developerMode').checked = data.developerMode;
    document.getElementById('apiEndpoint').value = data.apiEndpoint;
}

// Theme functionality
function initializeThemeOptions() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            selectTheme(theme);
        });
    });
}

function selectTheme(theme) {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        }
    });
    
    settingsData.appearance.theme = theme;
    applyTheme(theme);
}

function applyTheme(theme) {
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('light-theme', 'dark-theme');
    
    if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else if (theme === 'light') {
        body.classList.add('light-theme');
    } else if (theme === 'auto') {
        // Auto theme based on system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
    }
    
    showNotification(`Tema alterado para: ${getThemeName(theme)}`, 'success');
}

function getThemeName(theme) {
    const names = {
        light: 'Claro',
        dark: 'Escuro',
        auto: 'Automático'
    };
    return names[theme] || theme;
}

// Color functionality
function initializeColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            selectAccentColor(color);
        });
    });
}

function selectAccentColor(color) {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-color') === color) {
            option.classList.add('active');
        }
    });
    
    settingsData.appearance.accentColor = color;
    applyAccentColor(color);
}

function applyAccentColor(color) {
    const root = document.documentElement;
    
    const colors = {
        blue: '#3B82F6',
        green: '#10B981',
        purple: '#8B5CF6',
        red: '#EF4444',
        orange: '#F59E0B'
    };
    
    if (colors[color]) {
        root.style.setProperty('--accent-color', colors[color]);
        showNotification(`Cor de destaque alterada`, 'success');
    }
}

// Form handlers
function initializeFormHandlers() {
    // Prevent form submission on Enter key
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    });
    
    // Auto-save on input changes
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            autoSaveSettings();
        });
    });
}

// Toggle switches
function initializeToggleSwitches() {
    const toggles = document.querySelectorAll('.toggle-switch input');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const settingName = toggle.id;
            const isChecked = toggle.checked;
            
            // Update settings data
            updateSettingValue(settingName, isChecked);
            
            // Show feedback
            showNotification(`Configuração ${isChecked ? 'ativada' : 'desativada'}`, 'success');
        });
    });
}

function updateSettingValue(settingName, value) {
    // Find which section this setting belongs to
    for (const section in settingsData) {
        if (settingsData[section].hasOwnProperty(settingName)) {
            settingsData[section][settingName] = value;
            break;
        }
    }
}

// Auto-save functionality
function autoSaveSettings() {
    // Simulate auto-save
    setTimeout(() => {
        showNotification('Configurações salvas automaticamente', 'success', 2000);
    }, 500);
}

// Save functions for each section
function saveAccountSettings() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        bio: document.getElementById('bio').value,
        twoFactor: document.getElementById('twoFactor').checked
    };
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.username) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Por favor, insira um email válido', 'error');
        return;
    }
    
    // Update settings data
    Object.assign(settingsData.account, formData);
    
    showNotification('Configurações da conta salvas com sucesso!', 'success');
}

function resetAccountSettings() {
    loadAccountData(settingsData.account);
    showNotification('Configurações da conta restauradas', 'info');
}

function savePrivacySettings() {
    const formData = {
        publicProfile: document.getElementById('publicProfile').checked,
        showStats: document.getElementById('showStats').checked,
        showAchievements: document.getElementById('showAchievements').checked,
        allowMessages: document.getElementById('allowMessages').checked,
        allowGroupInvites: document.getElementById('allowGroupInvites').checked
    };
    
    Object.assign(settingsData.privacy, formData);
    showNotification('Configurações de privacidade salvas!', 'success');
}

function saveNotificationSettings() {
    const formData = {
        pushNotifications: document.getElementById('pushNotifications').checked,
        messageNotifications: document.getElementById('messageNotifications').checked,
        answerNotifications: document.getElementById('answerNotifications').checked,
        achievementNotifications: document.getElementById('achievementNotifications').checked,
        weeklyDigest: document.getElementById('weeklyDigest').checked,
        studyReminders: document.getElementById('studyReminders').checked
    };
    
    Object.assign(settingsData.notifications, formData);
    
    // Request notification permission if push notifications are enabled
    if (formData.pushNotifications && 'Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification('Notificações ativadas com sucesso!', 'success');
            } else {
                showNotification('Permissão de notificação negada', 'warning');
            }
        });
    } else {
        showNotification('Configurações de notificação salvas!', 'success');
    }
}

function saveAppearanceSettings() {
    const formData = {
        fontSize: document.getElementById('fontSize').value,
        animations: document.getElementById('animations').checked
    };
    
    Object.assign(settingsData.appearance, formData);
    
    // Apply font size
    applyFontSize(formData.fontSize);
    
    showNotification('Configurações de aparência salvas!', 'success');
}

function applyFontSize(size) {
    const root = document.documentElement;
    
    const sizes = {
        small: '14px',
        medium: '16px',
        large: '18px'
    };
    
    if (sizes[size]) {
        root.style.setProperty('--base-font-size', sizes[size]);
    }
}

function saveAISettings() {
    const formData = {
        personality: document.getElementById('aiPersonality').value,
        responseLength: document.getElementById('responseLength').value,
        autoSuggestions: document.getElementById('autoSuggestions').checked,
        autoCorrection: document.getElementById('autoCorrection').checked,
        learningStyle: document.getElementById('learningStyle').value,
        difficultyLevel: document.getElementById('difficultyLevel').value,
        adaptiveLearning: document.getElementById('adaptiveLearning').checked
    };
    
    Object.assign(settingsData.ai, formData);
    showNotification('Configurações de IA salvas!', 'success');
}

function saveAdvancedSettings() {
    const formData = {
        highPerformance: document.getElementById('highPerformance').checked,
        smartCache: document.getElementById('smartCache').checked,
        betaAI: document.getElementById('betaAI').checked,
        experimentalUI: document.getElementById('experimentalUI').checked,
        developerMode: document.getElementById('developerMode').checked,
        apiEndpoint: document.getElementById('apiEndpoint').value
    };
    
    // Validate API endpoint
    if (formData.apiEndpoint && !isValidUrl(formData.apiEndpoint)) {
        showNotification('Por favor, insira uma URL válida para o endpoint da API', 'error');
        return;
    }
    
    Object.assign(settingsData.advanced, formData);
    showNotification('Configurações avançadas salvas!', 'success');
}

function resetAdvancedSettings() {
    const defaultSettings = {
        highPerformance: false,
        smartCache: true,
        betaAI: false,
        experimentalUI: false,
        developerMode: false,
        apiEndpoint: 'https://api.studyai.com'
    };
    
    Object.assign(settingsData.advanced, defaultSettings);
    loadAdvancedData(defaultSettings);
    showNotification('Configurações avançadas restauradas para o padrão', 'info');
}

// Data export functions
function exportData(type) {
    let data, filename;
    
    switch (type) {
        case 'questions':
            data = generateQuestionsData();
            filename = 'studyai-questions.json';
            break;
        case 'progress':
            data = generateProgressData();
            filename = 'studyai-progress.json';
            break;
        case 'all':
            data = generateAllData();
            filename = 'studyai-complete-backup.json';
            break;
        default:
            showNotification('Tipo de exportação inválido', 'error');
            return;
    }
    
    downloadJSON(data, filename);
    showNotification(`Dados exportados: ${filename}`, 'success');
}

function generateQuestionsData() {
    // Simulate questions data
    return {
        exportDate: new Date().toISOString(),
        type: 'questions',
        data: {
            totalQuestions: 127,
            categories: ['Matemática', 'Física', 'Química', 'Programação'],
            recentQuestions: [
                { id: 1, question: 'Como resolver equações quadráticas?', category: 'Matemática', date: '2024-01-15' },
                { id: 2, question: 'Explique a lei de Newton', category: 'Física', date: '2024-01-14' }
            ]
        }
    };
}

function generateProgressData() {
    // Simulate progress data
    return {
        exportDate: new Date().toISOString(),
        type: 'progress',
        data: {
            level: 12,
            xp: 2450,
            streak: 15,
            achievements: 23,
            studyTime: 45.5, // hours
            subjects: {
                'Matemática': { questions: 45, correctAnswers: 38 },
                'Física': { questions: 32, correctAnswers: 28 },
                'Química': { questions: 28, correctAnswers: 22 },
                'Programação': { questions: 22, correctAnswers: 20 }
            }
        }
    };
}

function generateAllData() {
    return {
        exportDate: new Date().toISOString(),
        type: 'complete',
        settings: settingsData,
        questions: generateQuestionsData().data,
        progress: generateProgressData().data
    };
}

function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Danger zone functions
function clearCache() {
    showConfirmation(
        'Limpar Cache',
        'Tem certeza que deseja limpar o cache? Isso pode tornar o carregamento mais lento temporariamente.',
        () => {
            // Simulate cache clearing
            setTimeout(() => {
                showNotification('Cache limpo com sucesso!', 'success');
            }, 1000);
        }
    );
}

function resetSettings() {
    showConfirmation(
        'Resetar Configurações',
        'Tem certeza que deseja restaurar todas as configurações para o padrão? Esta ação não pode ser desfeita.',
        () => {
            // Reset all settings to default
            settingsData = {
                account: {
                    fullName: '',
                    email: '',
                    username: '',
                    bio: '',
                    twoFactor: false
                },
                privacy: {
                    publicProfile: true,
                    showStats: true,
                    showAchievements: true,
                    allowMessages: true,
                    allowGroupInvites: true
                },
                notifications: {
                    pushNotifications: true,
                    messageNotifications: true,
                    answerNotifications: true,
                    achievementNotifications: true,
                    weeklyDigest: true,
                    studyReminders: true
                },
                appearance: {
                    theme: 'light',
                    fontSize: 'medium',
                    accentColor: 'blue',
                    animations: true
                },
                ai: {
                    personality: 'professional',
                    responseLength: 'detailed',
                    autoSuggestions: true,
                    autoCorrection: true,
                    learningStyle: 'reading',
                    difficultyLevel: 'intermediate',
                    adaptiveLearning: true
                },
                data: {
                    autoBackup: true,
                    backupFrequency: 'daily'
                },
                advanced: {
                    highPerformance: false,
                    smartCache: true,
                    betaAI: false,
                    experimentalUI: false,
                    developerMode: false,
                    apiEndpoint: 'https://api.studyai.com'
                }
            };
            
            loadSettingsData();
            showNotification('Todas as configurações foram restauradas para o padrão', 'success');
        }
    );
}

function deleteAccount() {
    showConfirmation(
        'Excluir Conta',
        'ATENÇÃO: Esta ação irá excluir permanentemente sua conta e todos os dados associados. Esta ação NÃO PODE ser desfeita. Digite "EXCLUIR" para confirmar.',
        () => {
            // This would normally redirect to account deletion process
            showNotification('Processo de exclusão de conta iniciado. Você será redirecionado...', 'warning');
            setTimeout(() => {
                // Simulate redirect
                console.log('Account deletion process would start here');
            }, 3000);
        },
        true // Requires text confirmation
    );
}

// Confirmation modal
function showConfirmation(title, message, onConfirm, requiresTextConfirmation = false) {
    const modal = document.getElementById('confirmationModal');
    const titleElement = document.getElementById('confirmationTitle');
    const messageElement = document.getElementById('confirmationMessage');
    const actionButton = document.getElementById('confirmationAction');
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    if (requiresTextConfirmation) {
        // Add text input for confirmation
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Digite "EXCLUIR" para confirmar';
        input.style.marginTop = '1rem';
        input.style.width = '100%';
        input.style.padding = '0.5rem';
        input.style.border = '2px solid #e2e8f0';
        input.style.borderRadius = '4px';
        messageElement.appendChild(input);
        
        actionButton.onclick = () => {
            if (input.value === 'EXCLUIR') {
                onConfirm();
                closeConfirmationModal();
            } else {
                showNotification('Confirmação incorreta. Digite "EXCLUIR" para confirmar.', 'error');
            }
        };
    } else {
        actionButton.onclick = () => {
            onConfirm();
            closeConfirmationModal();
        };
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    const messageElement = document.getElementById('confirmationMessage');
    
    // Remove any added input elements
    const inputs = messageElement.querySelectorAll('input');
    inputs.forEach(input => input.remove());
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Utility functions
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
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

// Logout function
function logout() {
    showConfirmation(
        'Sair da Conta',
        'Tem certeza que deseja sair? Suas configurações não salvas serão perdidas.',
        () => {
            // Simulate logout
            showNotification('Saindo da conta...', 'info');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        }
    );
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSettings();
    
    // Apply saved theme on load
    applyTheme(settingsData.appearance.theme);
    applyAccentColor(settingsData.appearance.accentColor);
    applyFontSize(settingsData.appearance.fontSize);
    
    console.log('Settings page loaded successfully!');
});