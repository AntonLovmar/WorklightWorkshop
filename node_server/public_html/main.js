var mainPage;

function WorkshopPage() {
    var workshopPage = this;

    this.showMessage = function(message, green) {
        var alertBox = $('.register-alert');
        $(alertBox).html(message);
        $(alertBox).removeClass('fade-out');
        $(alertBox).addClass('fade-in');
        setTimeout(function() {
            $(alertBox).removeClass('fade-in');
            $(alertBox).addClass('fade-out');
        }, 2000);
    };

    function makeUIBindings() {
        $('.btn-default.btn').click(function() {
            workshopPage.sendRegisterform();
        });
    }

    this.sendRegisterform = function() {
        var pw = $('#pwfield').val();
        var pwrepeat = $('#pwrepeatfield').val();
        var username = $('#unfield').val();
        if (!pw || !pwrepeat || !username) {
            this.showMessage('Please fill out all fields');
            return;
        }
        if (pwrepeat !== pw) {
            this.showMessage('Passwords do not match');
            $('#pwrepeatfield').val('');
            $('#pwfield').val('');
        }
        $.put('users', {
            password: pw,
            username: username
        }).success(function(data, textStatus, xhr) {
            workshopPage.showMessage('Sucessfully registered!');
        }).fail(function(xhr, textStatue) {
            workshopPage.showMessage('This user name is taken');
        });
    };

    makeUIBindings();
}
$(document).ready(function() {
    mainPage = new WorkshopPage();
});


$.put = function(url, data, success, dataType) {
    return $.ajax({
        type: "PUT",
        url: url,
        data: data,
        success: success,
        dataType: dataType
    });
};

$.delete = function(url, data, success, dataType) {
    return $.ajax({
        type: "DELETE",
        url: url,
        data: data,
        success: success,
        dataType: dataType
    });
};
