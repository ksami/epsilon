    // Template.lobby.helpers({
    //     triggerNotif:function(){
    //         dataPack = [{"userEmail":"weijian19391@gmail.com", "timing":[1,2],"venue":["CBD", "NUS"]}];
    //         console.log(dataPack);
    //         var type = "info";
    //         var subject = "ksami.ihide@gmail.com";
    //         var message = "hahaha";
    //         Meteor.call('sendNotification', 'serverMessage:' + type, subject, message, {
    //             userCloseable: true,
    //             timeout: 0
    //         });
    //         serverMessages.listen('serverMessage:info', function (subject, message, options) {
    //             currentEmail = Meteor.users.findOne(Meteor.userId()).services.google.email;
    //             if(subject == currentEmail) {
    //                 console.log(subject);
    //                 Notifications.info(subject, message, options);
    //             }
    //         });
    //     }
    // });

    Template.lobby.onRendered(function() {
        $('.modal-trigger').leanModal();
        $('.select-input').material_select();

        $('.form-container a.add-input-field').click(function(){
        var parent = $(this).parents('.form-container');
        var div = parent.find('.input-container')[0];
        var clone = $(div).clone();

        if(parent.hasClass('time-form-container')) {
          clone.find('.select-input').remove();
          var selectClone = $('#select-input-clone').clone();
          selectClone.removeClass('hide').addClass('select-input');
          selectClone.removeAttr('id');

          var selectInputParent = clone.find('#time-input');
          selectInputParent.append(selectClone);
          $(selectClone).material_select();
        }

        clone.find('.add-input-field').remove();
        var removeButtonClone = $('#remove-input-field').clone();
        removeButtonClone.removeClass('hide');
        clone.append(removeButtonClone);

        parent.append(clone);

      });

      window.toggleUserSelect = function(button){
        $(button).toggleClass('selected');
      }

      window.removeInputField = function(button){
        $(button).parents('.input-container').remove();
      }

      $('.form-submit').click(function(){

        var times = [];
        var venues = [];
        var friends = [];

        var selects = $('select.select-input');
        for(var i=0; i<selects.size(); i++) {
          if($(selects[i]).val() != null) {
            times.push($(selects[i]).val());
          }
        }

        var textInputs = $("input[name='venue']");
        for(var i=0; i<textInputs.size(); i++) {
          if($(textInputs[i]).val() != null) {
            venues.push($(textInputs[i]).val());
          }
        }

        var selectedFriends = $(".user-container.selected");
        for(var i=0; i<selectedFriends.size(); i++) {
          friends.push($(selectedFriends[i]).attr('data-id'));
        }

        var nameDiv = $("input[name='roomName']");
        var name = nameDiv.val();

        var json = {
          'name': name,
          'times': times,
          'venues': venues,
          'friends': friends
        };

        Meteor.call('createRoom', json, function(err, data){
          Session.set("current-room", data);
          Router.go("/chatroom");
        });

      });
    });
}
