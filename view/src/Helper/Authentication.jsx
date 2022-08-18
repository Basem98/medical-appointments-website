import checkAuthentication from "../Network/Base/checkAuthentication";
import { setUserDetails } from "../Store/Features/UserDetails/userDetailsSlice";


export const authenticate = function (role, navigate, dispatch) {
  return checkAuthentication()
    .then((response) => {
      dispatch(setUserDetails({
        role: response.data.role,
        data: response.data.data,
        email: response.data.data.email
      }))
      if (response.data.role !== role) {
        throw new Error('Insufficient access permissions');
      }
    })
    .catch((error) => {
      navigate('/unauthorized');
    })
}