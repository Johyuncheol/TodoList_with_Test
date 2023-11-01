import React from 'react';
import { render,waitFor,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter를 가져옴
import '@testing-library/jest-dom/extend-expect';
import Main from '../pages/Main';

describe('render', () => {
  it('main_render', async() => {
    const { container } = render(
      <MemoryRouter> {/* MemoryRouter로 감싸기 */}
        <Main />
      </MemoryRouter>
    );

    //이미지가 있는지 확인
    expect(screen.getByAltText("메인캐릭터")).toBeInTheDocument(); 
  });
});
