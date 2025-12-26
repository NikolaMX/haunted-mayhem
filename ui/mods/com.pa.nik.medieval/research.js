/**
 * This file controls locking/unlocking units even when a scenario is not picked
 */


model.unitsToCommand = [["/pa/units/structure/control_node/portal/portal_charging.json", "altFireSelf"]]

//hardcoded locks, research packs can add to this by appending to it, units that have been locked will be removed, ensures units stay locked on resets

model.unitsToLock = [
    //Cabal Initial Factories
                    "/pa/units/medieval/structures/factory_infantry/factory_infantry_c.json",
                    "/pa/units/medieval/structures/factory_ranged/factory_ranged_c.json",   
                    "/pa/units/medieval/structures/factory_cav/factory_cav_c.json",

    //Vesperin Factories
                    "/pa/units/medieval/structures/factory_ranged/factory_ranged.json",   

    //Cabal Infantry
                    "/pa/units/medieval/infantry/sword_dox/sword_dox.json",           
                    "/pa/units/medieval/infantry/assassin/assassin.json",
                    "/pa/units/medieval/infantry/assassin/assassin_upg.json",
                    "/pa/units/medieval/infantry/axe_dox/axe_dox.json",
                    "/pa/units/medieval/infantry/axe_dox/axe_dox_upg.json",
                    "/pa/units/medieval/infantry/halbeard/halbeard.json",
    //Cabal Archers
                    "/pa/units/medieval/infantry/crossbow/crossbow.json",
                    "/pa/units/medieval/infantry/axe_thrower/axe_thrower.json",
                    "/pa/units/medieval/infantry/longbow/longbow_c_upg.json",
    //Cabal Cav
                    "/pa/units/medieval/cavalry/gorilla/gorilla.json",
                    "/pa/units/medieval/cavalry/gorilla_big/gorilla_big.json",
                    "/pa/units/medieval/cavalry/crossbow_bear/crossbow_bear.json",
                    "/pa/units/medieval/cavalry/burrow_bear/burrow_bear.json",


    //Cabal Advanced Buildings
                    "/pa/units/medieval/structures/arcmage_tower/arcmage_tower_c.json",
                    "/pa/units/medieval/structures/blood_shrine/blood_shrine.json",
                    "/pa/units/medieval/structures/spectral_shrine/spectral_shrine.json",
                    "/pa/units/medieval/structures/serpent_shrine/serpent_shrine.json",

    //Vesperin Spiders
                    "/pa/units/medieval/cavalry/big_spider/big_spider.json",
                    "/pa/units/medieval/cavalry/jumping_spider/jumping_spider.json",
                    "/pa/units/medieval/cavalry/big_spider/big_spider_upg.json",
                    "/pa/units/medieval/cavalry/jumping_spider/jumping_spider_upg.json",
                    "/pa/units/medieval/cavalry/spider/spider_upg.json",
                    
    //Vesperin Bugs 
                    "/pa/units/medieval/cavalry/roach/roach.json",
                    "/pa/units/medieval/cavalry/crab/crab.json",                   
                    "/pa/units/medieval/cavalry/scorpion/scorpion.json",
    //Vesperin SpiderWeb
                    "/pa/units/medieval/structures/web_mine/web_mine.json",


    //Spider Research
                    "/pa/units/medieval/research/vesperin/spiders/spiders_t2.json",
                    "/pa/units/medieval/research/vesperin/spiders/spiders_t3.json",
    //Bugs Research
                    "/pa/units/medieval/research/vesperin/bugs/bugs_t2.json",
                    "/pa/units/medieval/research/vesperin/bugs/bugs_t3.json",

    //Cabal Cav Research
                    "/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json",
                    "/pa/units/medieval/research/cabal/cavalry/burrow_bear.json",
            
    //Cabal Ranged Research
                    "/pa/units/medieval/research/cabal/ranged/ranged_t2.json",
                    "/pa/units/medieval/research/cabal/ranged/ranged_t3.json",

    //Cabal Stealth/Infantry Research
                    "/pa/units/medieval/research/cabal/infantry/assassin.json",
                    "/pa/units/medieval/research/cabal/infantry/halbeard.json",
                    

    //Vesperin Pumpkin Research
                    "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t2.json",
                    "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t3.json",
    //Vesperin Witch Research
                    "/pa/units/medieval/research/vesperin/pumpkin/witch_t1.json",
                    "/pa/units/medieval/research/vesperin/pumpkin/witch_t2.json",
                    "/pa/units/medieval/research/vesperin/pumpkin/witch_t3.json",                

    //Vesperin Pumpkins
                    "/pa/units/medieval/cavalry/munchkin/munchkin.json",
                    "/pa/units/medieval/cavalry/pumpkin/pumpkin.json",
                    "/pa/units/medieval/flying/witch/witch.json",
                    "/pa/units/medieval/cavalry/jack_o/jack_o.json",
                    "/pa/units/medieval/structures/witch_hut/witch_hut.json",
    //Cabal Dark Mages
                    "/pa/units/medieval/infantry/acolyte/acolyte.json",
                    "/pa/units/medieval/infantry/lich/lich.json",
                    "/pa/units/medieval/flying/creep/creep.json",
                    
    //Cabal Mages Research
                    "/pa/units/medieval/research/cabal/mages/mages_t2.json",
                    "/pa/units/medieval/research/cabal/mages/mages_t3.json",


    //Cabal Ghosts
                    "/pa/units/medieval/infantry/phantom/phantom.json",
                    "/pa/units/medieval/flying/flying_serpent/flying_serpent.json",
    //Cabal Ghosts Research
                    "/pa/units/medieval/research/cabal/ghosts/ghosts_t2.json",
                    "/pa/units/medieval/research/cabal/ghosts/ghosts_t3.json",

//---------------------------------------------VESPERIN-----------------------------------------------
    //Vesperin Ranged
                    "/pa/units/medieval/infantry/longbow/longbow.json",
                    "/pa/units/medieval/infantry/composite/composite.json",
 

//Vesperin Snakes
                    "/pa/units/medieval/cavalry/snake/snake.json",
                    "/pa/units/medieval/flying/flying_snake/flying_snake.json",
    //Vesperin Snakes Research
                    "/pa/units/medieval/research/vesperin/snakes/snakes_t2.json",
                    "/pa/units/medieval/research/vesperin/snakes/snakes_t3.json",

    //Vesperin Ranged Research
                    "/pa/units/medieval/research/vesperin/ranged/ranged_t2.json",
                    "/pa/units/medieval/research/vesperin/ranged/ranged_t3.json",

                    //---------------------------IMPERIA----------------------------

    //Imperia Factories
                    "/pa/units/medieval/structures/tavern/tavern.json",
                    "/pa/units/medieval/structures/factory_cav/factory_cav.json",
   

    //Imperia Lightning Mages
                    "/pa/units/medieval/structures/arcmage_tower/arcmage_tower.json",
                    "/pa/units/medieval/cavalry/bugsniper/bugsniper.json",
                    "/pa/units/medieval/infantry/arcanist/arcanist.json",
                    "/pa/units/medieval/structures/seeking_blast/seeking_blast.json",
                    "/pa/units/medieval/structures/attack_tower/attack_tower.json",
            //Lightning Research            
                            
                            "/pa/units/medieval/research/imperia/lightning/lightning_t2.json",
                            "/pa/units/medieval/research/imperia/lightning/lightning_t3.json",

    //Imperia Fog Mages
                    "/pa/units/medieval/structures/fogmage_tower/fogmage_tower.json",
                    "/pa/units/medieval/cavalry/wind_elemental/wind_elemental.json",
                    "/pa/units/medieval/flying/eagle/eagle.json",
             //Fog Research            
                            
                            "/pa/units/medieval/research/imperia/fog/fog_t2.json",
                            "/pa/units/medieval/research/imperia/fog/fog_t3.json",

 //Imperia Fire Mages
                    "/pa/units/medieval/structures/firemage_tower/firemage_tower.json",
                    "/pa/units/medieval/cavalry/fire_elemental/fire_elemental.json",
                    "/pa/units/medieval/flying/dragon/dragon.json",
             //Fire Research            
                            
                            "/pa/units/medieval/research/imperia/fire/fire_t2.json",
                            "/pa/units/medieval/research/imperia/fire/fire_t3.json",



    //Imperia Mercenaries
                    
                    "/pa/units/medieval/infantry/champion/champion.json",
                    "/pa/units/medieval/infantry/guardian/guardian.json",
                    "/pa/units/medieval/infantry/javelin/javelin.json",
                    "/pa/units/medieval/cavalry/goliath/goliath.json",
            //Merc Research
                            
                            "/pa/units/medieval/research/imperia/merc/merc_t2.json",
                            "/pa/units/medieval/research/imperia/merc/merc_t3.json",
                            "/pa/units/medieval/research/imperia/merc/merc_t4.json",


    //Imperia Infantry
                    "/pa/units/medieval/infantry/dual_sword/dual_sword.json",
                    "/pa/units/medieval/infantry/shield/shield.json",
                    "/pa/units/medieval/infantry/mace/mace.json",
                    "/pa/units/medieval/infantry/pike/pike.json",
            //Infantry Research
                            
                            "/pa/units/medieval/research/imperia/infantry/infantry_t2.json",
                            "/pa/units/medieval/research/imperia/infantry/infantry_t3.json",
    //Imperia Cav
                    "/pa/units/medieval/cavalry/light_cav/light_cav.json",
                    "/pa/units/medieval/cavalry/heavy_cav/heavy_cav.json",
                    "/pa/units/medieval/cavalry/heavy_cav/heavy_cav_upg.json",
                    "/pa/units/medieval/cavalry/recurve_cav/recurve_cav.json",
            //Cav Research
                            
                            "/pa/units/medieval/research/imperia/cavalry/cavalry_t2.json",
                            "/pa/units/medieval/research/imperia/cavalry/cavalry_t3.json",
    //Imperia 


     
                    ];

