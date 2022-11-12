import { render, screen } from '@testing-library/react';
import { HelloMessage } from '../../models/HelloMessage';
import { mockFetch } from '../../setupTests';
import { Name } from './Name';

describe('Name', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('Renders name from the api', async () => {
    const testResponse: HelloMessage = {message: 'Hmmm'};
    mockFetch(testResponse);
    render(<Name/>);

    // We use findByText here since the api is called async, 
    // findByText gives us a little extra time for that to resolve before testing.
    // Try using getByText, you'll see it fails
    expect(await screen.findByText(`Our name is: ${testResponse.message}`)).toBeInTheDocument();
  });

  it('Renders unknown when there is no response from the api', async () => {
    mockFetch(undefined);
    render(<Name/>);

    expect(await screen.findByText('Our name is: unknown')).toBeInTheDocument();
  });
});