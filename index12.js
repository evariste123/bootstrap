
const tutorials = ['reading', 'video', 'visa', 'ticket', 'delivery', 'online'];


function openTutorial(tutorialId) {
    const modalId = tutorialId + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeTutorial(tutorialId) {
    const modalId = tutorialId + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });


    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

   
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});


function printTutorial(tutorialId) {
    const modalId = tutorialId + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(modal.innerHTML);
        printWindow.document.close();
        printWindow.print();
    }
}

function downloadTutorial(tutorialId) {
    const modalId = tutorialId + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        const content = modal.innerText;
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', `${tutorialId}-tutorial.txt`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

function bookmarkTutorial(tutorialId) {
    let bookmarks = JSON.parse(localStorage.getItem('tutorialBookmarks')) || [];
    
    if (bookmarks.includes(tutorialId)) {
        bookmarks = bookmarks.filter(id => id !== tutorialId);
        alert('Tutorial removed from bookmarks');
    } else {
        bookmarks.push(tutorialId);
        alert('Tutorial bookmarked! You can access it later from your bookmarks.');
    }
    
    localStorage.setItem('tutorialBookmarks', JSON.stringify(bookmarks));
}


function getBookmarkedTutorials() {
    return JSON.parse(localStorage.getItem('tutorialBookmarks')) || [];
}

function searchInTutorial(tutorialId, searchTerm) {
    const modalId = tutorialId + 'Modal';
    const modal = document.getElementById(modalId);
    
    if (!modal) return false;
    
    const content = modal.innerText.toLowerCase();
    return content.includes(searchTerm.toLowerCase());
}

function getTutorialReadingTime(tutorialId) {
    const modalId = tutorialId + 'Modal';
    const modal = document.getElementById(modalId);
    
    if (!modal) return 0;
    
    const wordCount = modal.innerText.split(/\s+/).length;
    const wordsPerMinute = 200;
    return Math.ceil(wordCount / wordsPerMinute);
}


function displayAllReadingTimes() {
    console.log('Tutorial Reading Times:');
    tutorials.forEach(tutorialId => {
        const time = getTutorialReadingTime(tutorialId);
        console.log(`${tutorialId}: ${time} minutes`);
    });
}


function markTutorialProgress(tutorialId, percentComplete) {
    let progress = JSON.parse(localStorage.getItem('tutorialProgress')) || {};
    
    progress[tutorialId] = {
        completed: percentComplete,
        lastAccessed: new Date().toISOString()
    };
    
    localStorage.setItem('tutorialProgress', JSON.stringify(progress));
}


function getTutorialProgress(tutorialId) {
    let progress = JSON.parse(localStorage.getItem('tutorialProgress')) || {};
    return progress[tutorialId] || null;
}


function getCompletedTutorials() {
    let progress = JSON.parse(localStorage.getItem('tutorialProgress')) || {};
    return Object.keys(progress).filter(tutorialId => progress[tutorialId].completed === 100);
}

function generateTutorialChecklist(tutorialId) {
    const modalId = tutorialId + 'Modal';
    const modal = document.getElementById(modalId);
    
    if (!modal) return [];
    
    const stepItems = modal.querySelectorAll('.step-item');
    const checklist = [];
    
    stepItems.forEach((item, index) => {
        checklist.push({
            step: index + 1,
            text: item.innerText,
            completed: false
        });
    });
    
    return checklist;
}

function rateTutorial(tutorialId, rating) {
    if (rating < 1 || rating > 5) {
        alert('Please rate between 1 and 5 stars');
        return;
    }
    
    let ratings = JSON.parse(localStorage.getItem('tutorialRatings')) || {};
    
    ratings[tutorialId] = {
        rating: rating,
        ratedAt: new Date().toISOString()
    };
    
    localStorage.setItem('tutorialRatings', JSON.stringify(ratings));
    alert(`Thank you! You rated this tutorial ${rating} stars.`);
}


function getTutorialRating(tutorialId) {
    let ratings = JSON.parse(localStorage.getItem('tutorialRatings')) || {};
    return ratings[tutorialId] ? ratings[tutorialId].rating : null;
}


function addTutorialNotes(tutorialId, notes) {
    let allNotes = JSON.parse(localStorage.getItem('tutorialNotes')) || {};
    
    if (!allNotes[tutorialId]) {
        allNotes[tutorialId] = [];
    }
    
    allNotes[tutorialId].push({
        content: notes,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('tutorialNotes', JSON.stringify(allNotes));
    alert('Note saved!');
}

function getTutorialNotes(tutorialId) {
    let allNotes = JSON.parse(localStorage.getItem('tutorialNotes')) || {};
    return allNotes[tutorialId] || [];
}


function shareTutorial(tutorialId) {
    const currentUrl = window.location.href;
    const shareUrl = `${currentUrl}?tutorial=${tutorialId}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'EduHub Tutorial',
            text: 'Check out this helpful tutorial on EduHub!',
            url: shareUrl
        }).catch(err => console.log('Share failed:', err));
    } else {
        
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Tutorial link copied to clipboard!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tutorialParam = urlParams.get('tutorial');
    
    if (tutorialParam && tutorials.includes(tutorialParam)) {
        openTutorial(tutorialParam);
    }
});

function scrollToTopOfModal(tutorialId) {
    const modalId = tutorialId + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.scrollTop = 0;
    }
}


function exportLearningSummary() {
    const bookmarks = getBookmarkedTutorials();
    const progress = JSON.parse(localStorage.getItem('tutorialProgress')) || {};
    const ratings = JSON.parse(localStorage.getItem('tutorialRatings')) || {};
    
    const summary = {
        generatedAt: new Date().toISOString(),
        bookmarkedTutorials: bookmarks,
        tutorialProgress: progress,
        tutorialRatings: ratings,
        completedTutorials: getCompletedTutorials()
    };
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(summary, null, 2)));
    element.setAttribute('download', `learning-summary-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
