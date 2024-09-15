
// Fetch form and resume elements
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const generatedResume = document.getElementById('generated-resume') as HTMLDivElement;
const formContainer = document.querySelector('.form-container') as HTMLDivElement;
const resumeContainer = document.querySelector('.resume-container') as HTMLDivElement;

// Create buttons for Edit and Save Changes
const editButton = document.createElement('button');
editButton.textContent = 'Edit Resume';
editButton.setAttribute('id', 'editResumeButton');
editButton.style.marginRight = '10px'; // Spacing between buttons
editButton.style.marginTop = '15px';
editButton.style.backgroundColor = 'green';
editButton.style.border = 'none';
editButton.style.color = 'white';
editButton.style.padding = '10px';
editButton.style.cursor = 'pointer';

const saveChangesButton = document.createElement('button');
saveChangesButton.textContent = 'Save Changes';
saveChangesButton.setAttribute('id', 'saveChangesButton');
saveChangesButton.style.marginTop = '15px';
saveChangesButton.style.backgroundColor = 'green';
saveChangesButton.style.border = 'none';
saveChangesButton.style.color = 'white';
saveChangesButton.style.padding = '10px';
saveChangesButton.style.cursor = 'pointer';

// Handle form submission
resumeForm.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent form submission

    // Fetch form input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const school = (document.getElementById('school') as HTMLInputElement).value;
    const jobTitle = (document.getElementById('job-title') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;

    // Store data in local storage
    localStorage.setItem('resumeData', JSON.stringify({
        name,
        email,
        phone,
        degree,
        school,
        jobTitle,
        company,
        skills
    }));

    // Generate resume content with contenteditable
    const resumeHTML = `
        <p contenteditable="false"><strong>Name:</strong> ${name}</p>
        <p contenteditable="false"><strong>Email:</strong> ${email}</p>
        <p contenteditable="false"><strong>Phone:</strong> ${phone}</p>
        <h4>Education</h4>
        <p contenteditable="false"><strong>Degree:</strong> ${degree}</p>
        <p contenteditable="false"><strong>School/University:</strong> ${school}</p>
        <h4>Work Experience</h4>
        <p contenteditable="false"><strong>Job Title:</strong> ${jobTitle}</p>
        <p contenteditable="false"><strong>Company:</strong> ${company}</p>
        <h4>Skills</h4>
        <p contenteditable="false">${skills}</p>
    `;

    // Display the generated resume
    generatedResume.innerHTML = resumeHTML;

    // Hide form and show the resume
    formContainer.style.display = 'none';
    resumeContainer.style.display = 'block';

    // Append the Edit and Save Changes buttons
    if (!document.getElementById('editResumeButton')) {
        resumeContainer.appendChild(editButton);
        resumeContainer.appendChild(saveChangesButton);
    }
});

// Edit button functionality (to enable editing directly on the resume)
editButton.addEventListener('click', () => {
    const editableFields = generatedResume.querySelectorAll('[contenteditable="false"]');
    editableFields.forEach((field) => {
        (field as HTMLElement).setAttribute('contenteditable', 'true'); // Enable editing
        (field as HTMLElement).style.border = '1px dashed #000'; // Add border to indicate it's editable
    });
});

// Save Changes button functionality (to save the direct edits)
saveChangesButton.addEventListener('click', () => {
    const editableFields = generatedResume.querySelectorAll('[contenteditable="true"]');
    editableFields.forEach((field) => {
        (field as HTMLElement).setAttribute('contenteditable', 'false'); // Disable editing
        (field as HTMLElement).style.border = 'none'; // Remove border after editing
    });
});

// Handle PDF download
const downloadButton = document.getElementById('download') as HTMLButtonElement;
downloadButton.addEventListener('click', () => {
    // Hide buttons before printing
    editButton.style.display = 'none';
    saveChangesButton.style.display = 'none';
    downloadButton.style.display = 'none';
    (document.getElementById('link') as HTMLButtonElement).style.display = 'none';

    window.print();

    // Show buttons again after printing
    editButton.style.display = 'inline-block';
    saveChangesButton.style.display = 'inline-block';
    downloadButton.style.display = 'inline-block';
    (document.getElementById('link') as HTMLButtonElement).style.display = 'inline-block';
});

// Handle link generation and copy to clipboard
const linkButton = document.getElementById('link') as HTMLButtonElement;
linkButton.addEventListener('click', () => {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    
    // Only include name in the URL
    const uniqueURL = `${window.location.origin}/?name=${encodeURIComponent(name)}`;

    navigator.clipboard.writeText(uniqueURL).then(() => {
        alert('Copied to clipboard: ' + uniqueURL);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
});

// Check if there are parameters in the URL and display resume if present
window.addEventListener('load', () => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('name')) {
        const name = queryParams.get('name');

        // Retrieve data from local storage
        const storedData = localStorage.getItem('resumeData');
        if (storedData) {
            const { email, phone, degree, school, jobTitle, company, skills } = JSON.parse(storedData);

            const resumeHTML = `
                <p contenteditable="false"><strong>Name:</strong> ${name}</p>
                <p contenteditable="false"><strong>Email:</strong> ${email}</p>
                <p contenteditable="false"><strong>Phone:</strong> ${phone}</p>
                <h4>Education</h4>
                <p contenteditable="false"><strong>Degree:</strong> ${degree}</p>
                <p contenteditable="false"><strong>School/University:</strong> ${school}</p>
                <h4>Work Experience</h4>
                <p contenteditable="false"><strong>Job Title:</strong> ${jobTitle}</p>
                <p contenteditable="false"><strong>Company:</strong> ${company}</p>
                <h4>Skills</h4>
                <p contenteditable="false">${skills}</p>
            `;

            generatedResume.innerHTML = resumeHTML;
            formContainer.style.display = 'none';
            resumeContainer.style.display = 'block';

            // Hide buttons for the shared view
            editButton.style.display = 'none';
            saveChangesButton.style.display = 'none';
            downloadButton.style.display = 'none';
            linkButton.style.display = 'none';
        }
    }
});

