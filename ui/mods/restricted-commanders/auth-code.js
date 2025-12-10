
// Pre-set access codes and their associated commander sets
// Using var for better compatibility in older CoherentUI versions
var ACCESS_CODES = {
  "TNXSPIDERS": ["locust_access"]
};

// Store authentication state
// Global var to be accessible by filter script
var userAccess = ko.observable({
  authenticated: false,
  allowedCommanders: [],
  enteredCode: null
});

// Load saved authentication from localStorage
model.loadSavedAuth = function() {
  try {
    var saved = localStorage.getItem('commanderAuth');
    if (saved) {
      var parsed = JSON.parse(saved);
      // Verify the saved code is still valid
      if (ACCESS_CODES[parsed.code]) {
        userAccess({
          authenticated: true,
          allowedCommanders: ACCESS_CODES[parsed.code],
          enteredCode: parsed.code
        });
        return true;
      }
    }
  } catch (e) {
    console.log("Failed to load saved auth:", e);
  }
  return false;
};

// Save authentication to localStorage
model.saveAuth = function(code) {
  try {
    localStorage.setItem('commanderAuth', JSON.stringify({
      code: code,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.log("Failed to save auth:", e);
  }
};

// Validate access code
model.validateAccessCode = function(code) {
  code = code.trim().toUpperCase();
  
  if (ACCESS_CODES[code]) {
    // Update observable - this triggers the UI update subscription
    userAccess({
      authenticated: true,
      allowedCommanders: ACCESS_CODES[code],
      enteredCode: code
    });
    
    model.saveAuth(code);
    
    if (model.localChatMessage) {
        model.localChatMessage("Access Granted", "You now have access to special commanders!");
    }
    return true;
  } else {
    if (model.localChatMessage) {
        model.localChatMessage("Access Denied", "Invalid access code.");
    }
    return false;
  }
};

// Clear saved authentication
model.clearAuth = function() {
  try {
    localStorage.removeItem('commanderAuth');
    userAccess({
      authenticated: false,
      allowedCommanders: [],
      enteredCode: null
    });
    
    // Safety Force Reset: If currently selected commander is restricted, switch to default.
    // This prevents the "Select Commander" button from disappearing if it holds a hidden image.
    if (model.selectedCommander && model.commanders) {
        var currentSpec = model.selectedCommander();
        // Check if current spec contains restricted keyword
        if (currentSpec && currentSpec.indexOf('quad_locust') !== -1) {
             console.log("Logout: Resetting restricted commander selection to default.");
             var commanders = model.commanders();
             if (commanders && commanders.length > 0) {
                 // Set to the first commander (index 0) which is usually the default/safe one
                 model.setCommander(0); 
             }
        }
    }
    
  } catch (e) {
    console.log("Failed to clear auth:", e);
  }
};

// Initialize on load
_.defer(function() {
  var loaded = model.loadSavedAuth();
  if (loaded) {
    console.log("Loaded saved authentication");
  }
});