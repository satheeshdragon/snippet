
$(document).ready(function() {
    $('#table_list').DataTable({
          pageLength : 5,
    });
} );

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {


  $(".change-eaten").on("click", function(event) {
    var id = $(this).data("id");
    var devoured = $(this).data("devoured");

    var devouredState = {
      devoured: devoured
    };

    $.ajax("/api/hotdogs/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        console.log("changed eaten to", devoured);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var Data_collect = {
      Snippet_name : $("#Snippet_name").val().trim(),
      Snippet_description : $("#Snippet_description").val().trim(),
      // Born : $("#Born").val().trim(),
    };

    $.ajax("/insert_data", {
      type: "POST",
      data: Data_collect
    }).then(
      function() {

        swal("Data Inserted", "Successfully", "success")
        .then((value) => {
          location.reload();
        });
        
      }
    );
  });

    $(".update-form").on("submit", function(event) {
    event.preventDefault();

    var Data_collect = {
      Master_id : $("#Master_id").val().trim(),
      Snippet_name_update : $("#Snippet_name_update").val().trim(),
      Snippet_description_update : $('.Snippet_description_update').val().trim(),
      // Born : $("#Born_update").val().trim(),
    };

    $.ajax("/update_data", {
      type: "POST",
      data: Data_collect
    }).then(
      function() {
        console.log("created new hotdog");
        location.reload();
      }
    );
  });

  $(".delete-hotdog").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/hotdogs/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("deleted hotdog", id);
        // location.reload();
      }
    );
  });





});
