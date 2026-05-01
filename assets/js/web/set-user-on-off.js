(() => {
    "use strict";
    window.setLastSeenOfUser = function(e) {
        $.ajax({
            type: "post",
            url: setLastSeenURL,
            data: {
                status: e,
                userId: JSON.parse(getCookie("chat_user")).id
            },
            success: function(e) {}
        })
    }, "" != getCookie("chat_user") && setLastSeenOfUser(1), window.onbeforeunload = function() {
        Echo.leave("user-status"), "" != getCookie("chat_user") && setLastSeenOfUser(0)
    }
})();