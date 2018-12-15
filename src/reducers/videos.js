const ADD_VIDEO = "ADD_VIDEO";
const EDIT_VIDEO = "EDIT_VIDEO";
const REMOVE_VIDEO = "REMOVE_VIDEO";
const FETCH_VIDEO = "FETCH_VIDEO";
const FAV_VIDEO = "FAV_VIDEO";

export default function videosReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {

    case FETCH_VIDEO:
      return [...state, ...action.items];

    case ADD_VIDEO:
      const newItem = {
        id: Date.now().toString(),
        title: payload.title,
        url: payload.url,
        tags: payload.tags,
        isFavorites: false
      };
      return [newItem, ...state];

    case REMOVE_VIDEO:
      return state.filter(item => item.id !== payload.id);

    case EDIT_VIDEO:
      return state.map(item => {
        if (item.id === payload.id) {
          return { ...item, 
            title: payload.newTitle, 
            url: payload.newUrl, 
            tags: payload.newTags, 
            isFavorites: item.isFavorites};
        }
      return item;
      });

      case FAV_VIDEO:
      return state.map(item => {
        if (item.id === payload.id) {
          return { ...item, 
            title: payload.title, 
            url: payload.url, 
            tags: payload.tags, 
            isFavorites: payload.bool};
        }
      return item;
      });

    default:
      return state;
  }
}

export const addVideo = ({ title, url, tags }) => ({
  type: ADD_VIDEO,
  payload: { title, url, tags }
});

export const removeVideo = id => ({
  type: REMOVE_VIDEO,
    payload: {id}
  });

export const editVideo = (id, newTitle, newUrl, newTags) => ({
  type: EDIT_VIDEO,
  payload: { id, newTitle, newUrl, newTags}
});

export function itemsFetchDataSuccess(items) {
  return {
      type: FETCH_VIDEO,
     items
  };
}

export const favVideo = (id, title, url, tags, bool) => ({
  type: FAV_VIDEO,
  payload: {id, title, url, tags, bool}
});


export function itemsFetchData() {
  return (dispatch) => {
      fetch('http://localhost:3000/videos')
          .then((response) => response.json())
          .then((items) => dispatch(itemsFetchDataSuccess(items)))
  };
}

export function addData(data) {
  return (dispatch) => {
      fetch('http://localhost:3000/videos', {
        headers: {
          'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
      })
          .then((response) => response.json())
          .then((items) => dispatch(addVideo(items)))
  };
}

export function deleteData(id) {
  return (dispatch) => {
      fetch(`http://localhost:3000/videos/${id}`, {
        method: 'DELETE'
      }).then((items) => dispatch(removeVideo(id)))
  };
}

export function editData(id, title, newUrl, tags ) {
  return (dispatch) => {
      fetch(`http://localhost:3000/videos/${id}`, {
       
      method: 'PUT',
      body: JSON.stringify({title, newUrl, tags })
      })
          .then((response) => response.json())
          .then((items) => dispatch(editVideo(id, title, newUrl, tags )))
  };
}

export function addToFav(id, title, newUrl, tags, bool) {
  return (dispatch) => {
      fetch(`http://localhost:3000/videos/${id}`, {
       
      method: 'PUT',
      body: JSON.stringify({title, newUrl, tags, bool})
      })
          .then((response) => response.json())
          .then((items) => dispatch(favVideo(id, title, newUrl, tags, bool)))
  };
}