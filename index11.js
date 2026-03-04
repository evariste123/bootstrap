// Course Management
let courses = JSON.parse(localStorage.getItem('courses')) || [];

// Load courses on page load
document.addEventListener('DOMContentLoaded', function() {
    displayCourses();
    
    const courseForm = document.getElementById('courseForm');
    if (courseForm) {
        courseForm.addEventListener('submit', addCourse);
    }

    // Image preview for course image
    const courseImage = document.getElementById('courseImage');
    if (courseImage) {
        courseImage.addEventListener('change', function(e) {
            previewImage(e, 'imagePreview');
        });
    }
});

// Display all courses
function displayCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    if (courses.length === 0) {
        coursesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No courses added yet. Click "Add New Course" to get started!</p>';
        return;
    }

    coursesGrid.innerHTML = courses.map((course, index) => `
        <div class="course-card">
            ${course.image ? `<img src="${course.image}" alt="${course.name}" class="course-image">` : `<div class="course-image" style="background-color: #ddd; display: flex; align-items: center; justify-content: center; color: #999;">No Image</div>`}
            <div class="course-content">
                <h3 class="course-title">${course.name}</h3>
                <p class="course-instructor">Instructor: ${course.instructor}</p>
                <p class="course-description">${course.description}</p>
                <div class="course-price">$${parseFloat(course.price).toFixed(2)}</div>
                <div class="course-actions">
                    ${course.document ? `<button class="btn btn-primary" onclick="downloadCourseDocument(${index})">📥 Download</button>` : ''}
                    <button class="btn btn-secondary" onclick="viewCourseDetails(${index})">View Details</button>
                    <button class="delete-btn" onclick="deleteCourse(${index})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add new course
function addCourse(e) {
    e.preventDefault();

    const courseName = document.getElementById('courseName').value;
    const courseDesc = document.getElementById('courseDesc').value;
    const coursePrice = document.getElementById('coursePrice').value;
    const courseInstructor = document.getElementById('courseInstructor').value;
    const courseImageInput = document.getElementById('courseImage');
    const courseDocumentInput = document.getElementById('courseDocument');

    // Read image file
    if (courseImageInput.files.length === 0) {
        showAlert('Please select a course image', 'error');
        return;
    }

    const imageReader = new FileReader();
    imageReader.onload = function(imageEvent) {
        let courseDocument = null;

        if (courseDocumentInput.files.length > 0) {
            const docReader = new FileReader();
            docReader.onload = function(docEvent) {
                courseDocument = docEvent.target.result;
                saveCourse(courseName, courseDesc, coursePrice, courseInstructor, imageEvent.target.result, courseDocument);
            };
            docReader.readAsArrayBuffer(courseDocumentInput.files[0]);
        } else {
            saveCourse(courseName, courseDesc, coursePrice, courseInstructor, imageEvent.target.result, null);
        }
    };
    imageReader.readAsDataURL(courseImageInput.files[0]);
}

function saveCourse(name, description, price, instructor, image, document) {
    const newCourse = {
        name: name,
        description: description,
        price: price,
        instructor: instructor,
        image: image,
        document: document,
        documentName: document ? document.name : null,
        dateAdded: new Date().toLocaleDateString()
    };

    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    // Reset form and close modal
    document.getElementById('courseForm').reset();
    document.getElementById('imagePreview').classList.remove('show');
    closeCourseModal();
    displayCourses();

    showAlert(`Course "${name}" added successfully!`, 'success');
}

// Delete course
function deleteCourse(index) {
    if (confirm('Are you sure you want to delete this course?')) {
        const courseName = courses[index].name;
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses();
        showAlert(`Course "${courseName}" deleted successfully!`, 'success');
    }
}

// Download course document
function downloadCourseDocument(index) {
    const course = courses[index];
    if (course.document) {
        const link = document.createElement('a');
        link.href = course.document;
        link.download = `${course.name}-document.pdf`;
        link.click();
    }
}

// View course details
function viewCourseDetails(index) {
    const course = courses[index];
    alert(`
Course: ${course.name}
Instructor: ${course.instructor}
Price: $${course.price}
Description: ${course.description}
Date Added: ${course.dateAdded}
Has Document: ${course.document ? 'Yes' : 'No'}
    `);
}

// Modal functions
function openAddCourseModal() {
    document.getElementById('courseModal').classList.add('show');
}

function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('show');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const courseModal = document.getElementById('courseModal');
    if (event.target === courseModal) {
        closeCourseModal();
    }
});

// Image preview
function previewImage(event, previewElementId) {
    const file = event.target.files[0];
    const preview = document.getElementById(previewElementId);

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.classList.add('show');
        };
        reader.readAsDataURL(file);
    }
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `message ${type}`;
    alertDiv.textContent = message;
    
    const coursesSection = document.querySelector('.courses-section');
    if (coursesSection) {
        coursesSection.insertBefore(alertDiv, coursesSection.firstChild);
    }

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
