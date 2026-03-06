
const vacationGuides = ['planning', 'budget', 'packing', 'activities', 'accommodation', 'safety'];


function openVacation(guideId) {
    const modalId = guideId + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}


function closeVacation(guideId) {
    const modalId = guideId + 'Modal';
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

  
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.style.opacity = '0.6';
            } else {
                this.parentElement.style.opacity = '1';
            }
        });
    });
});


function createVacationTimeline(vacationDate) {
    const today = new Date();
    const vacation = new Date(vacationDate);
    const daysUntil = Math.floor((vacation - today) / (1000 * 60 * 60 * 24));

    const timeline = {
        months3Before: daysUntil > 90,
        months2Before: daysUntil > 60,
        months1Before: daysUntil > 30,
        weeks2Before: daysUntil > 14,
        week1Before: daysUntil > 7,
        daysLeft: daysUntil
    };

    return timeline;
}

function generateBudgetBreakdown(destination, days, style) {
    const budgets = {
        budget: { daily: 50, accommodation: 20, food: 15, activities: 10, transport: 5 },
        midrange: { daily: 100, accommodation: 50, food: 30, activities: 15, transport: 5 },
        luxury: { daily: 200, accommodation: 120, food: 50, activities: 20, transport: 10 }
    };

    const budget = budgets[style] || budgets.midrange;
    
    return {
        totalDays: days,
        dailyBudget: budget.daily,
        totalBudget: budget.daily * days,
        breakdown: {
            accommodation: budget.accommodation * days,
            food: budget.food * days,
            activities: budget.activities * days,
            transport: budget.transport * days
        }
    };
}


function calculatePackingWeight(category, items) {
    const itemWeights = {
        clothing: 0.2,
        shoes: 0.5,
        toiletries: 0.3,
        electronics: 1.5,
        documents: 0.1,
        miscellaneous: 0.5
    };

    const weight = itemWeights[category] || 0.5;
    return weight * items;
}


function saveVacationNotes(noteTitle, noteContent) {
    let notes = JSON.parse(localStorage.getItem('vacationNotes')) || [];
    
    notes.push({
        title: noteTitle,
        content: noteContent,
        date: new Date().toISOString(),
        id: Date.now()
    });
    
    localStorage.setItem('vacationNotes', JSON.stringify(notes));
    alert('Vacation note saved!');
}

function getVacationNotes() {
    return JSON.parse(localStorage.getItem('vacationNotes')) || [];
}


function deleteVacationNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('vacationNotes')) || [];
    notes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('vacationNotes', JSON.stringify(notes));
}


function createItinerary(destination, startDate, endDate, activities) {
    const itinerary = {
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        activities: activities,
        createdAt: new Date().toISOString()
    };
    
    let itineraries = JSON.parse(localStorage.getItem('vacationItineraries')) || [];
    itineraries.push(itinerary);
    localStorage.setItem('vacationItineraries', JSON.stringify(itineraries));
    
    return itinerary;
}


function getItineraries() {
    return JSON.parse(localStorage.getItem('vacationItineraries')) || [];
}

function addActivityToItinerary(itineraryIndex, day, activity, time) {
    let itineraries = JSON.parse(localStorage.getItem('vacationItineraries')) || [];
    
    if (itineraries[itineraryIndex]) {
        if (!itineraries[itineraryIndex].activities[day]) {
            itineraries[itineraryIndex].activities[day] = [];
        }
        
        itineraries[itineraryIndex].activities[day].push({
            name: activity,
            time: time
        });
        
        localStorage.setItem('vacationItineraries', JSON.stringify(itineraries));
        return true;
    }
    
    return false;
}


