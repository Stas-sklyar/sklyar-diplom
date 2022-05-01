import s from './App.module.scss'
import DemoMode from './DemoMode/DemoMode'
import TestMode from './TestMode/TestMode'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('demo-mode');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={s["App"]}>
      <Tabs
        className={s["App-Tabs"]}
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="secondary"
      >
        <Tab value="demo-mode" label="Demo mode" />
        <Tab value="test-mode" label="Test mode" />
      </Tabs>

      {value === 'demo-mode' && <DemoMode />}
      {value === 'test-mode' && <TestMode />}

    </div>
  );
}

export default App;
