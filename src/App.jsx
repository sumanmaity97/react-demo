import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextInput from './components/TextInput';
import Login from './screens/Login';

function App() {
    const [count, setCount] = useState(0)

    return (
        <Login />
    )
}

export default App
