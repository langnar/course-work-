import { connect } from "react-redux";

import Form from "../components/Form";
import { addData } from "../reducers/videos";

const mapDispatchToProps = dispatch => {
  return {
    add: data => dispatch(addData(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Form);
