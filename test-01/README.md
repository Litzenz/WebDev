# Test 01, Part 01 (Andrew's Part) - 50 marks
For this part of the test, you'll complete a simple React-based application designed to show a gallery of images to a user. Users will also be able to "favorite" items. When complete, the app will look similar to that shown in the following screenshot:

![](./spec/screenshot.PNG)

Before beginning the exercises, make sure to run `npm install` in both the `client` and `server` directories. Also, make sure that MongoDB is installed and that dummy data has been added to the database. The instructions for this are exactly the same as for the practice exercise given in Lecture 08.

Once the server is running (`npm start`) from within the `server` directory) and dummy data has been added using <http://localhost:10000/api/init>, then srat the client (`npm start` from within the `client` directory). A simple webpage should be displayed at <http://localhost:3000/> consisting of a title bar and a message stating *"TODO: Modify this route as part of Exercise One"*.

Once you've gotten everything running, take some time to read the existing code, and the exercises themselves, before starting to code.

**Note:** The actual amount of code that you need to write for this test is quite small! It is expected that the majority of your time will be spent undertanding existing code, so you know where your additions will fit in.

## Submission instructions
When done, create a single Zip archive containing the completed image gallery web app (both client and server), along with a PDF containing your completed answers to Gerald's section of the test.

1. Don't forget to include Gerald's answers, or you risk getting 0 for his part.

2. Don't include the `node_modules` folders, or you will get 0 for Andrew's part.

Once you've created the Zip, upload it to Canvas on or before the due date and time.


## Exercise One - Display some images (6 marks)
A component, called `ImageGallery`, has been provided to you (within the client's `components` directory). We will use this component within our `GalleryPage` (located in the `pages` directory) to display some images.

The `GalleryPage` is already setup to dispatch an action when it is created, which will load the gallery items to display from the server. Once these have been added to the Redux store, they will be available as the `galleryItems` array in the page's `props`. However, no images are currently rendered.

For this exercise, remove the dummy `<p>` from the page, and add instead an `ImageGallery` component. The component should be setup to display all gallery items.


## Exercise Two - Highlight an image based on URL (12 marks)
The `ImageGallery` component takes an optional prop called `selectedId`. If this is not set, then the gallery will consider the first image in the list to be selected. Visually, this item will appear differently than the other images in the thumbnail list, and it will be set as the full-size image to display.

If the `selectedId` property *is* set, then the gallery item with the matching `_id` will instead be selected.

For this exercise, modify your code from Exercise One so that when the user browses to `/:id`, where `:id` is the id of a gallery item, that item will be selected in the `ImageGallery`.


## Exercise Three - Navigating between images (10 marks)
The `ImageGallery` component takes an optional prop called `handleChangeImage`. If set, this will be called as a function whenever the user presses the "back" or "forward" buttons, or clicks one one of the image thumbnails. The gallery item to switch to will be supplied as an argument.

For this exercise, write a handler for that event, which will cause the page to navigate to the correct URL. **Hint:** `GalleryPage` has access to the `react-router`'s functionality via some of its props, as it has been wrapped with the `withRouter()` HOC.


## Exercise Four - Favouriting images (12 marks)
You'll notice that each thumbnail in the `ImageGallery` component has a star icon implying that users can click this to "favourite" certain items. At the moment, this button does nothing. In fact, gallery items don't even store a value indicating whether or not they are favourited.

In this exercise, we'll add the ability to track and change favourites. To do this:

1. In the server's `schema.js`, modify the `GalleryItem` schema to add the ability to store an item's favourited status (true or false). **Hint:** Remember that when modifying server code, changes won't be applied until after we restart the server.

2. Optionally, modify one or two items in the server's `dummy-data.js` to have their favourited status set to true by default, for easier testing purposes. Then, re-initialize the database once the server has been started again.

3. The thumbnail list is rendered by the `GalleryThumbnailsList` component. Modify this component to display a `StarIcon` instead of a `StarBorderIcon`, for those gallery items which have been favourited.

4. Handle the `onClick` event of the `IconButton` within `GalleryThumbnailsList`. Clicking this button should eventually result in the clicked item's favourited status being toggled on the server, and this change being reflected in the Redux store. You can pass the event up the component hierarchy to `GalleryPage`, and then dispatch an appropriate Redux action from there (the necessary Redux action, and reducer logic, have already been written for you). Or, you can modify `GalleryThumbnailsList` itself so the Redux action is dispatched from there. Either approach is acceptable.


## Exercise Five - Displaying favourites only (10 marks)
You'll notice a star-shaped checkbox within the app bar, with the text "Show only favourites". Clicking this currently does nothing. The code to render this button can be found in `App.js`. For the final exercise of this test, we'll complete the code to enable this functionality.

You'll notice that in the `redux/actions.js` file, an action name and function `SET_SHOW_ONLY_FAVOURITES` is defined. Redux state called `config` is also defined, via the reducer in `config-reducers.js`. Currently though, this reducer does nothing, and the action is not dispatched from anywhere.

1. Complete the reducer in `config-reducers.js` so that if the appropriate action is received, the `config`'s `showOnlyFavourites` property will be set according to the action's `payload`

2. Modify the `App` component so that the "Show only favourites" button's `checked` property is set from the value in the Redux store, and that clicking the checkbox will dispatch an action to modify this value

3. Modify the `GalleryPage` component so that, if "Show only favourites" is checked, it will supply only the favourited items to its `ImageGallery` for rendering. For full marks, read the value from the Redux store rather than supplying it as a prop to `GalleryPage`.