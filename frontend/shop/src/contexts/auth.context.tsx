import React, { useMemo, useReducer, useState } from "react";
import { ICompany, IUser } from "@graphql/types.graphql";
import { isAuthenticated } from "@utils/auth-utils";

export interface IAuthValue {
  user?: IUser;
  company?: ICompany;
}

const initialValue: IAuthValue = {
  user: undefined,
  company: undefined,
};

export const AuthContext = React.createContext(initialValue);

export interface State {
  user: IUser;
  company: ICompany;
}

const AuthProvider: React.FC = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [state, setState] = useState<IAuthValue>(initialValue);

  const authLogin = (authValue: IAuthValue) =>
    setState({
      ...authValue,
    });

  const authLogout = () =>
    setState({
      user: undefined,
      company: undefined,
    });

  const value = useMemo(
    () => ({ ...state, authLogin, authLogout, data: "String" }),
    [state]
  );

  return (
    <AuthContext.Provider value={value} {...props}>
      {children}
    </AuthContext.Provider>
  );
};

export interface IAuthContextProps extends IAuthValue {
  authLogin: (val: IAuthValue) => void;
  authLogout: () => void;
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context as IAuthContextProps;
};

export default AuthProvider;
