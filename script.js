const backgroundImages = [
    'images/bg1.jpg',
    'images/bg2.jpg',
    'images/bg3.jpg',
    'images/bg4.jpg',
    'images/bg5.jpg',
    'images/bg6.jpg',
    'images/bg7.jpg',
    'images/bg8.jpg',
    'images/bg9.jpg',
    'images/bg10.jpg',
    'images/bg11.jpg',
    'images/bg12.jpg',
    'images/bg13.jpg'
];

const staffAvatars = [
    {
        role: '塞菲莉娜',
        name: '服主',
        avatar: 'images/avatar.jpg'
     },
    {
        role: '白大厨',
        name: '服主',
        avatar: 'images/avatar2.jpg'
     },
     {
        role: '琉璃漠染',
        name: '吉祥物',
        avatar: 'images/avatar4.jpg'
     },
     {
        role: '牢丁',
        name: '副服主',
        avatar: 'images/ding.jpg'
     },
     {
        role: '娘娘',
        name: '总主管',
        avatar: 'images/niangniang.jpg'
     }
];

function initBackgroundSlideshow() {
    const slideshowContainer = document.querySelector('.background-slideshow');
    
    backgroundImages.forEach((imageUrl, index) => {
        const slide = document.createElement('div');
        slide.classList.add('background-slide');
        slide.style.backgroundImage = `url(${imageUrl})`;
        
        if (index === 0) {
            slide.classList.add('active');
        }
        
        slideshowContainer.appendChild(slide);
    });
}

function cycleBackgroundSlides() {
    const slides = document.querySelectorAll('.background-slide');
    let currentSlide = 0;
    
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentSlide = index;
            slide.classList.remove('active');
        }
    });
    
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

    function simulateLoading() {
    const loadingBar = document.querySelector('.loading-bar');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingIcon = document.querySelector('.loading-icon');
    const container = document.querySelector('.loading-bar-container');
    let progress = 0;

    const totalLoadTime = Math.floor(Math.random() * (120000 - 90000)) + 90000;
    const interval = 100;
    const steps = totalLoadTime / interval;
    const increment = 100 / steps;

    const loadingInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            onLoadingComplete();
        }

        loadingBar.style.width = `${progress}%`;
        loadingPercentage.textContent = `${Math.floor(progress)}%`;

        const containerWidth = container.offsetWidth;
        const iconHalf = loadingIcon.offsetWidth / 2;
        const maxLeft = containerWidth - iconHalf;

        let leftPos = (progress / 100) * containerWidth;
        if (leftPos > maxLeft) leftPos = maxLeft;

        loadingIcon.style.left = `${leftPos}px`;
    }, interval);
}

function onLoadingComplete() {
    console.log('加载完成');
    
    const loadingInfo = document.querySelector('.loading-info');
    loadingInfo.textContent = '加载完成，即将进入服务器...';
    loadingInfo.style.color = '#4da6ff';
    
    document.querySelectorAll('.card').forEach(card => {
        card.style.animation = 'pulse 2s infinite';
    });
}

function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
}

function addCardFlipEffect() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

function setStaffAvatars() {
    const staffMembers = document.querySelectorAll('.staff-member');
    
    staffMembers.forEach((member, index) => {
        if (index < staffAvatars.length) {
            const avatarDiv = member.querySelector('.staff-avatar');
            const nameElement = member.querySelector('.staff-info p');
            const roleElement = member.querySelector('.staff-info h3');
            
            avatarDiv.innerHTML = '';
            
            const img = document.createElement('img');
            img.src = staffAvatars[index].avatar;
            img.alt = `${staffAvatars[index].role}头像`;
            avatarDiv.appendChild(img);
            
            nameElement.textContent = staffAvatars[index].name;
            roleElement.textContent = staffAvatars[index].role;
        }
    });
}

function initPage() {
    initBackgroundSlideshow();
    
    setInterval(cycleBackgroundSlides, 5000);
    
    setStaffAvatars();
    
    simulateLoading();
    
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    typewriterEffect(title, originalText);
    
    addCardFlipEffect();
    
    animateCards();
}

function animateCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

document.addEventListener('DOMContentLoaded', initPage);

















