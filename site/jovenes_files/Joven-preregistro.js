//Muestra los divs que se utilizan para mostrar
//el efecto de espera en una petición ajax.
function PopupPosition() {
  var topLoading = $(window).scrollTop() + $(window).height() / 2;
  var leftLoading = $(window).scrollLeft() + $(window).width() / 2;
  //$("#capa_loading").css({ "top": $(window).scrollTop() }).show();
  $("#capa_loading").show();
  $("#_loading").css({ top: topLoading, left: leftLoading }).show();
}

//Oculta los divs que se utilizan para mostrar
//el efecto de espera en una petición ajax.
function OcultarPopupposition() {
  $("#capa_loading").hide();
  $("#_loading").hide();
}
