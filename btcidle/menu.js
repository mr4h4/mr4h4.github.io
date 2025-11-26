document.getElementById('toggle-upgrades').addEventListener('click', function() {
    const content = document.getElementById('upgrades');
    const button = document.getElementById('toggle-upgrades');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        button.style.borderColor = '#ffffffff';
    } else {
        content.style.display = 'none';
        button.style.borderColor = '#ff7300';
    }
});

document.getElementById('toggle-achievements').addEventListener('click', function() {
    const content = document.getElementById('achievements');
    const button = document.getElementById('toggle-achievements');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        button.style.borderColor = '#ffffffff';
    } else {
        content.style.display = 'none';
        button.style.borderColor = '#ff7300';
    }
});