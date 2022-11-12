import { render, screen } from '@testing-library/react';
import { NameDisplayer } from './NameDisplayer';

describe('Name Displayer', () => {
  it('renders a name', () => {
    const testName = 'Shokushu';
    render(<NameDisplayer name={testName}/>);
    expect(screen.getByText(`Our name is: ${testName}`)).toBeInTheDocument();
  });
});