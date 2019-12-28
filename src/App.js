import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import UserFavs from "./UserFavs";
import GifList from "./GifList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFavGifs: [],
      userFavGifsIDs: new Set()
    };
    this.favGifIDs = new Set();
    this.handleUserFav = this.handleUserFav.bind(this);
  }

  handleUserFav(gif) {
    const { userFavGifs, userFavGifsIDs } = this.state;

    if (this.favGifIDs.has(gif.id)) {
      this.setState({
        userFavGifs: [...userFavGifs.filter(f => f.id !== gif.id)]
      });
      this.favGifIDs.delete(gif.id);
    } else {
      this.setState({ userFavGifs: [...userFavGifs, gif] });
      this.favGifIDs.add(gif.id);
    }
    this.setState({ userFavGifsIDs: new Set(this.favGifIDs) });
  }

  render() {
    const { userFavGifs, userFavGifsIDs } = this.state;
    return (
      <div className="App">
        <NavBar></NavBar>

        <Switch>
          <Route
            exact
            path="/user"
            render={() => (
              <UserFavs
                userFavgifs={userFavGifs}
                handleUserFav={this.handleUserFav}
              ></UserFavs>
            )}
          />
          <Route
            exact
            path="/search/:query"
            render={() => (
              <GifList
                userFavGifsIDs={userFavGifsIDs}
                handleUserFav={this.handleUserFav}
              ></GifList>
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <GifList
                userFavGifsIDs={userFavGifsIDs}
                handleUserFav={this.handleUserFav}
              ></GifList>
            )}
          />
          <Route
            render={() => <h1 className="section-title">ERROR NOT FOUND!!!</h1>}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
