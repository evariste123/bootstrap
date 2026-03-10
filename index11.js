/**
 * DATA STORE
 * We'll keep our courses in an array to manage them easily.
 */
let courses = [];

/**
 * MODAL CONTROLS
 */
function openAddCourseModal() {
    const modal = document.getElementById('courseModal');
    modal.style.display = 'block';
    // Ensure the body doesn't scroll while modal is open
    document.body.style.overflow = 'hidden';
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    const form = document.getElementById('courseForm');
    const preview = document.getElementById('imagePreview');

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    form.reset();
    preview.innerHTML = ''; // Clear image preview
}

/**
 * IMAGE PREVIEW LOGIC
 * Shows the user a thumbnail of the image they selected.
 */
document.getElementById('courseImage').addEventListener('change', function(e) {
    const preview = document.getElementById('imagePreview');
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.innerHTML = `<img src="${event.target.result}" style="max-width:100px; margin-top:10px; border-radius:5px;">`;
        };
        reader.readAsDataURL(file);
    }
});

/**
 * RENDER COURSES
 * Converts the 'courses' array into HTML cards.
 */
function displayCourses() {
    const grid = document.getElementById('coursesGrid');
    
    if (courses.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%;">No courses available. Start by adding one!</p>';
        return;
    }

    grid.innerHTML = courses.map((course, index) => `
        <div class="course-card" style="border:1px solid #ddd; padding:15px; border-radius:10px; background:#fff; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
            <img src="${course.image}" alt="${course.name}" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
            <h3 style="margin:10px 0 5px;">${course.name}</h3>
            <p style="font-size:0.9em; color:#666;">${course.desc}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                <span style="font-weight:bold; color:#28a745;">$${course.price}</span>
                <small>By ${course.instructor}</small>
            </div>
            <button onclick="deleteCourse(${index})" style="margin-top:10px; background:#ff4d4d; color:white; border:none; padding:5px; width:100%; cursor:pointer; border-radius:4px;">Remove</button>
        </div>
    `).join('');
}

/**
 * FORM SUBMISSION
 */
document.getElementById('courseForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const imageFile = document.getElementById('courseImage').files[0];
    const reader = new FileReader();

    // We use FileReader to save the image as a string so it persists in our array
    reader.onload = function(event) {
        const newCourse = {
            name: document.getElementById('courseName').value,
            desc: document.getElementById('courseDesc').value,
            price: parseFloat(document.getElementById('coursePrice').value).toFixed(2),
            instructor: document.getElementById('courseInstructor').value,
            image: event.target.result, // The Base64 image string
            id: Date.now()
        };

        courses.push(newCourse);
        displayCourses();
        closeCourseModal();
    };

    reader.readAsDataURL(imageFile);
});

/**
 * DELETE LOGIC
 */
function deleteCourse(index) {
    if (confirm("Are you sure you want to remove this course?")) {
        courses.splice(index, 1);
        displayCourses();
    }
}

/**
 * GLOBAL UI HELPERS
 */
// Close modal if user clicks the dark background
window.onclick = function(event) {
    const modal = document.getElementById('courseModal');
    if (event.target == modal) {
        closeCourseModal();
    }
};

// Initialize with empty state
displayCourses();
