import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'antd/dist/antd.css';
import './index.scss'

import { filmActions } from '../../actions/film.action';

import SideBar from '../../component/sidebar'
import Card from '../../component/FilmCard'
import Header from '../../component/Header'
class Film extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: { label: "Popular", val: "popular" },
        }
    }


    // Get all movies according to selected tab 
    componentDidMount() {
        this.props.dispatch(filmActions.getPopularFilms(this.state.currentTab.val))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentTab !== this.state.currentTab) {
            this.props.dispatch(filmActions.getPopularFilms(this.state.currentTab.val))
        }
    }


  
    render() {
        return (
            <div className="mainPageContainer">
                {/* Page header */}
               <Header/>
                {/* Page body */}
                <div style={{ display: 'flex' }}>
                    {/* Sidebar */}
                    <SideBar label={this.state.currentTab.label} />

                    {/* films container*/}
                    <div className="filmsContainer">
                        {
                            this.props.films && this.props.films.map((film) => {
                                return (
                                    <Card film={film} />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let films = state.film.films;

    return {
        films
    };
};

export default connect(mapStateToProps)(Film);


