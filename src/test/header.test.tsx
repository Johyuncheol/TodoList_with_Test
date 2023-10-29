import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter를 가져옴
import '@testing-library/jest-dom/extend-expect';
import Header from '../layout/Header';

describe('render', () => {
  it('Header_render', () => {
    const { container } = render(
      <MemoryRouter> {/* MemoryRouter로 감싸기 */}
        <Header />
      </MemoryRouter>
    );
    
    // main에 zzz가 있는지 확인
    expect(container).toHaveTextContent('홈');
    expect(container).toHaveTextContent('투두 작성');
    expect(container).toHaveTextContent('투두 전체');
    expect(container).toHaveTextContent('로그인');

  });
});
