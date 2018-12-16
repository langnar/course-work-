import { connect } from "react-redux";

import Form from "../components/Form";
import { addData, showFavs } from "../reducers/videos";

const mapDispatchToProps = dispatch => {
  return {
    add: data => dispatch(addData(data)),
    // showFavs: () => dispatch(showFavs())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Form);
