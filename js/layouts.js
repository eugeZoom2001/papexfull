(function($) {
    'use strict';
    $(function() {
    $('.file-upload-browse').on('click', function() {
        var file = $(this).parent().parent().parent().find('.file-upload-default');
        file.trigger('click');
      });
      $('.file-upload-default').on('change', function() {
        $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
      });
    });
    $(document).ready(function() {
        var listDelete = $('.list-delete');
        listDelete.on('click', function() {
            swal({
                title: "Estas seguro?",
                text: "El item va a ser eliminado",
                icon: "warning",
                buttons: ["Cancelar", "Eliminar"],
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal({
                        title: "Eliminado",
                        text: "El item fue correctamente eliminado",
                        icon: "success",
                    });
                } else {
                    swal("El item no fue eliminado!");
                }
            });
        });
        $('.html-editor').summernote({
          height: 300,
          tabsize: 2
        });
    })
})(jQuery);