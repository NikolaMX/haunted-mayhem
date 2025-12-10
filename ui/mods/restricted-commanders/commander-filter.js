
// Define restricted commanders
var restrictedCommanders = {
  "locust_access": ["quad_locust"] // Keyword to match in the image filename
};

// Inject utility style for hiding commanders reliably
$('head').append('<style>.restricted-commander-hidden { display: none !important; }</style>');

// Debounce function to prevent rapid-fire updates
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// Main function to check and hide/show commanders
function updateCommanderVisibility() {
  try {
      // Safety check to ensure auth logic is loaded
      if (typeof userAccess === 'undefined') return;

      var access = userAccess();
      var containersToHide = [];
      
      // 1. Identify all containers that contain a restricted image and SHOULD be hidden
      $('img').each(function() {
        var $img = $(this);
        var src = $img.attr('src');
        
        if (!src) return;

        // Check if this image belongs to a restricted set
        for (var set in restrictedCommanders) {
          var keywords = restrictedCommanders[set];
          
          // If any keyword matches the image src
          var isRestrictedImage = false;
          for (var k = 0; k < keywords.length; k++) {
              if (src.indexOf(keywords[k]) !== -1) {
                  isRestrictedImage = true;
                  break;
              }
          }

          if (isRestrictedImage) {
            // Determine if user has permission
            var isAllowed = access.authenticated && (access.allowedCommanders.indexOf(set) !== -1);
            
            if (!isAllowed) {
                // Find the container to hide
                var $container = $img.closest('.div-commander-picker-item');
                if ($container.length === 0) $container = $img.closest('.commander-item');
                if ($container.length === 0) $container = $img.parent();

                if ($container.length > 0) {
                    containersToHide.push($container[0]);
                }
            }
          }
        }
      });
      
      // 2. Apply hiding to identified containers
      $(containersToHide).each(function() {
          var $el = $(this);
          if (!$el.hasClass('restricted-commander-hidden')) {
              $el.addClass('restricted-commander-hidden');
          }
      });

      // 3. Cleanup: Find any containers we previously hid that are NOT in the current hide list
      // This handles the case where the image source changed from "restricted" to "safe"
      $('.restricted-commander-hidden').each(function() {
          var el = this;
          if ($.inArray(el, containersToHide) === -1) {
              var $el = $(el);
              $el.removeClass('restricted-commander-hidden');
              // Force reset display property to fix layout
              $el.css('display', 'inline-block');
          }
      });

  } catch (e) {
      console.error("Restricted Commanders: Error updating visibility", e);
  }
}

// Subscribe to access changes
if (typeof userAccess !== 'undefined') {
    userAccess.subscribe(function() {
        // Run asynchronously to ensure the auth flow completes
        setTimeout(updateCommanderVisibility, 10);
        setTimeout(updateCommanderVisibility, 200);
    });
}

// Use MutationObserver to handle the commander picker being lazy-loaded and image source changes
var debouncedUpdate = debounce(updateCommanderVisibility, 50);

var commanderObserver = new MutationObserver(function(mutations) {
  debouncedUpdate();
});

// Start observing
_.defer(function() {
  commanderObserver.observe(document.body, {
    childList: true, 
    subtree: true,
    attributes: true, 
    attributeFilter: ['src'] // Also listen for src changes on existing images
  });
  
  // Initial run
  updateCommanderVisibility();
});