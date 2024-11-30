"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
} from "@mui/material";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  REFRESH,
  UPDATE_USER_TOKEN,
} from "@/store/action";
import { userApi } from "@/apis/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AxiosError } from "axios";

interface LoginFormProps {
  onLoginSuccess: () => void; // Callback for successful login
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state: RootState) => state?.submitting);
  const error = useSelector((state: RootState) => state?.error);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: FETCH_USER_REQUEST });

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      const userInfo = await userApi.fetchUserInfo(email, token);
      if (userInfo?.email) {
        dispatch({ type: FETCH_USER_SUCCESS, payload: userInfo });
        dispatch({ type: UPDATE_USER_TOKEN, token });
        onLoginSuccess();
      } else {
        throw new Error("User email not found yet on DB");
      }
    } catch (error) {
      const errorData = (error as AxiosError).response?.data as {
        message?: string;
      };
      if (errorData?.message) {
        dispatch({
          type: FETCH_USER_FAILURE,
          error: errorData?.message || "Unknown error occurred",
        });
      } else {
        dispatch({
          type: FETCH_USER_FAILURE,
          error: (error as Error).message,
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Link href="/sign-up" sx={{ textDecoration: "none" }}>
            <Button
              variant="text"
              color="primary"
              onClick={(event) => {
                event.stopPropagation();
                dispatch({ type: REFRESH });
              }}
            >
              Sign Up
            </Button>
          </Link>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
