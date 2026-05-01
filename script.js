// Goal data structure
const goals = {
    emergency: {
        current: 2400,
        target: 5000,
        fillId: 'emergency-fill',
        currentId: 'emergency-current',
        percentId: 'emergency-percent',
        amountId: 'emergency-amount'
    },
    vacation: {
        current: 1800,
        target: 5000,
        fillId: 'vacation-fill',
        currentId: 'vacation-current',
        percentId: 'vacation-percent',
        amountId: 'vacation-amount'
    },
    japan: {
        current: 3200,
        target: 5000,
        fillId: 'japan-fill',
        currentId: 'japan-current',
        percentId: 'japan-percent',
        amountId: 'japan-amount'
    },
    iceland: {
        current: 2100,
        target: 5000,
        fillId: 'iceland-fill',
        currentId: 'iceland-current',
        percentId: 'iceland-percent',
        amountId: 'iceland-amount'
    },
    macbook: {
        current: 1200,
        target: 5000,
        fillId: 'macbook-fill',
        currentId: 'macbook-current',
        percentId: 'macbook-percent',
        amountId: 'macbook-amount'
    },
    camera: {
        current: 2800,
        target: 5000,
        fillId: 'camera-fill',
        currentId: 'camera-current',
        percentId: 'camera-percent',
        amountId: 'camera-amount'
    }
};

// Countdown data (target dates)
const countdowns = {
    japan: new Date('2026-06-15T00:00:00').getTime(),
    iceland: new Date('2026-07-18T00:00:00').getTime()
};

/**
 * Add money to a goal and update progress
 */
function addMoney(goalName, amount) {
    const goal = goals[goalName];
    if (!goal) return;

    goal.current += amount;

    // Cap at target
    if (goal.current > goal.target) {
        goal.current = goal.target;
    }

    updateGoalUI(goalName);
    showToast(`+$${amount} added to ${goalName}!`);
    updateAverageProgress();

    // Check if goal is completed
    if (goal.current === goal.target) {
        celebrateGoal(goalName);
    }
}

/**
 * Update UI for a specific goal
 */
function updateGoalUI(goalName) {
    const goal = goals[goalName];
    const percentage = Math.round((goal.current / goal.target) * 100);

    // Update progress bar
    const fillElement = document.getElementById(goal.fillId);
    fillElement.style.width = percentage + '%';
    fillElement.classList.add('completed');
    setTimeout(() => fillElement.classList.remove('completed'), 600);

    // Update current amount
    document.getElementById(goal.currentId).textContent = '$' + goal.current.toLocaleString();

    // Update percentage
    document.getElementById(goal.percentId).textContent = percentage + '%';

    // Update amount in header
    document.getElementById(goal.amountId).textContent = '$' + goal.current.toLocaleString();
}

/**
 * Update average progress across all goals
 */
function updateAverageProgress() {
    let totalPercentage = 0;
    Object.keys(goals).forEach(goalName => {
        const goal = goals[goalName];
        totalPercentage += Math.round((goal.current / goal.target) * 100);
    });

    const avgProgress = Math.round(totalPercentage / Object.keys(goals).length);
    document.getElementById('avgProgress').textContent = avgProgress + '%';
}

/**
 * Show toast notification
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Celebrate goal completion
 */
function celebrateGoal(goalName) {
    showToast(`🎉 Goal "${goalName}" completed!`);
}

/**
 * Update countdown timers
 */
function updateCountdowns() {
    const now = new Date().getTime();

    Object.keys(countdowns).forEach(goalName => {
        const targetTime = countdowns[goalName];
        const distance = targetTime - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // Update countdown display
            document.getElementById(goalName + '-days').textContent = String(days).padStart(2, '0');
            document.getElementById(goalName + '-hours').textContent = String(hours).padStart(2, '0');
            document.getElementById(goalName + '-minutes').textContent = String(minutes).padStart(2, '0');
        } else {
            // Countdown finished
            document.getElementById(goalName + '-days').textContent = '00';
            document.getElementById(goalName + '-hours').textContent = '00';
            document.getElementById(goalName + '-minutes').textContent = '00';
        }
    });
}

/**
 * Initialize the app
 */
function initApp() {
    // Update all goal UIs
    Object.keys(goals).forEach(goalName => {
        updateGoalUI(goalName);
    });

    // Update average progress
    updateAverageProgress();

    // Update countdowns every second
    updateCountdowns();
    setInterval(updateCountdowns, 1000);

    // Log initialization
    console.log('Stashly app initialized successfully!');
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}