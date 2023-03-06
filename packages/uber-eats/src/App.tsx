import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Home from './routes/home';
import Header from './components/nav';
import SignIn from './routes/signin';
import SignUp from './routes/signup';

import './styles/index.css';
import './styles/tailwind.css';

function Layout() {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
