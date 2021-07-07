import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      followers: [],
    };
  }

  componentDidMount() {
    axios.get("https://api.github.com/users/VickieNelson").then((res1) => {
      console.log(res1.data);
      this.setState({
        user: res1.data,
      });
      axios.get(this.state.user.followers_url).then((res2) => {
        console.log(res2.data);
        this.setState({
          followers: res2.data,
        });
        console.log(this.state.followers);
      });
    });
  }

  render() {
    return (
      <div className='large-div'>
        <h1>Github Usercards</h1>
        <div>
          {/* //card content */}
          <Card
            userImg={this.state.user.avatar_url}
            name={this.state.user.name}
            username={this.state.user.login}
            profile={this.state.user.url}
            followers={this.state.user.followers}
            following={this.state.user.following}
            bio={this.state.user.bio}
          />
        </div>

        <h2>Followers</h2>
        {/* //follower card content */}
        {this.state.followers.map((user) => {
          return (
            <Card
              userImg={user.avatar_url}
              name={user.name}
              username={user.login}
              profile={user.url}
              followers={user.followers}
              following={user.following}
              bio={user.bio}
            />
          );
        })}
      </div>
    );
  }
}
export default App;
