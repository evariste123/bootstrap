
let applications = JSON.parse(localStorage.getItem('partnerApplications')) || [];

document.addEventListener('DOMContentLoaded', function() {
    const partnerForm = document.getElementById('partnerForm');
    if (partnerForm) {
        partnerForm.addEventListener('submit', submitPartnerApplication);
    }
});


function submitPartnerApplication(e) {
    e.preventDefault();

 
    const formData = {
  
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        country: document.getElementById('country').value,


        orgName: document.getElementById('orgName').value,
        orgType: document.getElementById('orgType').value,
        website: document.getElementById('website').value || 'Not provided',
        employees: document.getElementById('employees').value || 'Not specified',


        coursesPlanned: document.getElementById('courses').value,
        targetStudents: document.getElementById('target').value,
        courseTopics: document.getElementById('courseTopics').value,
        aboutOrg: document.getElementById('aboutOrg').value,

   
        experience: document.getElementById('experience').value,
        howFoundUs: document.getElementById('findUs').value,
        terms: document.getElementById('terms').checked,

        submittedDate: new Date().toLocaleString(),
        status: 'Pending Review'
    };

    if (!validateApplication(formData)) {
        return;
    }

    applications.push(formData);
    localStorage.setItem('partnerApplications', JSON.stringify(applications));

    
    showApplicationSuccess(formData.fullName);

    document.getElementById('partnerForm').reset();

   
    console.log('New Partner Application:', formData);
}


function validateApplication(data) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAlert('Please enter a valid email address', 'error');
        return false;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showAlert('Please enter a valid phone number', 'error');
        return false;
    }


    if (!data.terms) {
        showAlert('You must accept the Terms and Conditions', 'error');
        return false;
    }

 
    if (parseInt(data.coursesPlanned) <= 0) {
        showAlert('Number of courses planned must be greater than 0', 'error');
        return false;
    }

    return true;
}


function showApplicationSuccess(name) {
    const successDiv = document.createElement('div');
    successDiv.className = 'message success';
    successDiv.innerHTML = `
        <strong>Application Submitted Successfully!</strong><br>
        Thank you, ${name}! Your partner application has been submitted. 
        We will review your application and contact you within 5-7 business days.
    `;
    
    const partnerFormSection = document.querySelector('.partner-form-section');
    if (partnerFormSection) {
        partnerFormSection.insertBefore(successDiv, partnerFormSection.firstChild);
    }

    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}


function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `message ${type}`;
    alertDiv.textContent = message;
    
    const partnerFormSection = document.querySelector('.partner-form-section');
    if (partnerFormSection) {
        partnerFormSection.insertBefore(alertDiv, partnerFormSection.firstChild);
    }

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

function exportApplicationsAsCSV() {
    if (applications.length === 0) {
        alert('No applications to export');
        return;
    }

    let csv = 'Full Name,Email,Phone,Country,Organization,Type,Experience,Status,Date\n';
    
    applications.forEach(app => {
        csv += `"${app.fullName}","${app.email}","${app.phone}","${app.country}","${app.orgName}","${app.orgType}","${app.experience}","${app.status}","${app.submittedDate}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `partner-applications-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

function getApplicationStats() {
    const stats = {
        total: applications.length,
        byType: {},
        byCountry: {},
        byExperience: {}
    };

    applications.forEach(app => {
        stats.byType[app.orgType] = (stats.byType[app.orgType] || 0) + 1;

        stats.byCountry[app.country] = (stats.byCountry[app.country] || 0) + 1;

      
        stats.byExperience[app.experience] = (stats.byExperience[app.experience] || 0) + 1;
    });

    return stats;
}

// Preview benefit card images
function previewBenefitImage(inputId, imgId) {
    const file = document.getElementById(inputId).files[0];
    const img = document.getElementById(imgId);

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