function generatePackingChecklist(destination, tripLength, climate) {
    const baseItems = [
        'Passport & travel documents',
        'Travel insurance documents',
        'Credit/debit cards',
        'Phone charger',
        'Underwear',
        'Socks',
        'Comfortable shoes',
        'Light jacket',
        'Toiletries',
        'Medications'
    ];

    const climateItems = {
        hot: ['Sunscreen', 'Hat', 'Sunglasses', 'Light clothing', 'Sandals'],
        cold: ['Warm coat', 'Sweater', 'Gloves', 'Scarf', 'Warm socks'],
        mixed: ['Layers', 'Waterproof jacket', 'Comfortable shoes']
    };

    const checklist = {
        items: baseItems.concat(climateItems[climate] || []),
        tripLength: tripLength,
        climate: climate,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem('packingChecklist', JSON.stringify(checklist));
    return checklist;
}

function getPackingChecklist() {
    return JSON.parse(localStorage.getItem('packingChecklist'));
}


function calculateTripDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return duration;
}


function getBestTimeToVisit(destination) {
    const bestTimes = {
        'Bali': { months: 'April-October', weather: 'Dry season' },
        'Thailand': { months: 'November-February', weather: 'Cool and dry' },
        'Japan': { months: 'March-May, September-November', weather: 'Spring and autumn' },
        'Paris': { months: 'April-June, September-October', weather: 'Mild and pleasant' },
        'New York': { months: 'April-June, September-November', weather: 'Spring and fall' },
        'Australia': { months: 'December-February', weather: 'Summer' }
    };

    return bestTimes[destination] || { months: 'Research required', weather: 'Check local climate' };
}


function estimateTripCosts(flights, accommodation, activities, meals, days) {
    return {
        flights: flights,
        accommodation: accommodation * days,
        activities: activities * days,
        meals: meals * days,
        total: flights + (accommodation * days) + (activities * days) + (meals * days),
        breakdown: {
            percentage: {
                flights: ((flights / (flights + (accommodation * days) + (activities * days) + (meals * days))) * 100).toFixed(1),
                accommodation: (((accommodation * days) / (flights + (accommodation * days) + (activities * days) + (meals * days))) * 100).toFixed(1),
                activities: (((activities * days) / (flights + (accommodation * days) + (activities * days) + (meals * days))) * 100).toFixed(1),
                meals: (((meals * days) / (flights + (accommodation * days) + (activities * days) + (meals * days))) * 100).toFixed(1)
            }
        }
    };
}


function createVacationReminder(vacationName, vacationDate, reminderDaysBefore) {
    const reminder = {
        name: vacationName,
        date: vacationDate,
        reminderDaysBefore: reminderDaysBefore,
        createdAt: new Date().toISOString(),
        id: Date.now()
    };

    let reminders = JSON.parse(localStorage.getItem('vacationReminders')) || [];
    reminders.push(reminder);
    localStorage.setItem('vacationReminders', JSON.stringify(reminders));

    return reminder;
}


function getVacationReminders() {
    return JSON.parse(localStorage.getItem('vacationReminders')) || [];
}


function exportVacationPlan() {
    const itineraries = getItineraries();
    const notes = getVacationNotes();
    const reminders = getVacationReminders();
    const checklist = getPackingChecklist();

    const plan = {
        exportedAt: new Date().toISOString(),
        itineraries: itineraries,
        notes: notes,
        reminders: reminders,
        packingChecklist: checklist
    };

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(plan, null, 2)));
    element.setAttribute('download', `vacation-plan-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


function printVacationGuide(guideId) {
    const modalId = guideId + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(modal.innerHTML);
        printWindow.document.close();
        printWindow.print();
    }
}


function shareVacationGuide(guideId) {
    const currentUrl = window.location.href;
    const shareUrl = `${currentUrl}?guide=${guideId}`;

    if (navigator.share) {
        navigator.share({
            title: 'EduHub Vacation Guide',
            text: 'Check out this helpful vacation planning guide!',
            url: shareUrl
        }).catch(err => console.log('Share failed:', err));
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Guide link copied to clipboard!');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const guideParam = urlParams.get('guide');
    
    if (guideParam && vacationGuides.includes(guideParam)) {
        openVacation(guideParam);
    }
});
