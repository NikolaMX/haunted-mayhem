//this keeps track of replaced units and allows hotkeys to work on them

//not sure exactly how multiple replacements would work, I will need to set it to replace the new unit value without touching the old

model.oldUnits = []//units being replaced, this is checked before building anything

model.newUnits = []//replaces the id if an old unit is hotkeyed

var consumedTriggerQueueRules = [
    {
        prefix: "/pa/units/medieval/research/cabal/",
        producer_specs: ["/pa/units/medieval/structures/mage_tower/mage_tower_c.json"]
    },
    {
        prefix: "/pa/units/medieval/upgrades/cabal/",
        producer_specs: ["/pa/units/medieval/structures/mage_tower/mage_tower_c.json"]
    },
    {
        prefix: "/pa/units/medieval/research/imperia/",
        producer_specs: ["/pa/units/medieval/structures/observatory/observatory.json"]
    },
    {
        prefix: "/pa/units/medieval/upgrades/imperia/",
        producer_specs: ["/pa/units/medieval/structures/observatory/observatory.json"]
    },
    {
        prefix: "/pa/units/medieval/research/vesperin/",
        producer_specs: ["/pa/units/medieval/structures/mage_tower/mage_tower.json"]
    },
    {
        prefix: "/pa/units/medieval/upgrades/vesperin/",
        producer_specs: ["/pa/units/medieval/structures/mage_tower/mage_tower.json"]
    }
];

//factory map will link each factory id to a buildqueue
//in order to track correctly this will be done on orders issued rather than factory selection
factorySpecs = [

//Cabal
    "/pa/units/medieval/structures/mage_tower/mage_tower_c.json",

    "/pa/units/medieval/structures/arcmage_tower/arcmage_tower_c.json",
    "/pa/units/medieval/structures/spectral_shrine/spectral_shrine.json",

    "/pa/units/medieval/structures/factory_infantry/factory_infantry_c.json",
    "/pa/units/medieval/structures/factory_ranged/factory_ranged_c.json",
    "/pa/units/medieval/structures/factory_cav/factory_cav_c.json",
    

//Imperia
    "/pa/units/medieval/structures/observatory/observatory.json",


    "/pa/units/medieval/structures/fogmage_tower/fogmage_tower.json",
    "/pa/units/medieval/structures/arcmage_tower/arcmage_tower.json",
    "/pa/units/medieval/structures/tavern/tavern.json",
    
    "/pa/units/medieval/structures/factory_infantry/factory_infantry.json",
    "/pa/units/medieval/structures/factory_cav/factory_cav.json",


//Vesperin
    "/pa/units/medieval/structures/mage_tower/mage_tower.json",


    "/pa/units/medieval/structures/lair/lair.json",
    "/pa/units/medieval/structures/blood_shrine/blood_shrine.json",
    "/pa/units/medieval/structures/serpent_shrine/serpent_shrine.json",

    "/pa/units/medieval/structures/factory_ranged/factory_ranged.json",
    "/pa/units/medieval/structures/firemage_tower/firemage_tower.json",
    
]

model.factoryMap = {}

model.captureSelection = function(){
    if (!api.selection || !api.selection.has || !api.selection.get) {
        return null;
    }
    if (!api.selection.has()) {
        return null;
    }
    return api.selection.get();
}

model.restoreSelection = function(selectionSnapshot){
    api.select.empty();
    if (selectionSnapshot && api.selection && api.selection.set) {
        api.selection.set(selectionSnapshot);
    }
}

model.getConsumedTriggerProducerSpecs = function(unitSpec){
    if (!unitSpec) {
        return [];
    }
    for (var i = 0; i < consumedTriggerQueueRules.length; i++) {
        if (unitSpec.indexOf(consumedTriggerQueueRules[i].prefix) === 0) {
            return consumedTriggerQueueRules[i].producer_specs;
        }
    }
    return [];
}

