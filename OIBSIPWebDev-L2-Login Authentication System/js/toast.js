/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(message, type = "success") {

    const toast =
        document.getElementById("toast");

    if (!toast)
        return;

    toast.innerHTML = message;

    toast.className = "toast show";

    if (type === "success") {

        toast.style.background =
            "#22c55e";

    }

    else if (type === "error") {

        toast.style.background =
            "#ef4444";

    }

    else if (type === "warning") {

        toast.style.background =
            "#f59e0b";

    }

    else {

        toast.style.background =
            "#2563eb";

    }

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}