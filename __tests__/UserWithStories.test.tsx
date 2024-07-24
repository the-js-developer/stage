import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserWithStories from 'src/app/(home)/_components/UserWithStories';

// Mock the Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

describe('UserWithStories', () => {
  const mockUser = {
    id: '1',
    insta_handle: '@testuser',
    img: '/test-avatar.jpg',
  };

  const mockViewStory = jest.fn();

  beforeEach(() => {
    mockViewStory.mockClear();
  });

  test('renders user avatar and Instagram handle', () => {
    render(<UserWithStories user={mockUser} viewStory={mockViewStory} />);

    const avatar = screen.getByAltText('User Avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/test-avatar.jpg');

    const handle = screen.getByText('@testuser');
    expect(handle).toBeInTheDocument();
  });

  test('calls viewStory function when clicked', () => {
    render(<UserWithStories user={mockUser} viewStory={mockViewStory} />);

    const userElement = screen.getByText('@testuser').parentElement;
    fireEvent.click(userElement!);

    expect(mockViewStory).toHaveBeenCalledTimes(1);
    expect(mockViewStory).toHaveBeenCalledWith('1');
  });

  test('truncates long Instagram handles', () => {
    const longHandleUser = {
      ...mockUser,
      insta_handle: '@verylonginstagramhandle',
    };

    render(<UserWithStories user={longHandleUser} viewStory={mockViewStory} />);

    const handle = screen.getByText('@verylonginstagramhandle');
    expect(handle).toHaveClass('truncate');
  });
});