//tracks locked units
model.lockedUnits = [];

//hardcoded pairs, can be added to by research packs by appending, format is [[researchfactoryunit,[unitsToUnlock],[unitToLock],replaceLockedUnitsBool]

//with the addition of replacing units queued I think I will have it be default as the only edge case is research which I will just not track

//to combo replace/lock have locked units be on the end of the unitsToLock array and not match up numerically with the unitsToUnlock array

//issue when I want to unlock a unit + replace another so need to double up on the unlock

model.unlockPairs = [

    //alpha grunt
    [//trigger unit
    [],//units added
    [],//units replaced/locked
    true],//is a replace rather than just locks

     
     //Cabal Initial Factories
    ["/pa/units/medieval/structures/spawn8/spawn8.json",
    ["/pa/units/medieval/structures/factory_infantry/factory_infantry_c.json",
    "/pa/units/medieval/structures/factory_ranged/factory_ranged_c.json"
                ],
    [],
    false],

 //Cabal Axe
    ["/pa/units/medieval/research/cabal/infantry/axe.json",
    ["/pa/units/medieval/infantry/axe_dox/axe_dox.json",
    "/pa/units/medieval/research/cabal/infantry/assassin.json"
                ],
    ["/pa/units/medieval/research/cabal/infantry/axe.json"],
    false],
//Cabal Assassin
["/pa/units/medieval/research/cabal/infantry/assassin.json",
    ["/pa/units/medieval/infantry/assassin/assassin.json",
       "/pa/units/medieval/research/cabal/infantry/halbeard.json",
                ],
    ["/pa/units/medieval/research/cabal/infantry/assassin.json"],
    false],
//Cabal Halberd
["/pa/units/medieval/research/cabal/infantry/halbeard.json",
    ["/pa/units/medieval/infantry/halbeard/halbeard.json",
                ],
    ["/pa/units/medieval/research/cabal/infantry/halbeard.json"],
    false],



//Cabal Cav T1 
    ["/pa/units/medieval/research/cabal/cavalry/gorilla_t1.json",
    [
        "/pa/units/medieval/structures/factory_cav/factory_cav_c.json",
        "/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json"
                ],
    ["/pa/units/medieval/research/cabal/cavalry/gorilla_t1.json"],
    false],
//Cabal Cav T2
    ["/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json",
    ["/pa/units/medieval/cavalry/gorilla/gorilla.json",
        "/pa/units/medieval/research/cabal/cavalry/burrow_bear.json"
                ],
    ["/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json"],
    false],
//Cabal Cav T3
    ["/pa/units/medieval/research/cabal/cavalry/burrow_bear.json",
    ["/pa/units/medieval/cavalry/burrow_bear/burrow_bear.json"
                ],
    ["/pa/units/medieval/research/cabal/cavalry/burrow_bear.json"],
    false],


//Cabal Ranged T1
    ["/pa/units/medieval/research/cabal/ranged/ranged_t1.json",
    ["/pa/units/medieval/infantry/crossbow/crossbow.json",
        "/pa/units/medieval/research/cabal/ranged/ranged_t2.json"
                ],
    ["/pa/units/medieval/research/cabal/ranged/ranged_t1.json"],
    false],
//Cabal Ranged T2
    ["/pa/units/medieval/research/cabal/ranged/ranged_t2.json",
    ["/pa/units/medieval/infantry/axe_thrower/axe_thrower.json",
        "/pa/units/medieval/research/cabal/ranged/ranged_t3.json"
                ],
    ["/pa/units/medieval/research/cabal/ranged/ranged_t2.json"],
    false],
//Cabal Ranged T3
    ["/pa/units/medieval/research/cabal/ranged/ranged_t3.json",
    ["/pa/units/medieval/cavalry/crossbow_bear/crossbow_bear.json"
                ],
    ["/pa/units/medieval/research/cabal/ranged/ranged_t3.json"],
    false],


//Vesperin SPIDERS
    //Cabal Spiders T1
    ["/pa/units/medieval/research/vesperin/spiders/spiders_t1.json",
    ["/pa/units/medieval/cavalry/jumping_spider/jumping_spider.json",
    "/pa/units/medieval/research/vesperin/spiders/spiders_t2.json"
                ],
    ["/pa/units/medieval/research/vesperin/spiders/spiders_t1.json"],
    false],
     //Cabal Spiders T2
    ["/pa/units/medieval/research/vesperin/spiders/spiders_t2.json",
    [        
        "/pa/units/medieval/structures/web_mine/web_mine.json",
        "/pa/units/medieval/research/vesperin/spiders/spiders_t3.json"    
                ],
    ["/pa/units/medieval/research/vesperin/spiders/spiders_t2.json"],
    false],
     //Cabal Spiders T3
    ["/pa/units/medieval/research/vesperin/spiders/spiders_t3.json",
    [   "/pa/units/medieval/cavalry/big_spider/big_spider.json",   
                ],
    ["/pa/units/medieval/research/vesperin/spiders/spiders_t3.json"],
    false],


//Cabal Bugs
    //Cabal Bugs T1
    ["/pa/units/medieval/research/vesperin/bugs/bugs_t1.json",
    ["/pa/units/medieval/cavalry/roach/roach.json",
    "/pa/units/medieval/research/vesperin/bugs/bugs_t2.json"
                ],
    ["/pa/units/medieval/research/vesperin/bugs/bugs_t1.json"],
    false],
     //Cabal Bugs T2
    ["/pa/units/medieval/research/vesperin/bugs/bugs_t2.json",
    [   "/pa/units/medieval/cavalry/crab/crab.json",     
        "/pa/units/medieval/research/vesperin/bugs/bugs_t3.json"    
                ],
    ["/pa/units/medieval/research/vesperin/bugs/bugs_t2.json"],
    false],
     //Cabal Spiders T3
    ["/pa/units/medieval/research/vesperin/bugs/bugs_t3.json",
    [   "/pa/units/medieval/cavalry/scorpion/scorpion.json"   
                ],
    ["/pa/units/medieval/research/vesperin/bugs/bugs_t3.json"],
    false],

//Cabal MAGES
    //Acolyte + Necro
    ["/pa/units/medieval/research/cabal/mages/mages_t1.json",
    ["/pa/units/medieval/infantry/acolyte/acolyte.json",
        "/pa/units/medieval/structures/arcmage_tower/arcmage_tower_c.json",
       "/pa/units/medieval/research/cabal/mages/mages_t2.json"    
                ],
    ["/pa/units/medieval/research/cabal/mages/mages_t1.json"],
    false],
    //Arcmage
    ["/pa/units/medieval/research/cabal/mages/mages_t2.json",
    ["/pa/units/medieval/infantry/lich/lich.json",
       "/pa/units/medieval/research/cabal/mages/mages_t3.json"    
                ],
    ["/pa/units/medieval/research/cabal/mages/mages_t2.json"],
    false],
    //Omen
    ["/pa/units/medieval/research/cabal/mages/mages_t3.json",
    ["/pa/units/medieval/flying/creep/creep.json"  
                ],
    ["/pa/units/medieval/research/cabal/mages/mages_t3.json"],
    false],




    
//Ghosts
    //Spectral Shrine T1 - Ghost & Ghost Mage
    ["/pa/units/medieval/research/cabal/ghosts/ghosts_t1.json",
    ["/pa/units/medieval/structures/spectral_shrine/spectral_shrine.json",
        "/pa/units/medieval/research/cabal/ghosts/ghosts_t2.json"
                ],
    ["/pa/units/medieval/research/cabal/ghosts/ghosts_t1.json"],
    false],
    //Spectral Shrine T2 - Phantom
    ["/pa/units/medieval/research/cabal/ghosts/ghosts_t2.json",
    ["/pa/units/medieval/infantry/phantom/phantom.json",
        "/pa/units/medieval/research/cabal/ghosts/ghosts_t3.json"
                ],
    ["/pa/units/medieval/research/cabal/ghosts/ghosts_t2.json"],
    false],
    //Spectral Shrine T3 - Spectral Wyrm
    ["/pa/units/medieval/research/cabal/ghosts/ghosts_t3.json",
    ["/pa/units/medieval/flying/flying_serpent/flying_serpent.json" 
                ],
    ["/pa/units/medieval/research/cabal/ghosts/ghosts_t3.json"],
    false],

//=============UPGRADES==============

//Cabal

//Infantry
     //Swordsman -> Sword Dox Upgrade
    ["/pa/units/medieval/upgrades/cabal/infantry/sword_dox.json",
    ["/pa/units/medieval/infantry/sword_dox/sword_dox.json"   
                ],
    ["/pa/units/medieval/infantry/sword_light/sword_light_c.json", "/pa/units/medieval/upgrades/cabal/infantry/sword_dox.json"],
    true],

    //Assassin speed upgrade
     ["/pa/units/medieval/upgrades/cabal/infantry/assassin.json",
    ["/pa/units/medieval/infantry/assassin/assassin_upg.json"  
                ],
    ["/pa/units/medieval/infantry/assassin/assassin.json", "/pa/units/medieval/upgrades/cabal/infantry/assassin.json"],
    true],

    //Assassin speed upgrade
     ["/pa/units/medieval/upgrades/cabal/infantry/assassin.json",
    ["/pa/units/medieval/infantry/assassin/assassin_upg.json"  
                ],
    ["/pa/units/medieval/infantry/assassin/assassin.json", "/pa/units/medieval/upgrades/cabal/infantry/assassin.json"],
    true],
    
    //Axe respawn upgrade
     ["/pa/units/medieval/upgrades/cabal/infantry/axe.json",
    ["/pa/units/medieval/infantry/axe_dox/axe_dox_upg.json"
                ],
    ["/pa/units/medieval/infantry/axe_dox/axe_dox.json", "/pa/units/medieval/upgrades/cabal/infantry/axe.json"],
    true],
    
//Longbow fire arrows
     ["/pa/units/medieval/upgrades/cabal/infantry/longbow.json",
    ["/pa/units/medieval/infantry/longbow/longbow_c_upg.json"  
                ],
    ["/pa/units/medieval/infantry/longbow/longbow_c.json", "/pa/units/medieval/upgrades/cabal/infantry/longbow.json"],
    true],

//Massive Vrag
     ["/pa/units/medieval/upgrades/cabal/cavalry/gorilla_big.json",
    ["/pa/units/medieval/cavalry/gorilla_big/gorilla_big.json"  
                ],
    ["/pa/units/medieval/cavalry/gorilla/gorilla.json", "/pa/units/medieval/upgrades/cabal/cavalry/gorilla_big.json"],
    true],


//--------------------------------IMPERIA--------------------------------
//--------------------------------IMPERIA--------------------------------

//Infantry

//Shield T1
 ["/pa/units/medieval/research/imperia/infantry/infantry_t1.json",
    ["/pa/units/medieval/infantry/shield/shield.json",
    "/pa/units/medieval/research/imperia/infantry/infantry_t2.json" 
                ],
    ["/pa/units/medieval/research/imperia/infantry/infantry_t1.json"],
    false],  

//Mace T2
    ["/pa/units/medieval/research/imperia/infantry/infantry_t2.json",
    ["/pa/units/medieval/infantry/mace/mace.json",
    "/pa/units/medieval/research/imperia/infantry/infantry_t3.json" 
                ],
    ["/pa/units/medieval/research/imperia/infantry/infantry_t2.json"],
    false],  

//Pike T3    
    ["/pa/units/medieval/research/imperia/infantry/infantry_t3.json",
    ["/pa/units/medieval/infantry/pike/pike.json" 
                ],
    ["/pa/units/medieval/research/imperia/infantry/infantry_t3.json"],
    false],  
               
    
    //Cavalry

//Light Cav
 ["/pa/units/medieval/research/imperia/cavalry/cavalry_t1.json",
    [   "/pa/units/medieval/structures/factory_cav/factory_cav.json",
        "/pa/units/medieval/cavalry/light_cav/light_cav.json",
    "/pa/units/medieval/research/imperia/cavalry/cavalry_t2.json" 
                ],
    ["/pa/units/medieval/research/imperia/cavalry/cavalry_t1.json"],
    false],  
//Recurve Cav                   
["/pa/units/medieval/research/imperia/cavalry/cavalry_t2.json",
    ["/pa/units/medieval/cavalry/recurve_cav/recurve_cav.json",
    "/pa/units/medieval/research/imperia/cavalry/cavalry_t3.json" 
                ],
    ["/pa/units/medieval/research/imperia/cavalry/cavalry_t2.json"],
    false],
//Heavy Cav                   
["/pa/units/medieval/research/imperia/cavalry/cavalry_t3.json",
    ["/pa/units/medieval/cavalry/heavy_cav/heavy_cav.json" 
                ],
    ["/pa/units/medieval/research/imperia/cavalry/cavalry_t3.json"],
    false],  

    //Mercs

//Zweihander
["/pa/units/medieval/research/imperia/merc/merc_t1.json",
    ["/pa/units/medieval/structures/tavern/tavern.json",
         "/pa/units/medieval/research/imperia/merc/merc_t2.json"
                ],
    ["/pa/units/medieval/research/imperia/merc/merc_t1.json"],
    false],  
//Javelin Thrower
["/pa/units/medieval/research/imperia/merc/merc_t2.json",
    ["/pa/units/medieval/infantry/javelin/javelin.json",
         "/pa/units/medieval/research/imperia/merc/merc_t3.json"
                ],
    ["/pa/units/medieval/research/imperia/merc/merc_t2.json"],
    false],  
//Javelin Thrower
["/pa/units/medieval/research/imperia/merc/merc_t3.json",
    ["/pa/units/medieval/infantry/guardian/guardian.json",
         "/pa/units/medieval/research/imperia/merc/merc_t4.json"
                ],
    ["/pa/units/medieval/research/imperia/merc/merc_t3.json"],
    false],  
//Goliath
["/pa/units/medieval/research/imperia/merc/merc_t4.json",
    ["/pa/units/medieval/cavalry/goliath/goliath.json"
                ],
    ["/pa/units/medieval/research/imperia/merc/merc_t4.json"],
    false],  

    //Wind Mage

//Fogmage
["/pa/units/medieval/research/imperia/fog/fog_t1.json",
    ["/pa/units/medieval/structures/fogmage_tower/fogmage_tower.json",
         "/pa/units/medieval/research/imperia/fog/fog_t2.json"
                ],
    ["/pa/units/medieval/research/imperia/fog/fog_t1.json"],
    false],  
//Wind Elemental
["/pa/units/medieval/research/imperia/fog/fog_t2.json",
    ["/pa/units/medieval/cavalry/wind_elemental/wind_elemental.json",
         "/pa/units/medieval/research/imperia/fog/fog_t3.json"
                ],
    ["/pa/units/medieval/research/imperia/fog/fog_t2.json"],
    false],  
//Eagle
["/pa/units/medieval/research/imperia/fog/fog_t3.json",
    ["/pa/units/medieval/flying/eagle/eagle.json"
                ],
    ["/pa/units/medieval/research/imperia/fog/fog_t3.json"],
    false],


    //Fire Mage

//Firemage
["/pa/units/medieval/research/imperia/fire/fire_t1.json",
    ["/pa/units/medieval/structures/firemage_tower/firemage_tower.json",
         "/pa/units/medieval/research/imperia/fire/fire_t2.json"
                ],
    ["/pa/units/medieval/research/imperia/fire/fire_t1.json"],
    false],  
//Fire Elemental
["/pa/units/medieval/research/imperia/fire/fire_t2.json",
    ["/pa/units/medieval/cavalry/fire_elemental/fire_elemental.json",
         "/pa/units/medieval/research/imperia/fire/fire_t3.json"
                ],
    ["/pa/units/medieval/research/imperia/fire/fire_t2.json"],
    false],
//Dragon
["/pa/units/medieval/research/imperia/fire/fire_t3.json",
    ["/pa/units/medieval/flying/dragon/dragon.json"
                ],
    ["/pa/units/medieval/research/imperia/fire/fire_t3.json"],
    false],  
  

    //Lightning Mage

//Lightning
["/pa/units/medieval/research/imperia/lightning/lightning_t1.json",
    ["/pa/units/medieval/structures/arcmage_tower/arcmage_tower.json",
        "/pa/units/medieval/structures/attack_tower/attack_tower.json",
         "/pa/units/medieval/research/imperia/lightning/lightning_t2.json"
                ],
    ["/pa/units/medieval/research/imperia/lightning/lightning_t1.json"],
    false],  
//Lightning Elemental
["/pa/units/medieval/research/imperia/lightning/lightning_t2.json",
    ["/pa/units/medieval/cavalry/bugsniper/bugsniper.json",
         "/pa/units/medieval/research/imperia/lightning/lightning_t3.json"
                ],
    ["/pa/units/medieval/research/imperia/lightning/lightning_t2.json"],
    false],  
//Arcanist
["/pa/units/medieval/research/imperia/lightning/lightning_t3.json",
    ["/pa/units/medieval/infantry/arcanist/arcanist.json",
        "/pa/units/medieval/structures/seeking_blast/seeking_blast.json"
                ],
    ["/pa/units/medieval/research/imperia/lightning/lightning_t3.json"],
    false],  


//=============UPGRADES==============

//Imperia

//Infantry
     //Swordsman -> Dual Sword Upgrade
    ["/pa/units/medieval/upgrades/imperia/infantry/dual_sword.json",
    ["/pa/units/medieval/infantry/dual_sword/dual_sword.json"   
                ],
    ["/pa/units/medieval/infantry/sword_light/sword_light.json", "/pa/units/medieval/upgrades/imperia/infantry/dual_sword.json"],
    true],
         //Zweihander -> Champion Upgrade
    ["/pa/units/medieval/upgrades/imperia/infantry/champion.json",
    ["/pa/units/medieval/infantry/champion/champion.json"   
                ],
    ["/pa/units/medieval/infantry/zweihander/zweihander.json", "/pa/units/medieval/upgrades/imperia/infantry/champion.json"],
    true],

    
//Cavalry
     //Cavalry Charge
    ["/pa/units/medieval/upgrades/imperia/cavalry/heavy_cav.json",
    ["/pa/units/medieval/cavalry/heavy_cav/heavy_cav_upg.json"
                ],
    ["/pa/units/medieval/cavalry/heavy_cav/heavy_cav.json", "/pa/units/medieval/upgrades/imperia/cavalry/heavy_cav.json"],
    true],

//--------------------------------VESPERIN--------------------------------
//--------------------------------VESPERIN--------------------------------


//Pumpkins
    //Pumpkin Shrine T1
    ["/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t1.json",
    ["/pa/units/medieval/structures/blood_shrine/blood_shrine.json",
        "/pa/units/medieval/research/vesperin/pumpkin/witch_t1.json",
        "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t2.json"
                ],
    ["/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t1.json"],
    false],
    //Munchkin T2
    ["/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t2.json",
    ["/pa/units/medieval/cavalry/munchkin/munchkin.json",
        "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t3.json"
                ],
    ["/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t2.json"],
    false],
    //Pumpkin Guardian T3
    ["/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t3.json",
    ["/pa/units/medieval/cavalry/pumpkin/pumpkin.json" 
                ],
    ["/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t3.json"],
    false],


//Witches
    //Witch Unlock T1
    ["/pa/units/medieval/research/vesperin/pumpkin/witch_t1.json",
    [   "/pa/units/medieval/flying/witch/witch.json",
        "/pa/units/medieval/research/vesperin/pumpkin/witch_t2.json"
                ],
    ["/pa/units/medieval/research/vesperin/pumpkin/witch_t1.json"],
    false],
    
    //Jack_o Unlock T2
    ["/pa/units/medieval/research/vesperin/pumpkin/witch_t2.json",
    ["/pa/units/medieval/cavalry/jack_o/jack_o.json",
    "/pa/units/medieval/research/vesperin/pumpkin/witch_t3.json"
                ],
    ["/pa/units/medieval/research/vesperin/pumpkin/witch_t2.json"],
    false],

    //Witch Hut Unlock T3
    ["/pa/units/medieval/research/vesperin/pumpkin/witch_t3.json",
    ["/pa/units/medieval/structures/witch_hut/witch_hut.json" 
                ],
    ["/pa/units/medieval/research/vesperin/pumpkin/witch_t3.json"],
    false],




//Snakes

//Serpent Shrine
    ["/pa/units/medieval/research/vesperin/snakes/snakes_t1.json",
    ["/pa/units/medieval/structures/serpent_shrine/serpent_shrine.json",
         "/pa/units/medieval/research/vesperin/snakes/snakes_t2.json"
                ],
    ["/pa/units/medieval/research/vesperin/snakes/snakes_t1.json"],
    false],  
//Lightning Elemental
    ["/pa/units/medieval/research/vesperin/snakes/snakes_t2.json",
    ["/pa/units/medieval/cavalry/snake/snake.json",
         "/pa/units/medieval/research/vesperin/snakes/snakes_t3.json"
                ],
    ["/pa/units/medieval/research/vesperin/snakes/snakes_t2.json"],
    false],  
//Arcanist
    ["/pa/units/medieval/research/vesperin/snakes/snakes_t3.json",
    ["/pa/units/medieval/flying/flying_snake/flying_snake.json"
                ],
    ["/pa/units/medieval/research/vesperin/snakes/snakes_t3.json"],
    false],  

//Ranged
    ["/pa/units/medieval/research/vesperin/ranged/ranged_t1.json",
    [
        "/pa/units/medieval/structures/factory_ranged/factory_ranged.json",
        "/pa/units/medieval/research/vesperin/ranged/ranged_t2.json"
                ],
    ["/pa/units/medieval/research/vesperin/ranged/ranged_t1.json"],
    false],  


    ["/pa/units/medieval/research/vesperin/ranged/ranged_t2.json",
    [
        "/pa/units/medieval/infantry/longbow/longbow.json",
        "/pa/units/medieval/research/vesperin/ranged/ranged_t3.json"
                ],
    ["/pa/units/medieval/research/vesperin/ranged/ranged_t2.json"],
    false],  

["/pa/units/medieval/research/vesperin/ranged/ranged_t3.json",
    [
        "/pa/units/medieval/infantry/composite/composite.json"
                ],
    ["/pa/units/medieval/research/vesperin/ranged/ranged_t3.json"],
    false],  


//=============UPGRADES==============

//Vesperin

//Spiders




     //Consume for Spider and Jumping Spider
    ["/pa/units/medieval/upgrades/vesperin/spiders/consume.json",
    ["/pa/units/medieval/cavalry/spider/spider_upg.json",
        "/pa/units/medieval/cavalry/jumping_spider/jumping_spider_upg.json"
                ],
    ["/pa/units/medieval/cavalry/spider/spider.json",
        "/pa/units/medieval/cavalry/jumping_spider/jumping_spider.json",
        "/pa/units/medieval/upgrades/vesperin/spiders/consume.json"
    ],
    true],

    //Web Mother Egglayer
     ["/pa/units/medieval/upgrades/vesperin/spiders/nesting.json",
    ["/pa/units/medieval/cavalry/big_spider/big_spider_upg.json"  
                ],
    ["/pa/units/medieval/cavalry/big_spider/big_spider.json", "/pa/units/medieval/upgrades/vesperin/spiders/nesting.json"],
    true],



        


]

