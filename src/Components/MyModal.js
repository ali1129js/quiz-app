/**
 * @Author: Ali
 * @Date:   2019-02-23T11:36:40+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-23T11:50:02+01:00
 */

import React, { Component } from "react";
import styled from "styled-components";
const Content = styled.div`
  background: linear-gradient(to bottom right, #3498db, papayawhip, #f39c12);
  margin: auto;
  height: 10em;
  width: 12em;
  font-size: 1.2em;
  text-align: center;
  border: 3px solid #fab1a0;
  padding: 5px;
  padding-top: 10px;
  box-shadow: 8px 10px #000000;
`;
const backdropStyle = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#34495e",
  padding: 50
};
class MyModal extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal-body">
          <Content>
            Incorrect! Try again.
            <div className="footer mt-4">
              <button
                className="btn btn-outline-dark"
                onClick={this.props.onClose}
              >
                Close
              </button>
            </div>
          </Content>
        </div>
      </div>
    );
  }
}
export default MyModal;
