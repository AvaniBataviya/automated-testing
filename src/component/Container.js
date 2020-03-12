import React, {Component} from 'react';
import {
  Container as ReactStrapContainer,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Form,
  Card,
  CardTitle,
  CardBody
} from 'reactstrap';
import {toast} from "react-toastify";

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: ''
      },
      errors: {}
    }
  }

  getRegExp = type => {
    let regx = null;
    switch (type) {
      case "email":
        regx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
        break;
      default:
        break;
    }
    return regx;
  };

  handleChange = (e) => {
    const {form} = this.state;
    const {name, value} = e.target;
    form[name] = value;
    this.setState(form);
  };

  onValidation = (name, error) => {
    const {errors} = this.state;
    errors[name] = error;
    this.setState({errors});
  };

  onFieldValidate = (e) => {
    const {name, value} = e.target;

    let errorMsg = "";
    if (!value) {
      errorMsg = `Please enter ${(name)}.`;
    } else if (name === 'email' && value && !this.getRegExp('email').test(value)) {
      errorMsg = `Please enter valid ${(name)}.`;
    } else if (name === "password" && value.length < 6) {
      errorMsg = `Password must be at least 6 characters long.`;
    }
    this.onValidation(name, errorMsg);
  };

  onSubmitForm = () => {
    const {form, errors} = this.state;
    const {email, password} = form;
    const data = {
      'email': email,
      'password': password
    };
    const validationError = this.checkValidation(errors, data);
    if (Object.keys(validationError).length !== 0) {
      toast.error("Please enter required information.");
      this.setState({errors: validationError});
    } else {
      this.cleanForm();
      console.log(this.props);

      this.props.history.push('/dashborad');
    }
  };

  checkValidation = (errors, data) => {
    const finalErrors = {};
    Object.keys(data).forEach((key) => {
      if (data[key] === '' || data[key] === {}) {
        finalErrors[key] = `Please enter ${key}.`
      }
    });
    Object.keys(errors).forEach((key) => {
      if (errors[key] !== "") {
        finalErrors[key] = errors[key]
      }
    });
    return finalErrors;
  };

  cleanForm = () => {
    const {form} = this.state;
    form.email = '';
    form.password = '';
    this.setState({
      errors: {}, form
    })
  };

  render() {
    const {form, errors} = this.state;
    const {email, password} = form;

    return (
      <ReactStrapContainer>
        <Row className="d-flex justify-content-center">
          <Col lg="6" className="mt-5 px-4">
            <Card className="py-5 px-3">
              <CardBody>
                <CardTitle className="text-uppercase text-dark font-weight-bolder text-center mb-4 page-title"
                           id="login-title"
                >
                  Login
                </CardTitle>
                <Form className="">
                  <FormGroup>
                    <Label for="exampleEmail">Email<span style={{color: "red"}}> * </span> </Label>
                    <Input type="email"
                           name="email"
                           id="exampleEmail"
                           placeholder="email"
                           value={email}
                           onChange={this.handleChange}
                           onBlur={this.onFieldValidate}
                           onFocus={() => {
                             if (!this.onValidation) return;
                             this.onValidation("password", "");
                           }}
                    />
                    {errors && errors.email && <span className="error emailError">{errors.email}</span>}
                  </FormGroup>

                  <FormGroup>
                    <Label for="examplePassword">Password<span style={{color: "red"}}> * </span> </Label>
                    <Input type="password"
                           name="password"
                           id="password"
                           placeholder="password"
                           value={password}
                           onChange={this.handleChange}
                           onBlur={this.onFieldValidate}
                           onFocus={() => {
                             if (!this.onValidation) return;
                             this.onValidation("password", "");
                           }}
                    />
                    {errors && errors.password && <span className="error passwordError">{errors.password}</span>}
                  </FormGroup>

                  <FormGroup check row>
                    <Col className="d-flex justify-content-center mt-5">
                      <Button name="submit" onClick={this.onSubmitForm}>Submit</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactStrapContainer>
    );
  }
};
