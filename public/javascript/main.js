$(document).ready(function(){

  $('.modal-trigger').leanModal();

  $('.select-input').material_select();

  $('.form-container a.add-input-field').click(function(){
    var parent = $(this).parents('.form-container');
    var div = parent.find('.input-container')[0];
    var clone = $(div).clone();

    if(parent.hasClass('time-form-container')) {
      clone.find('.select-input').remove();
      var selectClone = $('#select-input-clone').clone();
      selectClone.removeClass('hide');
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

});