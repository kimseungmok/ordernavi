import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
   const [isHeaderVisible, setHeaderVisible] = useState(true);
   const [isCategoryVisible, setCategoryVisible] = useState(true);

   useEffect(() => {
      let lastScrollTop = 0;
      let isScrollingUp = false;
  
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
  
        if (scrollTop > lastScrollTop && !isScrollingUp) {
          // 스크롤을 내리는 중일 때
          setHeaderVisible(false);
          setCategoryVisible(false);
        } else {
          // 스크롤을 올리는 중이거나 스크롤이 멈춘 경우
          setHeaderVisible(true);
          setCategoryVisible(true);
        }
  
        // 스크롤 방향 감지
        isScrollingUp = scrollTop < lastScrollTop;
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 페이지 상단에 도달하면 0으로 설정
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

   const menuItems = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      name: `메뉴 ${index + 1}`,
      price: Math.floor(Math.random() * 10) + 10, // 랜덤 가격
      image: `menu${index + 1}.jpg`, // 가정한 이미지 파일 이름
   }));
  
  return (
    <div className="app-container">
    {/* 헤더 */}
    <div className={`header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
        <button className="back-button">뒤로가기</button>
        <h1 className="title">음식 주문하기</h1>
        <p className="person-name">홍길동</p>
      </div>

      {/* 음식 카테고리 */}
      <div className={`category ${isCategoryVisible ? 'visible' : 'hidden'}`}>
        <div class="sub-categories">
          <select>
            <option value="subCategory1">서브카테고리1</option>
            <option value="subCategory2">서브카테고리2</option>
            <option value="subCategory2">서브카테고리3</option>
            <option value="subCategory2">서브카테고리4</option>
            {/* 추가 서브카테고리 */}
          </select>
          <button class="category-btn">飲み放題</button>
        </div>
        <div class="main-categories">
          <button class="category-btn">すべて</button>
            <button class="category-btn">ソフトドリンク</button>
            <button class="category-btn">アルコールドリンク</button>
            <button class="category-btn">フード</button>
        </div>
      </div>

    {/* 메뉴 */}
    <div className="menu-list-container">
      <div className="menu-list">
        {/* 메뉴 아이템들을 1열씩 렌더링 */}
        {menuItems.map((menuItem) => (
          <div key={menuItem.id} className="menu-item">
            <img src={menuItem.image} alt={menuItem.name} />
            <h2>{menuItem.name}</h2>
            <p>가격: ${menuItem.price}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default App;
