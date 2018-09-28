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
            {this.props.chart}
            <div className="row">
              <div className="col-sm align-self-start">
                <button
                  className="btn btn-info btn-sm mt-3"
                  onClick={this.props.closeModal}
                >
                  Close Chart
                </button>
              </div>
              <div className="col-sm justify-content-end">
                <button
                  className="btn btn-info btn-sm mt-3"
                  //   onClick={this.props.closeModal}
                >
                  Print Chart
                </button>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

ModalGraph.propTypes = {
  chart: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ModalGraph;
