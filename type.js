// Fetch form and resume elements
var resumeForm = document.getElementById('resume-form');
var generatedResume = document.getElementById('generated-resume');
var formContainer = document.querySelector('.form-container');
var resumeContainer = document.querySelector('.resume-container');
// Create buttons for Edit and Save Changes
var editButton = document.createElement('button');
editButton.textContent = 'Edit Resume';
editButton.setAttribute('id', 'editResumeButton');
editButton.style.marginRight = '10px'; // Spacing between buttons
editButton.style.marginTop = '15px';
editButton.style.backgroundColor = 'green';
editButton.style.border = 'none';
editButton.style.color = 'white';
editButton.style.padding = '10px';
editButton.style.cursor = 'pointer';
var saveChangesButton = document.createElement('button');
saveChangesButton.textContent = 'Save Changes';
saveChangesButton.setAttribute('id', 'saveChangesButton');
saveChangesButton.style.marginTop = '15px';
saveChangesButton.style.backgroundColor = 'green';
saveChangesButton.style.border = 'none';
saveChangesButton.style.color = 'white';
saveChangesButton.style.padding = '10px';
saveChangesButton.style.cursor = 'pointer';
// Handle form submission
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    // Fetch form input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var degree = document.getElementById('degree').value;
    var school = document.getElementById('school').value;
    var jobTitle = document.getElementById('job-title').value;
    var company = document.getElementById('company').value;
    var skills = document.getElementById('skills').value;
    // Store data in local storage
    localStorage.setItem('resumeData', JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        degree: degree,
        school: school,
        jobTitle: jobTitle,
        company: company,
        skills: skills
    }));
    // Generate resume content with contenteditable
    var resumeHTML = "\n        <p contenteditable=\"false\"><strong>Name:</strong> ".concat(name, "</p>\n        <p contenteditable=\"false\"><strong>Email:</strong> ").concat(email, "</p>\n        <p contenteditable=\"false\"><strong>Phone:</strong> ").concat(phone, "</p>\n        <h4>Education</h4>\n        <p contenteditable=\"false\"><strong>Degree:</strong> ").concat(degree, "</p>\n        <p contenteditable=\"false\"><strong>School/University:</strong> ").concat(school, "</p>\n        <h4>Work Experience</h4>\n        <p contenteditable=\"false\"><strong>Job Title:</strong> ").concat(jobTitle, "</p>\n        <p contenteditable=\"false\"><strong>Company:</strong> ").concat(company, "</p>\n        <h4>Skills</h4>\n        <p contenteditable=\"false\">").concat(skills, "</p>\n    ");
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
editButton.addEventListener('click', function () {
    var editableFields = generatedResume.querySelectorAll('[contenteditable="false"]');
    editableFields.forEach(function (field) {
        field.setAttribute('contenteditable', 'true'); // Enable editing
        field.style.border = '1px dashed #000'; // Add border to indicate it's editable
    });
});
// Save Changes button functionality (to save the direct edits)
saveChangesButton.addEventListener('click', function () {
    var editableFields = generatedResume.querySelectorAll('[contenteditable="true"]');
    editableFields.forEach(function (field) {
        field.setAttribute('contenteditable', 'false'); // Disable editing
        field.style.border = 'none'; // Remove border after editing
    });
});
// Handle PDF download
var downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', function () {
    // Hide buttons before printing
    editButton.style.display = 'none';
    saveChangesButton.style.display = 'none';
    downloadButton.style.display = 'none';
    document.getElementById('link').style.display = 'none';
    window.print();
    // Show buttons again after printing
    editButton.style.display = 'inline-block';
    saveChangesButton.style.display = 'inline-block';
    downloadButton.style.display = 'inline-block';
    document.getElementById('link').style.display = 'inline-block';
});
// Handle link generation and copy to clipboard
var linkButton = document.getElementById('link');
linkButton.addEventListener('click', function () {
    var name = document.getElementById('name').value;
    // Only include name in the URL
    var uniqueURL = "".concat(window.location.origin, "/?name=").concat(encodeURIComponent(name));
    navigator.clipboard.writeText(uniqueURL).then(function () {
        alert('Copied to clipboard: ' + uniqueURL);
    }).catch(function (err) {
        console.error('Could not copy text: ', err);
    });
});
// Check if there are parameters in the URL and display resume if present
window.addEventListener('load', function () {
    var queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('name')) {
        var name_1 = queryParams.get('name');
        // Retrieve data from local storage
        var storedData = localStorage.getItem('resumeData');
        if (storedData) {
            var _a = JSON.parse(storedData), email = _a.email, phone = _a.phone, degree = _a.degree, school = _a.school, jobTitle = _a.jobTitle, company = _a.company, skills = _a.skills;
            var resumeHTML = "\n                <p contenteditable=\"false\"><strong>Name:</strong> ".concat(name_1, "</p>\n                <p contenteditable=\"false\"><strong>Email:</strong> ").concat(email, "</p>\n                <p contenteditable=\"false\"><strong>Phone:</strong> ").concat(phone, "</p>\n                <h4>Education</h4>\n                <p contenteditable=\"false\"><strong>Degree:</strong> ").concat(degree, "</p>\n                <p contenteditable=\"false\"><strong>School/University:</strong> ").concat(school, "</p>\n                <h4>Work Experience</h4>\n                <p contenteditable=\"false\"><strong>Job Title:</strong> ").concat(jobTitle, "</p>\n                <p contenteditable=\"false\"><strong>Company:</strong> ").concat(company, "</p>\n                <h4>Skills</h4>\n                <p contenteditable=\"false\">").concat(skills, "</p>\n            ");
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
// // Fetch form and resume elements
// const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
// const generatedResume = document.getElementById('generated-resume') as HTMLDivElement;
// const formContainer = document.querySelector('.form-container') as HTMLDivElement;
// const resumeContainer = document.querySelector('.resume-container') as HTMLDivElement;
// // Create buttons for Edit and Save Changes
// const editButton = document.createElement('button');
// editButton.textContent = 'Edit Resume';
// editButton.setAttribute('id', 'editResumeButton');
// editButton.style.marginRight = '10px'; // Spacing between buttons
// editButton.style.marginTop = '15px';
// editButton.style.backgroundColor = 'green';
// editButton.style.border = 'none';
// editButton.style.color = 'white';
// editButton.style.padding = '10px';
// const saveChangesButton = document.createElement('button');
// saveChangesButton.textContent = 'Save Changes';
// saveChangesButton.setAttribute('id', 'saveChangesButton');
// saveChangesButton.style.marginTop = '15px';
// saveChangesButton.style.backgroundColor = 'green';
// saveChangesButton.style.border = 'none';
// saveChangesButton.style.color = 'white';
// saveChangesButton.style.padding = '10px';
// // Handle form submission
// resumeForm.addEventListener('submit', (event: Event) => {
//     event.preventDefault(); // Prevent form submission
//     // Fetch form input values
//     const name = (document.getElementById('name') as HTMLInputElement).value;
//     const email = (document.getElementById('email') as HTMLInputElement).value;
//     const phone = (document.getElementById('phone') as HTMLInputElement).value;
//     const degree = (document.getElementById('degree') as HTMLInputElement).value;
//     const school = (document.getElementById('school') as HTMLInputElement).value;
//     const jobTitle = (document.getElementById('job-title') as HTMLInputElement).value;
//     const company = (document.getElementById('company') as HTMLInputElement).value;
//     const skills = (document.getElementById('skills') as HTMLInputElement).value;
//     // Store data in local storage
//     localStorage.setItem('resumeData', JSON.stringify({
//         name,
//         email,
//         phone,
//         degree,
//         school,
//         jobTitle,
//         company,
//         skills
//     }));
//     // Generate resume content with contenteditable
//     const resumeHTML = `
//         <p contenteditable="false"><strong>Name:</strong> ${name}</p>
//         <p contenteditable="false"><strong>Email:</strong> ${email}</p>
//         <p contenteditable="false"><strong>Phone:</strong> ${phone}</p>
//         <h4>Education</h4>
//         <p contenteditable="false"><strong>Degree:</strong> ${degree}</p>
//         <p contenteditable="false"><strong>School/University:</strong> ${school}</p>
//         <h4>Work Experience</h4>
//         <p contenteditable="false"><strong>Job Title:</strong> ${jobTitle}</p>
//         <p contenteditable="false"><strong>Company:</strong> ${company}</p>
//         <h4>Skills</h4>
//         <p contenteditable="false">${skills}</p>
//     `;
//     // Display the generated resume
//     generatedResume.innerHTML = resumeHTML;
//     // Hide form and show the resume
//     formContainer.style.display = 'none';
//     resumeContainer.style.display = 'block';
//     // Append the Edit and Save Changes buttons
//     if (!document.getElementById('editResumeButton')) {
//         resumeContainer.appendChild(editButton);
//         resumeContainer.appendChild(saveChangesButton);
//     }
// });
// // Edit button functionality (to enable editing directly on the resume)
// editButton.addEventListener('click', () => {
//     const editableFields = generatedResume.querySelectorAll('[contenteditable="false"]');
//     editableFields.forEach((field) => {
//         (field as HTMLElement).setAttribute('contenteditable', 'true'); // Enable editing
//         (field as HTMLElement).style.border = '1px dashed #000'; // Add border to indicate it's editable
//     });
// });
// // Save Changes button functionality (to save the direct edits)
// saveChangesButton.addEventListener('click', () => {
//     const editableFields = generatedResume.querySelectorAll('[contenteditable="true"]');
//     editableFields.forEach((field) => {
//         (field as HTMLElement).setAttribute('contenteditable', 'false'); // Disable editing
//         (field as HTMLElement).style.border = 'none'; // Remove border after editing
//     });
// });
// // Handle PDF download
// const downloadButton = document.getElementById('download') as HTMLButtonElement;
// downloadButton.addEventListener('click', () => {
//     window.print();
// });
// // Handle link generation and copy to clipboard
// const linkButton = document.getElementById('link') as HTMLButtonElement;
// linkButton.addEventListener('click', () => {
//     const name = (document.getElementById('name') as HTMLInputElement).value;
//     // Only include name in the URL
//     const uniqueURL = `${window.location.origin}/?name=${encodeURIComponent(name)}`;
//     navigator.clipboard.writeText(uniqueURL).then(() => {
//         alert('Copied to clipboard: ' + uniqueURL);
//     }).catch(err => {
//         console.error('Could not copy text: ', err);
//     });
// });
// // Check if there are parameters in the URL and display resume if present
// window.addEventListener('load', () => {
//     const queryParams = new URLSearchParams(window.location.search);
//     if (queryParams.has('name')) {
//         const name = queryParams.get('name');
//         // Retrieve data from local storage
//         const storedData = localStorage.getItem('resumeData');
//         if (storedData) {
//             const { email, phone, degree, school, jobTitle, company, skills } = JSON.parse(storedData);
//             const resumeHTML = `
//                 <p contenteditable="false"><strong>Name:</strong> ${name}</p>
//                 <p contenteditable="false"><strong>Email:</strong> ${email}</p>
//                 <p contenteditable="false"><strong>Phone:</strong> ${phone}</p>
//                 <h4>Education</h4>
//                 <p contenteditable="false"><strong>Degree:</strong> ${degree}</p>
//                 <p contenteditable="false"><strong>School/University:</strong> ${school}</p>
//                 <h4>Work Experience</h4>
//                 <p contenteditable="false"><strong>Job Title:</strong> ${jobTitle}</p>
//                 <p contenteditable="false"><strong>Company:</strong> ${company}</p>
//                 <h4>Skills</h4>
//                 <p contenteditable="false">${skills}</p>
//             `;
//             generatedResume.innerHTML = resumeHTML;
//             formContainer.style.display = 'none';
//             resumeContainer.style.display = 'block';
//         }
//     }
// });
