import React, { PureComponent } from "react";
import { arrayOf, shape, string, bool } from "prop-types";

const getVideoId = (url='lol') => url.split("/")[3] || url.split("=")[1];
const createVideoURL = id => `https://www.youtube.com/embed/${id}`;

class ListItem extends PureComponent {
  static propTypes = {
    items: arrayOf(
      shape({
        id: string,
        title: string,
        url: string,
        tags: string, 
        isFavorites: bool
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
    this.setState(
      state => ({ isFavorites: !state.isFavorites }),
      () => this.props.addToFavor(this.props.id, this.state.isFavorites)
    );
  };

  render() {
    const {id, title, url, tags, removeVideo} = this.props;
    const videoId = getVideoId(url);
    const videoUrl = createVideoURL(videoId);

    const tagList = tags.split(" ").map(el => `#${el}`);

    return (
      <li key={id} className="card">
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
          <div className="card-title">{title}&#10024;</div>
        )}

        <iframe className="video" src={videoUrl} title={title} />
        {this.state.isEditing ? (
          <input value={this.state.tags} name="tags" onChange={this.onChange} />
        ) : (
          <p className="tags">{tagList}</p>
        )}
        <div className="card-btn">
          <div className="btn-rm-container">
            <i className="far fa-times-circle"  onClick={() => {
                removeVideo(id);
              } }></i>
            <i className="fas fa-pencil-alt" onClick={this.switchStatus}></i>
          </div>
          {
            this.state.isFavorites ? 
            <i class="fas fa-star" onClick={this.addToFavorites}></i> : 
            <i className="far fa-star" onClick={this.addToFavorites}></i>
          }
      </div>
      </li>
    );
  }
}

export default ListItem;
