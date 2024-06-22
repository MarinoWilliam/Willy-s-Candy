import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navigation from './routes/navigation/navigation.component';
import { checkUserSession } from './store/user/user.action'
import Spinner from "./components/spinner/spinner.component";

import { GlobaleStyle } from "./global.styles";

const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'))
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Home = lazy(() => import('./routes/home/home.component'))


const App = () => {
  const dispach = useDispatch()

  useEffect(() => {
    dispach(checkUserSession())
  }, [])

  return (
    <Suspense fallback={<Spinner />}>
      <GlobaleStyle />
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense >
  );
};

export default App;
