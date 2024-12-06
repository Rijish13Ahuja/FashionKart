import { render, screen, fireEvent } from '@testing-library/react';
import Section1 from '../../../components/sections/Section1';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../components/Card', () => {
  return function MockCard({ title, description, imageUrl }: any) {
    return (
      <div>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };
});

describe('Section1 Component Tests', () => {
  it('renders Section1 correctly', () => {
    render(
      <Router>
        <Section1 />
      </Router>
    );

    const sectionTitle = screen.getByText(/Best of Electronics/i);
    expect(sectionTitle).toBeInTheDocument();

    const itemTitle = screen.getByText(/Apple iPhone 13/i);
    expect(itemTitle).toBeInTheDocument();
  });

  it('shows left and right scroll buttons when hovered', () => {
    render(
      <Router>
        <Section1 />
      </Router>
    );

    const section = screen.getByText(/Best of Electronics/i);
    fireEvent.mouseEnter(section);

    const leftButton = screen.getByRole('button', { name: /left/i });
    const rightButton = screen.getByRole('button', { name: /right/i });

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it('scrolls left when left button is clicked', () => {
    const scrollRef = { current: { scrollBy: jest.fn() } };
    render(
      <Router>
        <Section1 />
      </Router>
    );

    const leftButton = screen.getByRole('button', { name: /left/i });
    fireEvent.click(leftButton);

    expect(scrollRef.current.scrollBy).toHaveBeenCalledWith({ left: -300, behavior: 'smooth' });
  });

  it('scrolls right when right button is clicked', () => {
    const scrollRef = { current: { scrollBy: jest.fn() } };
    render(
      <Router>
        <Section1 />
      </Router>
    );

    const rightButton = screen.getByRole('button', { name: /right/i });
    fireEvent.click(rightButton);

    expect(scrollRef.current.scrollBy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });

  it('displays the card images correctly', () => {
    render(
      <Router>
        <Section1 />
      </Router>
    );

    const image = screen.getByAltText(/Apple iPhone 13/i);
    expect(image).toHaveAttribute('src', 'https://m.media-amazon.com/images/I/51pycg0MGxL.jpg');
  });

  it('verifies scroll behavior on hover', () => {
    const scrollRef = { current: { scrollBy: jest.fn() } };
    render(
      <Router>
        <Section1 />
      </Router>
    );

    const section = screen.getByText(/Best of Electronics/i);
    fireEvent.mouseEnter(section);

    const leftButton = screen.getByRole('button', { name: /left/i });
    const rightButton = screen.getByRole('button', { name: /right/i });

    fireEvent.click(leftButton);
    fireEvent.click(rightButton);

    expect(scrollRef.current.scrollBy).toHaveBeenCalledTimes(2);
  });

  it('verifies card content for each item', () => {
    render(
      <Router>
        <Section1 />
      </Router>
    );

    const titles = screen.getAllByRole('heading');
    const descriptions = screen.getAllByText(/The/i);

    expect(titles).toHaveLength(6); 
    expect(descriptions[0]).toHaveTextContent('The iPhone 13 offers stunning photography...');
  });

  it('does not show scroll buttons without hover', () => {
    render(
      <Router>
        <Section1 />
      </Router>
    );

    const leftButton = screen.queryByRole('button', { name: /left/i });
    const rightButton = screen.queryByRole('button', { name: /right/i });

    expect(leftButton).not.toBeInTheDocument();
    expect(rightButton).not.toBeInTheDocument();
  });

  it('scrolls left correctly when clicking the left button', () => {
    const scrollRef = { current: { scrollBy: jest.fn() } };
    render(
      <Router>
        <Section1 />
      </Router>
    );

    const leftButton = screen.getByRole('button', { name: /left/i });
    fireEvent.click(leftButton);

    expect(scrollRef.current.scrollBy).toHaveBeenCalledWith({ left: -300, behavior: 'smooth' });
  });
});
