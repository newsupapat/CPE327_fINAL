import history from '../history';
import Cookies from 'js-cookie';
export const UpdateUser = User => {
  return {
    type: 'USER_UPDATE',
    payload: User
  };
};
export const DestroyUser = () => (dispatch, getState) => {
  Cookies.remove('_user');
  dispatch({ type: 'DESTROY_UPDATE' });
  console.log(Cookies.get('_user'));
  history.push('/login');
};
