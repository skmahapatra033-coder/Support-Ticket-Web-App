(() => {
    "use strict";
    var e;

    function t(e, t, a) {
        return t in e ? Object.defineProperty(e, t, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = a, e
    }
    var a, n = $("#time_range"),
        s = moment(),
        o = s.clone().startOf("month"),
        r = s.clone().endOf("month"),
        g = "";
    $(document).on("change", "input[type=radio][name=ticketStatus]", (function() {
        loadCategoryTicketChart(this.value)
    })), $(document).on("change", "input[type=radio][name=agentTicketStatus]", (function() {
        loadAgentTicketReport(this.value)
    })), n.on("apply.daterangepicker", (function(e, t) {
        startLoader(), !0, o = t.startDate.format("YYYY-MM-D  H:mm:ss"), r = t.endDate.format("YYYY-MM-D  H:mm:ss"), loadOpenVsCloseTicketChart(o, r, g, a)
    })), window.cb = function(e, t) {
        n.find("span").html(e.format("MMM D, YYYY") + " - " + t.format("MMM D, YYYY"))
    }, cb(o, r);
    var i = moment().startOf("month").subtract(1, "days");
    n.daterangepicker({
        startDate: o,
        endDate: r,
        opens: "left",
        showDropdowns: !0,
        autoUpdateInput: !1,
        locale: {
            customRangeLabel: Lang.get("messages.common.custom"),
            applyLabel: Lang.get("messages.common.apply"),
            cancelLabel: Lang.get("messages.common.cancel"),
            fromLabel: Lang.get("messages.common.from"),
            toLabel: Lang.get("messages.common.to"),
            monthNames: [Lang.get("messages.months.jan"), Lang.get("messages.months.feb"), Lang.get("messages.months.mar"), Lang.get("messages.months.apr"), Lang.get("messages.months.may"), Lang.get("messages.months.jun"), Lang.get("messages.months.jul"), Lang.get("messages.months.aug"), Lang.get("messages.months.sep"), Lang.get("messages.months.oct"), Lang.get("messages.months.nov"), Lang.get("messages.months.dec")],
            daysOfWeek: [Lang.get("messages.weekdays.sun"), Lang.get("messages.weekdays.mon"), Lang.get("messages.weekdays.tue"), Lang.get("messages.weekdays.wed"), Lang.get("messages.weekdays.thu"), Lang.get("messages.weekdays.fri"), Lang.get("messages.weekdays.sat")]
        },
        ranges: (e = {}, t(e, Lang.get("messages.filter_days.today"), [moment(), moment()]), t(e, Lang.get("messages.filter_days.this_week"), [moment().startOf("week"), moment().endOf("week")]), t(e, Lang.get("messages.filter_days.last_week"), [moment().startOf("week").subtract(7, "days"), moment().startOf("week").subtract(1, "days")]), t(e, Lang.get("messages.filter_days.this_month"), [o, r]), t(e, Lang.get("messages.filter_days.last_month"), [i.clone().startOf("month"), i.clone().endOf("month")]), t(e, Lang.get("messages.filter_days.this_year"), [moment().startOf("year"), moment().endOf("year")]), e)
    }, cb), $(document).on("change", "#categories, #agents", (function(e) {
        e.preventDefault(), g = $("#categories").val(), a = $("#agents").length > 0 ? $("#agents").val() : "", loadOpenVsCloseTicketChart(moment(o).format("YYYY-MM-D"), moment(r).format("YYYY-MM-D"), g, a)
    })), $(document).ready((function() {
        $("#categories").select2({
            width: "170px"
        }), $("#agents").select2({
            width: "170px"
        }), "undefined" != typeof agentTicketReport && loadAgentTicketReport(1), loadCategoryTicketChart(1), loadOpenVsCloseTicketChart(moment(o).format("YYYY-MM-D"), moment(r).format("YYYY-MM-D"))
    })), window.loadAgentTicketReport = function(e) {
        $.ajax({
            type: "GET",
            data: {
                status: e
            },
            url: agentTicketReport,
            dataType: "json",
            cache: !1
        }).done(prepareAgentTicketReport)
    }, window.prepareAgentTicketReport = function(e) {
        $("#agentWiseTicket").html(""), $("canvas#agentTicketChart").remove(), $("#agentWiseTicket").append('<canvas id="agentTicketChart" class="chartjs-render-monitor"></canvas>');
        var t = e.data;
        if (0 === t.assignTicket.filter((function(e) {
                return e > 0
            })).length) return $("#agentWiseTicket").empty(), $("#agentWiseTicket").append('<div class="no-record-chart">' + Lang.get("messages.admin_dashboard.no_records_found") + "</div>"), !0;
        var a = document.getElementById("agentTicketChart").getContext("2d");
        a.canvas.style.height = "400px", a.canvas.style.width = "100%";
        new Chart(a, {
            type: "pie",
            data: {
                datasets: [{
                    data: t.assignTicket,
                    backgroundColor: t.color,
                    label: "Dataset 1"
                }],
                labels: t.agents
            },
            options: {
                responsive: !0,
                legend: {
                    display: !1
                }
            }
        })
    }, window.loadCategoryTicketChart = function(e) {
        $.ajax({
            type: "GET",
            data: {
                status: e
            },
            url: categoryTicket,
            cache: !1
        }).done(prepareCategoryTicketChart)
    }, window.loadOpenVsCloseTicketChart = function(e, t) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        $.ajax({
            type: "GET",
            beforeSend: function() {
                startLoader()
            },
            data: {
                start_date: e,
                end_date: t,
                categoryId: a,
                agentId: n
            },
            url: openVsCloseTicket,
            cache: !1
        }).done(prepareTicketChart)
    }, window.prepareTicketChart = function(e) {
        $("#ticketChartContainer").html(""), $("canvas#ticketChart").remove(), $("#ticketChartContainer").append('<canvas id="ticketChart" class="chartjs-render-monitor"></canvas>');
        var t = e.data,
            a = t.openTicketCounts,
            n = t.closeTicketCounts,
            s = t.dateLabels;
        if (a.every((function(e) {
                return 0 === e
            })) && n.every((function(e) {
                return 0 === e
            }))) return $("#ticketChartContainer").empty(), $("#ticketChartContainer").append('<div class="text-center">' + Lang.get("messages.admin_dashboard.no_records_found") + "</div>"), stopLoader(), !0;
        var o = document.getElementById("ticketChart").getContext("2d");
        o.canvas.style.height = "300px", o.canvas.style.width = "100%";
        new Chart(o, {
            type: "line",
            data: {
                labels: s,
                datasets: [{
                    label: Lang.get("messages.admin_dashboard.closed_tickets"),
                    data: n,
                    borderWidth: 2,
                    fill: !1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(254,86,83,.7)",
                    pointBackgroundColor: "rgba(254,86,83,.7)",
                    pointBorderColor: "transparent"
                }, {
                    label: Lang.get("messages.admin_dashboard.open_tickets"),
                    data: a,
                    borderWidth: 2,
                    fill: !1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(99,237,122)",
                    pointBackgroundColor: "rgba(99,237,122)",
                    pointBorderColor: "transparent"
                }]
            },
            options: {
                legend: {
                    display: !0
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            drawBorder: !1,
                            color: "#f2f2f2"
                        },
                        ticks: {
                            min: 0,
                            stepSize: 2
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: !1
                        }
                    }]
                }
            }
        });
        stopLoader()
    }, window.prepareCategoryTicketChart = function(e) {
        $("#ticketCategoryChartContainer").html(""), $("canvas#ticketCategoryChart").remove(), $("#ticketCategoryChartContainer").append('<canvas id="ticketCategoryChart" class="chartjs-render-monitor"></canvas>');
        var t = e.data;
        if (0 === t.categories.length) return $("#ticketCategoryChartContainer").empty(), $("#ticketCategoryChartContainer").append('<div class="no-record-chart" >' + Lang.get("messages.admin_dashboard.no_records_found") + "</div>"), !0;
        var a = document.getElementById("ticketCategoryChart").getContext("2d");
        a.canvas.style.height = "400px", a.canvas.style.width = "100%";
        new Chart(a, {
            type: "pie",
            data: {
                datasets: [{
                    data: t.categoriesTicket,
                    backgroundColor: t.color,
                    label: "Dataset 1"
                }],
                labels: t.categories
            },
            options: {
                responsive: !0,
                legend: {
                    display: !1
                }
            }
        });
        stopLoader()
    }
})();