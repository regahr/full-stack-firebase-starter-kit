"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REFRESH,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "@/store/action"; // Ensure this path is correct
import { RootState } from "@/store/store";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import { userApi } from "@/apis/userApi";
import { User } from '../../../shared/user';
import UpdateButton from "@/components/UpdateButton";

interface UpdateFormProps {
  onUpdateUserSuccess: () => void; // Callback for successful sign-up
  onInvalidatedToken: () => void; // Callback for successful sign-up
}

const UpdateForm: React.FC<UpdateFormProps> = ({ onUpdateUserSuccess, onInvalidatedToken }) => {
  const user = useSelector((state: RootState) => state?.user);
  const token = useSelector((state: RootState) => state?.token);

  const [formData, setFormData] = useState<User>({ name: "" });
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(token === 'invalidated'){
      onInvalidatedToken()
    }
    if (user) {
      setFormData({
        name: user.name ?? "",
      });
      setLoading(false); // Set loading to false once user data is available
    }
  }, [user, token, onInvalidatedToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: User) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: UPDATE_USER_REQUEST });
    if (user && user.email) {
      try {
        if (token) {
          const response = await userApi.updateUserInfo(
            user.email,
            formData,
            token
          );
          const updatedUser = response.user;
          dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
          onUpdateUserSuccess();
        } else {
          dispatch({
            type: UPDATE_USER_FAILURE,
            error: "Token not available or expired",
          });
        }
      } catch (error) {
        dispatch({
          type: UPDATE_USER_FAILURE,
          error: (error as Error).message,
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {loading ? ( // Show loading overlay while data is being loaded
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress /> {/* Loading spinner */}
        </Box>
      ) : (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Update Profile
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Current Profile: <br />
                Name: {user?.name ?? "Not available"} <br />
                Email: {user?.email ?? "Not available"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <UpdateButton />
              </form>
              <Link href="/home" sx={{ textDecoration: "none" }}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch({ type: REFRESH });
                  }}
                >
                  Back to Home
                </Button>
              </Link>
            </Paper>
          </Box>
        </Suspense>
      )}
    </Container>
  );
};

export default UpdateForm;
