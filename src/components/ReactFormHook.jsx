import { useState } from 'react';
import { useForm } from 'react-hook-form';

function ReactFormHook() {
  const [submittedData, setSubmittedData] = useState({}); 

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    watch 
  } = useForm();

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
    <h1 className="heading">React Form Hook</h1>
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'First Name is required' })}
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
            {...register('lastName', { required: 'Last Name is required' })}
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
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className="error">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            {...register('gender', { required: 'Please select your gender' })}
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
  );
}

export default ReactFormHook;