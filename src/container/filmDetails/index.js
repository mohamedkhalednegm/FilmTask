import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  IoListSharp,
  IoBookmark,
  IoStarSharp,
  IoCaretForwardSharp,
} from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import "./index.scss";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { filmActions } from "../../actions/film.action";
import styled from "styled-components";
import FilmInfo from "../../component/FilmInfo";
class FilmDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      blurEffect: true,
      updated: false,
      movieID: null,
    };
  }
  // /wwFBRyekDcKXJwP0mImRJjAnudL.jpg
  posterDiv = styled.div`
     {
      display: flex;
      align-items: center;
      width: 100%;
      height: fit-content;
      position: relative;
      padding: 20px;
    }
    &:after {
      content: "";
      background-image: url(https://image.tmdb.org/t/p/w500${this.props.location
        .state});
      background-size: cover;
      background-position: center;
      opacity: 0.9;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
    }
  `;

  posterOptions = [
    {
      icon: "list",
      title: "Login to create and edit custom lists",
      onclick: function () {
        alert("list Clicked");
      },
    },
    {
      icon: "favorite",
      title: "Login to add this movie to your favorite list",
      onclick: function () {
        alert("favorite Clicked");
      },
    },
    {
      icon: "watchlist",
      title: "Login to add this movie to your watchlist",
      onclick: function () {
        alert("watchlist Clicked");
      },
    },
    {
      icon: "rate",
      title: "Login to rate this movie",
      onclick: function () {
        alert("rate Clicked");
      },
    },
  ];

  //the footer of the poster. //dont know where to get this request
  persons = [
    { name: "Caroline Suh", rule: "Director" },
    { name: "Dana Fox", rule: "Screenplay" },
    { name: "Tony McNamara", rule: "Screenplay" },
    { name: "Kelly Marcel", rule: "Story" },
    { name: "Aline Brosh McKenna", rule: "Story" },
  ];

  //   keywords = [
  //     "endrrrrrrrrrrrrrrrrrdf ffffff fgtg",
  //     "thriller",
  //     "catastrophe",
  //     "salvation",
  //     "thriller",
  //     "catastrophe",
  //     "thriller",
  //     "catastrophe",
  //   ];

  async componentDidMount() {
    this.setState({ loading: true });
    let filmID = this.props.match.params.id;
    await this.props.dispatch(filmActions.getFilmCredits(filmID));
    await this.props.dispatch(filmActions.getFilmDetails(filmID));
    await this.props.dispatch(filmActions.getFilmKeywords(filmID));

    this.setState({ movieID: filmID, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    let filmID = this.props.match.params.id;
    if (prevState.movieID !== this.state.movieID) {
      this.setState({ loading: true });
      await this.props.dispatch(filmActions.getFilmCredits(filmID));
      await this.props.dispatch(filmActions.getFilmDetails(filmID));
      await this.props.dispatch(filmActions.getFilmKeywords(filmID));
      this.setState({ movieID: filmID, loading: false });
    }
  }

  renderPosterOption = (icon, title, onclick) => {
    return (
      <Tooltip
        placement="top"
        title={title}
        key={icon}
        color="#032541"
        destroyTooltipOnHide={true}
        trigger="hover"
      >
        <span onClick={onclick} className="posterListItem">
          {icon === "list" ? (
            <IoListSharp />
          ) : icon === "favorite" ? (
            <MdFavorite />
          ) : icon === "watchlist" ? (
            <IoBookmark />
          ) : icon === "rate" ? (
            <IoStarSharp />
          ) : null}
        </span>
      </Tooltip>
    );
  };

  caroselScroll = () => {
    let el = document.querySelector(".customCarosel");
    let scroll = el.scrollLeft;
    if (scroll > 200) {
      this.setState({ blurEffect: false });
    } else this.setState({ blurEffect: true });
  };

  render() {
    let details = this.props.filmDetails;
    return !this.state.loading ? (
      <>
        {/* <div class="filmPoster" > */}
        <this.posterDiv>
          <img
            src={"https://image.tmdb.org/t/p/w500" + details.poster_path}
            class="movieImg"
          />
          <div class="filmDetails">
            <span class="movieTitle">
              {details.title}
              <span class="releaseDate">
                {" "}
                ({details.release_date.substring(0, 4)})
              </span>{" "}
            </span>
            <span class="facts">
              <span class="certificate">PG-13</span>
              <span style={{ marginLeft: 5 }}>
                {details.genres.map(
                  (elm, i) =>
                    (i !== details.length && i !== 0 ? "," : "") + elm.name
                )}{" "}
                •
                {Math.floor(details.runtime / 60) +
                  "h " +
                  (details.runtime % 60) +
                  "m"}
              </span>
            </span>
            <div class="filmOptionsDiv">
              <span class="progressContainerInPoster">
                <CircularProgressbar
                  value={details.vote_average * 10}
                  text={`${details.vote_average * 10}%`}
                  background
                  backgroundPadding={5}
                  strokeWidth={7}
                  styles={buildStyles({
                    backgroundColor: "#070f09",
                    textColor: "#fff",
                    pathColor: "#21d07a",
                    trailColor: "transparent",
                    textSize: 30,
                  })}
                />
              </span>
              <span class="userScore">User Score</span>
              {/* options */}
              {this.posterOptions.map((elm) =>
                this.renderPosterOption(elm.icon, elm.title, elm.onclick)
              )}
              <span class="trailer">
                <IoCaretForwardSharp style={{ fontSize: 18, marginRight: 6 }} />
                Play Trailer
              </span>
            </div>
            <p class="tagline">{details.tagline}</p>
            <h3 class="overview">Overview</h3>
            <p class="oveviewTxt">{details.overview}</p>
            <div class="filmPersons">
              {this.persons.map((elm) => {
                return (
                  <div>
                    <div class="personName">{elm.name}</div>
                    <div class="personRule">{elm.rule}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </this.posterDiv>
        {/* </div> */}
        <div class="mainContainer">
          {/* cast carosel */}
          <div class="cast">
            <h3 class="castHeader">Series Cast</h3>
            <ul class="customCarosel" onScroll={this.caroselScroll}>
              {this.props.filmCredits.length &&
                this.props.filmCredits.map((elm) => {
                  return (
                    <div class="singleCast">
                      <img
                        src={
                          elm.profile_path
                            ? "https://image.tmdb.org//t/p/w500" +
                              elm.profile_path
                            : null
                        }
                        class="castImg"
                      />
                      <div style={{ padding: 10 }}>
                        <p class="castName">{elm.name}</p>
                        <p class="castNameInFilm">{elm.character}</p>
                        {this.props.series && (
                          <p class="episodes">{elm.noOfEpisodes} Episodes</p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </ul>
            <h2 class="castFooter">Full Cast & Crew</h2>
          </div>
          {/* right menu */}
          <FilmInfo
            details={details}
            blurEffect={this.state.blurEffect}
            filmKeywords={this.props.filmKeywords}
          />
        </div>
      </>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  let filmCredits = state.film.filmCredits;
  let filmKeywords = state.film.filmKeywords;
  let filmDetails = state.film.filmDetails;

  return {
    filmCredits,
    filmKeywords,
    filmDetails,
  };
};

export default connect(mapStateToProps)(FilmDetails);
