/**
 * @Author: Ali
 * @Date:   2019-02-25T18:58:38+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-11-05T06:31:57+01:00
 */
import React from "react";

const ListItem = ({ id, option, handleClick }) => {
  return (
    <li data-index={id} onClick={handleClick}>
      <span>{option}</span>
    </li>
  );
};

export default ListItem;
