/**
 * @Author: Ali
 * @Date:   2019-02-25T18:58:38+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-25T19:14:15+01:00
 */
import React, { Component } from "react";

class ListItem extends Component {
  render() {
    const { option, handleClick } = this.props;
    return <li onClick={handleClick}> {option} </li>;
  }
}
export default ListItem;
