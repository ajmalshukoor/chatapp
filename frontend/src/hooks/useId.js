import { useAuthContext } from './useAuthContext'
import jwtDecode from 'jwt-decode';


export const useId = () => {
    const {user} = useAuthContext()
    const token = user.token;
    const decoded = jwtDecode(token);

    return decoded._id
}