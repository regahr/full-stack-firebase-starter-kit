"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { auth } from "@/firebaseConfig"; // Adjust the path as necessary
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PURGE_USER, REFRESH } from "@/store/action";
import { useDispatch } from "react-redux";

const HomePage: React.FC = () => {
  const router = useRouter();

  const userInfo = auth.currentUser;
  const user = useSelector((state: RootState) => state?.user);
  const token = useSelector((state: RootState) => state?.token);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token === 'invalidated'){
      router.push('/')
    }

    if (user) {
      setLoading(false); // Set loading to false once user data is available
    }
  }, [user, token, router]);

  const handleLogout = async (e: React.FormEvent) => {
    e.stopPropagation();
    try {
      await auth.signOut(); // Sign out the user
      dispatch({ type: REFRESH });
      dispatch({ type: PURGE_USER });  
      router.push("/"); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleShowUserInfo = () => {
    setShowUserInfo(true);
  };

  const handleUpdateUserData = () => {
    router.push("/update-user"); // Redirect to the update user data page
  };

  const handleClose = () => {
    setShowUserInfo(false);
  };

  return (
    <Container component="main" maxWidth="sm">
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
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Welcome, {user?.name || user?.email || "User"}!
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              We&apos;re glad to have you here. You can manage your account
              below.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowUserInfo}
              sx={{ marginBottom: 2 }}
            >
              Show User Info
            </Button>
            <Dialog open={showUserInfo} onClose={handleClose}>
              <DialogTitle>User Info</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Email: {userInfo?.email} <br />
                  UID: {userInfo?.uid}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleUpdateUserData}
            >
              Update Profile
            </Button>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              <Button
                variant="text"
                color="secondary"
                onClick={(e) => {
                  handleLogout(e)
                }}
              >
                Logout
              </Button>
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default HomePage;
