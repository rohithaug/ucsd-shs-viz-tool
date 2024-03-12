import { cleanup, render } from '@testing-library/react';
import Breadcrumb from '../../../../src/pages/blog/components/breadcrumb';

afterEach(cleanup);

it('renders Breadcrumb component with post title', () => {
    const postTitle = 'xyz';
    const { getByText } = render(<Breadcrumb postTitle={postTitle} />);
    
    const breadcrumbElement = getByText(postTitle);
    expect(breadcrumbElement).toBeTruthy()
});
