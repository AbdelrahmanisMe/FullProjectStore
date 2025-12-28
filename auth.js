// === Sign Up Logic ===
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        const username = document.getElementById("signupUsername").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        if (username && email && password) {
            // Save User Data
            const user = { username, email, password };
            localStorage.setItem("currentUser", JSON.stringify(user));
            
            // إشعار جميل (Toast) يظهر ويختفي تلقائياً
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });

            Toast.fire({
                icon: 'success',
                title: `مرحباً ${username}، تم إنشاء الحساب!`
            });

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);

        } else {
            // رسالة خطأ جميلة في المنتصف
            Swal.fire({
                icon: 'error',
                title: 'عذراً',
                text: 'الرجاء ملء جميع البيانات المطلوبة!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'حسناً'
            });
        }
    });
}

// === Login Logic ===
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        // جلب الاسم
        const username = document.getElementById("loginUsername").value;
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        if (username && email && password) {
            // Save User Data
            const user = { username: username, email: email }; 
            localStorage.setItem("currentUser", JSON.stringify(user));
            
            // إشعار نجاح دخول
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `تم تسجيل الدخول بنجاح<br>أهلاً بك يا ${username}`,
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } else {
            // رسالة تنبيه في حالة وجود حقول فارغة
            Swal.fire({
                icon: 'warning',
                title: 'بيانات ناقصة',
                text: 'الرجاء إدخال الاسم والبريد وكلمة المرور',
            });
        }
    });
}