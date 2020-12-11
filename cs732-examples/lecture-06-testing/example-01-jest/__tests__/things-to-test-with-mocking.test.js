import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock';
import SoundPlayer from '../sound-player';
import {
    forEachBecauseIForgotThisIsAlreadyPartOfJSArraysByDefault,
    coinFlip,
    coinFlip2,
    getArticle,
    beep
} from '../things-to-test-with-mocking';

// This line replaces the SoundPlayer class with a mock class for the rest of this file.
jest.mock('../sound-player');

/**
 * All calls to fetch() from any code tested in this file will use the mocked fetch implementation instead.
 */
beforeAll(() => {
    enableFetchMocks();
});

/**
 * If we have a global mock like fetch, its good practice to clear it before each test run, so failures in one test don't
 * cause failures in other tests.
 */
beforeEach(() => {
    fetch.resetMocks();

    SoundPlayer.mockClear();
});

/**
 * When we're done with all tests in this file, restore fetch to its normal functionality.
 */
afterAll(() => {
    disableFetchMocks();
});

/**
 * This tests whether our forEach function appropriately calls a callback.
 * 
 * It shows how we can use jest's mocking API to check how many times mock functions have
 * been called, and what arguments they are called with.
 */
it('forEach appropriately calls the callback', () => {

    // If we don't care what the function does we can simply mock it like this.
    // This will take any number of args and return undefined.
    const mockCallback = jest.fn();

    forEachBecauseIForgotThisIsAlreadyPartOfJSArraysByDefault(['a', 'b', 'c'], mockCallback);

    // Our callback should have been called 3 times
    expect(mockCallback.mock.calls.length).toBe(3);

    // The first call to the callback should have been with the values ('a', 0)
    expect(mockCallback.mock.calls[0][0]).toBe('a');
    expect(mockCallback.mock.calls[0][1]).toBe(0);

    // The second call to the callback should have been with the values ('b', 1)
    expect(mockCallback.mock.calls[1][0]).toBe('b');
    expect(mockCallback.mock.calls[1][1]).toBe(1);

    // The first call to the callback should have been with the values ('c', 2)
    expect(mockCallback.mock.calls[2][0]).toBe('c');
    expect(mockCallback.mock.calls[2][1]).toBe(2);

})


/**
 * This tests that coinFlip() returns Heads when its provided random source is > 0.5.
 * 
 * It shows how we can mock a function to return any values we like, in addition to the
 * spying functionality shown in the previous test.
 */
it('coinFlip calls our random source and returns heads when given a value > 0.5', () => {

    // A mock random source that we can spy on as with the above test, that always returns
    // the value we want.
    const mockRandom = jest.fn(() => 0.75);

    expect(coinFlip(mockRandom)).toBe('Heads');
    expect(mockRandom.mock.calls.length).toBe(1);
})

/**
 * This tests that coinFlip() returns Tails when its provided random source is < 0.5.
 */
it('coinFlip calls our random source and returns tails when given a value < 0.5', () => {

    const mockRandom = jest.fn(() => 0.25);

    expect(coinFlip(mockRandom)).toBe('Tails');
    expect(mockRandom.mock.calls.length).toBe(1);
})

/**
 * A describe can have its own beforeEach and afterEach functions.
 * 
 * Here, we're replacing the functionality of the Math.random() function for all tests within this block.
 */
describe('coinFlip2 tests', () => {

    /**
     * Before each test in this block, replace Math.random() with a mock function that will let us spy on it.
     * 
     * By default, the mock function calls through to the function we're mocking, but we can change that as
     * shown below.
     */
    beforeEach(() => {
        jest.spyOn(Math, 'random');
    })

    /**
     * After each test in this block, restore Math.random to its original state.
     */
    afterEach(() => {
        Math.random.mockRestore();
    })

    it('coinFlip2 returns heads whenever Math.random() returns > 0.5', () => {

        // From now on, Math.random() will always return 0.75
        Math.random.mockReturnValue(0.75);

        expect(coinFlip2()).toBe('Heads');
        expect(Math.random.mock.calls.length).toBe(1);
    })

    it('coinFlip2 returns tails whenever Math.random() returns < 0.5', () => {

        // From now on, Math.random() will always return 0.25
        Math.random.mockReturnValue(0.25);

        expect(coinFlip2()).toBe('Tails');
        expect(Math.random.mock.calls.length).toBe(1);
    })
});

/**
 * This tests that our getArticle() function makes an appropriate fetch() call, and does the correct
 * thing with the response.
 * 
 * We are using jest-fetch-mock to help us test this. We have enabled fetch mocking for all tests in the beforeAll()
 * function near the top of this file.
 */
it('getArticle fetches from trex-sandwich server', async () => {

    const dummyArticle = {
        id: 2,
        title: 'The title',
        content: 'The content'
    }

    // The next time fetch() is called, this will be returned in the response body.
    fetchMock.mockOnce(JSON.stringify(dummyArticle));

    const article = await getArticle(2);

    // Make sure fetch was called once
    expect(fetch.mock.calls.length).toBe(1);
    // Make sure it was called with the correct argument
    expect(fetch.mock.calls[0][0]).toBe('https://trex-sandwich.com/ajax/articles?id=2');

    // Check that the correct article was returned.
    expect(article.id).toBe(2);
    expect(article.title).toBe('The title');
    expect(article.content).toBe('The content');
})

/**
 * This tests whether our beep() function instantiates and makes appropriate use of a SoundPlayer.
 * 
 * We are enabling this test by mocking the ../sound-player module near the top of this file,
 * using jest.mock(...)
 */
it('beep uses a SoundPlayer properly', () => {

    beep();

    // Check that the beep function created one new SoundPlayer, with the proper arguments.
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
    expect(SoundPlayer.mock.calls[0][0].volume).toBe(42);
    expect(SoundPlayer.mock.calls[0][0].repeat).toBe(false);
    const mockSoundPlayer = SoundPlayer.mock.instances[0];

    // Check that the mock sound player's playSoundFile method was called once, with the proper argument.
    const mockPlayFile = mockSoundPlayer.playSoundFile;
    expect(mockPlayFile).toHaveBeenCalledTimes(1);
    expect(mockPlayFile).toHaveBeenCalledWith('./beep.mp3');
})