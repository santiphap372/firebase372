<template>
<div class="p-3 mb-2 bg-dark bg-gradient text-white">
    <h3>Covid-19 SURVEY</h3>
    <form @submit.prevent="addData">
<div class="col "> 
        <p><input
          type="text"
          class="form-control"
          placeholder="First name"
          aria-label="First name"
          v-model="Name1"
          required
        /></p>
      </div>
      <div class="col">
        <p><input
          type="text"
          class="form-control"
          placeholder="Last name"
          aria-label="Last name"
          v-model="Name2"
          required
        /></p>
      </div>
    <div>
      <form class="form-floating ">
            <p><input
              type="date"
              class="form-control text-muted"
              id="floatingInput"
              v-model="dat"
              required
            />
        </p></form>
      </div>
      <div class="col">
        <p><input
          type="text"
          class="form-control"
          placeholder="Tel."
          aria-label="tel"
          v-model="tel1"
          required
        /></p>
      </div>

      <div class="col">
        <p><input
          type="text"
          class="form-control"
          placeholder="E-mail"
          aria-label="mail"
          v-model="mail"
          required
        /></p>
      </div>
      <div>
 <fieldset class=" form-control text-muted">
   <p>Result ATK</p>
      <div class="form-check">
        <p><input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="positive result" v-model="Atk" required>
        <label class="form-check-label" for="gridRadios2">
          positive result
        </label></p>
      </div>
      <div class="form-check disabled">
        <p><input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="negative result"  v-model="Atk" required>
        <label class="form-check-label" for="gridRadios3">
          negative result
        </label></p>
      </div>
  </fieldset>
<p></p>
</div>
<p><button type="submit" class="d-grid gap-2 col-6 mx-auto btn btn-light text-muted">submit</button></p>
</form>   
 <!-- <div class="btn-group" role="group" aria-label="Basic radio toggle button group" >
 <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
  <label class="btn btn-outline-dark" for="btnradio1" @click="addData()">ADD</label>
   <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
  <label class="btn btn-outline-dark" for="btnradio2" @click="ReadData()" >READ</label> -->
  <!-- </div><br>   -->
<div>
      <table class="table table-striped table-hover table-dark table-gradient table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Result ATK</th>
            <th scope="col">Tel.</th>
            <th scope="col">E-mail</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in csDoc" :key="index" align="center">
            <td>{{ item.data.Date }}</td>
            <td>{{ item.data.fName }}</td>
            <td>{{ item.data.lName }}</td>
            <td>{{ item.data.ATK }}</td>
            <td>{{ item.data.tel }}</td>
            <td>{{ item.data.Email }}</td>
            <td><button class="btn-dark" @click="Del(item.id)">delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../plugins/firebase";

export default {
  data() {
    return {
      csDoc: [],
      Name1: [],
      Name2: [],
      Atk: [],
      tel1: [],
      dat: [],
      mail: [],
      email: [],
      uid: [],
    };
  },
  beforeMount() {
    this.checkLoin();
    this.ReadData();
  },
  methods: {
    async Del(id){
      this.csDoc = [];
      console.log("Delete"+ id);
      try{
      await deleteDoc(doc(db, "users", id));
      }catch(e){
        console.log("delete"+e);
      }
    },
    checkLoin() {
      // const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          // ...
          this.email = user.email;
          this.uid = user.uid;
        } else {
          // User is signed out
          // ...
          alert("กรุณา Login");
          this.$router.push("/login");
        }
      });
    },
    async addData() {
      this.csDoc=[];
      try {
        const docRef = await addDoc(collection(db, "users"), {
          fName: this.Name1,
          lName: this.Name2,
          Date: this.dat,
          ATK: this.Atk,
          tel: this.tel1,
          Email: this.mail,
          
        });
        this.Name1="",
        this.Name2="",
        this.dat="",
        this.Atk="",
        this.tel1="",
        this.mail="",

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      // this.ReadData();
    },
    ReadData() {
      this.csDoc = [];
      const q = query(collection(db, "users"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.csDoc.push({ id: doc.id, data: doc.data() });
        });
        // console.log("Current cities in CA: ", this.csDoc.join(", "));
      });
    },
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
*{
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}
.text1 {
  font-size: 60px;
  font-weight: 700;
  letter-spacing: 8px;
  margin-bottom: 20px;
  position: relative;
  animation: text 3s 1;
}

@keyframes text {
  0% {
    color: rgb(87, 0, 248);
    margin-bottom: -40px;
  }
  30% {
    letter-spacing: 25px;
    margin-bottom: -40px;
  }
  85% {
    letter-spacing: 8px;
    margin-bottom: -40px;
  }
}
</style>
