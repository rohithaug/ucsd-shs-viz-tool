import { render, screen } from '@testing-library/react';
import Card from '../../../../src/pages/blog/components/card';

describe('Card component', () => {
    const mockProps = {
        blogId: '123',
        title: 'Test Blog',
        author: 'John Doe',
        category: 'Technology',
        time: '2022-08-01',
        content: 'Lorem ipsum dolor sit amet',
        imageFileName: 'test-image.jpg',
    };

    it('renders the card component with correct props', () => {
        render(<Card {...mockProps} />);
        
        // Assert that the card title is rendered
        const titleElement = screen.getByText(mockProps.title);
        expect(titleElement).toBeTruthy();

        // Assert that the card author is rendered
        const authorElement = screen.getByText(mockProps.author);
        expect(authorElement).toBeTruthy();

        // Assert that the card category is rendered
        const categoryElement = screen.getByText(mockProps.category);
        expect(categoryElement).toBeTruthy();

        // ... Add more assertions for other elements in the card component
    });

    // Add more test cases as needed
});