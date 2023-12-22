document.addEventListener('DOMContentLoaded', function () {
    // Initial HP
    let hp = 100;
  
    // HP bar element
    const hpBar = document.getElementById('hp-bar');
  
    // Current HP element
    const currentHp = document.getElementById('current-hp');
  
    // Click button element
    const clickBtn = document.getElementById('clickBtn');
  
    // Click event listener
    clickBtn.addEventListener('click', function () {
      // Decrease HP by 10 on each click
      hp -= 10;
  
      // Ensure HP is not negative
      hp = Math.max(0, hp);
  
      // Update HP bar width and color
      updateHpBar();
  
      // Update HP text
      currentHp.textContent = `HP: ${hp}`;
  
      // Check if HP is zero
      if (hp === 0) {
        updateHpBar();
        alert('Game over! You ran out of HP.');
        // You can add more logic here, such as resetting the game.
        // For simplicity, let's reload the page for now.
        location.reload();
      }
    });
  
    // Function to update HP bar width and color
    function updateHpBar() {
      const percent = (hp / 100) * 100;
      hpBar.style.width = `${percent}%`;
  
      // Color control based on HP percentage
      if (percent > 50) {
        hpBar.style.background = 'green';
      } else if (percent > 15) {
        hpBar.style.background = 'yellow';
      } else {
        hpBar.style.background = 'red';
      }
    }
  
    // Initial HP bar setup
    updateHpBar();
  });
  