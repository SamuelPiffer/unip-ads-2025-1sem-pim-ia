// Community Page JavaScript

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('communitySearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterContent(searchTerm, categoryFilter.value);
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const category = e.target.value;
            filterContent(searchInput.value.toLowerCase(), category);
        });
    }
}

function filterContent(searchTerm, category) {
    const activeTab = document.querySelector('.tab-pane.active');
    
    if (activeTab.id === 'groups') {
        filterGroups(searchTerm, category);
    } else if (activeTab.id === 'discussions') {
        filterDiscussions(searchTerm, category);
    }
}

function filterGroups(searchTerm, category) {
    const groupCards = document.querySelectorAll('.group-card');
    
    groupCards.forEach(card => {
        const groupName = card.querySelector('.group-info h3').textContent.toLowerCase();
        const groupDescription = card.querySelector('.group-info p').textContent.toLowerCase();
        const matchesSearch = groupName.includes(searchTerm) || groupDescription.includes(searchTerm);
        const matchesCategory = category === 'all' || card.dataset.category === category;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterDiscussions(searchTerm, category) {
    const discussionCards = document.querySelectorAll('.discussion-card');
    
    discussionCards.forEach(card => {
        const title = card.querySelector('.discussion-content h3').textContent.toLowerCase();
        const content = card.querySelector('.discussion-content p').textContent.toLowerCase();
        const discussionCategory = card.querySelector('.discussion-category').textContent.toLowerCase();
        
        const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
        const matchesCategory = category === 'all' || discussionCategory.includes(category);
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Group creation modal
function initializeGroupModal() {
    const createGroupBtn = document.getElementById('createGroupBtn');
    const modal = document.getElementById('createGroupModal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('[data-modal="createGroupModal"]');
    const groupForm = document.getElementById('groupForm');
    
    if (createGroupBtn) {
        createGroupBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        groupForm.reset();
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Handle form submission
    if (groupForm) {
        groupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleGroupCreation();
        });
    }
}

function handleGroupCreation() {
    const formData = {
        name: document.getElementById('groupName').value,
        description: document.getElementById('groupDescription').value,
        category: document.getElementById('groupCategory').value,
        privacy: document.getElementById('groupPrivacy').value
    };
    
    // Simulate group creation
    console.log('Creating group:', formData);
    
    // Show success message
    showNotification('Grupo criado com sucesso!', 'success');
    
    // Close modal
    document.getElementById('createGroupModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('groupForm').reset();
    
    // Add new group to the grid (simulation)
    addNewGroupToGrid(formData);
}

function addNewGroupToGrid(groupData) {
    const groupsGrid = document.querySelector('.groups-grid');
    const newGroupCard = createGroupCard(groupData);
    groupsGrid.insertBefore(newGroupCard, groupsGrid.firstChild);
}

function createGroupCard(groupData) {
    const card = document.createElement('div');
    card.className = 'group-card';
    card.dataset.category = groupData.category;
    
    const categoryIcons = {
        math: 'fa-calculator',
        science: 'fa-flask',
        physics: 'fa-atom',
        chemistry: 'fa-vial',
        history: 'fa-landmark',
        language: 'fa-book',
        other: 'fa-graduation-cap'
    };
    
    const icon = categoryIcons[groupData.category] || 'fa-graduation-cap';
    const privacyBadge = groupData.privacy === 'private' ? 'private' : '';
    const privacyText = groupData.privacy === 'private' ? 'Privado' : 'Público';
    
    card.innerHTML = `
        <div class="group-header">
            <div class="group-avatar">
                <i class="fas ${icon}"></i>
            </div>
            <div class="group-info">
                <h3>${groupData.name}</h3>
                <p>${groupData.description}</p>
            </div>
            <span class="group-badge ${privacyBadge}">${privacyText}</span>
        </div>
        <div class="group-stats">
            <span><i class="fas fa-users"></i> 1 membro</span>
            <span><i class="fas fa-comments"></i> 0 discussões</span>
        </div>
        <div class="group-actions">
            <button class="btn btn-outline btn-sm">Ver Grupo</button>
            <button class="btn btn-primary btn-sm">Participar</button>
        </div>
    `;
    
    return card;
}

// Group interactions
function initializeGroupInteractions() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('.group-actions .btn-primary')) {
            handleGroupJoin(e.target);
        } else if (e.target.matches('.group-actions .btn-outline')) {
            handleGroupView(e.target);
        }
    });
}

function handleGroupJoin(button) {
    const groupCard = button.closest('.group-card');
    const groupName = groupCard.querySelector('.group-info h3').textContent;
    const isPrivate = groupCard.querySelector('.group-badge').classList.contains('private');
    
    if (isPrivate) {
        button.textContent = 'Solicitação Enviada';
        button.disabled = true;
        showNotification(`Solicitação de acesso enviada para "${groupName}"`, 'info');
    } else {
        button.textContent = 'Participando';
        button.disabled = true;
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        showNotification(`Você entrou no grupo "${groupName}"!`, 'success');
        
        // Update member count
        const memberCount = groupCard.querySelector('.group-stats span:first-child');
        const currentCount = parseInt(memberCount.textContent.match(/\d+/)[0]);
        memberCount.innerHTML = `<i class="fas fa-users"></i> ${currentCount + 1} membros`;
    }
}

function handleGroupView(button) {
    const groupCard = button.closest('.group-card');
    const groupName = groupCard.querySelector('.group-info h3').textContent;
    showNotification(`Abrindo grupo "${groupName}"...`, 'info');
    // Here you would typically navigate to the group page
}

// Event interactions
function initializeEventInteractions() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('.event-actions .btn-primary')) {
            handleEventJoin(e.target);
        }
    });
}

