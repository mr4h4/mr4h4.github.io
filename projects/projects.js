class Project {
    constructor(title, body, img, link, linkWeb) {
        this.title = title; // Title of the project
        this.body = body; // Description of the project
        this.img = img; // Image associated with the project
        this.link = link; // GitHub link for the project
        this.linkWeb = linkWeb; // Web link for the project (if any)
    }

    createElement() {
        // Create a section element for the project
        let workSection = document.createElement('section');
        workSection.attributes.setNamedItem(document.createAttribute('project')); // Set an empty id attribute
        workSection.setAttribute('project', this.title); // Set an empty project attribute
        workSection.classList.add('workSection');

        // Create and append the title
        let workTitle = document.createElement('h3');
        workTitle.classList.add('workTitle');
        workTitle.textContent = this.title;
        workSection.appendChild(workTitle);

        // Create and append the description
        let workDescription = document.createElement('p');
        workDescription.classList.add('workDescription');
        workDescription.textContent = this.body;
        workSection.appendChild(workDescription);

        // Create and append the image
        let workImage = document.createElement('img');
        workImage.classList.add('workImage');
        workImage.src = `../projects/assets/img/${this.img}`;
        workImage.setAttribute("loading", "lazy");
        workSection.appendChild(workImage);

        // Create links container
        const linksContainers = document.createElement('div');
        linksContainers.classList.add('linksContainer');
        workSection.appendChild(linksContainers);

        // Create and append link
        let Link = document.createElement('a');
        Link.classList.add('wLinks');
        Link.href = this.link;

        //LINK ICON
        const linkIcon = document.createElement('img');
        linkIcon.classList.add('wLinks');
        linkIcon.src = `../projects/assets/img/link.svg`;
        Link.appendChild(linkIcon);
        linksContainers.appendChild(Link); // <--- AQUI SE AÑADE EL ENLACE 

        return workSection; // Return the created section element
    }
}

async function loadData() {
    // Fetch the JSON data from the specified path
    try {
        const response = await fetch('../projects/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} `);
        }
        const data = await response.json();
        return data; // Return the parsed JSON data
    } catch (error) {
        console.error('Error fetching the JSON data:', error);
        return {}; // Return an empty object in case of error
    }


}

function loadWork(data) {
    if (!data || Object.keys(data).length === 0) {
        console.error('No data available to load work sections.');
        return; // Exit if no data is available
    }

    try {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const projectData = data[key];
                const project = new Project(
                    projectData.Tittle, // Title of the project
                    projectData.Body, // Description of the project or body text
                    projectData.Img, // Image file name for the project
                    projectData.Link, // GitHub link for the project
                );
                const projectsContainer = document.getElementById('projectsContainer'); // Get the container where projects will be displayed
                if (projectsContainer) {
                    const projectElement = project.createElement(); // Create the project element
                    projectsContainer.appendChild(projectElement); // Append the project element to the container
                }
            }
        }
    } catch (error) {
        console.error('Error loading work sections:', error);
    }

}

// Initialize the work sections when the document is ready
document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadData(); // Load the data from the JSON file
    loadWork(data); // Load the work sections with the fetched data
}
);
