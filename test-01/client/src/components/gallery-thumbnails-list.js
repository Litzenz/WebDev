import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import moment from 'moment';

export default function GalleryThumbnailsList({ galleryItems, selectedId, onThumbnailClick, onFavouritingClick}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={4.3}>
                {galleryItems && galleryItems.map((item) => (
                    <GridListTile key={item._id} onClick={() => onThumbnailClick && onThumbnailClick(item)}>
                        <img className={classes.thumbnail} src={item.thumbnailUrl} alt={item.title} data-selected={item._id === selectedId} />
                        <GridListTileBar
                            title={item.title}
                            subtitle={<span>Taken: {moment(item.created).format('MMM Do, YYYY')}</span>}
                            actionIcon={
                                <IconButton 
                                    aria-label={`star ${item.title}`} 
                                    className={classes.icon}
                                    onClick={() => {
                                        item.favouriting = !item.favouriting
                                        onFavouritingClick && onFavouritingClick(item)}}>
                                    {item.favouriting ? <StarIcon /> : <StarBorderIcon />}
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    icon: {
        color: theme.palette.getContrastText('#000')
    },
    thumbnail: {
        filter: 'grayscale(90%) opacity(80%)',
        transition: 'filter 0.5s ease',
        '&:hover': {
            filter: 'grayscale(0%)'
        },
        '&[data-selected="true"]': {
            filter: 'grayscale(0%)'
        }
    }
}));