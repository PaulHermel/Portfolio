document.addEventListener("DOMContentLoaded", async () => {
    const projectsList = document.getElementById("projects-list");
    const projectPopup = document.getElementById("project-popup");
    const popupClose = document.getElementById("popup-close");
    const popupName = document.getElementById("popup-project-name");
    const popupDescription = document.getElementById("popup-description");
    const popupStack = document.getElementById("popup-tech-stack");
    const popupGroup = document.getElementById("popup-group");
    const popupImages = document.getElementById("popup-images");

    // Fetch projects data
    const fetchData = async () => {
        try {
            const response = await fetch("portfolio.json");
            if (!response.ok) throw new Error("Failed to load portfolio.json");
            const data = await response.json();
            return data.Projects;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const projects = await fetchData();

    // Populate project list
    projects.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");

        projectDiv.innerHTML = `
        <div class="project-box" id="project${project.id}">
            <img class="project-image" src="${project.image}" alt="${project.name}" />
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.stack.join(", ")}</p>
                <p>Group: ${project.group}</p>
            </div>
        </div>
    `;
        // Add click event to open the popup
        projectDiv.querySelector(".project-image").addEventListener("click", () => {
            popupName.textContent = project.name;
            popupDescription.textContent = project.description;
            popupStack.textContent = `Languages/Stack: ${project.stack.join(", ")}`;
            popupGroup.textContent = `Group: ${project.group}`;
            popupImages.innerHTML = `<img src="${project["image-popup"]}" alt="${project.name} popup image" />`;
            projectPopup.style.display = "flex";
        });

        projectsList.appendChild(projectDiv);
    });

    // Close popup
    popupClose.addEventListener("click", () => {
        projectPopup.style.display = "none";
    });
});
