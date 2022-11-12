// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// TODO expand this to allow setting the response code and url etc.
export const mockFetch = (responseJson: any) => jest
  .spyOn(global, 'fetch')
  .mockImplementation( 
    jest.fn(() => Promise.resolve(
      { json: () => Promise.resolve(responseJson), }
    ), 
    ) as jest.Mock ); 