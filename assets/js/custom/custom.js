(() => {
    "use strict";
    var __webpack_exports__ = {};

    function deleteItemAjax(url, tableId, header) {
        var callFunction = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        $.ajax({
            url,
            type: "DELETE",
            dataType: "json",
            success: function success(obj) {
                obj.success && (1 == $(tableId).DataTable().data().count() ? $(tableId).DataTable().page("previous").draw("page") : $(tableId).DataTable().ajax.reload(null, !1)), swal({
                    title: "Deleted!",
                    text: header + " has been deleted.",
                    type: "success",
                    confirmButtonColor: "#00b074",
                    timer: 2e3
                }), callFunction && eval(callFunction)
            },
            error: function(e) {
                swal({
                    title: "",
                    text: e.responseJSON.message,
                    type: "error",
                    confirmButtonColor: "#00b074",
                    timer: 5e3
                })
            }
        })
    }
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    }), $('input:text:not([readonly="readonly"])').first().focus(), $((function() {
        $(".modal").on("shown.bs.modal", (function() {
            $(this).find("input:text").first().focus()
        }))
    })), window.resetModalForm = function(e, t) {
        $(e)[0].reset(), $("select.select2Selector").each((function(e, t) {
            var o = "#" + $(this).attr("id");
            $(o).val(""), $(o).trigger("change")
        })), $(t).hide()
    }, window.printErrorMessage = function(e, t) {
        $(e).show().html(""), $(e).text(t.responseJSON.message)
    }, window.manageAjaxErrors = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "editValidationErrorsBox";
        404 == e.status ? iziToast.error({
            title: "Error!",
            message: e.responseJSON.message,
            position: "topRight"
        }) : printErrorMessage("#" + t, e)
    }, window.displaySuccessMessage = function(e) {
        iziToast.success({
            title: Lang.get("messages.success_message.success"),
            message: e,
            position: "topRight"
        })
    }, window.displayErrorMessage = function(e) {
        iziToast.error({
            title: Lang.get("messages.error_message.error"),
            message: e,
            position: "topRight"
        })
    }, window.deleteItem = function(e, t, o) {
        swal({
            title: deleteHeading + " !",
            text: deleteMessage + ' "' + o + '" ?',
            type: "warning",
            showCancelButton: !0,
            closeOnConfirm: !1,
            showLoaderOnConfirm: !0,
            confirmButtonColor: "#00b074",
            cancelButtonColor: "#d33",
            cancelButtonText: noMessages,
            confirmButtonText: yesMessages
        }, (function() {
            deleteItemAjax(e, t, o, null)
        }))
    }, window.format = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "DD-MMM-YYYY";
        return moment(e).format(t)
    }, window.processingBtn = function(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            n = $(e).find(t);
        "loading" === o ? n.button("loading") : n.button("reset")
    }, window.prepareTemplateRender = function(e, t) {
        return $.templates(e).render(t)
    }, window.isValidFile = function(e, t) {
        var o = $(e).val().split(".").pop().toLowerCase();
        return -1 == $.inArray(o, ["png", "jpg", "jpeg"]) ? ($(e).val(""), $(t).removeClass("d-none"), $(t).html("The image must be a file of type: jpeg, jpg, png.").show(), !1) : ($(t).hide(), !0)
    }, window.displayPhoto = function(e, t) {
        var o = !0;
        if (e.files && e.files[0]) {
            var n = new FileReader;
            n.onload = function(e) {
                var n = new Image;
                n.src = e.target.result, n.onload = function() {
                    $(t).attr("src", e.target.result), o = !0
                }
            }, o && (n.readAsDataURL(e.files[0]), $(t).show())
        }
    }, window.removeCommas = function(e) {
        return e.replace(/,/g, "")
    }, window.isEmpty = function(e) {
        return null == e || "" === e
    }, window.screenLock = function() {
        $("#overlay-screen-lock").show(), $("body").css({
            "pointer-events": "none",
            opacity: "0.6"
        })
    }, window.screenUnLock = function() {
        $("body").css({
            "pointer-events": "auto",
            opacity: "1"
        }), $("#overlay-screen-lock").hide()
    }, window.onload = function() {
        window.startLoader = function() {
            $(".infy-loader").show()
        }, window.stopLoader = function() {
            $(".infy-loader").hide()
        }, stopLoader()
    }, window.startLoader = function() {
        $(".infy-loader").show()
    }, window.stopLoader = function() {
        $(".infy-loader").hide()
    }, window.htmlSpecialCharsDecode = function(e) {
        return jQuery("<div />").html(e).text()
    }, window.setLocalStorageItem = function(e, t) {
        localStorage.setItem(e, t)
    }, window.getLocalStorageItem = function(e) {
        return localStorage.getItem(e)
    }, window.removeLocalStorageItem = function(e) {
        localStorage.removeItem(e)
    }, window.displayToastr = function(e, t, o) {
        iziToast.info({
            title: e,
            message: o,
            position: "topRight",
            icon: t
        })
    }, window.getCookie = function(e) {
        for (var t = e + "=", o = document.cookie.split(";"), n = 0; n < o.length; n++) {
            for (var i = o[n];
                " " == i.charAt(0);) i = i.substring(1);
            if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
        }
        return ""
    }, window.setCookie = function(e, t, o) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * o * 60 * 60 * 1e3);
        var i = "expires=" + n.toUTCString();
        document.cookie = e + "=" + t + ";" + i + ";path=/"
    }, window.copyToClipboard = function(e, t) {
        var o = $(e),
            n = $("<input>");
        $("body").append(n), n.val($(o).text()).select(), document.execCommand("copy"), n.remove(), $(t).toggleClass("d-none "), $("#copiedButton").toggleClass("d-none ")
    }, $(document).ready((function() {
        $(".inset-0").delay(5e3).slideUp(300), $('input[name="email"]').keyup((function() {
            this.value = this.value.toLowerCase()
        })), $('input[name="email"]').keypress((function(e) {
            if (32 === e.which) return !1
        })), $('input[type="password"]').keypress((function(e) {
            if (32 === e.which) return !1
        })), setLocalTimeAll()
    })), window.setLocalTimeAll = function() {
        $("[show-local-timeZone]").each((function() {
            var e = $(this).attr("show-local-timeZone");
            $(this).text(moment.utc(e).local().format("MMM DD, YYYY hh:mm"))
        }))
    }, window.showPassword = function(e) {
        var t = document.getElementById(e);
        "password" === t.type ? (t.type = "text", $(t).next().find("i").toggleClass("fa-eye-slash fa-eye")) : (t.type = "password", $(t).next().find("i").toggleClass("fa-eye-slash fa-eye"))
    }, document.addEventListener("livewire:load", (function(e) {
        window.Livewire.hook("message.processed", (function() {
            $('[data-toggle="tooltip"]').tooltip("dispose"), $('[data-toggle="tooltip"]').tooltip(), setLocalTimeAll()
        }))
    })), window.displayErrorMessage = function(e) {
        iziToast.error({
            title: Lang.get("messages.error_message.error"),
            message: e,
            position: "topRight"
        })
    }, window.isOnlyContainWhiteSpace = function(e) {
        return "" === e.trim().replace(/ \r\n\t/g, "")
    }, $(document).on("click", "#readNotification", (function(e) {
        e.preventDefault(), e.stopPropagation();
        var t = $(this).data("id"),
            o = $(this);
        $.ajax({
            type: "POST",
            url: route("read-notification", t),
            data: {
                notificationId: t
            },
            success: function() {
                var e = parseInt($("#header-notification-counter").text());
                $("#header-notification-counter").text(e - 1), o.remove(), 0 == document.getElementsByClassName("readNotification").length && ($("#header-notification-counter").addClass("d-none"), $("#readAllNotification").addClass("d-none"), $(".empty-state").removeClass("d-none"), $(".notification-toggle").removeClass("beep"))
            },
            error: function(e) {
                manageAjaxErrors(e)
            }
        })
    })), $(document).on("click", "#readAllNotification", (function(e) {
        e.preventDefault(), e.stopPropagation(), $.ajax({
            type: "POST",
            url: route("read-all-notification"),
            success: function() {
                $("#header-notification-counter").text(0), $("#header-notification-counter").addClass("d-none"), $(".readNotification").remove(), $("#readAllNotification").addClass("d-none"), $(".empty-state").removeClass("d-none"), $(".notification-toggle").removeClass("beep")
            },
            error: function(e) {
                manageAjaxErrors(e)
            }
        })
    }))
})();