import React from "react";
import { Link } from "react-router-dom";


export const Login = () => {
    return (
        <section id="login">

            <div class="login-container">
                <div class="login-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Accede a tu cuenta</p>
                </div>

                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Correo Electrónico</label>
                        <input type="email" id="email" name="email" placeholder="tu@email.com" required/>
                    </div>

                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <div class="password-container">
                            <input type="password" id="password" name="password" placeholder="*********" required/>
                                <button type="button" class="toggle-password" id="togglePassword"></button>
                        </div>
                    </div>

                    <div class="form-options">
                        <a href="#" class="forgot-password" id="forgotPassword">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" class="login-button" id="loginButton">
                        Iniciar Sesión
                    </button>
                </form>

                <div class="signup-link">
                    ¿No tienes una cuenta? <Link to="/register" id="signupLink">Regístrate aquí</Link>
                </div>
            </div>

        </section>
    );
};