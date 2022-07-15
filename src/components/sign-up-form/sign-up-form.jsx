import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase';
import Button from '../button/button';
import FormInput from '../form-input/form-input';
import './sign-up-form.scss';

const defaultFormFields = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: ''
}

const SignUpForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { displayName, email, password, confirmPassword } = formFields;

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
   }

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (password !== confirmPassword) {
         alert("Passwords do not match");
         return
      }

      try {
         const { user } = await createAuthUserWithEmailAndPassword(email, password);
         await createUserDocFromAuth(user, { displayName });
         resetForm();
      } catch (error) {
         if (error.code === 'auth/email-already-in-use') {
            alert('Email already in use')
         }
         console.log(error)
      }
   }

   const resetForm = () => {
      setFormFields(defaultFormFields);
   }

   return (
      <div className='sign-up-container'>
         <h2>Don't have an account?</h2>
         <span>Sign Up with Email and Password</span>
         <form onSubmit={handleSubmit}>
            <FormInput label='Display name' type="text" required onChange={handleChange} name="displayName" value={displayName}/>

            <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />

            <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />

            <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

            <Button type="submit">Sign Up</Button>
         </form>
      </div>
   )
}

export default SignUpForm;