$(".submit-button").on('click', function() {
    var name = $(".name").val();

    var bio = $(".bio").val();

    var email = $(".email").val();

    var myNecklace1 = $(".necklace-input1").val();
    var myNecklace2 = $(".necklace-input2").val();
    var myNecklace3 = $(".necklace-input3").val();

    var mySetting1 = $(".setting-input1").val();
    var mySetting2 = $(".setting-input2").val();
    var mySetting3 = $(".setting-input3").val();

    var newObj = {
        name: name,
        bio: bio,
        email: email,
        chains: [myNecklace1, myNecklace2, myNecklace3],
        settings: [mySetting1, mySetting2, mySetting3],
    }

    $.ajax({
        type: "POST",
        url: "/artists",
        data: newObj,
        success: function(data) {},
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
});
