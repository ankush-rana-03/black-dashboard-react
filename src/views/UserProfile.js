/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

function UserProfile() {
  // State for reset password functionality
  const [resetPasswordData, setResetPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [errors, setErrors] = useState({});

  // Handle input changes for reset password form
  const handleResetPasswordChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate password reset form
  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!resetPasswordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!resetPasswordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (resetPasswordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(resetPasswordData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!resetPasswordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle password reset submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call for password reset
      // In a real application, you would make an actual API call here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // Simulate successful response
      const response = { success: true };
      
      if (response.success) {
        setAlert({
          show: true,
          message: 'Password updated successfully!',
          type: 'success'
        });
        
        // Reset form and close modal
        setResetPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setShowResetPasswordModal(false);
        
        // Hide alert after 3 seconds
        setTimeout(() => {
          setAlert({ show: false, message: '', type: '' });
        }, 3000);
        
      } else {
        throw new Error('Failed to update password');
      }
      
    } catch (error) {
      setAlert({
        show: true,
        message: error.message || 'Failed to update password. Please try again.',
        type: 'danger'
      });
      
      // Hide alert after 5 seconds
      setTimeout(() => {
        setAlert({ show: false, message: '', type: '' });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle reset password modal
  const toggleResetPasswordModal = () => {
    setShowResetPasswordModal(!showResetPasswordModal);
    if (!showResetPasswordModal) {
      // Reset form when opening modal
      setResetPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setErrors({});
      setAlert({ show: false, message: '', type: '' });
    }
  };

  return (
    <>
      <div className="content">
        {/* Alert for password reset feedback */}
        {alert.show && (
          <Row>
            <Col md="12">
              <Alert color={alert.type} className="alert-dismissible">
                {alert.message}
              </Alert>
            </Col>
          </Row>
        )}
        
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="mike@email.com" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg")}
                    />
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Teacher</p>
                </div>
                <div className="card-description">
                  Dedicated educator with passion for teaching and helping students achieve their goals. Always striving for excellence in education.
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
                <hr />
                <div className="button-container">
                  <Button 
                    className="btn-fill" 
                    color="warning" 
                    size="sm"
                    onClick={toggleResetPasswordModal}
                  >
                    <i className="tim-icons icon-lock-circle" /> Reset Password
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        {/* Reset Password Modal */}
        <Modal isOpen={showResetPasswordModal} toggle={toggleResetPasswordModal}>
          <ModalHeader toggle={toggleResetPasswordModal}>
            Reset Password
          </ModalHeader>
          <Form onSubmit={handleResetPassword}>
            <ModalBody>
              <FormGroup>
                <label>Current Password *</label>
                <Input
                  type="password"
                  name="currentPassword"
                  value={resetPasswordData.currentPassword}
                  onChange={handleResetPasswordChange}
                  placeholder="Enter your current password"
                  invalid={!!errors.currentPassword}
                />
                {errors.currentPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.currentPassword}
                  </div>
                )}
              </FormGroup>
              
              <FormGroup>
                <label>New Password *</label>
                <Input
                  type="password"
                  name="newPassword"
                  value={resetPasswordData.newPassword}
                  onChange={handleResetPasswordChange}
                  placeholder="Enter your new password"
                  invalid={!!errors.newPassword}
                />
                {errors.newPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.newPassword}
                  </div>
                )}
                <small className="form-text text-muted">
                  Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.
                </small>
              </FormGroup>
              
              <FormGroup>
                <label>Confirm New Password *</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={resetPasswordData.confirmPassword}
                  onChange={handleResetPasswordChange}
                  placeholder="Confirm your new password"
                  invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.confirmPassword}
                  </div>
                )}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button 
                color="secondary" 
                onClick={toggleResetPasswordModal}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                color="primary" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fa fa-spinner fa-spin" /> Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default UserProfile;
