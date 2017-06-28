$(".submit-button").on('click', function() {
    var name = $(".name").val();

    var bio = $(".bio").val();

    var email = $(".email").val();

    var profilePic = $(".profilePic").val();

    var myNecklace1 = $(".necklace-input1").val();
    var myNecklace2 = $(".necklace-input2").val();
    var myNecklace3 = $(".necklace-input3").val();

    var mySetting1 = $(".setting-input1").val();
    var mySetting2 = $(".setting-input2").val();
    var mySetting3 = $(".setting-input3").val();

    var selected = $('input[name=optradio]:checked').val();

    var newObj = {
        name: name,
        bio: bio,
        email: email,
        profile_pic: profilePic,
        chains: [myNecklace1, myNecklace2, myNecklace3],
        settings: [mySetting1, mySetting2, mySetting3],
        theme: selected
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
    $(".name").val('');
    $(".bio").val('');
    $(".email").val('');
    $(".profilePic").val('');
    $(".necklace-input1").val('');
    $(".necklace-input2").val('');
    $(".necklace-input3").val('');
    $(".setting-input1").val('');
    $(".setting-input2").val('');
    $(".setting-input3").val('');
});
