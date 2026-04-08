/**
 * Research Map Data Schema
 * Defines the stable layout structure for the research map panel.
 * Decoupled from gameplay state (unlockPairs) to avoid coupling to internal quirks.
 */

window.researchMapSchema = {
    factions: [
        {
            id: "cabal",
            name: "CABAL",
            color: "#c44a4a",
            branches: [
                {
                    id: "cabal_infantry",
                    name: "Infantry",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/cabal/infantry/axe.json",
                            label: "Axe",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/infantry/assassin.json",
                            label: "Assassin",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/infantry/halbeard.json",
                            label: "Halbeard",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "cabal_ranged",
                    name: "Ranged",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/cabal/ranged/ranged_t1.json",
                            label: "Crossbow",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/ranged/ranged_t2.json",
                            label: "Axe Thrower",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/ranged/ranged_t3.json",
                            label: "Bear Ballista",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "cabal_cavalry",
                    name: "Cavalry",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/cabal/cavalry/gorilla_t1.json",
                            label: "Hound",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/cavalry/gorilla_t2.json",
                            label: "Vrag",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/cavalry/burrow_bear.json",
                            label: "Burrow Bear",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "cabal_mages",
                    name: "Mages",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/cabal/mages/mages_t1.json",
                            label: "Darkmage",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/mages/mages_t2.json",
                            label: "Lich",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/mages/mages_t3.json",
                            label: "Creep",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "cabal_ghosts",
                    name: "Ghosts",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/cabal/ghosts/ghosts_t1.json",
                            label: "Ghosts",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/ghosts/ghosts_t2.json",
                            label: "Phantom",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/cabal/ghosts/ghosts_t3.json",
                            label: "Wyrm",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "cabal_upgrades",
                    name: "Upgrades",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/upgrades/cabal/infantry/sword_dox.json",
                            label: "Sword",
                            type: "upgrade",
                            tier: "UPG"
                        },
                        {
                            spec_id: "/pa/units/medieval/upgrades/cabal/infantry/assassin.json",
                            label: "Assassin",
                            type: "upgrade",
                            tier: "UPG"
                        },
                        {
                            spec_id: "/pa/units/medieval/upgrades/cabal/infantry/axe.json",
                            label: "Axe",
                            type: "upgrade",
                            tier: "UPG"
                        },
                        {
                            spec_id: "/pa/units/medieval/upgrades/cabal/infantry/longbow.json",
                            label: "Longbow",
                            type: "upgrade",
                            tier: "UPG"
                        },
                        {
                            spec_id: "/pa/units/medieval/upgrades/cabal/cavalry/gorilla_big.json",
                            label: "Vrag Upg",
                            type: "upgrade",
                            tier: "UPG"
                        }
                    ]
                }
            ]
        },
        {
            id: "imperia",
            name: "IMPERIA",
            color: "#d7ac47",
            branches: [
                {
                    id: "imperia_infantry",
                    name: "Infantry",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/imperia/infantry/infantry_t1.json",
                            label: "Shield",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/infantry/infantry_t2.json",
                            label: "Mace",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/infantry/infantry_t3.json",
                            label: "Pike",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "imperia_cavalry",
                    name: "Cavalry",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/imperia/cavalry/cavalry_t1.json",
                            label: "Light Cav",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/cavalry/cavalry_t2.json",
                            label: "Mounted Archer",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/cavalry/cavalry_t3.json",
                            label: "Heavy Cav",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "imperia_merc",
                    name: "Mercenaries",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/imperia/merc/merc_t1.json",
                            label: "Zweihander",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/merc/merc_t2.json",
                            label: "Javelin",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/merc/merc_t3.json",
                            label: "Guardian",
                            type: "research",
                            tier: "T3"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/merc/merc_t4.json",
                            label: "Cyclops",
                            type: "research",
                            tier: "T4"
                        }
                    ]
                },
                {
                    id: "imperia_lightning",
                    name: "Lightning",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/imperia/lightning/lightning_t1.json",
                            label: "Mage",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/lightning/lightning_t2.json",
                            label: "Elemental",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/lightning/lightning_t3.json",
                            label: "Arcanist",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "imperia_fog",
                    name: "Fog",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/imperia/fog/fog_t1.json",
                            label: "Windmage",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/fog/fog_t2.json",
                            label: "Elemental",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/fog/fog_t3.json",
                            label: "Eagle",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "imperia_fire",
                    name: "Fire",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/imperia/fire/fire_t1.json",
                            label: "Firemage",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/fire/fire_t2.json",
                            label: "Elemental",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/imperia/fire/fire_t3.json",
                            label: "Dragon",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "imperia_upgrades",
                    name: "Upgrades",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/upgrades/imperia/infantry/dual_sword.json",
                            label: "Dual Sword",
                            type: "upgrade",
                            tier: "UPG"
                        },
                        {
                            spec_id: "/pa/units/medieval/upgrades/imperia/infantry/champion.json",
                            label: "Champion",
                            type: "upgrade",
                            tier: "UPG"
                        },
                        {
                            spec_id: "/pa/units/medieval/upgrades/imperia/cavalry/heavy_cav.json",
                            label: "Charge",
                            type: "upgrade",
                            tier: "UPG"
                        }
                    ]
                }
            ]
        },
        {
            id: "vesperin",
            name: "VESPERIN",
            color: "#57b662",
            branches: [
                {
                    id: "vesperin_ranged",
                    name: "Ranged",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/ranged/ranged_t1.json",
                            label: "Recurve",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/ranged/ranged_t2.json",
                            label: "Longbow",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/ranged/ranged_t3.json",
                            label: "Composite",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "vesperin_spiders",
                    name: "Spiders",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/spiders/spiders_t1.json",
                            label: "Jumping",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/spiders/spiders_t2.json",
                            label: "Web Trap",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/spiders/spiders_t3.json",
                            label: "Web Mother",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "vesperin_bugs",
                    name: "Bugs",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/bugs/bugs_t1.json",
                            label: "Roach",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/bugs/bugs_t2.json",
                            label: "Crab",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/bugs/bugs_t3.json",
                            label: "Scorpion",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "vesperin_snakes",
                    name: "Snakes",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/snakes/snakes_t1.json",
                            label: "Serpent",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/snakes/snakes_t2.json",
                            label: "Great Serpent",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/snakes/snakes_t3.json",
                            label: "Flying Cobra",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "vesperin_pumpkin",
                    name: "Pumpkin",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t1.json",
                            label: "Pumpkin",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t2.json",
                            label: "Munchkin",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/pumpkin/pumpkin_t3.json",
                            label: "Guardian",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "vesperin_witches",
                    name: "Witches",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/pumpkin/witch_t1.json",
                            label: "Witch",
                            type: "research",
                            tier: "T1"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/pumpkin/witch_t2.json",
                            label: "Jack",
                            type: "research",
                            tier: "T2"
                        },
                        {
                            spec_id: "/pa/units/medieval/research/vesperin/pumpkin/witch_t3.json",
                            label: "Hut",
                            type: "research",
                            tier: "T3"
                        }
                    ]
                },
                {
                    id: "vesperin_upgrades",
                    name: "Upgrades",
                    nodes: [
                        {
                            spec_id: "/pa/units/medieval/upgrades/vesperin/spiders/consume.json",
                            label: "Consume",
                            type: "upgrade",
                            tier: "UPG"
                        },
                        {
                            spec_id: "/pa/units/medieval/upgrades/vesperin/spiders/nesting.json",
                            label: "Nesting",
                            type: "upgrade",
                            tier: "UPG"
                        }
                    ]
                }
            ]
        }
    ]
};
