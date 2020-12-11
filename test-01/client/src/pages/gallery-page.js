import React from 'react';

import { connect } from 'react-redux';
import { listGalleryItemsThunk, updateGalleryItemThunk } from '../redux/actions';
import { withRouter, useParams, useHistory, Switch, Route, Redirect } from 'react-router-dom';

import ImageGallery from '../components/image-gallery';

/**
 * A "page-level" component that's hooked into the Redux store to get the gallery items. When this component
 * mounts, it will also trigger an API call for the most recent items.
 */
class GalleryPage extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatchListGalleryItems();
    }

    handleToggleFavouriting(galleryItem) {
        this.props.dispatchUpdateGalleryItem(galleryItem);
    }
    
    handleChangeImage(galleryItem) {
        this.props.history.push(`/${galleryItem._id}`);
    }


    render() {
        let { galleryItems } = this.props;
        if (this.props.config.showOnlyFavourites) {
            galleryItems = galleryItems.filter((item) => {
                return item.favouriting === true
            })
        }
        return (
            <Switch>
                <Route exact path="/">
                    <ImageGallery 
                        galleryItems={galleryItems} 
                        handleChangeImage={galleryItem => this.handleChangeImage(galleryItem)}
                        handleFavouritingClick={galleryItem => this.handleToggleFavouriting(galleryItem)} />
                </Route>
                <Route path="/:id">
                    <GalleryItemNavigation 
                        galleryItems={galleryItems} 
                        handleChangeImage={galleryItem => this.handleChangeImage(galleryItem)}
                        handleFavouritingClick={galleryItem => this.handleToggleFavouriting(galleryItem)} />
                </Route>
                <Route path="*">
                    <Redirect to={`/${galleryItems[0] ? galleryItems[0]._id : ''}`} />
                </Route>
            </Switch>
        );
    }
}

function GalleryItemNavigation ({ galleryItems, handleChangeImage }) {
    const { id } = useParams();
    const galleryItem = galleryItems.find(t => t._id === id);
    const history = useHistory();
    if (galleryItem) {
        return <ImageGallery 
                    galleryItems={galleryItems} 
                    selectedId={id} 
                    handleChangeImage={handleChangeImage} />
    }
    else {
        history.goBack();
        return <ImageGallery galleryItems={ galleryItems } />;
    }
}
/**
 * Give the ToDoManager access to the todos from the Redux store
 */
const mapStateToProps = state => {
    return {
        galleryItems: state.galleryItems,
        config: state.config
    }
}

/**
 * Give the ToDoManager access to these Redux actions which dispatch API calls
 */
const mapDispatchToProps = {
    dispatchListGalleryItems: listGalleryItemsThunk.thunk,
    dispatchUpdateGalleryItem: updateGalleryItemThunk.thunk
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GalleryPage));