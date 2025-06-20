document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded. Initializing card game.");

    // ข้อมูลไพ่ของคุณ
    const cardData = [
        {
            category: 'Perform',
            title: 'Perform as One Air Liquide',
            action: 'คำว่า \'One Air Liquide\' มีความหมายสำคัญอย่างไรต่อคุณ ในแง่ของการทำงานร่วมกันและวัฒนธรรมองค์กร?',
            frame: 'frame_perform_delegate.png' // ชื่อไฟล์ต้องตรงกับที่คุณมีในโฟลเดอร์ images
        },
        {
            category: 'Deliver',
            title: 'Deliver Results',
            action: 'คุณมีแนวทางอย่างไรในการปรับปรุงการทำงานของทีมอย่างต่อเนื่อง เพื่อให้มีประสิทธิภาพและประสิทธิผลมากยิ่งขึ้น?',
            frame: 'frame_deliver_decide.png' // ชื่อไฟล์ต้องตรงกับที่คุณมีในโฟลเดอร์ images
        },
        {
            category: 'Decide',
            title: 'Decide efficiently',
            action: 'ยกตัวอย่างสถานการณ์ที่คุณตั้งใจฟังผู้อื่น และเสนอความคิดเห็นของคุณ เพื่อให้ได้การตัดสินใจที่ดีที่สุด',
            frame: 'frame_deliver_decide.png' // ชื่อไฟล์ต้องตรงกับที่คุณมีในโฟลเดอร์ images
        },
        {
            category: 'Delegate',
            title: 'Delegate Empower',
            action: 'ในฐานะพนักงาน: คุณแสดงความรับผิดชอบต่องานที่ได้รับมอบหมายมาจนสำเร็จ ตามเป้าหมายอย่างไร?',
            frame: 'frame_perform_delegate.png' // ชื่อไฟล์ต้องตรงกับที่คุณมีในโฟลเดอร์ images
        },
        {
            category: 'Create',
            title: 'นักสร้างสรรค์',
            action: 'วาดภาพสัญลักษณ์ง่ายๆ ที่เกี่ยวข้องกับหัวข้อการประชุม',
            frame: 'frame_perform_delegate.png' // ชื่อไฟล์ต้องตรงกับที่คุณมีในโฟลเดอร์ images
        }
    ];

    // Map ชื่อไฟล์รูปภาพที่คุณมีในโฟลเดอร์ images ของคุณเป๊ะๆ
    // Key ใน map คือชื่อไฟล์รูปภาพกรอบ, Value คือ Path เต็ม
    const frameImagesMap = {
        'frame_perform_delegate.png': 'images/frame_perform_delegate.png',
        'frame_deliver_decide.png': 'images/frame_deliver_decide.png'
    };

    const drawCardBtn = document.getElementById('drawCardBtn');
    const cardDisplay = document.getElementById('cardDisplay');
    const cardFront = document.getElementById('cardFront');
    const cardBack = document.getElementById('cardBack');
    const cardTitle = document.getElementById('cardTitle');
    const cardAction = document.getElementById('cardAction');
    const cardFrameImg = document.getElementById('cardFrameImg');

    if (!drawCardBtn || !cardDisplay || !cardFront || !cardBack || !cardTitle || !cardAction || !cardFrameImg) {
        console.error("Initialization Error: หนึ่งใน Element ID ที่จำเป็นหายไปจาก HTML! โปรดตรวจสอบ ID ของคุณ.");
        return;
    }
    console.log("All required HTML elements found.");

    function showNewCard() {
        const randomIndex = Math.floor(Math.random() * cardData.length);
        const card = cardData[randomIndex];

        cardTitle.textContent = card.title;
        cardAction.textContent = card.action;
        console.log("New card data loaded:", card.title);

        const frameFileName = card.frame;
        const frameSrc = frameImagesMap[frameFileName];
        
        console.log("Attempting to load frame:", frameFileName, "at path:", frameSrc);
        if (frameSrc) {
            cardFrameImg.src = frameSrc;
            cardFrameImg.onerror = () => {
                console.error("Image Load Error: ไม่สามารถโหลดรูปภาพกรอบได้:", frameSrc, "โปรดตรวจสอบชื่อไฟล์และที่อยู่ (ตัวพิมพ์เล็ก-ใหญ่)!");
                cardFrameImg.alt = "Frame not found";
            };
            cardFrameImg.onload = () => {
                console.log("Frame image loaded successfully:", frameSrc);
            };
        } else {
            console.error("Data Error: ไม่พบการแมปรูปภาพสำหรับ frame:", frameFileName, "ใน frameImagesMap. ตรวจสอบ cardData.frame และ frameImagesMap.");
            cardFrameImg.src = '';
            cardFrameImg.alt = "Frame data missing";
        }
    }

    drawCardBtn.addEventListener('click', () => {
        console.log("Draw Card Button clicked!");
        if (cardDisplay.classList.contains('flipped')) {
            console.log("Card is currently flipped. Removing 'flipped' class...");
            cardDisplay.classList.remove('flipped');
            setTimeout(() => {
                showNewCard();
                cardDisplay.classList.add('flipped');
                console.log("Card updated and flipped to new front.");
            }, 800);
        } else {
            console.log("Card is currently on back. Adding 'flipped' class...");
            showNewCard();
            cardDisplay.classList.add('flipped');
            console.log("Card flipped to first front.");
        }
    });

    // กำหนดรูปแมวให้กับ cardBack
    const catBackImgSrc = 'images/cat_back_card.png'; // ตรวจสอบชื่อไฟล์นี้ในโฟลเดอร์ images ของคุณอีกครั้ง
    cardBack.style.backgroundImage = `url("${catBackImgSrc}")`;
    cardBack.style.backgroundSize = 'cover';
    cardBack.style.backgroundPosition = 'center';

    const imgTestCat = new Image();
    imgTestCat.src = catBackImgSrc;
    imgTestCat.onerror = () => {
        console.error("Image Load Error: ไม่สามารถโหลดรูปภาพหลังไพ่ (แมว) ได้:", catBackImgSrc, "โปรดตรวจสอบชื่อไฟล์และที่อยู่ (ตัวพิมพ์เล็ก-ใหญ่)!");
        cardBack.style.backgroundColor = '#556ee6'; // ตั้งสีพื้นหลังเป็นสีน้ำเงิน
        cardBack.style.backgroundImage = 'none'; // ลบรูปภาพพื้นหลังออก
    };
    imgTestCat.onload = () => {
        console.log("Cat back image loaded successfully:", catBackImgSrc);
    };

    // **ส่วนนี้คือส่วนที่ถูกลบออกไปเพื่อไม่ให้มีข้อความ "คลิกเพื่อสุ่มไพ่" บนรูปแมว**
    // let backTextElement = cardBack.querySelector('p');
    // if (!backTextElement) {
    //     backTextElement = document.createElement('p');
    //     cardBack.appendChild(backTextElement);
    // }
    // backTextElement.textContent = 'คลิกเพื่อสุ่มไพ่'; 
    // Console log นี้ยังคงอยู่เพื่อให้ทราบว่าการ์ดหลังพร้อมแล้ว
    console.log("Initial card back setup complete."); 
});