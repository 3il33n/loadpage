// 背景幻灯片图片数组
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

// 服务器人员头像数据
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
        role: '爱莉希雅',
        name: '副服主',
        avatar: 'images/avatar3.jpg'
     },
     {
        role: '琉璃漠染',
        name: '吉祥物',
        avatar: 'images/avatar4.jpg'
     },
     {
        role: 'garden',
        name: '安保人员',
        avatar: 'images/avatar5.jpg'
     }
];

// 初始化背景幻灯片
function initBackgroundSlideshow() {
    const slideshowContainer = document.querySelector('.background-slideshow');
    
    // 创建幻灯片元素
    backgroundImages.forEach((imageUrl, index) => {
        const slide = document.createElement('div');
        slide.classList.add('background-slide');
        slide.style.backgroundImage = `url(${imageUrl})`;
        
        // 第一张图片默认显示
        if (index === 0) {
            slide.classList.add('active');
        }
        
        slideshowContainer.appendChild(slide);
    });
}

// 切换背景幻灯片
function cycleBackgroundSlides() {
    const slides = document.querySelectorAll('.background-slide');
    let currentSlide = 0;
    
    // 找到当前激活的幻灯片
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentSlide = index;
            slide.classList.remove('active');
        }
    });
    
    // 激活下一张幻灯片
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// 模拟加载进度
    function simulateLoading() {
    const loadingBar = document.querySelector('.loading-bar');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingIcon = document.querySelector('.loading-icon');
    const container = document.querySelector('.loading-bar-container');
    let progress = 0;

    const totalLoadTime = Math.floor(Math.random() * 30000) + 10000; // 10-20秒
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

        // 更新图标位置，确保不跑出边界
        const containerWidth = container.offsetWidth;
        const iconHalf = loadingIcon.offsetWidth / 2;
        const maxLeft = containerWidth - iconHalf;

        let leftPos = (progress / 100) * containerWidth;
        if (leftPos > maxLeft) leftPos = maxLeft;

        loadingIcon.style.left = `${leftPos}px`;
    }, interval);
}

// 加载完成后的操作
function onLoadingComplete() {
    // 这里可以添加加载完成后的操作
    console.log('加载完成');
    
    // 例如添加一个加载完成的提示
    const loadingInfo = document.querySelector('.loading-info');
    loadingInfo.textContent = '加载完成，即将进入服务器...';
    loadingInfo.style.color = '#4da6ff';
    
    // 添加一些额外的动画效果
    document.querySelectorAll('.card').forEach(card => {
        card.style.animation = 'pulse 2s infinite';
    });
}

// 添加打字机效果
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

// 添加卡片翻转动画
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

// 设置服务器人员头像
function setStaffAvatars() {
    const staffMembers = document.querySelectorAll('.staff-member');
    
    staffMembers.forEach((member, index) => {
        if (index < staffAvatars.length) {
            const avatarDiv = member.querySelector('.staff-avatar');
            const nameElement = member.querySelector('.staff-info p');
            const roleElement = member.querySelector('.staff-info h3');
            
            // 清空现有内容
            avatarDiv.innerHTML = '';
            
            // 创建并添加图片元素
            const img = document.createElement('img');
            img.src = staffAvatars[index].avatar;
            img.alt = `${staffAvatars[index].role}头像`;
            avatarDiv.appendChild(img);
            
            // 更新名称和角色
            nameElement.textContent = staffAvatars[index].name;
            roleElement.textContent = staffAvatars[index].role;
        }
    });
}

// 初始化页面
function initPage() {
    // 初始化背景幻灯片
    initBackgroundSlideshow();
    
    // 设置定时切换背景
    setInterval(cycleBackgroundSlides, 5000);
    
    // 设置服务器人员头像
    setStaffAvatars();
    
    // 模拟加载进度
    simulateLoading();
    
    // 添加打字机效果到标题
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    typewriterEffect(title, originalText);
    
    // 添加卡片翻转效果
    addCardFlipEffect();
    
    // 添加卡片出现动画
    animateCards();
}

// 卡片出现动画
function animateCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);











