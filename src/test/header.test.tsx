import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter를 가져옴
import '@testing-library/jest-dom/extend-expect';
import Header from '../layout/Header';


/*
  테스트 항목 :
      각 헤더에 보여줘야할 '홈' ,'투두 작성' ,'투두 전체' ,'로그인'이 포함되었는지
            
*/

describe('render', () => {
  it('Header_render', () => {
    const { container } = render(
      <MemoryRouter> {/* MemoryRouter로 감싸기 */}
        <Header />
      </MemoryRouter>
    );
    
    // header에 각 메뉴가 있는지 확인
    expect(container).toHaveTextContent('홈');
    expect(container).toHaveTextContent('투두 작성');
    expect(container).toHaveTextContent('투두 전체');
    expect(container).toHaveTextContent('로그인');
  });
});
