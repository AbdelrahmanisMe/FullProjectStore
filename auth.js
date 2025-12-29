// === Sign Up Logic (No Change) ===
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        const username = document.getElementById("signupUsername").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        if (username && email && password) {
            const user = { username, email, password };
            localStorage.setItem("currentUser", JSON.stringify(user));
            
            Swal.fire({
                icon: 'success',
                title: `مرحباً ${username}`,
                text: 'تم إنشاء الحساب بنجاح!',
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'عذراً',
                text: 'الرجاء ملء جميع البيانات',
            });
        }
    });
}

// === Login Logic (MODIFIED: Removed Email Check) ===
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        // جلب الاسم وكلمة المرور فقط
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        if (username && password) {
            const user = { username: username }; 
            localStorage.setItem("currentUser", JSON.stringify(user));
            
            Swal.fire({
                icon: 'success',
                title: 'تم تسجيل الدخول',
                text: `أهلاً بك يا ${username}`,
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'بيانات ناقصة',
                text: 'الرجاء إدخال الاسم وكلمة المرور',
            });
        }
    });
}