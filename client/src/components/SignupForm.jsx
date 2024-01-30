import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { loading }] = useMutation(ADD_USER); // Use loading state from mutation

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
      setUserFormData({ username: "", email: "", password: "" }); // Clear form on successful signup
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setValidated(false);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert
        dismissible
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant="danger"
      >
        Something went wrong with your signup!
      </Alert>
      {/* Form groups for username, email, and password */}
      {/* ... (Form groups remain unchanged) */}
      <Button
        disabled={
          !(
            userFormData.username &&
            userFormData.email &&
            userFormData.password
          ) || loading
        }
        type="submit"
        variant="success"
      >
        {loading ? "Loading..." : "Submit"}
      </Button>
    </Form>
  );
};

export default SignupForm;
