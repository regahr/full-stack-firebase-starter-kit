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
import { auth } from "../firebaseConfig"; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from "firebase/auth";
import { User } from '../../../shared/user';
import { useDispatch } from "react-redux";
import {
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  REFRESH,
  UPDATE_USER_TOKEN,
} from "@/store/action";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { userApi } from "@/apis/userApi";

interface SignUpFormProps {
  onSignUpSuccess: () => void; // Callback for successful sign-up
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpSuccess }) => {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { submitting, error } = useSelector((state: RootState) => state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: User) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: CREATE_USER_REQUEST });

    try {
      if (formData?.email && formData?.password && formData?.name) {
        const result = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const token = await result.user.getIdToken();
        const response = await userApi.createUser(formData, token);
        const createdUser = response.user;
        dispatch({ type: CREATE_USER_SUCCESS, payload: createdUser });
        dispatch({ type: UPDATE_USER_TOKEN, token });
        onSignUpSuccess(); // Call the success callback
      }
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILURE,
        error: (error as Error).message,
      });
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
        <Typography variant="h5">Sign Up</Typography>
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
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
            disabled={submitting}
          >
            {submitting ? "Signing up..." : "Sign Up"}
          </Button>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            <Link href="/" underline="none" color="primary">
              <Button
                variant="text"
                color="primary"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch({ type: REFRESH });
                }}
              >
                Back to Login
              </Button>
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpForm;
