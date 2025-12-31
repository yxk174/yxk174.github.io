// 星空背景效果
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 创建星星
const stars = [];
const starCount = 200;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.5 + 0.1;
        this.brightness = Math.random() * 0.5 + 0.5;
        this.color = Math.random() > 0.7 ? '#4a6fa5' : '#ffcc00';
    }
    
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
        
        // 闪烁效果
        this.brightness += (Math.random() - 0.5) * 0.1;
        this.brightness = Math.max(0.3, Math.min(1, this.brightness));
    }
    
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.brightness;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // 光晕效果
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

// 初始化星星
for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// 动画循环
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制深色背景
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    requestAnimationFrame(animateStars);
}

animateStars();

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// 表单提交处理
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单值
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // 简单验证
    if (name && email) {
        alert(`谢谢 ${name}！您的消息已发送。我会尽快通过 ${email} 与您联系。`);
        document.getElementById('contact-form').reset();
    } else {
        alert('请填写所有必填字段！');
    }
});

// 导航链接点击效果
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        // 移除所有active类
        document.querySelectorAll('.nav-links a').forEach(item => {
            item.classList.remove('active');
        });
        
        // 为当前点击的链接添加active类
        this.classList.add('active');
        
        // 平滑滚动到目标区域
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});