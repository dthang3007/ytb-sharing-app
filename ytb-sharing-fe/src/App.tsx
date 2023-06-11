import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isArray } from 'lodash';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormShareVideo from './components/Form/FormShareVideo';
import Layout from './components/Layout';
import Main from './components/Main';
import { PrivateRoute } from './components/PrivateRoute';
import './styles/_app.scss';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
    mutations: {
      onError: (error: any) => {
        const message = isArray(error?.message) ? error?.message[0] : error?.message;
        toast.error(message);
      },
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route
            path="/share"
            element={
              <PrivateRoute>
                <FormShareVideo />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<span>not found page</span>} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
