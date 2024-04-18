import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    const {initial} = props
    const {timerInMinutes, isTimerRunning, timerInSeconds} = initial
    const copyInitialState = {timerInMinutes, isTimerRunning, timerInSeconds}

    this.state = {
      timerInMinutes,
      isTimerRunning,
      timerInSeconds,
      copyInitialState,
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeOverSeconds = () => {
    const {timerInMinutes, timerInSeconds} = this.state

    const isTimerCompleted = timerInMinutes * 60 === timerInSeconds

    if (isTimerCompleted) {
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }

  onStartOrPauseClicked = () => {
    const {isTimerRunning, timerInMinutes, timerInSeconds} = this.state

    const isTimerCompleted = timerInMinutes * 60 === timerInSeconds

    if (isTimerCompleted) {
      this.setState({timerInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeOverSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  reduceButtonClicked = () => {
    const {timerInMinutes} = this.state
    if (timerInMinutes > 1) {
      this.setState(prevState => ({
        timerInMinutes: prevState.timerInMinutes - 1,
      }))
    }
  }

  increaseButtonClicked = () => {
    this.setState(prevState => ({timerInMinutes: prevState.timerInMinutes + 1}))
  }

  resetButtonClicked = () => {
    this.clearTimerInterval()
    const {copyInitialState} = this.state
    this.setState({
      timerInMinutes: copyInitialState.timerInMinutes,
      timerInSeconds: copyInitialState.timerInSeconds,
      isTimerRunning: copyInitialState.isTimerRunning,
    })
  }

  displayRunningTimer = () => {
    const {timerInMinutes, timerInSeconds} = this.state

    const totalRemainingSeconds = timerInMinutes * 60 - timerInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timerInMinutes, isTimerRunning, timerInSeconds} = this.state
    const isButtonDisable = timerInSeconds > 0
    return (
      <div className="app-container">
        <div className="clock-container">
          <h1 className="header">Digital Timer</h1>
          <div className="digital-container">
            <div className="container">
              <div className="timer">
                <h1 className="timerDigit">{this.displayRunningTimer()}</h1>
                <p className="timerName">
                  {isTimerRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="setting-container">
              <div className="button-container">
                <button
                  type="button"
                  className="start-button"
                  onClick={this.onStartOrPauseClicked}
                >
                  <img
                    src={
                      isTimerRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isTimerRunning ? 'pause icon' : 'play icon'}
                    className="pausePlay-image"
                  />
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>

                <button
                  type="button"
                  className="reset-button resetName"
                  onClick={this.resetButtonClicked}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="reset-image"
                  />
                  Reset
                </button>
              </div>
              <p className="limitName">Set Timer limit</p>
              <div className="adjust-container">
                <button
                  type="button"
                  className="adjust-button"
                  onClick={this.reduceButtonClicked}
                  disabled={isButtonDisable}
                >
                  -
                </button>
                <div className="settingTimer-container">
                  <p className="fixing-timer">{timerInMinutes}</p>
                </div>
                <button
                  type="button"
                  className="adjust-button"
                  onClick={this.increaseButtonClicked}
                  disabled={isButtonDisable}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
