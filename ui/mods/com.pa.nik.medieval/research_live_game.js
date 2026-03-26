//this keeps track of replaced units and allows hotkeys to work on them

//not sure exactly how multiple replacements would work, I will need to set it to replace the new unit value without touching the old

model.oldUnits = []//units being replaced, this is checked before building anything

model.newUnits = []//replaces the id if an old unit is hotkeyed

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
    var selectedIdArray = [];
    if(model.selection()){

        selectedUnitArray = model.selection().spec_ids;
        var unitKeys = _.keys(selectedUnitArray);
        for(key in unitKeys){
           
            selectedIdArray = selectedIdArray.concat(selectedIdArray, selectedUnitArray[unitKeys[key]]);

        }
    }
    var facIds = [];
    _.forEach(facsToReQueue, function(fac){facIds.push(fac[0])})
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
       if(newUnit !== null){
       api.unit.build(newUnit, 1, false);}
    }
    api.select.empty();
    api.select.unitsById(selectedIdArray);
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

// Handler for when a unit completes building.
// This is where we'll cancel any remaining queues for a completed research unit.
handlers.unitCompleted = function(payload) {
    var completedUnitSpec = payload.unit_spec;

    console.log("Research unit completed, attempting to clear its queue:", completedUnitSpec);

    var factoriesWithUnitQueued = [];

    // First, identify all factories that currently have this unit in their internal map
    // We iterate through a copy of keys, as we might modify the map
    var facKeys = _.keys(model.factoryMap);
    _.forEach(facKeys, function(facIdStr) {
        var facId = parseInt(facIdStr); // Ensure ID is integer
        if (model.factoryMap[facId] && model.factoryMap[facId][completedUnitSpec] > 0) {
            factoriesWithUnitQueued.push(facId);
        }
    });

    if (factoriesWithUnitQueued.length > 0) {
        console.log("Found factories with completed research unit in queue:", factoriesWithUnitQueued);

        // Save current selection to restore it later
        var originalSelection = null;
        if (api.selection.has()) {
            originalSelection = api.selection.get();
        }

        // Select the factories that have the unit in queue
        api.select.unitsById(factoriesWithUnitQueued);

        // Cancel all instances of this research unit in the queue.
        // Using '100' is a common way to cancel "all" queued items,
        // and 'false' for urgent means it's a normal cancellation.
        api.unit.cancelBuild(completedUnitSpec, 100, false);
        console.log("Issued cancelBuild for", completedUnitSpec, "in factories:", factoriesWithUnitQueued);
        
        // Restore original selection
        if (originalSelection) {
            api.select.empty(); // Clear current selection before restoring
            api.select.set(originalSelection);
        } else {
            api.select.empty(); // Deselect the factories if nothing was originally selected
        }

        // After issuing the cancel, update our internal model.factoryMap
        // to reflect that these units are no longer considered queued.
        _.forEach(factoriesWithUnitQueued, function(facId) {
            if (model.factoryMap[facId]) {
                delete model.factoryMap[facId][completedUnitSpec];
                console.log("Updated model.factoryMap for factory", facId, "removing", completedUnitSpec);
            }
        });
        
        // It might be beneficial to explicitly trigger a UI refresh if the build bar doesn't update,
        // though `api.unit.cancelBuild` usually handles this.
        // api.Panel.message(api.Panel.parentId, 'refreshBuildBar'); // This is a hypothetical message, might not exist or be needed.
    } else {
        console.log("No factories found with", completedUnitSpec, "in queue.");
    }
};


var noSelect = []