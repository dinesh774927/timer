// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    time: new Date(0, 0, 0, 0, 25, 0),
    islimit: true,
    isStarted: false,
    limit: 25,
  }

  timer = () => {
    const {time} = this.state
    this.timeId = setInterval(this.time, 1000)
    if (time.getMinutes() === 0 && time.getSeconds() === 0) {
      clearInterval(this.timeId)
      this.setState(prev => ({
        time,
        isStarted: !prev.isStarted,
        islimit: !prev.islimit,
      }))
    }
  }

  stop = () => {
    const {time} = this.state
    clearInterval(this.timeId)
    this.setState(prev => ({time, isStarted: !prev.isStarted}))
  }

  time = () => {
    const {time} = this.state
    const newTime = time.getSeconds() - 1
    time.setSeconds(newTime)
    this.setState({time, islimit: false, isStarted: true})
  }

  increase = () => {
    const {time, limit, islimit} = this.state
    if (islimit) {
      const minute = limit + 1
      if (minute < 60) {
        time.setMinutes(minute)
        this.setState({time, limit: minute})
      }
    }
  }

  decrease = () => {
    const {time, limit, islimit} = this.state
    if (islimit) {
      const minute = limit - 1
      if (minute > 0) {
        time.setMinutes(minute)
        this.setState({time, limit: minute})
      }
    }
  }

  reset = () => {
    clearInterval(this.timeId)
    this.setState(prev => ({
      time: new Date(0, 0, 0, 0, 25, 0),
      isStarted: false,
      islimit: !prev.islimit,
    }))
  }

  render() {
    const {time, limit, isStarted} = this.state

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="box-container">
          <div className="box1">
            <div className="timer-container">
              <h1 className="timer">{time.toLocaleTimeString().slice(3)}</h1>
              <p className="timer-status">{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="box2">
            <div className="button-container">
              <img
                className="play-icon"
                alt={isStarted ? 'pause icon' : 'play icon'}
                src={
                  isStarted
                    ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                }
              />
              <button
                onClick={isStarted ? this.stop : this.timer}
                className="start-button button-status"
                type="button"
              >
                {isStarted ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={this.reset}
                className="start-button"
                type="button"
              >
                <img
                  className="play-icon"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                <p className="button-status"> Reset</p>
              </button>
            </div>
            <p className="limit-heading">Set Timer limit</p>
            <div className="limit-container">
              <button
                onClick={this.decrease}
                className="limit-button"
                type="button"
              >
                -
              </button>
              <p className="limit">{limit}</p>
              <button
                onClick={this.increase}
                className="limit-button"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
