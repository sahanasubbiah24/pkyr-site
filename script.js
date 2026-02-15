// ===== NAVIGATION TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// ===== QUIZ FUNCTIONALITY =====
const quizQuestions = [
    {
        question: "Do you have the right to remain silent when questioned by police?",
        options: [
            "Yes, under the Fifth Amendment",
            "Only if you're under arrest",
            "No, you must answer all questions",
            "Only with a lawyer present"
        ],
        correct: 0,
        explanation: "Correct! The Fifth Amendment protects your right against self-incrimination, meaning you can remain silent when questioned by police."
    },
    {
        question: "At what age can you register to vote in most U.S. states?",
        options: [
            "16 years old",
            "17 years old",
            "18 years old",
            "21 years old"
        ],
        correct: 2,
        explanation: "Correct! You can register to vote at 18 years old in most states, though some states allow pre-registration at 16 or 17."
    },
    {
        question: "Can public schools restrict your freedom of speech?",
        options: [
            "Yes, schools can restrict all speech",
            "No, students have unlimited free speech",
            "Yes, but only if speech disrupts education",
            "Only outside of school hours"
        ],
        correct: 2,
        explanation: "Correct! Schools can restrict speech that substantially disrupts the educational environment, as established in Tinker v. Des Moines."
    },
    {
        question: "Do you need to consent to a police search of your belongings?",
        options: [
            "No, police can search anything",
            "Yes, unless they have a warrant or probable cause",
            "Only if you're under 18",
            "Only in your home"
        ],
        correct: 1,
        explanation: "Correct! Under the Fourth Amendment, police generally need your consent, a warrant, or probable cause to search your belongings."
    },
    {
        question: "Can you be fired from a job for discussing your wages with coworkers?",
        options: [
            "Yes, it's private information",
            "No, it's protected under federal law",
            "Only in certain states",
            "Only if your contract says so"
        ],
        correct: 1,
        explanation: "Correct! The National Labor Relations Act protects your right to discuss wages and working conditions with coworkers."
    }
];

let currentQuestionIndex = 0;
let score = 0;

