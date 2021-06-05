import React, { Component } from 'react';
import { FaAngleRight } from "react-icons/fa"
 import './index.scss'
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOptions : (["Sort", "Filters", "Where To Watch"].map((elm) => this.sidebarOption(elm, () => alert(elm))))

        }
    }

    sidebarOption = (optionName, onClick) => (
        <div className="sidebarOption" onClick={onClick}>
            <span>{optionName}</span>
            <FaAngleRight size={16} />
        </div>
    )

    render() {
        return (
            <div className="sideBarContainer">
            <h2 className="currentType">{this.props.label} Movies</h2>
            {this.state.sidebarOptions}
            <div className="sidebarSearchDiv">
                Search
            </div>
        </div>
        );
    }
}

export default SideBar;
