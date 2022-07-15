import SignUpForm from '../../components/sign-up-form/sign-up-form';
import { signInWithGooglePopup, createUserDocFromAuth } from '../../utils/firebase/firebase';
import './sign-in.scss';

const SignIn = () => {

   const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocFromAuth(user);
   }

   return (
      <div>
         <h1>Sign In</h1>
         <button onClick={logGoogleUser}>
            Sign In With Google Popup
         </button>
         <SignUpForm/>
      </div>
   )
}

export default SignIn;