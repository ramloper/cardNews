import { Outlet } from 'react-router-dom';
import './index.css'

function App() {
  return (
    <div className='h-screen min-w-full'>
      <div className='flex flex-auto min-w-full min-h-full'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
