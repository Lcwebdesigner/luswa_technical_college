/* =========================================================
   LUSWA TECHNICAL COLLEGE — STUDENT REGISTRATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const alertBox = document.getElementById("authAlert");
    const submitBtn = document.getElementById("registerBtn");

    const setError = (input, message) => {
        const label = input.closest("label");
        const error = label?.querySelector(".error-message");
        input.classList.toggle("input-error", Boolean(message));
        if (error) error.textContent = message || "";
    };

    const showAlert = (message, type) => {
        alertBox.textContent = message;
        alertBox.className = `auth-alert show ${type}`;
    };

    form?.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => setError(input, ""));
    });

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        alertBox.classList.remove("show");

        const fullName = form.elements.fullName;
        const email = form.elements.email;
        const phone = form.elements.phone;
        const password = form.elements.password;
        const confirmPassword = form.elements.confirmPassword;

        let valid = true;

        if (!fullName.value.trim()) {
            setError(fullName, "Please enter your full name.");
            valid = false;
        }

        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            setError(email, "Enter a valid email address.");
            valid = false;
        }

        if (!phone.value.trim() || !/^[0-9+\s()-]{9,18}$/.test(phone.value.trim())) {
            setError(phone, "Enter a valid phone number.");
            valid = false;
        }

        if (password.value.length < 8) {
            setError(password, "Password must be at least 8 characters.");
            valid = false;
        }

        if (confirmPassword.value !== password.value) {
            setError(confirmPassword, "Passwords do not match.");
            valid = false;
        }

        if (!valid) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Creating account...";

        try {
            if (typeof supabaseClient === "undefined") {
                throw new Error(
                    "Connection to the server is not set up correctly (supabase-config.js missing or failed to load)."
                );
            }

            const { data, error } = await supabaseClient.auth.signUp({
                email: email.value.trim(),
                password: password.value,
                options: {
                    data: {
                        full_name: fullName.value.trim(),
                        phone: phone.value.trim()
                    }
                }
            });

            if (error) {
                showAlert(error.message || "Something went wrong. Please try again.", "error");
                return;
            }

            // If email confirmation is required, there is no active session yet.
            if (data.user && !data.session) {
                form.reset();
                showAlert(
                    "Account created. Please check your email to confirm your address before logging in.",
                    "success"
                );
                return;
            }

            // Email confirmation disabled in project settings — session exists immediately.
            window.location.href = "student-dashboard.html";
        } catch (err) {
            console.error("Registration error:", err);
            showAlert(err.message || "Unexpected error. Please try again.", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Create Account <i class="fas fa-arrow-right"></i>';
        }
    });
});
