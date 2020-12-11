/**
 * Returns a list of all items on the server
 */
export async function listGalleryItems() {
    const response = await fetch('/api/galleryItems');
    const todos = await response.json();
    return todos;
}

/**
 * Creates a new item with the given info on the server
 * 
 * @param galleryItem the item to create
 * @returns the item that was created on the server, which should be the same but with an _id
 */
export async function createGalleryItem(galleryItem) {
    const response = await fetch('/api/galleryItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(galleryItem)
    });
    const fromServer = await response.json();
    return fromServer;
}

/**
 * Updates the item with the given id on the server
 * 
 * @param galleryItem the item to update
 * @returns the item that was updated on the server, which should be the same
 */
export async function updateGalleryItem(galleryItem) {
    const response = await fetch(`/api/galleryItems/${galleryItem._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(galleryItem)
    });
    const fromServer = await response.json();
    return fromServer;
}

/**
 * Deletes the given item from the server
 * 
 * @param galleryItem the item to delete
 * @returns the id of the item that was deleted
 */
export async function deleteGalleryItem(galleryItem) {
    await fetch(`/api/galleryItems/${galleryItem._id}`, {
        method: 'DELETE'
    });
    return galleryItem._id;
}