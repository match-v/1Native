document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const logoutButton = document.getElementById("logout");

  // 检查是否有已登录的用户名
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    logoutButton.textContent = storedUsername;
    logoutButton.removeAttribute("href"); // 移除链接属性
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // 简单验证
      if (username === "admin" && password === "password") {
        localStorage.setItem("username", username); // 保存用户名到localStorage
        window.location.href = "index.html";
      } else {
        alert("身份无效!");
      }
    });
  }
});
