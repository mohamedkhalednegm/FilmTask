import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import './index.scss'
import moment from 'moment'
import { BsThreeDots } from "react-icons/bs";
class Card extends Component {
    render() {
        return (
            <div className="singleFilmContainer">
                <div className="threeDotsDiv" >
                    <BsThreeDots style={{ opacity: 0.4, fontSize: 15 }} />
                </div>
                <Link to={{ pathname: `/movie/${this.props.film.id}`, state: this.props.film.backdrop_path }} >
                    <img src={`https://image.tmdb.org/t/p/w500/${this.props.film.poster_path}`} className="filmImg" />
                </Link>
                <div className="progressContainer">
                    <CircularProgressbar
                        value={this.props.film.vote_average * 10}
                        text={`${this.props.film.vote_average * 10}%`}
                        background
                        backgroundPadding={5}
                        strokeWidth={7}
                        styles={buildStyles({
                            backgroundColor: "#070f09",
                            textColor: "#fff",
                            pathColor: this.props.film.vote_average > 7.5 ? "#21d07a" : this.props.film.vote_average < 7.6 && this.props.film.vote_average > 4 ? "#fdee87" : 'red',
                            trailColor: "transparent",
                            textSize: 30,
                        })}
                    />
                </div>
                <p className="filmTitle">{this.props.film.title.length > 46 ? this.props.film.title.substring(0, 46).concat("...") : this.props.film.title}</p>
                <p className="filmDate">{moment(this.props.film.release_date).format("MMMM Do YYYY")}</p>
            </div>
        )
    }
}

export default Card;
