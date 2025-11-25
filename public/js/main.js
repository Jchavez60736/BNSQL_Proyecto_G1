// Marcar el menú activo según la URL
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar .nav-link");
    const current = window.location.pathname;

    links.forEach(link => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }
    });
});

// Confirmación para eliminar
function confirmarEliminacion() {
    return confirm("¿Está seguro que desea eliminar este registro?");
}
