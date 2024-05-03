import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { SignOutStart } from '../../store/user/user.action';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
  const dispach = useDispatch()

  const signOutUser = ()=> dispach(SignOutStart()) 
  const currentUser  = useSelector(selectCurrentUser)
  const isCartOpen  = useSelector(selectIsCartOpen)
  console.log('from navBar: ',currentUser)
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ) : (
              <NavLink to='/auth'>
                SIGN IN
              </NavLink>
            )
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
