import React, { PureComponent } from "react";
import { arrayOf, shape, string } from "prop-types";

const getVideoId = (url='lol') => url.split("/")[3] || url.split("=")[1];
const createVideoURL = id => `https://www.youtube.com/embed/${id}`;

class ListItem extends PureComponent {
  static propTypes = {
    items: arrayOf(
      shape({
        id: string,
        title: string,
        url: string,
        tags: string
      })
    )
  };

  state = {
    isEditing: false,
    title: this.props.title,
    url: this.props.url,
    tags: this.props.tags,
    isFavorites: this.props.isFavorites
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  switchStatus = () => {
    this.setState({ isEditing: true });
  };

  editItem = () => {
    this.props.editVideo(this.props.id, this.state.title, this.props.url, this.state.tags);
    this.setState({ isEditing: false });
  };
  
  addToFavorites = () => {
    this.setState(state => ({isFavorites: !state.isFavorites}), ()=> {this.props.addToFavor(this.props.id, this.props.title, this.props.url, this.props.tags, this.state.isFavorites)})
  }

  // addToFavorites = () => {
  //   this.props.addToFavor(this.props.id, this.state.title, this.props.url, this.state.tags, this.state.isFavorites);
  // }

  render() {
    const {id, title, url, tags, removeVideo} = this.props;
    const videoId = getVideoId(url);
    const videoUrl = createVideoURL(videoId);


    return (
      <li key={id}>
        <button
          onClick={() => {
            removeVideo(id);
          }}
        >
          x
        </button>
        <button onClick={this.switchStatus}>&#9998;</button>
        <button onClick={this.addToFavorites}>fav</button>
        {this.state.isEditing ? (
          <div>
            <button onClick={this.editItem}>&#9998;</button>
            <input
              value={this.state.title}
              name="title"
              onChange={this.onChange}
            />
          </div>
        ) : (
          <div className="title">{title}</div>
        )}

        <iframe src={videoUrl} title={title} />
        {this.state.isEditing ? (
          <input value={this.state.tags} name="tags" onChange={this.onChange} />
        ) : (
          <p>{tags}</p>
        )}
      </li>
    );
  }
}

export default ListItem;
