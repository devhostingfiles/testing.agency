// ==UserScript==
// @name         #388 - AUT 002 - Make & Model Page Search Box
// @namespace
// @version      0.1
// @description
// @author       Testing Agency: Lecamen Nartatez
// @match        https://www.autovolo.co.uk/*
// @match        https://www.autovolo.co.uk/nissan
// @grant        none
// ==/UserScript==

/* _optimizely_evaluate=force */

$ = jQuery;

// Change True of using new site version
var isNewVersion = false;

var priceOptions = [
    { "text" : "Min Price (£0) | Max Price (Any)", "value" : "0 | " + (isNewVersion ? "100000X" : "50000X") },
    { "text" : "£ 500", "value" : "500" },
    { "text" : "£1 000", "value" : "1000" },
    { "text" : "£1 500", "value" : "1500" },
    { "text" : "£2 000", "value" : "2000" },
    { "text" : "£2 500", "value" : "2500" },
    { "text" : "£3 000", "value" : "3000" },
    { "text" : "£3 500", "value" : "3500" },
    { "text" : "£4 000", "value" : "4000" },
    { "text" : "£4 500", "value" : "4500" },
    { "text" : "£5 000", "value" : "5000" },
    { "text" : "£5 500", "value" : "5500" },
    { "text" : "£6 000", "value" : "6000" },
    { "text" : "£6 500", "value" : "6500" },
    { "text" : "£7 000", "value" : "7000" },
    { "text" : "£7 500", "value" : "7500" },
    { "text" : "£8 000", "value" : "8000" },
    { "text" : "£8 500", "value" : "8500" },
    { "text" : "£9 000", "value" : "9000" },
    { "text" : "£9 500", "value" : "9500" },
    { "text" : "£10 000", "value" : "10000 " },
    { "text" : "£11 000", "value" : "11000" },
    { "text" : "£12 000", "value" : "12000" },
    { "text" : "£13 000", "value" : "13000" },
    { "text" : "£14 000", "value" : "14000" },
    { "text" : "£15 000", "value" : "15000" },
    { "text" : "£16 000", "value" : "16000" },
    { "text" : "£17 000", "value" : "17000" },
    { "text" : "£18 000", "value" : "18000" },
    { "text" : "£19 000", "value" : "19000" },
    { "text" : "£20 000", "value" : "20000" },
    { "text" : "£22 500", "value" : "22500" },
    { "text" : "£25 000", "value" : "25000" },
    { "text" : "£27 500", "value" : "27500" },
    { "text" : "£30 000", "value" : "30000" },
    { "text" : "£35 000", "value" : "35000" },
    { "text" : "£40 000", "value" : "40000" },
    { "text" : "£45 000", "value" : "45000" },
    { "text" : "£50 000" + (isNewVersion ? "" : " or more" ), "value" : "50000" + (isNewVersion ? "" : "x" ) },
    { "text" : "£60 000", "value" : "60000" },
    { "text" : "£70 000", "value" : "70000" },
    { "text" : "£80 000", "value" : "80000" },
    { "text" : "£90 000", "value" : "90000" },
    { "text" : "£100 000 or more", "value" : "100000x" }
];

var ageOptions = [
    { "text" : "Min Age (0) | Max Age (Any)", "value" : "0 | " + (isNewVersion ? "15X" : "10X") },
    { "text" : "1 year", "value" : "1" },
    { "text" : "2 years", "value" : "2" },
    { "text" : "3 years", "value" : "3" },
    { "text" : "4 years", "value" : "4" },
    { "text" : "5 years", "value" : "5" },
    { "text" : "6 years", "value" : "6" },
    { "text" : "7 years", "value" : "7" },
    { "text" : "8 years", "value" : "8" },
    { "text" : "9 years", "value" : "9" },
    { "text" : "10 years" + (isNewVersion ? "" : " or more"), "value" : "10" + (isNewVersion ? "" : "x") },
    { "text" : "11 years", "value" : "11" },
    { "text" : "12 years", "value" : "12" },
    { "text" : "13 years", "value" : "13" },
    { "text" : "14 years", "value" : "14" },
    { "text" : "15 years or more", "value" : "15x" },
];

