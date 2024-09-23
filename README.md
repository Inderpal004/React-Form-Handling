```markdown
# React Form Handling with `react-hook-form` and Zod Validation

This project demonstrates two different approaches for handling form inputs in React using `react-hook-form`:
1. A basic form with `react-hook-form` for handling inputs and form submission.
2. A form that integrates Zod validation with `react-hook-form` for enhanced input validation.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Basic Form Example](#basic-form-example)
- [Form with Zod Validation Example](#form-with-zod-validation-example)
- [Usage](#usage)

## Features
- **Basic form**: A form using `react-hook-form` with validation and submission handling.
- **Form with Zod validation**: Enhanced validation using Zod and `react-hook-form`'s `zodResolver`.
- Real-time value watching for form inputs.

## Technologies
- [React](https://reactjs.org/)
- [react-hook-form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) (for schema-based validation)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/inderpal004/react-form-handling.git
   cd react-form-handling
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

## Basic Form Example

The basic form uses `react-hook-form` to handle user input and validation. Here's a summary of how it works:
- **Input fields**: First Name, Last Name, Email, and Gender.
- **Validation**: Each field is required. The Email field uses built-in email validation from HTML5.

```jsx
import { useForm } from 'react-hook-form';

function BasicForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label>
      <input {...register('firstName', { required: true })} />
      {errors.firstName && <p>First Name is required</p>}

      <label>Last Name:</label>
      <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last Name is required</p>}

      <label>Email:</label>
      <input {...register('email', { required: true })} />
      {errors.email && <p>Email is required</p>}

      <label>Gender:</label>
      <select {...register('gender', { required: true })}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p>Gender is required</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default BasicForm;
```

## Form with Zod Validation Example

This form integrates **Zod** for schema-based validation. Zod ensures stricter validation rules, such as verifying email formats and ensuring the gender field is properly selected.

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define Zod schema
const schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Select any one of these options' }),
  }),
});

function ZodForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label>
      <input {...register('firstName')} />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label>Last Name:</label>
      <input {...register('lastName')} />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <label>Email:</label>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <label>Gender:</label>
      <select {...register('gender')}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default ZodForm;
```

## Usage

- **Basic form**: The form can be submitted if all fields are filled in, and basic error messages will display if required fields are missing.
- **Zod validation form**: This form provides more robust validation using the Zod schema, including proper error messages for invalid inputs.

### Running the Project
1. After installing dependencies, start the development server:
   ```bash
   npm start
   ```

2. Access the forms in the browser and test the functionality of both the basic and Zod-validated forms.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

This README outlines the project setup, explains the form functionality, and provides instructions on how to use both the basic form and the form with Zod validation.