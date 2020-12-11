import React from 'react';
import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock';
import { render, fireEvent, screen, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GreetingLoader from '../greeting-loader';

beforeAll(() => {
    enableFetchMocks();
});

afterAll(() => {
    disableFetchMocks();
})

beforeEach(() => {
    fetch.resetMocks();
})

it('loads a greeting correctly', async () => {

    // Render the component; the "screen" shouldn't contain the test "Hello, World!"
    const { container } = render(<GreetingLoader url="http://test.com" />);
    expect(fetch.mock.calls.length).toBe(0);
    expect(screen.queryByText('Hello, world!')).toBeNull();

    // Simulate finding the 'Load greeting' button and clicking it; this should result in a fetch,
    // which we'll mock by returning the 'Hello, world!' greeting
    fetchMock.mockOnce(JSON.stringify({ greeting: 'Hello, world!' }));
    const button = screen.getByText('Load greeting'); // throws error if doesn't exist
    fireEvent.click(button);

    // waitForElement() waits until the given callback doesn't throw an error and returns a truthy value.
    // It knows to re-run the callback periodically by listening to the given container for DOM changes.
    // This will timeout after 1 second by default. Can be changed in the configs.
    const p = await waitForElement(() => screen.getByText('Hello, world!'), { container });
    expect(p.tagName).toBe('P'); // If we want to check it's an actual P element...

    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe('http://test.com');

})