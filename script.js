const toggleCheckbox = document.getElementById('dark-mode-toggle');

toggleCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', toggleCheckbox.checked);
});