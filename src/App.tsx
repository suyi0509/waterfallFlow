import { useState } from 'react';
import Setting from './setting';
import FlowBox from './flowBox';
import './App.scss';

function App() {
  const [model, setModel] = useState({ number: 30, col: 4, direction: 'row' });

  const onSubmit = (values) => {
    setModel(values);
  };

  return (
    <>
      <div className='layout_box'>
        <div className='content_box'>
          <FlowBox model={model} />
        </div>
        <div className='sider_box'>
          <Setting onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}

export default App;
