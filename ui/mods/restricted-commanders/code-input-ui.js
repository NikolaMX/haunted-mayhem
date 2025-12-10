
// Create the access code input dialog
function createCodeInputBox() {
  if (document.getElementById('codeInputBox')) {
    return;
  }
  
  $('body').append(
    '<div id="codeInputBox">' +
    '<div id="codeInputBoxHeader">GET CODE FROM PATREON</div>' +
    '<div id="codeInputContent">' +
    '<input type="text" id="accessCodeInput" placeholder="ENTER CODE..." autocomplete="off" />' +
    '<div id="codeInputButtons">' +
    '<button type="button" onclick="submitAccessCode()">SUBMIT</button>' +
    '<button type="button" onclick="closeCodeInputBox()">CANCEL</button>' +
    '</div>' +
    '</div>' +
    '</div>'
  );
  
  // Focus the input field
  document.getElementById('accessCodeInput').focus();
  
  // Allow Enter key to submit
  document.getElementById('accessCodeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      submitAccessCode();
    }
  });
}

// Create Logout Confirmation Modal
function createLogoutConfirmation() {
  if (document.getElementById('logoutConfirmBox')) {
    return;
  }
  
  $('body').append(
    '<div id="logoutConfirmBox">' +
    '<div id="codeInputBoxHeader">CONFIRM LOGOUT</div>' +
    '<div id="codeInputContent">' +
    '<div class="modal-text-content">' +
    'Are you sure you want to lock restricted commanders?' +
    '</div>' +
    '<div id="codeInputButtons">' +
    '<button type="button" class="btn-danger" onclick="confirmLogout()">LOGOUT</button>' +
    '<button type="button" onclick="closeLogoutConfirmation()">CANCEL</button>' +
    '</div>' +
    '</div>' +
    '</div>'
  );
}

function closeLogoutConfirmation() {
  $('#logoutConfirmBox').remove();
}

function confirmLogout() {
  model.clearAuth();
  closeLogoutConfirmation();
}

// Submit the access code
function submitAccessCode() {
  var code = document.getElementById('accessCodeInput').value;
  if (code && code.length > 0) {
    var success = model.validateAccessCode(code);
    if (success) {
      closeCodeInputBox();
    } else {
      // Show error feedback
      var input = document.getElementById('accessCodeInput');
      input.classList.add('input-error');
      setTimeout(function() {
        input.classList.remove('input-error');
      }, 1000);
    }
  }
}

// Close the code input dialog
function closeCodeInputBox() {
  var box = document.getElementById('codeInputBox');
  if (box) {
    box.remove();
  }
}

// Create logout button (using classes to handle multiple pickers)
function createLogoutButton() {
  // First ensure we don't have mixed states
  removeAccessButton();
  
  // Iterate over all commander pickers (main player and AI slots)
  $('.div-commander-picker').each(function() {
    var $picker = $(this);
    // Only add if it doesn't already have one
    if ($picker.find('.auth-logout-btn').length === 0) {
       $picker.prepend(
        '<button class="auth-logout-btn" onclick="createLogoutConfirmation()" title="Clear saved authentication">LOGOUT</button>'
      );
    }
  });
}

// Remove logout button (removes all instances)
function removeLogoutButton() {
  $('.auth-logout-btn').remove();
}

// Logout function trigger
function logoutAuth() {
  // Use custom modal instead of confirm() to prevent game freeze
  createLogoutConfirmation();
}

// Create access code button (using classes)
function createAccessButton() {
  // Ensure we don't have mixed states
  removeLogoutButton();
  
  $('.div-commander-picker').each(function() {
    var $picker = $(this);
    if ($picker.find('.auth-access-btn').length === 0) {
      $picker.prepend(
        '<button class="auth-access-btn" onclick="createCodeInputBox()" title="Enter access code for special commanders">ENTER CODE</button>'
      );
    }
  });
}

// Remove access button (removes all instances)
function removeAccessButton() {
  $('.auth-access-btn').remove();
}

// Update UI buttons based on authentication state
function updateAuthButtons() {
  if (typeof userAccess === 'undefined') return;
  
  var access = userAccess();
  if (access.authenticated) {
    createLogoutButton();
  } else {
    createAccessButton();
  }
}

// Subscribe to authentication changes
if (typeof userAccess !== 'undefined') {
    userAccess.subscribe(function() {
      updateAuthButtons();
    });
}

// Debounce helper
function debounceUI(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// Watch for DOM changes (UI redraws) to re-inject buttons if they get wiped
var debouncedAuthUpdate = debounceUI(updateAuthButtons, 50);

var uiObserver = new MutationObserver(function(mutations) {
  debouncedAuthUpdate();
});

// Initialize UI on load
_.defer(function() {
  // Run initial update
  updateAuthButtons();
  
  // Start observing body for re-renders (like switching player slots)
  uiObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
});
