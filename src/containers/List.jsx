import { connect } from "react-redux";
import List from "../components/List";
import { filteredVideos } from '../selectors';
import { deleteData } from "../reducers/videos";
import { editData } from "../reducers/videos";
import { itemsFetchData, addToFav } from '../reducers/videos'

const mapStateToProps = state => ({
  items: filteredVideos(state),
  allVideos: state.videos.length
});

const mapDispatchToProps = dispatch => {
  return {
    remove: id => dispatch(deleteData(id)),
    edit: (id, newTitle, newUrl, newTags) => dispatch(editData(id, newTitle, newUrl, newTags)),
    fetchLoad: () => dispatch(itemsFetchData()),
    addToFav: (id, fav) => dispatch(addToFav(id, fav))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
