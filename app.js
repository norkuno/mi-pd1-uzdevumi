
"use strict";

// Uzdevumu dati un izvēlētais filtrs
const STORAGE_KEY = "pdl-uzdevumi";
let tasks = [];
let currentFilter = "all";

// HTML elementi
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll("[data-filter]");

// Ielādē uzdevumus no localStorage
function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        tasks = Array.isArray(saved) ? saved.filter(task =>
            task && Number.isSafeInteger(task.id) &&
            typeof task.text === "string" &&
            typeof task.done === "boolean"
        ) : [];
    } catch (error) {
        tasks = [];
    }
}

// Saglabā uzdevumus
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Izveido unikālu uzdevuma ID
function createId() {
    let id = Date.now();
    while (tasks.some(task => task.id === id)) {
        id++;
    }
    return id;
}

// Pievieno jaunu uzdevumu
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ id: createId(), text, done: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
    taskInput.focus();
}

// Atzīmē uzdevumu kā izpildītu vai aktīvu
function toggleTask(id) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;

    task.done = !task.done;
    saveTasks();
    renderTasks();
}

// Dzēš izvēlēto uzdevumu
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Attēlo uzdevumus atbilstoši izvēlētajam filtram
function renderTasks() {
    taskList.replaceChildren();

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.done;
        if (currentFilter === "done") return task.done;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const span = document.createElement("span");
        const deleteBtn = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.addEventListener("change", () => toggleTask(task.id));

        span.textContent = task.text;
        if (task.done) span.classList.add("done");

        // Dubultklikšķis sāk rediģēšanu
        span.addEventListener("dblclick", () => editTask(task.id, span));

        deleteBtn.textContent = "Dzēst";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        li.append(checkbox, span, deleteBtn);
        taskList.appendChild(li);
    });

    updateCounter();
    updateFilters();
}

// Sāk uzdevuma rediģēšanu
function editTask(id, span) {
    const oldText = span.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = oldText;
    span.replaceWith(input);
    input.focus();
    input.select();
    saveEdit(id, input, oldText);
}

// Saglabā vai atceļ rediģēšanu
function saveEdit(id, input, oldText) {
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            const task = tasks.find(item => item.id === id);
            if (task) task.text = input.value.trim() || oldText;
            saveTasks();
            renderTasks();
        }
        if (event.key === "Escape") renderTasks();
    });
}

// Atjauno atlikušo uzdevumu skaitu
function updateCounter() {
    counter.textContent = tasks.filter(task => !task.done).length;
}

// Izceļ aktīvo filtra pogu
function updateFilters() {
    filterButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === currentFilter
        );
    });
}

// Filtru pogu notikumi
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

// Pievienošanas pogas un Enter taustiņa notikumi
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") addTask();
});

// Lietotnes palaišana
loadTasks();
renderTasks();
