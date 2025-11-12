// 背景视频路径（可添加多个）
const backgroundVideos = [
    'images/bg1.mp4'
];

const staffAvatars = [
    { role: '塞菲莉娜', name: '服主', avatar: 'images/avatar.jpg' },
    { role: '白大厨', name: '服主', avatar: 'images/avatar2.jpg' },
    { role: '爱莉希雅', name: '副服主', avatar: 'images/avatar3.jpg' },
    { role: '琉璃漠染', name: '吉祥物', avatar: 'images/avatar4.jpg' },
    { role: 'garden', name: '安保人员', avatar: 'images/avatar5.jpg' }
];

// 初始化背景视频播放
function initBackgroundVideo() {
    const container = document.querySelector('.background-slideshow');
    container.innerHTML = ''; // 清空旧内容

    const videoElement = document.createElement('video');
    videoElement.classList.add('background-video');
    videoElement.autoplay = true;
    videoElement.loop = false; // 我们手动切换视频
    videoElement.muted = true; // 静音以确保自动播放
    videoElement.playsInline = true;

    container.appendChild(videoElement);

    let currentVideo = 0;

    function playNextVideo() {
        videoElement.src = backgroundVideos[currentVideo];
        videoElement.play();

        // 当视频播放结束时，切换到下一个
        videoElement.onended = () => {
            currentVideo = (currentVideo + 1) % backgroundVideos.length;
            playNextVideo();
        };
    }

    playNextVideo();
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

function animateCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

function initPage() {
    initBackgroundVideo(); // ⬅️ 改为视频背景
    setStaffAvatars();
    simulateLoading();
    
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    typewriterEffect(title, originalText);
    
    addCardFlipEffect();
    animateCards();
}

document.addEventListener('DOMContentLoaded', initPage);