//for circular research the older ones need to be deleted if a newer research is done.
model.deleteOldPairs = [

]

model.reLockUnits = function(){
    model.lockedUnits.forEach(function(unit){
       
        api.Panel.message("build_bar", 'lockUnit',unit)
      

    })
}
var hasPrinted = false;

model.unitCommand = function(unitId, unitState, commandType){
    if(hasPrinted == false){console.log(unitId,unitState,commandType);hasPrinted = true}
    if(commandType == "altFireSelf"){
        order = {
            units: [unitId],
            command: 'fire_secondary_weapon',
            location: {      
                planet: unitState.planet,
                multi_pos: [unitState.pos,unitState.pos]
            },                       
            queue: true
        }
        api.getWorldView(0).sendOrder(order);
    }
    else{return}
}

researchLoop = function(){
   
    model.unitsToLock.forEach(function(unit){
       
        api.Panel.message("build_bar", 'lockUnit',unit)
        model.lockedUnits.push(unit)

    })
    model.unitsToLock = []
    
    if(model.lockedUnits.length > 0){
       
        var armyPromise = model.allPlayerArmy(model.armyIndex())
        
        armyPromise.then(function(result){
            
            var armyKeys = _.keys(result)
            model.unitsToCommand.forEach(function(unitCommandArray){
                var unitSpec = unitCommandArray[0]
                var unitCommand = unitCommandArray[1]
                var unitDataPromise = api.getWorldView(0).getUnitState(result[unitSpec])
                unitDataPromise.then(function(ready){
     
                    for(var i = 0; i<ready.length;i++){
                        model.unitCommand(result[unitSpec][i],ready[i],unitCommand)
                    }

                })
            })
            model.unlockPairs.forEach(function(pair){
              
                
                if(_.contains(model.lockedUnits,pair[1][0])){//if the pair is not already unlocked
                
                 
                    if(_.contains(armyKeys,pair[0])){//unlock unit exists so unit should be unlocked
                      
                        var armyDataPromise = api.getWorldView(0).getUnitState(result[pair[0]])
                        armyDataPromise.then(function(result){
                       
                        if(result[0].built_frac == undefined){
                      
                            // *** NEW: Send message to research_live_game to handle cancellation for this specific research unit ***
                            api.Panel.message("research_live_game", 'unitCompleted', {
                                unit_spec: pair[0],
                                factory_id: result[0].id // Assuming the first unit's ID is sufficient to identify the factory
                            });
                            // *** END NEW ***

                        //if the unlock should actually be a replace
                        if(pair[3] !== true){
                        pair[1].forEach(function(unit){
                            console.log("unlocking ",unit) // Corrected logging
                            api.Panel.message("build_bar", 'unlockUnit',unit)
                            api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                     
                        })
                        if(pair[2] !== undefined){
                            pair[2].forEach(function(unit){
                                console.log("locking ",unit) // Corrected logging
                                api.Panel.message("build_bar", 'lockUnit',unit)
                                model.lockedUnits.push(unit)
                            })

                        }}
                        else{
                            console.log("replacing units")
                            for(var i = 0; i< pair[2].length;i++){
                                if(pair[1][i] == pair[2][i] && pair[1][i] !== undefined){//needed for more unlocks combined with replace
                                    api.Panel.message("build_bar", 'unlockUnit',pair[1][i])
                                    api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                                }
                                else if(pair[1][i] !== undefined){//matching replace
                                 
                                    api.Panel.message("build_bar", 'replaceUnit',[[pair[2][i]],[pair[1][i]], pair[3]])
                                    api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                                }
                                else{//lock the pair 2 as it has no match
                                   
                                    //replace that sets the new unit to undefined as a way to cancel its build order
                                    api.Panel.message("build_bar", 'replaceUnit',[[pair[2][i]],[undefined], pair[3]])
                                    api.Panel.message("build_bar", 'lockUnit',pair[2][i])
                                    api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                                }
                            }
                        }



                        for(var i = 0;i<model.lockedUnits.length;i++){
                           // console.log(lockedUnits[i],pair[1])
                           pair[1].forEach(function(unit){
                            if(model.lockedUnits[i] == unit){
                                model.lockedUnits.splice(i,1)
                            }
                        })
                        
                     
                        
                           
                        }

                        }
                        })
                        
                    }
                    
                }
        
            })

        })
        
    }
    

    _.delay(researchLoop,1000)

}



