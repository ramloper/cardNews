import { Outlet } from 'react-router-dom';
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-screen min-w-full'>
        <div className='flex flex-auto min-w-full min-h-full'>
          <Outlet />
          <ScrollToTop />
        </div>
        <ToastContainer
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
