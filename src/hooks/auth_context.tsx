import { createContext, Dispatch, useContext, useReducer } from "react";
import { getUserInfoToSessionStorage } from "../storage/userInfoHandler";

interface AuthContextProps {
  children: React.ReactNode;
}

export interface AuthProps {
  displayName: string | null;
  photoURL: string | null;
}

export const AuthContext = createContext<AuthProps | null>(null);

type AuthDispatch = Dispatch<Action>;

export const AuthDispatchContext = createContext<AuthDispatch | undefined>(
  undefined
);

type Action =
  | { type: "LOGIN"; user: AuthProps }
  | { type: "LOGOUT"; user: null };

function AuthReducer(state: AuthProps | null, action: Action) {
  switch (action.type) {
    case "LOGIN":
      return (state = action.user);
    case "LOGOUT":
      return null;
    default:
      throw new Error("Unhandled action");
  }
}

export function AuthContextProvier({ children }: AuthContextProps) {
  const storageUserInfo = getUserInfoToSessionStorage();

  const [user, dispatch] = useReducer(AuthReducer, storageUserInfo);
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
}
export function useAuthState() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) throw new Error("dispatch not found");
  return dispatch;
}
