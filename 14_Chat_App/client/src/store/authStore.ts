import { create } from "zustand";
import { apiConnector } from "../services/apiConnector";

import { auth } from "../services/apis";
import toast from "react-hot-toast";

const {
  LOGIN_API,
  SIGNUP_API,
  LOGOUT_API,
  PROFILE_UPDATE_API,
  AUTH_CHECK_API,
} = auth;

export interface IAuthStore {
  authUser: any;
  isSigningUp: boolean;
  isLogging: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<void>;
  signup: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await apiConnector("GET", AUTH_CHECK_API);
      if (res) {
        set({ authUser: res.data.data });
      }
    } catch (err) {
      console.log("Error in check Auth", err);
      set;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: any) => {
    set({ isSigningUp: true });
    try {
      const res = await apiConnector("POST", SIGNUP_API, data);
      if (res) {
        set({ authUser: res.data.data });
      }

      toast.success("Account Created Successfully");
    } catch (err: any) {
      console.log("ERROR IN signup", err);
      toast.error(err.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: any) => {
    set({ isLogging: true });
    try {
      const res = await apiConnector("POST", LOGIN_API, data);
      console.log(res.data)
      if (res) {
        set({ authUser: res.data.data });
      }

      toast.success("Login Successfully");
    } catch (err: any) {
      console.log("ERROR IN login", err);
      toast.error(err.response.data.message);
    } finally {
      set({ isLogging: false });
    }
  },

  logout: async () => {
    try {
      await apiConnector("POST", LOGOUT_API);
      set({ authUser: null });
      toast.success("Logged out successfully ");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  },

  updateProfile: async (data: any) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await apiConnector("POST", PROFILE_UPDATE_API, data);
      if (res) {
        set({ authUser: res.data.data });
      }

      toast.success("Profile Updated Successfully");
    } catch (err: any) {
      console.log("ERROR IN login", err);
      toast.error(err.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