$.fn.addVariantStyle = function(){
    var style = '' +
        '.ta-388 .view_banner { padding: 0; }' +
        '.ta-388 .view_banner a { display: none; }' +
        '.ta-388 #buy .buy_search.p_bot { background: none; }' +
        '.ta-388 #buy .buy_search.p_bot .s_click { display: none; }' +
        '.ta-388 #buy .buy_search.p_bot .click_open { display: block !important; } ' +
        '.ta-388 .viewcar_listing .bottom h1, .viewcar_listing .bottom h2, .viewcar_listing .bottom h2 + .row { display: none; }' +
        '.ta-388 .viewcar_listing .bottom { padding-top: 15px; }' +
        //'.ta-388 .ta-model-page-block { padding-left: 8% !important; padding-right: 8% !important; }' +
        '.ta-388 .ta_row_1 #txtPostCode { margin-bottom: 10px !important; }' +
        '.ta-388 .ta-col-left, .ta-col-right { width: 50%; float: left; margin-bottom: 15px; }' +
        '.ta-388 .ta-col-left .fancy-select { margin-right: 7.5px; }' +
        '.ta-388 .ta-col-right .fancy-select { margin-left: 7.5px; }' +
        '.ta-388 .ta_row_button .block_1 { width: 100% !important; }' +
        '.ta-388 .ta_row_button .block_1 input.ser_btn { margin-left: auto !important; margin-right: auto !important; }' +
        '.ta-388 .ta-more-search a { display: block; text-decoration: underline; text-align: center; color: #191366; }' +
        '.ta-388 .ta-more-search a:hover { color: #ed297c; }' +
        '.ta-388 .ta-model-page { width: 100% !important;  }' +
        '.ta-388 .ta-model-page #txtPostCode { width: 50% !important; margin-left: auto !important;  margin-right: auto !important; display: block; }' +
        '.ta-388 #btbNumberOfCars { margin-bottom: 10px; margin-top: 25px; text-align: center; display: block; font-size: 4.5vw; }' +
        '@media screen and ( max-width: 767px ) {' +
        '.ta-388 .ta-model-page-block { padding-left: 15px !important; padding-right: 15px !important; }' +
        '.ta-388 .ta-model-page #txtPostCode { width: 100% !important; }' +
        '.ta-388 #btbNumberOfCars { font-size: 40px; margin-bottom: 10px; margin-top: 10px; }' +
        '}' +
        '@media screen and ( max-width: 480px ) {' +
        '.ta-388 #btbNumberOfCars { font-size: 32px; line-height: 36px; line-height: 36px;}' +
        '}' +
        '';
    $(this).append('<style id="ta-style">'+style+'</style>');
};

$.fn.addBodyClasses = function(){
    $(this).addClass('ta-388');
};

$.fn.addFieldsColumns = function(){

    // Class reference
    $(this).addClass("ta_row_1");
    $(this).next().addClass("ta_row_button");

    // Add row and columns for price and age fields
    $(this).after(
        $("<div>", { "class" : "ser_row_1 row" }).append(
            $("<div>", { "class" : "block_1 ta-col-price" }),
            $("<div>", { "class" : "block_1 ta-col-age" })
        )
    );

    // Update the location of fields
    $(".block_1:last-child", this).prepend($(".block_1:first-child .fancy-select", this));
    $(".block_1:last-child #makename", this).parent().wrap( $("<div>", { "class" : "block_2 ta-col-makename ta-col-left" }));
    $(".block_1:last-child #modelname", this).parent().wrap($("<div>", { "class" : "block_2 ta-col-modelname ta-col-right" }));
    $(".ta_row_1 .block_1:first-child").prepend( $('.ta_row_button .block_1').first().find("input") );
    $('.ta_row_button .block_1').first().remove();

    // Create price and age select
    $(".ta-col-price").addPriceRange();
    $(".ta-col-age").addAgeRange();

    // More search options
    $(".ta_row_button").addMoreSearchOption();

    // Add number of cars result
    $("#buy .buy_search.p_bot").addNumberOfCars();

    // Use fancy select plugin
    $(".ta-select").fancySelect();

    // Check if page if model page
    if ( $("#modelname").val() !== "select-model-any" && $("#modelname").val() !== null ) {
        $(".ta-col-modelname").parent().hide();
        $(".ta-col-modelname").parent().prev().addClass("ta-model-page");
        $(".buy_search.p_bot .click_open > .row").addClass("ta-model-page-block");
    } else {
        GetModelData();
    }


};

