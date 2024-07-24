import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Story } from 'react-insta-stories/dist/interfaces';
import UsersWithStoriesList from 'src/app/(home)/_components/UsersWithStoriesList';
import { fetchUserStories } from 'src/utils/fetchServerData';
import { UserData } from 'src/utils/types';

// Mock the dependencies
jest.mock("../src/utils/fetchServerData");
jest.mock("react-insta-stories", () => ({ stories, onAllStoriesEnd }: { stories: Story[], onAllStoriesEnd: () => void }) => (
  <div data-testid="mock-stories">
    {stories.length} stories
    <button onClick={onAllStoriesEnd}>End Stories</button>
  </div>
));

const mockUsersList: UserData[] = [
  { id: '1', insta_handle: 'User 1', img: '/avatar1.jpg' },
  { id: '2', insta_handle: 'User 2', img: '/avatar2.jpg' },
];

const mockStories: Story[] = [
    {
      id: '1',
      url: 'images/plants.png',
      header: {
			heading: 'mono_repo',
			subheading: 'Posted 30m ago',
			profileImage: 'images/person.svg',
		},
    },
    {
        id: '2',
        url: 'images/plants.png',
        header: {
			heading: 'multi_repo',
			subheading: 'Posted 30m ago',
			profileImage: 'images/person.svg',
		},
    },
];

describe('UsersWithStoriesList', () => {
  beforeEach(() => {
    (fetchUserStories as jest.Mock).mockClear();
  });

  test('renders users list correctly', () => {
    render(<UsersWithStoriesList usersList={mockUsersList} />);
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  test('shows stories when a user is clicked', async () => {
    (fetchUserStories as jest.Mock).mockResolvedValue(mockStories);

    render(<UsersWithStoriesList usersList={mockUsersList} />);
    
    fireEvent.click(screen.getByText('User 1'));

    await waitFor(() => {
      expect(screen.getByTestId('mock-stories')).toBeInTheDocument();
      expect(screen.getByTestId('mock-stories')).toHaveTextContent('2 stories');
    });
  });

  test('does not show stories when user has no stories', async () => {
    (fetchUserStories as jest.Mock).mockResolvedValue([]);

    render(<UsersWithStoriesList usersList={mockUsersList} />);
    
    fireEvent.click(screen.getByText('User 1'));

    await waitFor(() => {
      expect(screen.queryByTestId('mock-stories')).not.toBeInTheDocument();
    });
  });

  test('closes stories view when X is clicked', async () => {
    (fetchUserStories as jest.Mock).mockResolvedValue(mockStories);

    render(<UsersWithStoriesList usersList={mockUsersList} />);
    
    fireEvent.click(screen.getByText('User 1'));

    await waitFor(() => {
      expect(screen.getByTestId('mock-stories')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('X'));

    expect(screen.queryByTestId('mock-stories')).not.toBeInTheDocument();
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  test('moves to next user when all stories end', async () => {
    (fetchUserStories as jest.Mock).mockResolvedValueOnce(mockStories);
    (fetchUserStories as jest.Mock).mockResolvedValueOnce([{ url: 'story3.jpg', type: 'image' }]);

    render(<UsersWithStoriesList usersList={mockUsersList} />);
    
    fireEvent.click(screen.getByText('User 1'));

    await waitFor(() => {
      expect(screen.getByTestId('mock-stories')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('End Stories'));

    await waitFor(() => {
      expect(screen.getByTestId('mock-stories')).toHaveTextContent('1 stories');
    });

    expect(fetchUserStories).toHaveBeenCalledTimes(2);
    expect(fetchUserStories).toHaveBeenNthCalledWith(2, '2');
  });
});