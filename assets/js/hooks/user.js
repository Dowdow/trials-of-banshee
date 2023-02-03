import { useSelector } from 'react-redux';

export function useUser() {
  return useSelector((state) => state.user);
}

export function useAuthenticated() {
  return useSelector((state) => state.user.authenticated);
}

export function useAdmin() {
  return useSelector((state) => state.user.admin);
}