function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;

    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionElement = document.getElementById('quizQuestion');
    const optionsElement = document.getElementById('quizOptions');
    const feedbackElement = document.getElementById('quizFeedback');
    const nextButton = document.getElementById('nextQuestionBtn');

    questionElement.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}: ${question.question}`;
    optionsElement.innerHTML = '';
    feedbackElement.innerHTML = '';
    feedbackElement.className = 'quiz-feedback';
    nextButton.style.display = 'none';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedbackElement = document.getElementById('quizFeedback');
    const nextButton = document.getElementById('nextQuestionBtn');

    options.forEach(option => option.onclick = null);

    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        feedbackElement.className = 'quiz-feedback correct';
        feedbackElement.textContent = question.explanation;
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        feedbackElement.className = 'quiz-feedback incorrect';
        feedbackElement.textContent = `Incorrect. ${question.explanation}`;
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
        nextButton.style.display = 'inline-block';
        nextButton.onclick = nextQuestion;
    } else {
        nextButton.textContent = 'See Results';
        nextButton.style.display = 'inline-block';
        nextButton.onclick = showResults;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showResults() {
    const quizContainer = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('quizResults');
    const scoreElement = document.getElementById('quizScore');

    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    const percentage = (score / quizQuestions.length) * 100;
    let message = '';

    if (percentage === 100) {
        message = "Perfect score! You really know your rights!";
    } else if (percentage >= 80) {
        message = "Great job! You have a strong understanding of your civic rights.";
    } else if (percentage >= 60) {
        message = "Good effort! Keep learning about your rights.";
    } else {
        message = "Keep studying! Understanding your rights is important.";
    }

    scoreElement.innerHTML = `
        <p>You got <strong>${score} out of ${quizQuestions.length}</strong> correct!</p>
        <p>${message}</p>
    `;

    const restartButton = document.getElementById('restartQuizBtn');
    restartButton.onclick = restartQuiz;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    const quizContainer = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('quizResults');
    quizContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    showQuestion();
}

// ===== SCENARIO FUNCTIONALITY =====
const scenarioData = {
    start: {
        text: "You're at a peaceful protest when police officers approach your group and tell everyone to disperse. What do you do?",
        options: [
            { text: "Comply peacefully and leave the area", next: "comply" },
            { text: "Ask if you're free to leave", next: "ask_free" },
            { text: "Refuse and continue protesting", next: "refuse" },
            { text: "Record the interaction on your phone", next: "record" }
        ]
    },
    comply: {
        text: "You peacefully comply with the officer's request and leave the area. This is generally the safest choice when officers issue a dispersal order.",
        feedback: "Good choice! While you have the right to protest, complying with lawful dispersal orders helps ensure your safety and avoid potential charges.",
        isEnd: true
    },
    ask_free: {
        text: "You politely ask, 'Am I free to leave, or am I being detained?' The officer responds that you're free to go. What do you do next?",
        options: [
            { text: "Thank the officer and leave", next: "leave_thanked" },
            { text: "Ask why the group is being dispersed", next: "ask_why" }
        ]
    },
    refuse: {
        text: "You refuse to leave and continue protesting. The officers warn that you may be arrested for failure to disperse.",
        feedback: "This is risky. While you have the right to protest, refusing a lawful dispersal order can lead to arrest. It's important to know the difference between exercising your rights and civil disobedience.",
        isEnd: true
    },
    record: {
        text: "You start recording the interaction on your phone. You have the right to record police in public spaces.",
        feedback: "Good! Recording police is protected under the First Amendment in public spaces. However, also be prepared to comply with lawful orders while recording.",
        options: [
            { text: "Continue recording and leave the area", next: "record_leave" },
            { text: "Continue recording and ask questions", next: "record_ask" }
        ]
    },
    leave_thanked: {
        text: "You thank the officer and peacefully leave. You've exercised your rights while staying safe.",
        feedback: "Excellent! You asked about your legal status, received a clear answer, and acted accordingly. This is a model interaction.",
        isEnd: true
    },
    ask_why: {
        text: "You ask why the group is being dispersed. The officer explains there's a safety concern in the area.",
        feedback: "It's your right to ask questions, but remember to remain respectful. Officers aren't always required to provide detailed explanations during active situations.",
        options: [
            { text: "Accept the explanation and leave", next: "accept_leave" },
            { text: "Continue asking questions", next: "continue_questions" }
        ]
    },
    record_leave: {
        text: "You continue recording while peacefully leaving the area. This documents the interaction while keeping you safe.",
        feedback: "Excellent approach! You exercised your right to record while complying with the dispersal order. Always prioritize your safety.",
        isEnd: true
    },
    record_ask: {
        text: "You record while asking the officer questions. This is your right, but be prepared for various responses.",
        feedback: "Recording and asking questions is legal, but be aware that it may escalate tension. Always stay calm and respectful.",
        isEnd: true
    },
    accept_leave: {
        text: "You accept the officer's explanation and peacefully leave the area.",
        feedback: "Great! You asked questions, got information, and made a safe decision. This is responsible civic engagement.",
        isEnd: true
    },
    continue_questions: {
        text: "You continue asking detailed questions. The officer becomes impatient and repeats the dispersal order firmly.",
        feedback: "While curiosity is natural, there's a time and place for detailed questions. During active situations, it's often better to comply first and seek answers later through proper channels.",
        isEnd: true
    }
};

let currentScenarioNode = 'start';

function initScenario() {
    const scenarioContainer = document.getElementById('scenarioContainer');
    if (!scenarioContainer) return;

    showScenario();
}

function showScenario() {
    const node = scenarioData[currentScenarioNode];
    const textElement = document.getElementById('scenarioText');
    const optionsElement = document.getElementById('scenarioOptions');
    const feedbackElement = document.getElementById('scenarioFeedback');
    const restartButton = document.getElementById('restartScenarioBtn');

    textElement.textContent = node.text;
    optionsElement.innerHTML = '';
    feedbackElement.innerHTML = '';
    restartButton.style.display = 'none';

    if (node.feedback) {
        feedbackElement.innerHTML = `<p><strong>Outcome:</strong> ${node.feedback}</p>`;
    }

    if (node.isEnd) {
        restartButton.style.display = 'inline-block';
        restartButton.onclick = restartScenario;
    } else if (node.options) {
        node.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'scenario-option';
            button.textContent = option.text;
            button.onclick = () => chooseScenarioOption(option.next);
            optionsElement.appendChild(button);
        });
    }
}

function chooseScenarioOption(nextNode) {
    currentScenarioNode = nextNode;
    showScenario();
}

function restartScenario() {
    currentScenarioNode = 'start';
    showScenario();
}

// ===== POLL FUNCTIONALITY =====
function initPoll() {
    const pollOptions = document.querySelectorAll('.poll-option');
    if (pollOptions.length === 0) return;

    // Simulated poll data (in a real app, this would come from a backend)
    const pollData = {
        'yes': 15,
        'somewhat': 35,
        'not-really': 30,
        'no': 20
    };

    pollOptions.forEach(option => {
        option.addEventListener('click', function() {
            showPollResults(pollData);
            pollOptions.forEach(opt => opt.disabled = true);
        });
    });
}

function showPollResults(data) {
    const pollOptions = document.getElementById('pollOptions');
    const pollResults = document.getElementById('pollResults');
    const resultBars = pollResults.querySelector('.poll-result-bars');

    pollOptions.style.display = 'none';
    pollResults.style.display = 'block';

    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    const labels = {
        'yes': 'Yes, very well',
        'somewhat': 'Somewhat',
        'not-really': 'Not really',
        'no': 'No, not at all'
    };

    resultBars.innerHTML = '';

    Object.entries(data).forEach(([key, value]) => {
        const percentage = ((value / total) * 100).toFixed(1);
        const resultItem = document.createElement('div');
        resultItem.className = 'poll-result-item';
        resultItem.innerHTML = `
            <div class="poll-result-label">
                <span>${labels[key]}</span>
                <span>${percentage}%</span>
            </div>
            <div class="poll-result-bar">
                <div class="poll-result-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        resultBars.appendChild(resultItem);
    });
}

