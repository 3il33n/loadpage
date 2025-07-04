// 背景幻灯片图片数组
const backgroundImages = [
    'images/bg1.png',
    'images/bg2.png',
    'images/bg3.png',
    'images/bg4.png',
    'images/bg5.png',
    'images/bg6.png',
    'images/bg7.png',
    'images/bg8.png'
];

// 服务器人员头像数据
const staffAvatars = [
    {
        role: '服主',
        name: '3il33n',
        avatar: 'images/avatar.png'
     }
    // {
    //     role: '管理员',
    //     name: '玩家名称2',
    //     avatar: 'https://i.imgur.com/userAvatar2.jpg'
    // },
    // {
    //     role: '技术支持',
    //     name: '玩家名称3',
    //     avatar: 'https://i.imgur.com/userAvatar3.jpg'
    // }
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
    let progress = 0;
    
    // 随机加载时间（10-20秒）
    const totalLoadTime = Math.floor(Math.random() * 10000) + 10000;
    const interval = 100; // 更新间隔
    const steps = totalLoadTime / interval;
    const increment = 100 / steps;
    
    const loadingInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // 加载完成后可以执行其他操作
            onLoadingComplete();
        }
        
        // 更新加载条和百分比
        loadingBar.style.width = `${progress}%`;
        loadingPercentage.textContent = `${Math.floor(progress)}%`;
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