$.fn.addPriceRange = function() {
    var selectMin = $("<select>", { "class" : "ta-select", "id" : "min_price", "name" : "min_price" });
    var selectMax = $("<select>", { "class" : "ta-select", "id" : "max_price", "name" : "max_price" });
    priceOptions.forEach(function(val, i){
        var data = normalizeData(val, i);
        if (isNewVersion === false && parseInt(data.max[0], 10) > 50000 ) {
            return false;
        }
        selectMin.append($('<option>', { "value" : data.min[0] }).text(data.min[1]));
        selectMax.append($('<option>', { "value" : data.max[0] }).text(data.max[1]));
    });
    $(this).append(
        $("<div>", { "class" : "block_2 ta-col-left" }).html(selectMin),
        $("<div>", { "class" : "block_2 ta-col-right" }).html(selectMax)
    );
};

$.fn.addAgeRange = function() {
    var selectMin = $("<select>", { "class" : "ta-select", "id" : "min_age", "name" : "min_age" }),
        selectMax = $("<select>", { "class" : "ta-select", "id" : "max_age", "name" : "max_age" });
    ageOptions.forEach(function(val, i){
        var data = normalizeData(val, i);
        if (isNewVersion === false && parseInt(data.max[0], 10) > 10 ) {
            return false;
        }
        selectMin.append($('<option>', { "value" : data.min[0] }).text(data.min[1]));
        selectMax.append($('<option>', { "value" : data.max[0] }).text(data.max[1]));
    });
    $(this).append(
        $("<div>", { "class" : "block_2 ta-col-left" }).html(selectMin),
        $("<div>", { "class" : "block_2 ta-col-right" }).html(selectMax)
    );
};

$.fn.addMoreSearchOption = function() {
    $(this).append($("<div>", { "class" : "block_1 ta-more-search" }));
    $(".ta-more-search").append( $("<a>", { "href" : "/buy-a-car", "target" : "_blank" }) );
    $(".ta-more-search a").append( "More search option >" );
};

$.fn.addNumberOfCars = function() {
    if ($("#btbNumberOfCars").length === 0) {
        var makename = $("#makename option:selected").text(),
            modelname = $("#modelname option:selected").text();
        $(this).before($("<id>", { "id" : "btbNumberOfCars", "style" : "display: none;" }));
        $("#btbNumberOfCars").wrap($("<div>", { "class" : "container" }));
        $("#btbNumberOfCars").append("<span class='ta-numbers-cars'></span> used <span class='ta-make'></span> <span class='ta-model'></span> cars for sale");
        $("#btbNumberOfCars").show();
        // Set values car search results
        $(".ta-numbers-cars").text("0");
        $(".ta-make").text($("#makename").val() !== "select-make-any" ? makename : "");
        $(".ta-model").text($("#modelname").val() !== "select-model-any" ? modelname : "");
        getNumberOfCars();
    }

};

