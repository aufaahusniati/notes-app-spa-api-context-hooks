import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import LoginInput from "../components/LoginInput";
import { Link } from "react-router-dom";
import { login } from "../utils/network-data";

function LoginPage({ loginSuccess }) {
  const { selectLanguage } = React.useContext(LocaleContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>
        {selectLanguage({
          id: "Login untuk menggunakan aplikasi",
          en: "Login to use app",
        })}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {selectLanguage({
          id: "Belum punya akun?",
          en: "Don't have an account?",
        })}{" "}
        <Link to="/register">
          {selectLanguage({ id: "Daftar di sini", en: "Register here" })}
        </Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
