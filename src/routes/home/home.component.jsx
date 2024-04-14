import { Outlet } from 'react-router-dom';
import {Welcome} from './home.styles'

import Directory from '../../components/directory/directory.component';

const Home = () => {
  

  return (
    <div>
      <Welcome>Marino Welcomes You Baby</Welcome>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
