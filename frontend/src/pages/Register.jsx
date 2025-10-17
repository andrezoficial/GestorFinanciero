import React from "react";
import { Link } from "react-router-dom";


export const Register = () => {
    return (
        <section id="login">

            <div class="login-container">
                <div class="login-header">
                    <h2>Crear Cuenta</h2>
                    <p>Ingresa tus datos para crear tu cuenta</p>
                </div>

                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Correo Electrónico</label>
                        <input type="email" id="email" name="email" placeholder="tu@email.com" required/>
                    </div>

                    <div class="form-group">
                        <label for="password">Crea una contraseña</label>
                        <div class="password-container">
                            <input type="password" id="password" name="password" placeholder="*********" required/>
                                <button type="button" class="toggle-password" id="togglePassword"></button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Verifica tu contraseña</label>
                        <div class="password-container">
                            <input type="password" id="password" name="password2" placeholder="*********" required/>
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
                    ¿Ya tienes una cuenta? <Link to="/login" id="signupLink">Inicia sesion aquí</Link>
                </div>
            </div>

        </section>
    );
};