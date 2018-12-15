import React, { PureComponent } from "react";
import { arrayOf, shape, string } from "prop-types";
import ListItem from "./ListItem";

class List extends PureComponent {
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

  static defaultProps = {
    items: []
  };

  componentDidMount(){
    this.props.fetchLoad();
}


  render() {
    const { items, remove, edit, allVideos, addToFav } = this.props;
    console.log(items)
    const list = items.map(item => (
      <ListItem key={item.id} {...item} removeVideo={remove} editVideo={edit} addToFavor={addToFav}/>
    ));

    return (
      <ul>
        <p>
          Videos: {items.length}/{allVideos}
        </p>
        {list}
      </ul>
    );
  }
}

export default List;
