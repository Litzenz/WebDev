import { GalleryItem } from './schema';
import moment from 'moment';

const DUMMY_GALLERY_ITEMS = [
    {
        favouriting: true,
        title: 'Pews',
        created: moment().toDate(),
        imageUrl: '/images/DSC09407.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09407.jpg'
    },
    {
        title: 'Church',
        created: moment().subtract(2, 'days').toDate(),
        imageUrl: '/images/DSC09424.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09424.jpg'
    },
    {
        favouriting: true,
        title: 'House',
        created: moment().subtract(5, 'days').toDate(),
        imageUrl: '/images/DSC09431.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09431.jpg'
    },
    {
        title: 'Mansion',
        created: moment().subtract(12, 'days').toDate(),
        imageUrl: '/images/DSC09450.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09450.jpg'
    },
    {
        title: 'Pond',
        created: moment().subtract(14, 'days').toDate(),
        imageUrl: '/images/DSC09453.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09453.jpg'
    },
    {
        title: 'Gate',
        created: moment().subtract(20, 'days').toDate(),
        imageUrl: '/images/DSC09454.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09454.jpg'
    },
    {
        title: 'Forest',
        created: moment().subtract(22, 'days').toDate(),
        imageUrl: '/images/DSC09466.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09466.jpg'
    },
    {
        title: 'Moss',
        created: moment().subtract(23, 'days').toDate(),
        imageUrl: '/images/DSC09473.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09473.jpg'
    },
    {
        title: 'Tall',
        created: moment().subtract(25, 'days').toDate(),
        imageUrl: '/images/DSC09475.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09475.jpg'
    },
    {
        title: 'Fern',
        created: moment().subtract(30, 'days').toDate(),
        imageUrl: '/images/DSC09480.jpg',
        thumbnailUrl: '/images/thumbnails/DSC09480.jpg'
    }
];

/**
 * Deletes all todo items in the database, then adds all todo items in the above array ^
 */
export default async function () {

    await GalleryItem.deleteMany({});
    await GalleryItem.create(DUMMY_GALLERY_ITEMS.map(data => new GalleryItem(data)));

}