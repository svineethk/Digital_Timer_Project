import DigitalTimer from './components/DigitalTimer'

import './App.css'

const initialState = {
  timerInMinutes: 25,
  isTimerRunning: false,
  timerInSeconds: 0,
}

const App = () => <DigitalTimer initial={initialState} />

export default App
