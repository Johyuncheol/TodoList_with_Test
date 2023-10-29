import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter를 가져옴
import '@testing-library/jest-dom/extend-expect';
import Main from '../pages/Main';

describe('render', () => {
  it('main_render', () => {
    const { container } = render(
      <MemoryRouter> {/* MemoryRouter로 감싸기 */}
        <Main />
      </MemoryRouter>
    );

    // main에 zzz가 있는지 확인
    expect(container).toHaveTextContent('zzz');
  });
});
