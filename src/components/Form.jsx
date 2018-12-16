import React, { PureComponent } from "react";
import { func } from "prop-types";

const initialValue = { title: "", url: "", tags: "", isFavorites: false };

class Form extends PureComponent {
  static propTypes = {
    add: func.isRequired
  };
  state = initialValue;

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAdd = () => {
    this.props.add(this.state);
    this.reset();
  };

  reset = () => {
    this.setState(initialValue);
  };

  render() {
    return (
      <div className='form-input-container'>
        <div className='group'>
        <span className='group-title'>Title</span>
          <input className="input-header" autocomplete="off"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />
        </div>
        <div className='group'>
        <span className='group-title'>URL</span>
          <input className="input-header" autocomplete="off"
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.onChange}
          />
        </div>
        <div className='group'>
        <span className='group-title'>Tags</span>
          <input className="input-header" autocomplete="off"
            type="text"
            name="tags"
            value={this.state.tags}
            onChange={this.onChange}
          />
        </div>
        <i className="fas fa-check-circle" onClick={this.onAdd}></i>
        
      </div>
    );
  }
}

export default Form;
