import React, { Component } from "react";
import { Tooltip } from "antd";

import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { BiLink } from "react-icons/bi";
import "./index.scss";

export default class FilmInfo extends Component {
  render() {
    return (
      <div class={this.props.blurEffect ? "rightMenu" : "rightMenuWithoutBlur"}>
        <div class="socialMediaIconsDiv">
          <Tooltip
            placement="top"
            title="Visit Facebook"
            color="#032541"
            style={{ cursor: "pointer" }}
          >
            <AiFillFacebook className="socialMediaIcon" />
          </Tooltip>
          <Tooltip
            placement="top"
            title="Visit Twitter"
            color="#032541"
            style={{ cursor: "pointer" }}
          >
            <FaTwitter className="socialMediaIcon" />
          </Tooltip>
          <Tooltip
            placement="top"
            title="Visit Instagram"
            color="#032541"
            style={{ cursor: "pointer" }}
          >
            <FaInstagram className="socialMediaIcon" />
          </Tooltip>
          <span
            style={{
              borderRight: "1px solid grey",
              height: "50%",
              width: 5,
              marginRight: 5,
            }}
          />
          <Tooltip
            placement="top"
            title="Visit Homepage"
            color="#032541"
            style={{ cursor: "pointer" }}
          >
            <BiLink
              className="socialMediaIcon"
              style={{ transform: "rotate(45deg)" }}
            />
          </Tooltip>
        </div>
        <h1 class="rightMenuOption">Facts</h1>
        <h1 class="rightMenuOption">Status</h1>
        <span class="movieStatus">{this.props.details.status}</span>
        {this.props.series && (
          <>
            <h1 class="rightMenuOption">Networks</h1>
            {this.props.details.production_companies.map(
              (elm) =>
                elm.logo_path && (
                  <img
                    src={`https://image.tmdb.org//t/p/h30${elm.logo_path}`}
                    style={{ display: "block", marginBottom: 3 }}
                  />
                )
            )}
            <h1 class="rightMenuOption" style={{ marginTop: 15 }}>
              Type
            </h1>
            <span class="movieStatus">Scripted</span>
          </>
        )}
        <h1 class="rightMenuOption">Original Language</h1>
        <span class="movieStatus">
          {this.props.details.original_language === "en"
            ? "English"
            : this.props.details.original_language}
        </span>
        {!this.props.series && (
          <>
            <h1 class="rightMenuOption">Budget</h1>
            <span class="movieStatus">
              ${Intl.NumberFormat("en-US").format(this.props.details.budget)}
            </span>
            <h1 class="rightMenuOption">Revenue</h1>
            <span class="movieStatus">
              ${Intl.NumberFormat("en-US").format(this.props.details.revenue)}
            </span>
          </>
        )}
        <h1 class="rightMenuOption" style={{ marginTop: 22 }}>
          Keywords
        </h1>
        <div class="keywordsContainer">
          {this.props.filmKeywords.map((elm) => {
            return (
              <span class="keyword">
                <p
                  style={{
                    whiteSpace: "nowrap",
                    display: "block",
                    margin: 0,
                    fontSize: 12,
                  }}
                >
                  {elm.name}
                </p>
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}
