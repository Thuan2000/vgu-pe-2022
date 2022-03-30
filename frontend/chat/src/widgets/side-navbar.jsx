import React from "react";

import LetterTile from "./letter-tile.jsx";
import ButtonBack from "./button-back.jsx";

export default class SideNavbar extends React.PureComponent {
  render() {
    return (
      <div id="side-caption-panel" className="caption-panel">
        {this.props.onCancel ? (
          <ButtonBack onBack={this.props.onCancel} />
        ) : null}
        {this.props.avatar ? (
          <div id="self-avatar" className="avatar-box">
            <LetterTile
              avatar={this.props.avatar}
              topic={this.props.myUserId}
              title={this.props.title}
            />
          </div>
        ) : null}
        <div
          id="sidepanel-title"
          style={{ fontSize: "12pt" }}
          className="panel-title"
        >
          {this.props.title}
        </div>
      </div>
    );
  }
}
