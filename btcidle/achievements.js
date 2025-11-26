// Estados iniciales de los logros
const achievements = {
    cryptoBro: false,
    stonks: false,
    goldenreflexes: false,
    hashslayer: false,
    millionaire: false
};

/**
 * Clona la tarjeta del logro, la posiciona en la esquina
 * y la muestra como notificación temporal.
 * * @param {string} achievementId - El ID del logro que se acaba de desbloquear (ej: 'CryptoBro').
 * @param {number} duration - Duración en milisegundos que estará visible (ej: 4000 para 4 segundos).
 */
window.showAchievementNotification = function(achievementId, duration = 4000) {
    const originalAchievement = document.getElementById(achievementId);
    
    // 1. Asegurarse de que la tarjeta original existe
    if (!originalAchievement) return;

    // 2. Crear un clon de la tarjeta original
    const notificationClone = originalAchievement.cloneNode(true);
    
    // 3. Configurar el clon para ser la notificación flotante
    notificationClone.id = 'notification-clone'; // Para evitar ID duplicados
    notificationClone.classList.add('notification-popup'); // Clase CSS para el posicionamiento
    notificationClone.style.display = 'flex'; 
    
    // 4. Asegurarse de que el clon tiene el estado "achieved" (logrado)
    notificationClone.classList.remove('not-achieved');
    notificationClone.classList.add('achieved');

    // 5. Añadir el clon al body para que flote
    document.body.appendChild(notificationClone);

    // --- Animación de entrada ---
    
    // Pequeño retraso para asegurar que la animación CSS se dispare
    setTimeout(() => {
        notificationClone.classList.add('notification-show');
    }, 50);

    // --- Animación de salida y limpieza ---
    
    setTimeout(() => {
        // Desliza hacia afuera
        notificationClone.classList.remove('notification-show');

        // Esperar a que termine la animación de salida (500ms) y eliminar el elemento
        setTimeout(() => {
            notificationClone.remove();
        }, 500); 
    }, duration);
}

function updateAchievementDisplay(id) {
    const elem = document.getElementById(id);
    if (!elem) return;

    if (achievements[id]) {
        elem.classList.remove('not-achieved');
        elem.classList.add('achieved');
    } else {
        elem.classList.remove('achieved');
        elem.classList.add('not-achieved');
    }
}

window.unlockAchievement = function(id) {
    if (!achievements[id] || achievements[id] === false) {
        achievements[id] = true;
        saveAchievements(); // Guardamos en localStorage
        updateAchievementDisplay(id); // Actualizamos la visualización
        
        playSound('./audio/achievement.mp3')
        // Mostramos la notificación flotante
        if (window.showAchievementNotification) {
            window.showAchievementNotification(id, 4000);
        }
    }
}

window.saveAchievements = function() {
    localStorage.setItem('btcClickerAchievements', JSON.stringify(achievements));
}


