import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
//import Router from './Router/Router';

firebase.initializeApp(firebaseConfig);


function Login() {

  const [newUser, setNewUser] = useState(false)
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();


  const [user, setUser] = useState({
    isLogIn: false,
    name : '',
    photo : '',
    email : '',
    password: '',
    success: false,
    error: ''
  })

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

//facebook login process
  const signInWithFb = () => {
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      const {displayName, email, photoURL} = user;
      const userData = {
        isLogIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(userData);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  //google login process
  const googleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(result => {
        const token = result.credential.accessToken;
        const {displayName, email, photoURL} = result.user;
        const userData = {
          isLogIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(userData);
      //  console.log(user, displayName, email, photoURL);
      })
      .catch(err => console.log(err.message))
  }
  
  const signOutClicked=()=>{
    firebase.auth().signOut().then(result =>{
      const user ={
        isLogIn: false,
        name : '',
        photo : '',
        email : ''
      }
      setUser(user);
    }).catch(err => {
      console.log(err.message)
    });
  }


  const handleBlur =(e)=>{
    let formValid = true;
    if(e.target.name === 'email'){
      const re = /\S+@\S+\.\S+/;
      formValid = re.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const length = e.target.value.length > 5;
      const hasNumber = /\d{1}/.test(e.target.value);

      if(length && hasNumber){
        formValid = true;
      }else{
        formValid = false;
      }
    }
    if(formValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }else{
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = '';
      setUser(newUserInfo);
    }
  }

  const handleSubmit =(e)=>{
   // console.log(user)
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res=> {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
        console.log(res)
      })
      .catch(function(error) {
        console.log("user not created in database")
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from); //login korar pore shipment page a redirect kore dibe
      })
      .catch(function(error) {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }

  const updateUserName = name =>{
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('User name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }


  return (
    <div className="App">
      <h3>Our own Authentication</h3>
        <p>{user.email} {user.password}</p>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUserCheck" id="" /> <label htmlFor="newUser">New User Sign Up</label> <br/><br/>
        {newUser && <> <input type="text" name="name" onChange={handleBlur} placeholder="Name" required/><br/><br/></>}

        <input type="text" name="email" onChange={handleBlur} placeholder="Email" required/>
        <br/>
        <br/>
        <input type="password" name="password" onChange={handleBlur} placeholder="Password" required/>
        <br/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      {user.error && <p style={{color:'red'}}>{user.error}</p>}
      {user.success && <p style={{color:'green'}}>User {newUser ? 'Sign Up' : 'Login'} Success</p>}

      {
        user.isLogIn ? <div>
                    <p>Welcome {user.name}</p>
                    <p>Your Email : {user.email}</p>
                    <img src={user.photo} height="60" alt=""/>
                    <br/>
                    <button onClick={signOutClicked}>Sign Out</button>
                  </div>
                  :
                  <div>
                  <br/> <br/>
                    <button onClick={googleSignIn}>Sign In With Google</button> <br/> <br/>
                    <button onClick={signInWithFb}>Sign In With Facebook</button>
                  </div>
                  
      }
    </div>
  );
}

export default Login;
