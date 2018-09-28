import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

class ModalGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { chart, showModal } = this.props;

    return (
      <div className="container">
        <ReactModal isOpen={showModal} contentLabel="Minimal Modal Example">
          <div className="container">
            <button onClick={this.handleCloseModal}>Close Chart</button>
            <button onClick={this.handleCloseModal}>Print Chart</button>
            {this.props.chart}
          </div>
        </ReactModal>
      </div>
    );
  }
}

ModalGraph.propTypes = {
  chart: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default ModalGraph;