model.clearConsumedTriggerQueue = function(unitSpec){
    var producerSpecs = model.getConsumedTriggerProducerSpecs(unitSpec);
    if (producerSpecs.length === 0 || !model.allPlayerArmy) {
        return;
    }

    var playerId = model.armyIndex();
    if (typeof playerId === "undefined" && model.armyId) {
        playerId = model.armyId();
    }
    if (typeof playerId === "undefined") {
        return;
    }

    model.allPlayerArmy(playerId, producerSpecs).then(function(result){
        var producerIds = [];
        _.forEach(producerSpecs, function(spec){
            if (result[spec] !== undefined) {
                producerIds = producerIds.concat(result[spec]);
            }
        });
        producerIds = _.uniq(producerIds);

        if (producerIds.length === 0) {
            return;
        }

        var originalSelection = model.captureSelection();
        api.select.unitsById(producerIds);
        api.unit.cancelBuild(unitSpec, 100, false);
        model.restoreSelection(originalSelection);

        _.forEach(producerIds, function(producerId){
            if (model.factoryMap[producerId]) {
                delete model.factoryMap[producerId][unitSpec];
            }
        });
    });
}

model.mapFactoryBuildToIds = function(selectedFacIds, unitSpec, count, cancel, urgent){//if urgent we ignore otherwise we update the map

    for(var i = 0 ; i < selectedFacIds.length; i++){
        if(urgent){continue}
        if(model.factoryMap[selectedFacIds[i]] == undefined){
            model.factoryMap[selectedFacIds[i]] = {}
        }
        var unitsQueued = model.factoryMap[selectedFacIds[i]][unitSpec];
        if(unitsQueued == undefined){
            model.factoryMap[selectedFacIds[i]][unitSpec] = 0;
            unitsQueued = 0;
        }
        if(cancel){
            unitsQueued = unitsQueued - count
            if(unitsQueued < 0){unitsQueued = 0}
        }
        else{
            unitsQueued = unitsQueued + count
        }
        model.factoryMap[selectedFacIds[i]][unitSpec] = unitsQueued;
    }

}

model.replaceUnitQueue = function(facsToReQueue,oldUnit, newUnit, maxAmount){//this should only run between selections
    var originalSelection = model.captureSelection();
    var facIds = [];
    _.forEach(facsToReQueue, function(fac){facIds.push(fac[0])})
    if (facIds.length === 0) {
        return;
    }
    //select facs that are needed initally
    api.select.unitsById(facIds);
    api.unit.cancelBuild(oldUnit, 100, false);
    //deselect facs that have the right amount queued
    for (var i = 0; i < maxAmount; i++) {
        for (var j = 0; j < facsToReQueue.length; j++) {
    
            var amount = facsToReQueue[j][1]
           
            if(amount == i){
                facIds.splice(j,1);
                console.log("spliced fac out of selection");
                facsToReQueue.splice(j,1);
            }
        }
       api.select.unitsById(facIds);
       if(newUnit !== null && newUnit !== undefined){
       api.unit.build(newUnit, 1, false);}
    }
    model.restoreSelection(originalSelection);
}




//this does not track issuing stop commands which are also important for tracking
model.executeStartBuild = function (params) {
    var selectedFacIds = [];
    var id = params.item;
    for(var i = 0;i<model.oldUnits.length;i++){
        if(id == model.oldUnits[i]){
            id = model.newUnits[i];
        }
    }
    for(var i = 0; i < factorySpecs.length; i++){
        var facTypeInSelection = model.selection().spec_ids[factorySpecs[i]]
        if(facTypeInSelection !== undefined){
            for(var j = 0; j < facTypeInSelection.length; j++){
                selectedFacIds.push(facTypeInSelection[j])
            }
            
        }
    }
    var batch = params.batch;
    var cancel = params.cancel;
    var urgent = params.urgent;
    var more = params.more;


    if (model.selectedMobile()) {
        model.endCommandMode();
        model.currentBuildStructureId(id);
        api.arch.beginFabMode(id)
                .then(function (ok) {
                    if (!ok)
                        model.endFabMode();
                });

        model.mode('fab');
        model.fabCount(0);
    }
    else {
        var count = batch ? model.batchBuildSize() : 1;
        model.mapFactoryBuildToIds(selectedFacIds, id, count, cancel, urgent)
        if (cancel) {
            api.unit.cancelBuild(id, count, urgent);
            api.audio.playSound('/SE/UI/UI_factory_remove_from_queue');
        }
        else {
            api.unit.build(id, count, urgent).then(function (success) {
                if (success) {
                    var secondary = more ? '_secondary' : '';
                    api.audio.playSound('/SE/UI/UI_Command_Build' + secondary);
                }
            });
        }
    }
}
model.buildItemBySpec = function (spec_id) {
    for(var i = 0;i<model.oldUnits.length;i++){
        if(spec_id == model.oldUnits[i]){
            spec_id = model.newUnits[i];
        }
    }
    var item = model.unitSpecs[spec_id];
    if (item)
        model.buildItem(item);
}

