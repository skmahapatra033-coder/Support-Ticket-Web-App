(() => {
    "use strict";
    $(document).ready((function() {
        $("#defaultLanguage").select2({
            width: "100%"
        })
    })), $("#passwordValidationErrorBox").hide(), $(document).on("submit", "#editProfileForm", (function(e) {
        return e.preventDefault(), !0
    })), $(document).on("submit", "#changePasswordForm", (function(e) {
        if (e.preventDefault(), ! function() {
                var e = $("#pfCurrentPassword").val().trim(),
                    o = $("#pfNewPassword").val().trim(),
                    a = $("#pfNewConfirmPassword").val().trim();
                if ("" == e || "" == o || "" == a) return $("#editPasswordValidationErrorsBox").show().html(Lang.get("messages.validation.all_field_required")), !1;
                return !0
            }()) return !1;
        var o = jQuery(this).find("#btnPrPasswordEditSave");
        o.button("loading"), $.ajax({
            url: changePasswordUrl,
            type: "post",
            data: new FormData($(this)[0]),
            processData: !1,
            contentType: !1,
            success: function(e) {
                e.success && ($("#changePasswordModal").modal("hide"), displaySuccessMessage(e.message))
            },
            error: function(e) {
                $("#passwordValidationErrorBox").html(e.responseJSON.message).show(), $(document).ready((function() {
                    $(".alert").delay(5e3).slideUp(300)
                }))
            },
            complete: function() {
                o.button("reset")
            }
        })
    })), $("#editProfileModal").on("hidden.bs.modal", (function() {
        resetModalForm("#editProfileForm", "#editProfileValidationErrorsBox"), resetModalForm("#editProfileForm", "#profilePictureValidationErrorsBox")
    })), $("#changeLanguageModal").on("hide.bs.modal", (function() {
        resetModalForm("#changeLanguageForm", "#editProfileValidationErrorsBox")
    })), $(document).on("click", ".editProfileModal", (function(e) {
        renderProfileData()
    })), window.renderProfileData = function() {
        $.ajax({
            url: profileUrl,
            type: "GET",
            success: function(e) {
                if (e.success) {
                    var o = e.data;
                    $("#editUserId").val(o.id), $("#firstName").val(o.name), $("#userEmail").val(o.email), $("#userPhone").val(o.phone), $(".editProfileBtnCc").text(o.region_code), $(".edit_profile_flag").addClass(o.region_code_flag), $(".edit_profile_region_code").val(o.region_code), $(".edit_profile_region_code_flag").val(o.region_code_flag), $("#profilePicturePreview").attr("src", o.photo_url), $("#editProfileModal").appendTo("body").modal("show")
                }
            }
        })
    }, $(document).on("change", "#profilePicture", (function() {
        isValidFile($(this), "#profilePictureValidationErrorsBox") ? displayPhoto(this, "#profilePicturePreview") : $(this).val("")
    })), $("#changePasswordModal").on("hidden.bs.modal", (function() {
        $(".fa-eye").toggleClass("fa-eye-slash"), $("#pfCurrentPassword, #pfNewPassword, #pfNewConfirmPassword").prop("type", "password"), resetModalForm("#changePasswordForm", "#editPasswordValidationErrorsBox")
    })), $(document).on("submit", "#changeLanguageForm", (function(e) {
        e.preventDefault();
        var o = $(this).find("#btnLanguageChange");
        o.button("loading"), $.ajax({
            url: changeLanguageUrl,
            type: "post",
            data: new FormData($(this)[0]),
            processData: !1,
            contentType: !1,
            success: function(e) {
                e.success && ($("#changeLanguageModal").modal("hide"), displaySuccessMessage("Language Updated Successfully."), location.reload())
            },
            error: function(e) {
                manageAjaxErrors(e, "#changeLanguageValidationErrorsBox")
            },
            complete: function() {
                o.button("reset")
            }
        })
    })), $(document).on("click", ".changePasswordModal", (function() {
        $("#changePasswordModal").appendTo("body").modal("show")
    })), $(document).on("click", ".changeLanguageModal", (function() {
        $("#changeLanguageModal").appendTo("body").modal("show")
    })), $(document).on("click", ".emailNotificationSetting", (function() {
        $.ajax({
            url: route("get.email-update"),
            type: "get",
            processData: !1,
            contentType: !1,
            success: function(e) {
                e.success && ($("input[type='checkbox'][name='email_setting']").prop("checked", e.data), $("#changeEmailSetting").appendTo("body").modal("show"))
            },
            error: function(e) {
                manageAjaxErrors(e, "#emailSettingMessageBox")
            }
        })
    })), $(document).on("submit", "#changeEmailSettingFrom", (function(e) {
        e.preventDefault();
        var o = $(this).find("#btnEmailSettingChange");
        o.button("loading"), $.ajax({
            url: route("set.email-update"),
            type: "post",
            data: new FormData($(this)[0]),
            processData: !1,
            contentType: !1,
            success: function(e) {
                e.success && ($("#changeEmailSetting").modal("hide"), displaySuccessMessage(e.message))
            },
            error: function(e) {
                manageAjaxErrors(e, "#emailSettingMessageBox")
            },
            complete: function() {
                o.button("reset")
            }
        })
    }))
})();