function getNumberOfCars() {

    var makename = $("#makename").val(),
        modelname = $("#modelname").val() !== "select-model-any" ? $("#modelname").val() : "";

    modelname = modelname === null ? "" : modelname;

    var objData = {
        "cartype": "used",
        "make": makename,
        "model": modelname,
        "price": '',
        "age": '',
        "FilterMode": 'Search',
        "DealerID": '',
        "AccessCode": ''
    };
    $.ajax({
        type: "POST",
        url: '/Home/FilterVehicleDataSearch',
        data: JSON.stringify(objData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function() {
            fnInitSelectedCheckbox();
        },
        success: function(data, textStatus, XMLHttpRequest) {

            var makeData = JSON.parse(data);
            var make = JSON.parse(makeData.MakeModel);

            make.forEach(function(make, i){
                if (make.Title.toLowerCase().replace(/\s/g, "-") === makename) {
                    if (modelname !== "") {
                        make.MakeModels.forEach(function(model, i){
                            if (modelname ===  model.Title.toLowerCase().replace(/\s/g, "-")) {
                                $(".ta-numbers-cars").text(model.Qty.toLocaleString());
                                return false;
                            }
                        });

                    } else {
                        $(".ta-numbers-cars").text(make.Qty.toLocaleString());
                    }
                    return false;
                }
            });

        },
        complete: function() {
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            try {
                getNumberOfCars();
            } catch (ex) {} finally {}
        }
    });
}

function normalizeData(val, i) {
    var text = val.text.indexOf("|") !== -1 ? val.text.split("|") : val.text,
        value = val.value.indexOf("|") !== -1 ? val.value.split("|") : val.value,
        min = i === 0 ? [ value[0].trim(), text[0].trim()] : [value, text],
        max = i === 0 ? [ value[1].trim(), text[1].trim()] : [value, text];
    return { "min" : min, "max" : max };
}

function validatePostcode() {
    var postcode = "";
    postcode = $("#txtPostCode").val().trim();
    if (postcode !== "" && !Postcodepattern.exec(postcode)) {
        CustomAlertbox("\"" + postcode + " \" is not a valid postcode!");
        return false;
    }
    $("#postcode").val($("#txtPostCode").val().trim());
    // Go to car search page
    var pushUrl = window.location.origin + "/" + $("#makename").val();
    window.history.pushState({}, null, pushUrl);
    if ( $("#modelname").val() !== "select-model-any" && $("#modelname").val() !== null  && $("#modelname").val() != "0" ) {
        pushUrl += "/" + $("#modelname").val();
        window.history.pushState({}, null, pushUrl);
    }
    window.location.href = generateUrl();
}

function generateUrl() {

    var routeURL = window.location.origin + "/search-cars";

    if (!isvalid) { return false; }

    if ($("#postcode").val() !== "") {
        if (isNewVersion) {
            routeURL += "/cartype/used/postcode/" + $("#postcode").val().replace(/\s/g, "+");
        } else {
            routeURL += "/postcode/" + $("#postcode").val().replace(/\s/g, "+") + "/cartype/used";
        }
    } else {
        routeURL += "/cartype/used";
    }

    if ($("#makename").val() !== "") {
        routeURL += "/make/" + $.friendurl.getFriendurl($("#makename").val());
    }

    if (!($('#modelname').next().next().find("li:first").hasClass("selected"))) {
        if ($("#modelname").val() !== "" && $("#modelname").val() != "0" && $("#modelname").val() != "Select Model (Any)" && $.friendurl.getFriendurl($("#modelname").val()) != "select-model-any")
            routeURL += "/model/" + $.friendurl.getFriendurl($("#modelname").val());
    }

    if ($("#min_price").val() !== "" && $("#max_price").val() !== "" ) {
        routeURL += "/price/" + $.friendurl.getFriendurl($("#min_price").val()) + "-" + $.friendurl.getFriendurl($("#max_price").val());
    }

    if ($("#min_age").val() !== "" && $("#max_age").val() !== "" ) {
        routeURL += "/age/" + $.friendurl.getFriendurl($("#min_age").val()) + "-" + $.friendurl.getFriendurl($("#max_age").val());
    }

    //window.location.href = routeURL;
    return routeURL;

}

function eventListeners() {

    // Remove default onclick event
    $(".ta_row_button input.ser_btn").removeAttr("onclick");

    // Search cars
    $(document).on("click", ".ta_row_button input.ser_btn", function() {
        // Add tracking event here

        // End event
        validatePostcode();
    });

    $(window).on("popstate", function(e) {
        if (e.originalEvent.state !== null) {
            window.location.reload();
        }
    });

}

/* _optimizely_evaluate=safe */

if ( $("select#modelname").length !== 0 ) {

    $('head').addVariantStyle();
    $('body').addBodyClasses();
    $('body .container.click_open .ser_row_1:first-child').addFieldsColumns();

    eventListeners();

}