handlers.replaceHotkey = function(unitPair){
    for(var i = 0;i<model.oldUnits.length;i++){
        if(unitPair[0] == model.oldUnits[i]){
            model.newUnits[i] = unitPair[1];
            return;
        }
    }
    model.oldUnits.push(unitPair[0]);
    model.newUnits.push(unitPair[1]);
}

handlers.replaceQueue = function(unitPair){
    
    var oldUnit = unitPair[0];
    var newUnit = unitPair[1];
    var facKeys = _.keys(model.factoryMap);
    var facsToQueue = [];//will contain fac id's along with the amount of the unit queued
    var maxAmount = 0;
    _.forEach(facKeys,function(key){
        var amount = model.factoryMap[key][oldUnit]
        if(amount > maxAmount){maxAmount = amount}
        if(amount > 0){
            facsToQueue.push([parseInt(key),amount])
        }
    })
    model.replaceUnitQueue(facsToQueue,oldUnit,newUnit,maxAmount);
}

handlers.unitCompleted = function(payload) {
    if (!payload || !payload.unit_spec) {
        return;
    }
    model.clearConsumedTriggerQueue(payload.unit_spec);
};


var noSelect = []

// ===== Research Map Panel Message Handlers =====

/**
 * Check which factions are available to player based on research buildings they have built
 */
model.getAvailableFactions = function() {
    var factionResearchBuildings = {
        cabal: "/pa/units/medieval/structures/mage_tower/mage_tower_c.json",
        imperia: "/pa/units/medieval/structures/observatory/observatory.json",
        vesperin: "/pa/units/medieval/structures/mage_tower/mage_tower.json"
    };

    var armyPromise = model.allPlayerArmy(model.armyIndex());

    return armyPromise.then(function(result) {
        var availableFactions = [];
        var armyKeys = _.keys(result);

        console.log('[Research Map] Army keys:', armyKeys);

        _.forEach(factionResearchBuildings, function(buildingSpec, factionId) {
            if (result[buildingSpec] && result[buildingSpec].length > 0) {
                console.log('[Research Map] Found ' + factionId + ' building:', buildingSpec);
                availableFactions.push(factionId);
            }
        });

        console.log('[Research Map] Available factions detected:', availableFactions);

        // In sandbox or if no buildings found, default to showing all factions
        // This prevents the panel from being completely empty
        if (availableFactions.length === 0) {
            console.log('[Research Map] No faction buildings found, defaulting to all factions');
            availableFactions = ['cabal', 'imperia', 'vesperin'];
        }

        return availableFactions;
    });
};

/**
 * Handle incoming messages from the research map floatzone panel
 */
handlers.requestResearchMapState = function(payload) {
    console.log('[Research Map Handler] requestResearchMapState called');

    // Get both researched specs and available factions
    var researchPromise = model.getResearchedTriggers ? model.getResearchedTriggers() : Promise.resolve([]);
    var factionsPromise = model.getAvailableFactions();

    Promise.all([researchPromise, factionsPromise]).then(function(results) {
        var researched = results[0];
        var availableFactions = results[1];

        console.log('[Research Map Handler] Researched specs count:', researched ? researched.length : 0);
        console.log('[Research Map Handler] Researched specs:', researched);
        console.log('[Research Map Handler] Available factions:', availableFactions);

        var response = {
            researched: researched,
            availableFactions: availableFactions
        };

        if (api.panels && api.panels["LiveGame_FloatZone"]) {
            console.log('[Research Map Handler] Sending response to LiveGame_FloatZone');
            api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'updateResearchMapState', response);
        } else {
            console.warn('[Research Map Handler] LiveGame_FloatZone panel not found');
        }
    }).catch(function(err) {
        console.error('Error getting research state for map panel:', err);
    });
};
