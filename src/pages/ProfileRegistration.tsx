import React from 'react';
import './ProfileRegistration.css';

const ProfileRegistration: React.FC = () => {
  return (
    <div className="profile-registration">
      <header className="page-header">
        <button className="back-btn">{'<'}</button>
        <h2 className="page-title">프로필 등록</h2>
        <div style={{ width: 24 }}></div>
      </header>

      <section className="profile-image-section">
        <h3 className="section-title">프로필 이미지</h3>
        <div className="image-upload-circle">
          <div className="camera-icon">📷</div>
          <span>이미지 추가</span>
        </div>
      </section>

      <section className="nickname-section">
        <h3 className="section-title">닉네임</h3>
        <input type="text" className="text-input" placeholder="닉네임을 입력하세요" />
      </section>

      <section className="outfit-section">
        <h3 className="section-title">인상착의</h3>
        <div className="dropdown-row">
          <div className="dropdown">
            <label>상의</label>
            <select>
              <option>검정 패딩</option>
              <option>흰색 티셔츠</option>
            </select>
          </div>
          <div className="dropdown">
            <label>하의</label>
            <select>
              <option>청바지</option>
              <option>슬랙스</option>
            </select>
          </div>
        </div>
        <div className="color-picker">
          {['#000', '#FFF', '#999', '#1A237E', '#D32F2F', '#536DFE'].map((color, idx) => (
            <div key={idx} className="color-circle" style={{ backgroundColor: color }}>
              {idx === 5 && <div className="color-selected-check"></div>}
            </div>
          ))}
        </div>
      </section>

      <section className="feature-section">
        <h3 className="section-title">기타 특징</h3>
        <input type="text" className="text-input" placeholder="특징을 입력하세요 (예: 안경, 가방)" />
        <p className="notice">
          * 정확한 인상착의 정보는 다른 이용자가 자리를 찾는 데 도움이 됩니다.
        </p>
      </section>

      <div className="footer-btn-container">
        <button className="submit-btn">등록 완료</button>
      </div>
    </div>
  );
};

export default ProfileRegistration;
