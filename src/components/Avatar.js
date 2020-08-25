import React from "react";
import Image from "react-bootstrap/Image";

function Avatar(props) {
  return (
    <Image
      src={props.avatarURL}
      roundedCircle
      fluid
      width="45"
      height="45"
      className={props.className}
      alt="user avatar"
    />
  );
}

export default Avatar;
