import React, { Component } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/20/solid";
import { validateEmail, validatePassword } from "../utils/Validator";
import { Navigate } from "react-router-dom";

export class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      form: {
        email: "",
        password: "",
      },
      error: {},
      isFormInitCheck: true,
      isLogin: false,
    };
  }

  handleLogin = () => {
    const isValidated = this.validateLogin();
    if (isValidated) {
      this.setState({
        isLogin: true,
      });
      localStorage.setItem("isLogin", true);
      console.log("Login Success");
    } else {
      this.setState({
        isLogin: false,
      });
    }
  };

  validateLogin = () => {
    const resValidateEmail = validateEmail(this.state.form.email);
    const resValidatePass = validatePassword(this.state.form.password);

    this.setState({
      isFormInitCheck: false,
    });

    if (resValidateEmail.isError) {
      this.setState((prev) => ({
        error: {
          ...prev.error,
          email: resValidateEmail.message,
        },
      }));
    } else {
      delete this.state.error.email;
      this.setState((prev) => ({
        error: { ...prev.error },
      }));
    }
    if (resValidatePass.isError) {
      this.setState((prev) => ({
        error: {
          ...prev.error,
          password: resValidatePass.message,
        },
      }));
    } else {
      delete this.state.error.password;
      this.setState((prev) => ({
        error: { ...prev.error },
      }));
    }
    if (resValidateEmail.isError || resValidatePass.isError) {
      return false;
    }
    this.setState({
      error: {},
    });
    return true;
  };

  componentWillUnmount() {
    this.setState({
      showPassword: false,
      form: {
        email: "",
        password: "",
      },
      error: {},
      isFormInitCheck: true,
    });
  }

  render() {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <div className=" bg-gray-50 rounded-lg px-3 py-2 border-gray-800 border base-shadow w-[10%] min-w-fit  dark:text-gray-300 dark:bg-gray-600">
            <h1 className="text-4xl font-bold text-start">Login</h1>
            <form>
              <div className="flex flex-col gap-y-3 mt-6">
                <div className="space-y-1">
                  <label
                    className={`${
                      this.state.error.email ? "text-red-400" : ""
                    } flex gap-2 text-lg items-center`}
                  >
                    Email
                    <input
                      value={this.state.form.email}
                      onChange={(e) => {
                        if (!this.state.isFormInitCheck) {
                          this.validateLogin();
                        }
                        this.setState((prev) => ({
                          form: { ...prev.form, email: e.target.value },
                        }));
                      }}
                      type="email"
                      placeholder="Masukkan email anda"
                      className={`grow dark:bg-gray-400 placeholder:text-gray-500 text-lg dark:text-gray-900 ${
                        this.state.error.email ? "error" : ""
                      }`}
                    />
                  </label>
                  <p className="text-red-400 text-sm font-medium">
                    {this.state.error.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <label
                    className={`${
                      this.state.error.password ? "text-red-400" : ""
                    } flex gap-2 text-lg items-center justify-center`}
                  >
                    Password
                    <input
                      value={this.state.form.password}
                      onChange={(e) => {
                        if (!this.state.isFormInitCheck) {
                          this.validateLogin();
                        }
                        this.setState((prev) => ({
                          form: { ...prev.form, password: e.target.value },
                        }));
                      }}
                      placeholder="Masukkan password anda"
                      type={this.state.showPassword ? "text" : "password"}
                      className={`grow dark:bg-gray-400 placeholder:text-gray-500 dark:text-gray-900 ${
                        this.state.error.password ? "error" : ""
                      }`}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        this.setState((prev) => ({
                          showPassword: !prev.showPassword,
                        }));
                      }}
                      type="button"
                      className="aspect-square h-11 p-2"
                    >
                      {this.state.showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                  </label>
                  <p className="text-red-400 text-sm font-medium break-words ">
                    {this.state.error.password}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={this.handleLogin}
                className="bg-blue-400 font-medium text-blue-950 hover:bg-blue-500 hover:text-white w-full mt-6 h-11 text-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        {this.state.isLogin && <Navigate to="/" replace={true} />}
      </>
    );
  }
}

export default LoginCard;
