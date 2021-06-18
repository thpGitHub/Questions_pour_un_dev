import { fireEvent, render, screen } from '@testing-library/react';
import Home from './home';

test('renders home component with : Merci de vous logger', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Merci de vous logger/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders home component with : Bienvenue sur :', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Bienvenue sur :/i);
    expect(linkElement).toBeInTheDocument();
  });

test('renders home component with : Questions pour un développeur', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Questions pour un développeur/i);
    expect(linkElement).toBeInTheDocument();
  });

test('renders home component with button : Merci de vous logger', () => {
    render(<Home />);
    const linkElement = screen.getByRole('button', { name: /Merci de vous logger/i })
    expect(linkElement).toBeInTheDocument();
  });

  // screen.debug();    

  test('renders home component when click : Merci de vous logger', () => {
    render(<Home />);
    // const linkElement = screen.getByRole('button', { name: /Merci de vous logger/i })
    // expect(linkElement).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Merci de vous logger/i));
    const linkElement = screen.getByText(/LOGIN/i);
    expect(screen.getByText(linkElement)).toBeInTheDocument();
  });