_.delay(researchLoop,1000)


var world = api.getWorldView(0)

// the below is yoinked from scenarios, it is not really needed to be this complex for research


var unitJsons = model.unitSpecs//I think this has a list of unit keys that then have types

model.allPlayerArmy = function(playerId,unitType, stateFlag,unitTypeValue){
    var planets = model.planetListState()
    var promiseArray = [];
    for(planet in planets.planets){
        planet = planets.planets[planet]
        if(planet.id !== undefined || planet.id === 0){
            var chosenPlanet = planet.index;
        }
        else{continue}

        promiseArray.push(model.playerArmy(playerId, chosenPlanet,unitType, stateFlag,unitTypeValue))
    }
    var allPlanetArmyPromise = Promise.all(promiseArray)
    return allPlanetArmyPromise.then(function(result){
        var finalUnits = {};
        for(army in result){// for each player planet
            var armyKeys = _.keys(result[army])
           

            for(unit in armyKeys){//for each unit on a planet
              
                if(!(armyKeys[unit] in finalUnits)){finalUnits[armyKeys[unit]] = []};//if 
               
                
                for(i in result[army][armyKeys[unit]]){
                 
                    finalUnits[armyKeys[unit]].push(result[army][armyKeys[unit]][i])
                }
               
            
        }
    }
      
        return finalUnits;

    })

}
model.playerArmy = function(playerId, planetId,unitType, stateFlag,unitTypeValue){

    if(unitJsons == undefined){unitJsons = model.unitSpecs}
    var one = !_.isArray(unitType);
    if (one){
        unitType = [unitType];

    }
    var one = !_.isArray(unitTypeValue);
    if (one){
        unitTypeValue = [unitTypeValue];

    }

    var promise = new Promise(function(resolve,reject){

        if(world){

            if(stateFlag !== true){
                
            
                
                var promise2 = world.getArmyUnits(playerId,planetId).then(function (result){
                   
                   
                    if(unitType.length>0 && unitType[0] !== "" && unitType[0] !== undefined){
                 
                        var finalResult = {};
                        
                        for(var i = 0;i<unitType.length;i++){

                            finalResult[unitType[i]] = result[unitType[i]]

                        }
                       
                        result =  finalResult;
                    }
                
                    if(unitTypeValue.length>0 && unitTypeValue[0] !== "" && unitTypeValue[0] !== undefined){
                      
         
                        var finalResult = {};
                        var jsonKeys = _.keys(unitJsons)
                        for(var i = 0;i<jsonKeys.length;i++){
                            var matchedValue = 0;
                            for(var j = 0;j<unitTypeValue.length;j++){
                                
                                if(_.contains(unitJsons[jsonKeys[i]].types,unitTypeValue[j])){//check if each unit json contains every type in the value array
                                  
                                    //if(_.contains(unitJsons[jsonKeys[i]].types,"UNITTYPE_NoBuild")){continue}
                                    matchedValue++;
                             
                                }
                            }
                            
                           
                            if(matchedValue == unitTypeValue.length && result[jsonKeys[i]] !== undefined){finalResult[jsonKeys[i]] = result[jsonKeys[i]]}
                        }
                     
                        result = finalResult;

                    }
               

                    return result
                
                
                
                
                })
           
                resolve(promise2)
            
            
            
            }//TODO add unit filter here
    
            else{
         
                    var promise2 = world.getArmyUnits(playerId,planetId).then(function(result){ 
    
                    var unitArray = [];
                    
                    if(unitType.length>0 && unitType[0] !== "" && unitType[0] !== undefined){
                        
                        var finalResult = {};
                        
                        for(var i = 0;i<unitType.length;i++){

                            finalResult[unitType[i]] = result[unitType[i]]

                        }
                      
                        result =  finalResult;
                    }
                 
                    if(unitTypeValue.length>0 && unitTypeValue[0] !== "" && unitTypeValue[0] !== undefined){
         
                        var finalResult = {};
                        var jsonKeys = _.keys(unitJsons)
                        for(var i = 0;i<jsonKeys.length;i++){
                            var matchedValue = 0;
                            for(var j = 0;j<unitTypeValue.length;j++){
                                
                                if(_.contains(unitJsons[jsonKeys[i]].types,unitTypeValue[j])){//check if each unit json contains every type in the value array
                                    matchedValue++;
                             
                                }
                            }
                            if(matchedValue == unitTypeValue.length && result[jsonKeys[i]] !== undefined){finalResult[jsonKeys[i]] = result[jsonKeys[i]]}
                        }
                        result = finalResult;

                    }
                    
                    armyKeys = _.keys(result)
                    for(var i = 0;i<armyKeys.length;i++){
                        unitArray.push(result[armyKeys[i]])
                    }
                    unitArray = _.flatten(unitArray)
                   
                    return world.getUnitState(unitArray).then(function (ready) {
                        var unitData = this.result;
                        var one = !_.isArray(unitData);
                        if (one){
                                unitData = [unitData];
    
                        }
              
                        
                      return unitData;
                    }
                    
                   
                    )
                })
                
            }
          
            promise2.then(function(result){resolve(result)})
    
        }

    })

    promise.then(function(result){return result})
    
    return promise;
   


}



handlers.buildRestart = function(payload){//build ui has restarted so tell it what to lock again
    model.reLockUnits();
}