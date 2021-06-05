import React, { Component } from 'react';
import LogoImg from "../../assets/TMDB_logo.svg"
import { BiPlusMedical, } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";

import { Dropdown, Menu, Progress } from "antd"
import './index.scss'

class Header extends Component {
    moviesMenu = (<Menu style={{ width: 120 }}>
        <Menu.Item onClick={() => this.setState({ currentTab: { label: "Upcoming", val: "upcoming" } })}>
            <span>
                Upcoming
            </span>
        </Menu.Item>
        <Menu.Item onClick={() => this.setState({ currentTab: { label: "Popular", val: "popular" } })}>
            <span >
                Popular
            </span>
        </Menu.Item>
        <Menu.Item onClick={() => this.setState({ currentTab: { label: "Top Rated", val: "top_rated" } })}>
            <span >
                Top rated
            </span>
        </Menu.Item>
    </Menu>)

    render() {
        return (

            <div className="navigation-bar">
                <div className="navigation-bar-segment">
                    <img src={LogoImg} className="mainLogo" />
                    <Dropdown overlay={this.moviesMenu}>
                        <span onClick={e => e.preventDefault()}>Movies</span>
                    </Dropdown>
                    <span>TV Shows</span>
                    <span>People</span>
                    <span>More</span>
                </div>
                <div className="navigation-bar-segment">
                    <BiPlusMedical onClick={() => alert("Add Clicked!")} className="plusIcon" />
                    {/* should be component but its static for trial purpose */}
                    <div className="languageOptions">EN</div>
                    <span>Login</span>
                    <span>Join TMDb</span>
                    <IoSearchSharp className="searchIcon" />
                </div>
            </div>
        );
    }
}

export default Header;
