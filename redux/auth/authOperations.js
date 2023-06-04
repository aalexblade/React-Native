import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          updateUserProfile({
            userId: uid,
            email: email,
            name: displayName,
            avatar: photoURL,
          })
        );
        dispatch(authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const authSignUpUser =
  ({ state, avatar }) =>
  async (dispatch, getState) => {
    const { login, email, password } = state;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });

      const { uid, displayName, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email: email,
          avatar: photoURL,
        })
      );
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
 
      dispatch(
        updateUserProfile({
          userId: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        })
      );
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error.message", error.message);
  }
};
