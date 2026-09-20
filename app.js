// Currículo completo con niveles (A1 - C2)
const curriculum = {
    levels: [
        {
            id: "A1",
            name: "Beginner (Essential)",
            lessons: [
                { title: "Saludos", words: ["Hello", "Good morning", "How are you?", "Goodbye"] },
                { title: "Vida Diaria", words: ["Eat", "Sleep", "Work", "Home"] },
                { title: "Números", words: ["One", "Two", "Three", "Four"] }
            ]
        },
        {
            id: "A2",
            name: "Elementary (Basic)",
            lessons: [
                { title: "Compras", words: ["Price", "Discount", "Receipt", "Card"] },
                { title: "Familia", words: ["Mother", "Father", "Brother", "Sister"] }
            ]
        },
        {
            id: "B1",
            name: "Intermediate (Independent)",
            lessons: [
                { title: "Viajes", words: ["Itinerary", "Reservation", "Boarding Pass", "Customs"] }
            ]
        },
        {
            id: "B2",
            name: "Upper Intermediate (Professional)",
            lessons: [
                { title: "Reuniones de Negocios", words: ["Deadline", "Feedback", "Syllabus", "Budget"] }
            ]
        },
        {
            id: "C1",
            name: "Advanced (Proficient)",
            lessons: [
                { title: "Expresiones Idiomáticas", words: ["Break the ice", "Cost an arm and a leg", "Piece of cake"] }
            ]
        }
    ]
};

// Traducciones simuladas para los ejercicios
const translations = {
    "Hello": "Hola",
    "Good morning": "Buenos días",
    "How are you?": "¿Cómo estás?",
    "Goodbye": "Adiós",
    "Eat": "Comer",
    "Sleep": "Dormir",
    "Work": "Trabajar",
    "Home": "Casa",
    "One": "Uno",
    "Two": "Dos",
    "Three": "Tres",
    "Four": "Cuatro",
    "Price": "Precio",
    "Discount": "Descuento",
    "Receipt": "Recibo",
    "Card": "Tarjeta",
    "Mother": "Madre",
    "Father": "Padre",
    "Brother": "Hermano",
    "Sister": "Hermana",
    "Itinerary": "Itinerario",
    "Reservation": "Reserva",
    "Boarding Pass": "Tarjeta de embarque",
    "Customs": "Aduana",
    "Deadline": "Fecha límite",
    "Feedback": "Retroalimentación",
    "Syllabus": "Programa",
    "Budget": "Presupuesto",
    "Break the ice": "Romper el hielo",
    "Cost an arm and a leg": "Costar un ojo de la cara",
    "Piece of cake": "Pan comido"
};

// Estado de la App
let state = {
    currentLevelIdx: 0,
    currentLessonIdx: 0,
    currentWordIdx: 0,
    score: 0,
    streak: 0,
    completedWordsCount: 0,
    selectedOption: null
};

// Referencias DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const levelsScreen = document.getElementById('levelsScreen');
const lessonScreen = document.getElementById('lessonScreen');
const completedScreen = document.getElementById('completedScreen');

const startBtn = document.getElementById('startBtn');
const backLevelsBtn = document.getElementById('backLevelsBtn');
const backLessonBtn = document.getElementById('backLessonBtn');
const nextWordBtn = document.getElementById('nextWordBtn');
const continueBtn = document.getElementById('continueBtn');

const levelsGrid = document.getElementById('levelsGrid');
const wordDisplay = document.getElementById('wordDisplay');
const optionsGrid = document.getElementById('optionsGrid');
const lessonProgress = document.getElementById('lessonProgress');
const feedbackArea = document.getElementById('feedbackArea');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Contar total de palabras
    let totalW = 0;
    curriculum.levels.forEach(lvl => {
        lvl.lessons.forEach(lsn => {
            totalW += lsn.words.length;
        });
    });
    document.getElementById('totalWords').textContent = totalW;

    // Eventos
    startBtn.addEventListener('click', () => showScreen(levelsScreen));
    backLevelsBtn.addEventListener('click', () => showScreen(welcomeScreen));
    backLessonBtn.addEventListener('click', () => showScreen(levelsScreen));
    continueBtn.addEventListener('click', () => showScreen(levelsScreen));

    nextWordBtn.addEventListener('click', handleNextWord);

    renderLevels();
});

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
    if (screen === levelsScreen) {
        renderLevels();
    }
}

