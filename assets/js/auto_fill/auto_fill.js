$(document).ready((function() {
    window.changeCredentials = function(n, i) {
        $("#email").val(n), $("#password").val(i)
    }, $(document).on("click", ".admin-login", (function() {
        changeCredentials("admin@infysupport.com", "123456")
    })), $(document).on("click", ".agent-login", (function() {
        changeCredentials("agent@infysupport.com", "123456")
    }))
}));