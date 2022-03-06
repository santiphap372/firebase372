<template>
  <div>
    <h1>Login</h1>
    <p>User name :<input type="email" required v-model="email" /></p>
    <p>Password<input type="password" required v-model="password" /></p>
    <button @click="login()">Login</button>
    <button @click="googlelogin()">Google Login</button>
    <button @click="logout()">Logout</button>
  </div>
</template>
<script>
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import { auth } from "../plugins/firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
      logout() {
      //const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.$route.replace("/");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    googlelogin() {
      const provider = new GoogleAuthProvider();
      // const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
          console.log("Google" + token);
          console.log("Google" + user);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "" + errorMessage);
          // The email of the user's account used.
          //const email = error.email;
          // The AuthCredential type that was used.
          //const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    login() {
      // const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User" + user);
          // ...
          this.$router.replace("/about");
          //this.$router.push("/about");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "" + errorMessage);
        });
    },
  },
};
</script>
