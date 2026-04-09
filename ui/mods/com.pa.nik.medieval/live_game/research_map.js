// Research Map panel for LiveGame_FloatZone
console.log('[Research Map] script loading');

var researchMapState = {
    visible: localStorage.getItem('researchMapVisible') !== 'false',
    researchedSpecs: {},
    availableFactions: ['cabal', 'imperia', 'vesperin'],
    descriptions: {}
};

// Load CSS into this context
$('head').append('<link rel="stylesheet" type="text/css" href="coui://ui/mods/com.pa.nik.medieval/floatzone/research_map.css" />');

// Restore saved position or use defaults
var savedLeft = localStorage.getItem('researchMapLeft');
var savedTop = localStorage.getItem('researchMapTop');

var frameDiv = $('<div id="research_map_frame"></div>').css({
    position: 'fixed',
    top: savedTop || '40px',
    left: savedLeft || '50%',
    transform: savedLeft ? 'none' : 'translateX(-50%)',
    'z-index': 9998
});
var frameContent = $('<div id="research_map_frame_content"></div>');
frameDiv.append(frameContent);
$('body').append(frameDiv);

// Load HTML scene into the frame
$.get('coui://ui/mods/com.pa.nik.medieval/floatzone/research_map_scene.html', function(html) {
    frameContent.html(html);
    console.log('[Research Map] HTML loaded');

    // Wire up in-panel toggle
    $('#research_map_toggle').on('click', function() {
        researchMapToggle();
    });

    // Wire up drag handle
    $('#research_map_drag').on('mousedown', function(e) {
        e.preventDefault();
        var frame = $('#research_map_frame');
        var startX = e.clientX;
        var startY = e.clientY;
        var offset = frame.offset();
        // Clear the centering transform once we start dragging
        frame.css('transform', 'none');

        $(document).on('mousemove.researchdrag', function(e) {
            var newLeft = offset.left + (e.clientX - startX);
            var newTop = offset.top + (e.clientY - startY);
            frame.css({ left: newLeft + 'px', top: newTop + 'px' });
        });

        $(document).on('mouseup.researchdrag', function() {
            $(document).off('mousemove.researchdrag mouseup.researchdrag');
            // Save position
            localStorage.setItem('researchMapLeft', frame.css('left'));
            localStorage.setItem('researchMapTop', frame.css('top'));
        });
    });

    // Load data and render
    loadResearchMapDataAndRender();
}).fail(function(err) {
    console.error('[Research Map] Failed to load HTML:', err);
});

// Launcher button — always visible on the right side of the screen
var launcherBtn = $('<button id="research_map_launcher_btn">Research</button>').css({
    position: 'fixed',
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
    'z-index': 9999,
    padding: '8px 12px',
    'background-color': '#1c252e',
    border: '1px solid #4c6173',
    'border-radius': '3px',
    color: '#91a0ab',
    'font-weight': 'bold',
    'font-size': '11px',
    cursor: 'pointer',
    'white-space': 'nowrap'
});
launcherBtn.hover(
    function() { $(this).css({ 'background-color': '#253342', 'border-color': '#56707f' }); },
    function() {
        if (researchMapState.visible) {
            $(this).css({ 'background-color': '#253342', 'border-color': '#2ad46f' });
        } else {
            $(this).css({ 'background-color': '#1c252e', 'border-color': '#4c6173' });
        }
    }
);
launcherBtn.on('click', function() {
    researchMapToggle();
});
$('body').append(launcherBtn);
console.log('[Research Map] Launcher button added');

// Apply initial visibility
researchMapUpdateVisibility();

// --- Functions ---

function researchMapToggle() {
    researchMapState.visible = !researchMapState.visible;
    localStorage.setItem('researchMapVisible', researchMapState.visible ? 'true' : 'false');
    researchMapUpdateVisibility();
}

function researchMapUpdateVisibility() {
    var frame = $('#research_map_frame');
    var btn = $('#research_map_launcher_btn');
    var toggleBtn = $('#research_map_toggle');

    if (researchMapState.visible) {
        frame.show();
        btn.text('Research [ON]').css({ 'border-color': '#2ad46f', color: '#2ad46f' });
        if (toggleBtn.length) toggleBtn.addClass('active').find('.toggle-indicator').text('ON');
    } else {
        frame.hide();
        btn.text('Research').css({ 'border-color': '#4c6173', color: '#91a0ab' });
        if (toggleBtn.length) toggleBtn.removeClass('active').find('.toggle-indicator').text('OFF');
    }
}

function loadResearchMapDataAndRender() {
    if (window.researchMapSchema && window.researchMapSchema.factions) {
        renderResearchMapFactions();
        requestResearchMapInitialState();
        return;
    }

    $.getScript('coui://ui/mods/com.pa.nik.medieval/research_map_data.js', function() {
        console.log('[Research Map] research_map_data.js loaded');
        renderResearchMapFactions();
        requestResearchMapInitialState();
    }).fail(function(err) {
        console.error('[Research Map] Failed to load research_map_data.js:', err);
    });
}