// ===== EVENT FILTERING =====
function initEventFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    const noEvents = document.querySelector('.no-events');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter events
            let visibleCount = 0;
            eventCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'grid';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no events message
            if (noEvents) {
                noEvents.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    });
}

// ===== MODAL FUNCTIONALITY =====
function initModals() {
    // Event registration modal
    const registerButtons = document.querySelectorAll('.event-register');
    const registrationModal = document.getElementById('registrationModal');
    const registrationForm = document.getElementById('eventRegistrationForm');

    if (registerButtons.length > 0 && registrationModal) {
        registerButtons.forEach(button => {
            button.addEventListener('click', function() {
                registrationModal.style.display = 'block';
            });
        });

        if (registrationForm) {
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for registering! You will receive a confirmation email shortly.');
                registrationModal.style.display = 'none';
                this.reset();
            });
        }
    }

    // Volunteer application modal
    const applyButtons = document.querySelectorAll('.apply-btn');
    const applicationModal = document.getElementById('applicationModal');
    const applicationForm = document.getElementById('volunteerApplicationForm');
    const appInterestSelect = document.getElementById('appInterest');

    if (applyButtons.length > 0 && applicationModal) {
        applyButtons.forEach(button => {
            button.addEventListener('click', function() {
                applicationModal.style.display = 'block';
                const type = this.dataset.type;
                if (type && appInterestSelect) {
                    appInterestSelect.value = type;
                }
            });
        });

        if (applicationForm) {
            applicationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your application! We will review it and get back to you soon.');
                applicationModal.style.display = 'none';
                this.reset();
            });
        }
    }

    // Close modal functionality
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INITIALIZE ALL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    initScenario();
    initPoll();
    initEventFilters();
    initModals();
    initSmoothScroll();

    // Add simple scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});