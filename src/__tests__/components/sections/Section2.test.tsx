// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router';
// import Section2 from '../../../components/sections/Section2';

// describe('Section2 Component', () => {
//   it('renders the section title', () => {
//     render(
//       <MemoryRouter>
//         <Section2 />
//       </MemoryRouter>
//     );

//     const title = screen.getByRole('heading', { name: /Beauty, Food, Toys & more/i });
//     expect(title).toBeInTheDocument();
//   });

//   it('renders all product titles and prices', () => {
//     render(
//       <MemoryRouter>
//         <Section2 />
//       </MemoryRouter>
//     );

//     const productTitles = [
//       'Children’s Art Marker Set',
//       'Bicycle Black Model',
//       'Classic Bicycle Model',
//       'Folding Treadmill',
//       'Fitness Resistance Bands',
//     ];
//     const productPrices = ['₹599', '₹8,999', '₹7,499', '₹19,999', '₹499'];

//     productTitles.forEach((title) => {
//       expect(screen.getByText(title)).toBeInTheDocument();
//     });

//     productPrices.forEach((price) => {
//       expect(screen.getByText(`From ${price}`)).toBeInTheDocument();
//     });
//   });

//   it('shows scroll buttons on hover', () => {
//     render(
//       <MemoryRouter>
//         <Section2 />
//       </MemoryRouter>
//     );

//     const section = screen.getByRole('region', { name: /Beauty, Food, Toys & more/i });

//     fireEvent.mouseEnter(section);

//     const leftButton = screen.getByRole('button', { name: /left/i });
//     const rightButton = screen.getByRole('button', { name: /right/i });

//     expect(leftButton).toBeInTheDocument();
//     expect(rightButton).toBeInTheDocument();

//     fireEvent.mouseLeave(section);

//     expect(leftButton).toBeInTheDocument();
//     expect(rightButton).toBeInTheDocument();
//   });

//   it('checks if product cards are clickable', () => {
//     render(
//       <MemoryRouter>
//         <Section2 />
//       </MemoryRouter>
//     );

//     const productCard = screen.getByText(/Children’s Art Marker Set/i);

//     fireEvent.click(productCard);

//     // Simply check if the click handler does not throw errors
//     expect(productCard).toBeInTheDocument();
//   });
// });
