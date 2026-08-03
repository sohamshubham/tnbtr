// Load TR data from tr.json
fetch("tr.json")
    .then(response => response.json())
    .then(data => {

        const container = document.getElementById("tr-container");
        const search = document.getElementById("search");

        function displayTR(list) {
            container.innerHTML = "";

            if (list.length === 0) {
                container.innerHTML = "<h3>No TR Found.</h3>";
                return;
            }

            list.forEach(item => {

                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <h2>${item.course}</h2>

                    <p><strong>Session:</strong> ${item.session}</p>

                    <p><strong>Semester:</strong> ${item.semester}</p>

                    <p><strong>Published:</strong> ${item.date}</p>

                    <a href="./${item.pdf}" target="_blank" class="btn">
                        View / Download TR
                    </a>
                `;

                container.appendChild(card);

            });
        }

        displayTR(data);

        search.addEventListener("keyup", () => {

            const value = search.value.toLowerCase();

            const filtered = data.filter(item =>
                item.session.toLowerCase().includes(value) ||
                item.semester.toLowerCase().includes(value) ||
                item.course.toLowerCase().includes(value)
            );

            displayTR(filtered);

        });

    })
    .catch(error => {

        document.getElementById("tr-container").innerHTML =
            "<h2>Unable to load TR data.</h2>";

        console.error(error);

    });
