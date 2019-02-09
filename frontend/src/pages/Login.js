import React, { Component } from "react"

import twitterLogo from "../twitter.svg"
import "./Login.css"

class Login extends Component {
  state = {
      username: '',

  }

  handleInputChange = (e) => {
    const { value } = e.target
    this.setState({
        username: value
    })
  }

  handleSubmit = (e) => {
      e.preventDefault()

      const { username } = this.state

      if (!username.length) return

      localStorage.setItem('@GoTwitter:username', username)

      this.props.history.push('/timeline')
  }

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="GoTwitter" />
        <form onSubmit={this.handleSubmit}>
          <input 
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text" placeholder="Nome de usuário" 
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login
