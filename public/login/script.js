const Server = io();
Server.emit("checkAccount");
Server.on("isadmin", data => {
    if (data === "true") {
        location.replace("/admin");
    } else {
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            if (document.querySelector("[name='adminname']").value.trim() !== "" && document.querySelector("[name='adminpassword']").value.trim() !== "") {
                document.querySelector(".facebook").style.display = "flex";
                document.querySelector("error").style.display = "none";
                const formData = new FormData(this);
                setTimeout(() => {
                    fetch('/login', {
                        method: 'POST',
                        body: formData
                    }).then(response => response.json()).then(data => {
                        if (data.message === "0") {
                            document.querySelector("error").style.display = "block";
                            document.querySelector(".facebook").style.display = "none"
                        } else {
                            location.replace("/admin");
                        }
                    });
                }, 2000)
            } else if (document.querySelector("[name='adminname']").value.trim() === "" && document.querySelector("[name='adminpassword']").value.trim() !== "") {
                document.querySelector("[name='adminname']").classList.add("err");
                setTimeout(() => {
                    document.querySelector("[name='adminname']").classList.remove("err");
                }, 1001)
            } else if (document.querySelector("[name='adminname']").value.trim() !== "" && document.querySelector("[name='adminpassword']").value.trim() === "") {
                document.querySelector("[name='adminpassword']").classList.add("err");
                setTimeout(() => {
                    document.querySelector("[name='adminpassword']").classList.remove("err");
                }, 1001)
            } else {
                document.querySelector("[name='adminname']").classList.add("err");
                document.querySelector("[name='adminpassword']").classList.add("err");
                setTimeout(() => {
                    document.querySelector("[name='adminname']").classList.remove("err");
                    document.querySelector("[name='adminpassword']").classList.remove("err");
                }, 1001)
            }
        });
    }
})