function handleEventJoin(button) {
    const eventCard = button.closest('.event-card');
    const eventName = eventCard.querySelector('.event-info h3').textContent;
    
    button.textContent = 'Participando';
    button.disabled = true;
    button.classList.add('btn-success');
    
    showNotification(`Você se inscreveu no evento "${eventName}"!`, 'success');
    
    // Update participant count
    const participantCount = eventCard.querySelector('.event-meta span:nth-child(2)');
    const currentCount = parseInt(participantCount.textContent.match(/\d+/)[0]);
    participantCount.innerHTML = `<i class="fas fa-users"></i> ${currentCount + 1} participantes`;
}

// Discussion interactions
function initializeDiscussionInteractions() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('.discussion-stats span')) {
            handleDiscussionInteraction(e.target);
        }
    });
}

function handleDiscussionInteraction(element) {
    const discussionCard = element.closest('.discussion-card');
    const discussionTitle = discussionCard.querySelector('.discussion-content h3').textContent;
    
    if (element.innerHTML.includes('fa-heart')) {
        // Handle like
        const likeCount = element.querySelector('i').nextSibling;
        const currentLikes = parseInt(likeCount.textContent.match(/\d+/)[0]);
        likeCount.textContent = ` ${currentLikes + 1} curtidas`;
        element.style.color = 'var(--error-color)';
        showNotification('Discussão curtida!', 'success');
    } else if (element.innerHTML.includes('fa-comments')) {
        // Handle comment
        showNotification(`Abrindo discussão "${discussionTitle}"...`, 'info');
    }
}

// Utility function for notifications
function showNotification(message, type = 'info') {
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
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeSearch();
    initializeGroupModal();
    initializeGroupInteractions();
    initializeEventInteractions();
    initializeDiscussionInteractions();
    
    // Add category data attributes to existing group cards
    const groupCards = document.querySelectorAll('.group-card');
    groupCards.forEach((card, index) => {
        const categories = ['math', 'physics', 'science', 'history'];
        card.dataset.category = categories[index % categories.length];
    });
    
    console.log('Community page initialized successfully!');
});