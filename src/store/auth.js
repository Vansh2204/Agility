import { Children,createContext, useState,useContext } from "react"

export const AuthContext = createContext();

export const AuthHandler = ({children}) => {
    const [token, settoken] = useState(sessionStorage.getItem('token'));
    const authorizationtoken = `Bearer${token}`;

    const storetokencreds = (servertoken) => {
        sessionStorage.setItem('token', servertoken);
        settoken(sessionStorage.getItem('token'));
    }

    const storeusercreds = (user) => {
        sessionStorage.setItem('userData', JSON.stringify(user));
    }

    let isloggedin = token ? true : false;

    const logoutuser = () => {
        settoken("");
        sessionStorage.clear('userData')
        return sessionStorage.clear('token');
    }

    return (
        <AuthContext.Provider value={{ authorizationtoken, storetokencreds, storeusercreds, isloggedin, logoutuser }}>
            {children}
        </AuthContext.Provider>
    )


}
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be within an AuthProvider")
    }

    return authContextValue;
}