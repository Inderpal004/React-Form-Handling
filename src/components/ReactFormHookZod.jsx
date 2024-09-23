import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function ReactFormHookZod() {

    const [submittedData, setSubmittedData] = useState({}); 

    const schema = z.object({
        firstName: z.string().min(1, 'First Name is required'),
        lastName: z.string().min(1, 'Last Name is required'),
        email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
        gender: z.enum(['male', 'female', 'other'], {
          errorMap: () => ({ message: 'Select any one of these options' }),
        }).refine((value) => value !== '', {
          message: 'Select any one of these options',
        }),
      });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    watch 
  } = useForm({resolver: zodResolver(schema)});

  const watchedFirstName = watch('firstName');
  const watchedLastName = watch('lastName');  
  const watchedEmail = watch('email');       
  const watchedGender = watch('gender');     

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });
      setSubmittedData(data); 
      console.log('Form Data:', data);
      reset();
    
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };


  return (
    <>
    <h1 className="heading">React Form Hook Using Zod</h1>
    <div className='container'>
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          {...register('firstName')}
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          {...register('lastName')}
        />
        {errors.lastName && (
          <p className="error">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register('email')}
        />
        {errors.email && (
          <p className="error">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          {...register('gender')}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="error">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>

    <div className="watched-values">
      <h3>Watched Values:</h3>
      <p><strong>First Name:</strong> {watchedFirstName || 'Not entered'}</p>
      <p><strong>Last Name:</strong> {watchedLastName || 'Not entered'}</p>
      <p><strong>Email:</strong> {watchedEmail || 'Not entered'}</p>
      <p><strong>Gender:</strong> {watchedGender || 'Not selected'}</p>
    </div>

    <div className="submitted-values">
      <h3>Submitted Values:</h3>
      <p><strong>First Name:</strong> {submittedData.firstName || 'Not Submitted'}</p>
      <p><strong>Last Name:</strong> {submittedData.lastName || 'Not Submitted'}</p>
      <p><strong>Email:</strong> {submittedData.email || 'Not Submitted'}</p>
      <p><strong>Gender:</strong> {submittedData.gender || 'Not Submitted'}</p>
    </div>
  </div>
    </>
  )
}