function renderLevels() {
    levelsGrid.innerHTML = '';
    curriculum.levels.forEach((lvl, idx) => {
        const totalLessons = lvl.lessons.length;
        const card = document.createElement('div');
        card.className = 'level-card';
        card.innerHTML = `
            <div class="level-header">
                <span class="level-badge">${lvl.id}</span>
                <span class="level-title">${lvl.name}</span>
            </div>
            <div class="level-lessons">${totalLessons} lecciones disponibles</div>
        `;
        card.addEventListener('click', () => startLevel(idx));
        levelsGrid.appendChild(card);
    });

    // Actualizar progreso global
    document.getElementById('headerStreak').textContent = state.streak;
    document.getElementById('globalProgress').style.width = `${(state.completedWordsCount / 20) * 100}%`;
    document.getElementById('globalPercent').textContent = `${Math.min(100, Math.round((state.completedWordsCount / 20) * 100))}%`;
}

function startLevel(levelIdx) {
    state.currentLevelIdx = levelIdx;
    state.currentLessonIdx = 0;
    state.currentWordIdx = 0;
    startLesson();
}

function startLesson() {
    state.currentWordIdx = 0;
    showScreen(lessonScreen);
    setupWord();
}

function setupWord() {
    state.selectedOption = null;
    nextWordBtn.disabled = true;
    feedbackArea.textContent = '';
    feedbackArea.className = 'feedback-area';

    const currentLesson = curriculum.levels[state.currentLevelIdx].lessons[state.currentLessonIdx];
    const words = currentLesson.words;
    
    if (state.currentWordIdx >= words.length) {
        // Lección completada
        showCompletionScreen();
        return;
    }

    const currentWord = words[state.currentWordIdx];
    wordDisplay.textContent = currentWord;

    // Progreso de la lección
    const progressPercent = (state.currentWordIdx / words.length) * 100;
    lessonProgress.style.width = `${progressPercent}%`;
    document.getElementById('lessonTitle').textContent = currentLesson.title;
    document.getElementById('lessonStreak').textContent = state.streak;

    // Generar opciones de respuesta (1 correcta + 3 aleatorias)
    const correctTranslation = translations[currentWord];
    let options = [correctTranslation];

    while (options.length < 4) {
        const randomWord = Object.values(translations)[Math.floor(Math.random() * Object.values(translations).length)];
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }

    // Mezclar opciones
    options.sort(() => Math.random() - 0.5);

    optionsGrid.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectOption(btn, opt, correctTranslation));
        optionsGrid.appendChild(btn);
    });
}

function selectOption(btn, selected, correct) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.selectedOption = selected;
    nextWordBtn.disabled = false;

    // Validación automática inmediata
    const isCorrect = (selected === correct);
    if (isCorrect) {
        btn.classList.add('correct');
        feedbackArea.textContent = '¡Correcto! 🎉';
        feedbackArea.className = 'feedback-area correct';
        state.score += 10;
        state.streak += 1;
        state.completedWordsCount += 1;
    } else {
        btn.classList.add('incorrect');
        feedbackArea.textContent = `Incorrecto. La respuesta es: ${correct}`;
        feedbackArea.className = 'feedback-area incorrect';
        state.streak = 0;
    }

    // Deshabilitar botones
    document.querySelectorAll('.option-btn').forEach(b => b.style.pointerEvents = 'none');
}

function handleNextWord() {
    state.currentWordIdx++;
    setupWord();
}

function showCompletionScreen() {
    showScreen(completedScreen);
    document.getElementById('completedWords').textContent = curriculum.levels[state.currentLevelIdx].lessons[state.currentLessonIdx].words.length;
    document.getElementById('completedScore').textContent = state.score;
    document.getElementById('completedStreak').textContent = state.streak;
}
