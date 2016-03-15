$(function($) {

    var _serviceName = $("#serverLoad").data("service-name");
    var _seller = $("#serverLoad").data("seller");
    var _webtoken = $("#serverLoad").data("email");

    $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "/api/machines/get-load",
            async: true,
            data: {
                serviceName: _serviceName,
                seller: _seller
            },
            beforeSend: function(request) {
                request.setRequestHeader("email", _webtoken);
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                $("#cpu-chart").attr("data-percent", data.response.loadavg15);
                $("#ram-chart").attr("data-percent", data.response.memory.value);
                $("#cpu-percent").text(data.response.loadavg15);
                $("#ram-percent").text(data.response.memory.value);
                $('.chart').easyPieChart({
                    easing: 'easeOutElastic',
                    delay: 1500,
                    barColor: '#003366',
                    trackColor: '#fff',
                    scaleColor: true,
                    lineWidth: 25,
                    trackWidth: 16,
                    lineCap: 'butt',
                    onStep: function(from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    }
                });
                var chart = window.chart = $('.chart').data('easyPieChart');
                $('.js_update').on('click', function() {
                    chart.update(Math.random() * 200 - 100);
                });

            },
            error: function(xhr) {
                console.log(xhr);
            }
        });
    });


});
