import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getCurrentUser } from "../services/api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

   const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } catch (err) {
           throw err.response?.data?.message || "Login failed"; 
           
        } finally {
            setLoading(false)
        }
    }

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (err) {
        console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  };
   
  useEffect(()=>{
    
    const getandsetUser = async () =>{
      
      try{
        const data = await getCurrentUser();
        setUser(data.user)
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }

    }
    getandsetUser();

  },[])



  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    
  };
};
