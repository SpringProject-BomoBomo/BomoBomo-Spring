
var elements = document.querySelectorAll('.post>div');

elements.forEach(function(element) {
    element.addEventListener('click', function() {
        var url = 'admin_emp_detail.html';
        window.location.href = url;
    });
});