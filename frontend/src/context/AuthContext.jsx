// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged, signOut,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, updateProfile,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'admin' | 'farmer' | 'expert'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/role/${firebaseUser.email}`
          );
          setUserRole(res.data.role);
        } catch {
          setUserRole("farmer"); // default role
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const updateUserProfile = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, googleProvider);
  const githubLogin = () => signInWithPopup(auth, githubProvider);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{
      user, userRole, loading,
      register, updateUserProfile, login, googleLogin, githubLogin, logout,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
