document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById('grid-container');
    const clearButton = document.getElementById('clear-button');
    const colorPicker = document.getElementById('color-picker');
    let leftMouseDown = false;
    let rightMouseDown = false;


    function updateHoverEffect() {
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(`.grid-square:hover { background-color: ${colorPicker.value}; }`, styleSheet.cssRules.length);
    }
    updateHoverEffect(); // Set hover color immediately to initial color

     // Listener for future color changes
     colorPicker.addEventListener('input', updateHoverEffect);
 

   // Fill square
    function fillSquare(square) {
        square.style.backgroundColor = colorPicker.value;
    }

    // Erase square
    function eraseSquare(square) {
        square.style.backgroundColor = '';
    }

    // Clear grid
    function clearGrid() {
        const squares = gridContainer.querySelectorAll('.grid-square');
        squares.forEach(eraseSquare);
    }
    clearButton.addEventListener('click', clearGrid); // Listener for 'Clear Grid'

    // Add 32 flexbox boxes to DOM
    for (let i = 0; i < 32; i++) {
        const row = document.createElement('div');
        row.classList.add('flex-row');
        for (let j = 0; j < 32; j++) {
            const square = document.createElement('div');
            square.classList.add('grid-square');
            square.addEventListener('mousedown', function(event) {
                if (event.button === 0) {
                    leftMouseDown = true;
                    fillSquare(square);
                } 
                else if (event.button === 2) {
                    rightMouseDown = true;
                    eraseSquare(square);
                }
                event.preventDefault();
            });
            square.addEventListener('mouseover', function() {
                if (leftMouseDown) {
                    fillSquare(square);
                }
                if (rightMouseDown) {
                    eraseSquare(square);
                }
            });
            square.addEventListener('dragstart', function(event) {
                event.preventDefault(); // Prevent context menu from showing up
            });
            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }

    // Listener for mouse release
    document.addEventListener('mouseup', function(event) {
        if (event.button === 0) {
            leftMouseDown = false;
        }
        if (event.button === 2) {
            rightMouseDown = false;
        }
    });

    // Prevent context menu from opening
    gridContainer.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
});
