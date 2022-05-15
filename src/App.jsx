import s from './App.module.scss'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import Calc from './Calc/Calc'
import Test from './Test/Test'

function App() {
  const [value, setValue] = useState('test');

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
        <Tab value="calc" label="Калькулятор" />
        <Tab value="test" label="Тест" />
      </Tabs>

      {value === 'calc' && <Calc />}
      {value === 'test' && <Test />}

    </div>
  );
}

export default App;
