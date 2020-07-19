
// hide input bar
$("#showSearch").click(function() {
    $("input").slideToggle(function() {
        $("#showSearch").removeClass("fa-minus");
        $("#showSearch").removeClass("fa-plus");
        if ($("input").css("display") === "none") {
            $("#showSearch").addClass("fa-plus");
        } else {
            $("#showSearch").addClass("fa-minus");
        }
    });
    
});

// press enter
$("input").keypress(function (event){
    if (event.which === 13) {
        $("ul").append("<li><span><i class=\"fa fa-trash\"></i></span>"+ $(this).val() +"</li>");
        $(this).val("");
    }
});

// cross line
$("ul").on("click", "li", function() {
    $(this).toggleClass("remove");
});

// delete
$("ul").on("click", "span", function(event) {
    event.stopPropagation(); // when click on the span (delete btn), it will not triger it's parents' listener ("li");
    $(this).parent().slideUp(500, function() {
        $(this).remove();
    });
});