function requestResearchMapInitialState() {
    if (api && api.Panel && api.Panel.parentId) {
        api.Panel.message(api.Panel.parentId, 'requestResearchMapState');
        console.log('[Research Map] Requested initial state');
    } else {
        setTimeout(function() {
            if (api && api.Panel && api.Panel.parentId) {
                api.Panel.message(api.Panel.parentId, 'requestResearchMapState');
            }
        }, 1000);
    }

    // Poll for state updates every 3 seconds to stay in sync
    setInterval(function() {
        if (api && api.Panel && api.Panel.parentId) {
            api.Panel.message(api.Panel.parentId, 'requestResearchMapState');
        }
    }, 3000);
}

function renderResearchMapFactions() {
    var content = $('#research_map_content');
    if (!content.length) {
        console.warn('[Research Map] #research_map_content not found');
        return;
    }

    content.empty();

    if (!window.researchMapSchema || !window.researchMapSchema.factions) {
        content.append('<p style="color: #a0aab5; padding: 16px;">Data not loaded</p>');
        return;
    }

    var container = $('<div class="factions-container"></div>').appendTo(content);

    window.researchMapSchema.factions.forEach(function(faction) {
        if (researchMapState.availableFactions.indexOf(faction.id) === -1) {
            return;
        }

        var factionHtml = $('<div class="faction"></div>')
            .addClass(faction.id)
            .appendTo(container);

        $('<div class="faction-header"></div>')
            .text(faction.name)
            .appendTo(factionHtml);

        var bodyHtml = $('<div class="faction-body"></div>').appendTo(factionHtml);

        faction.branches.forEach(function(branch) {
            var branchHtml = $('<div class="branch"></div>').appendTo(bodyHtml);

            $('<div class="branch-header"></div>')
                .text(branch.name)
                .appendTo(branchHtml);

            var nodesContainer = $('<div class="branch-nodes"></div>').appendTo(branchHtml);

            branch.nodes.forEach(function(node) {
                var nodeDiv = $('<div class="research-node"></div>')
                    .attr('data-spec', node.spec_id)
                    .attr('data-label', node.label)
                    .appendTo(nodesContainer);

                var iconUrl = 'coui://' + node.spec_id.replace('.json', '_icon_buildbar.png');
                $('<div class="node-icon"></div>')
                    .css('background-image', 'url("' + iconUrl + '")')
                    .appendTo(nodeDiv);

                if (node.tier) {
                    $('<div class="node-tier"></div>')
                        .text(node.tier)
                        .appendTo(nodeDiv);
                }

                $('<div class="node-label"></div>')
                    .text(node.label)
                    .appendTo(nodeDiv);

                // Cross overlay (hidden when researched via CSS)
                $('<div class="node-lock"></div>')
                    .appendTo(nodeDiv);

                if (researchMapState.researchedSpecs[node.spec_id]) {
                    nodeDiv.addClass('researched');
                }

                nodeDiv.on('mouseenter', function() {
                    loadResearchDescription(node.spec_id).then(function(desc) {
                        nodeDiv.attr('title', node.label + '\n' + desc);
                    });
                });
            });
        });
    });

    if (container.children().length === 0) {
        content.html('<p style="color: #a0aab5; padding: 16px;">No factions available. Build a research structure to unlock research.</p>');
    }
}

function loadResearchDescription(specId) {
    if (researchMapState.descriptions[specId] !== undefined) {
        return Promise.resolve(researchMapState.descriptions[specId]);
    }

    return new Promise(function(resolve) {
        $.ajax({
            url: 'coui://' + specId,
            dataType: 'json',
            timeout: 1500,
            success: function(data) {
                var desc = (data && data.display_name) ? data.display_name : 'Research Item';
                researchMapState.descriptions[specId] = desc;
                resolve(desc);
            },
            error: function() {
                researchMapState.descriptions[specId] = 'Research Item';
                resolve('Research Item');
            }
        });
    });
}

function updateResearchNodeStates() {
    $('[data-spec]').each(function() {
        var spec = $(this).attr('data-spec');
        if (researchMapState.researchedSpecs[spec]) {
            $(this).addClass('researched');
        } else {
            $(this).removeClass('researched');
        }
    });
}

// --- Message Handlers (using PA framework's handlers object) ---

handlers.updateResearchMapState = function(payload) {
    console.log('[Research Map] updateResearchMapState received');

    if (payload && payload.availableFactions) {
        researchMapState.availableFactions = payload.availableFactions;
    }

    researchMapState.researchedSpecs = {};

    if (Array.isArray(payload)) {
        payload.forEach(function(spec) { researchMapState.researchedSpecs[spec] = true; });
    } else if (payload && Array.isArray(payload.researched)) {
        payload.researched.forEach(function(spec) { researchMapState.researchedSpecs[spec] = true; });
    }

    renderResearchMapFactions();
};

handlers.unlockResearch = function(payload) {
    if (!payload) return;
    console.log('[Research Map] unlockResearch received:', payload);
    researchMapState.researchedSpecs[payload] = true;
    updateResearchNodeStates();
};

console.log('[Research Map] script loaded');
