﻿// #region Open / Close
var Item = {
    metal : 0,
    plastic : 0,
    glass : 0,
    rubber_tree : 0,
    tree : 0
}
var Compound = {
    steel : 0,
    fiber : 0,
    fuel : 0
}
var Input = {
    steel : 0,
    fiber : 0,
    fuel : 0
}
function Open() {
    // :: Reset : Item
    ResetItem();
    
    // :: Reset : Compound
    ResetCompound();
    
    // :: Reset : Input
    ResetInput();
    
    // :: Reset : Percent
    this.percent_rocket = 0;
    
    // :: UI
    this.UpdateUI();
}
// #endregion

// #region Reset
function ResetItem() {
    Item.metal = 0;
    Item.plastic = 0;
    Item.glass = 0;
    Item.rubber_tree = 0;
    Item.tree = 0;

    UpdateUI();
}
function ResetCompound() {
    Compound.steel = 0;
    Compound.fiber = 0;
    Compound.fuel = 0;
}
function ResetInput() {
    Input.steel = 0;
    Input.fiber = 0;
    Input.fuel = 0;
    
    this.UpdateUI();
}
// #endregion

// #region Go
function GoToMountain() {
    // :: Metal
    AddItem(eItem.metal, this.GetRandom());
    // :: Rubber_Tree
    AddItem(eItem.rubber_tree, this.GetRandom());
}
function GoToCity() {
    // :: Plastic
    AddItem(eItem.plastic, this.GetRandom());
}
function GoToRiver() {
    // :: Glass
    AddItem(eItem.glass, this.GetRandom());
    // :: Tree
    AddItem(eItem.tree, this.GetRandom());
}
function GetRandom() {
    return Math.floor(Math.random() * 10) + 1;
}
// #endregion

// #region UI
function UpdateUI() {
    // :: Item
    this.UpdateItem(eItem.metal);
    this.UpdateItem(eItem.plastic);
    this.UpdateItem(eItem.glass);
    this.UpdateItem(eItem.rubber_tree);
    this.UpdateItem(eItem.tree);
    
    // :: Compound
    this.UpdateSteel();
    this.UpdateFiber();
    this.UpdateFuel();
    
    // :: Input
    this.UpdateSteel_Input();
    this.UpdateFiber_Input();
    this.UpdateFuel_Input();
    
    // :: Rocket
    this.UpdatePercent_Rocket();
}
// #endregion

// #region Item
const eItem = {
    metal : 1,
    plastic : 2,
    glass : 3,
    rubber_tree : 4,
    tree : 5
}
const pItem = {
    metal : "item_metal",
    plastic : "item_plastic",
    glass : "item_glass",
    rubber_tree : "item_rubber_tree",
    tree : "item_tree"
}
function AddItem(eType, addItem) {
    switch(eType) {
        case eItem.metal:
            Item.metal += addItem;
            break;
        case eItem.plastic:
            Item.plastic += addItem;
            break;
        case eItem.glass:
            Item.glass += addItem;
            break;
        case eItem.rubber_tree:
            Item.rubber_tree += addItem;
            break;
        case eItem.tree:
            Item.tree += addItem;
            break;
    }
    this.UpdateItem(eType);
}
function GetItem(eType) {
    switch(eType) {
        case eItem.metal:
            return Item.metal;
        case eItem.plastic:
            return Item.plastic;
        case eItem.glass:
            return Item.glass;
        case eItem.rubber_tree:
            return Item.rubber_tree;
        case eItem.tree:
            return Item.tree;
    }
}
function UpdateItem(eType) {
    var TEXT_Field;
    switch(eType) {
        case eItem.metal:
            TEXT_Field = document.getElementById(pItem.metal);
            break;
        case eItem.plastic:
            TEXT_Field = document.getElementById(pItem.plastic);
            break;
        case eItem.glass:
            TEXT_Field = document.getElementById(pItem.glass);
            break;
        case eItem.rubber_tree:
            TEXT_Field = document.getElementById(pItem.rubber_tree);
            break;
        case eItem.tree:
            TEXT_Field = document.getElementById(pItem.tree);
            break;
    }
    TEXT_Field.innerHTML = this.GetItem(eType);
}
// #endregion

// #region Compound : Steel
function AddSteel(addSteel) {
    Compound.steel += addSteel;
    this.UpdateSteel();
}
function UpdateSteel() {
    var TEXT_Steel = document.getElementById('compound_steel');
    TEXT_Steel.innerHTML = Compound.steel;
}
function CompoundItem_Steel() {
    var metalCompNum = parseInt(Item.metal / 10);
    
    AddItem(eItem.metal, -metalCompNum * 10);
    this.AddSteel(metalCompNum);
    
    if(Input.steel === 0)
        Input.steel = Compound.steel;
    
    this.UpdateSteel_Input();
}
function UpdateSteel_Input() {
    var TEXT_Steel = document.getElementById('input_steel');
    TEXT_Steel.innerHTML = Input.steel;
}
function InputSteel_Add(addInput) {
    Input.steel += addInput;
    
    if(Input.steel < 0)
        Input.steel = 0;
    if(Input.steel > Compound.steel)
        Input.steel = Compound.steel;
    
    this.UpdateSteel_Input();
}
// #endregion

// #region Compound : Fiber
function AddFiber(addFiber) {
    Compound.fiber += addFiber;
    this.UpdateFiber();
}
function UpdateFiber() {
    var TEXT_Fiber = document.getElementById('compound_fiber');
    TEXT_Fiber.innerHTML = Compound.fiber;
}
function CompoundItem_Fiber() {
    var plasticCompNum = parseInt(Item.plastic / 10);
    var glassCompNum = parseInt(Item.glass / 10);
    var rubberTreeCompNum = parseInt(Item.rubber_tree / 10);
    
    var min = Math.min(plasticCompNum, glassCompNum, rubberTreeCompNum);
    AddItem(eItem.plastic, -min * 10);
    AddItem(eItem.glass, -min * 10);
    AddItem(eItem.rubber_tree, -min * 10);
    
    this.AddFiber(min);
    
    if(Input.fiber === 0)
        Input.fiber = Compound.fiber;
    
    this.UpdateFiber_Input();
}
function UpdateFiber_Input() {
    var TEXT_Fiber = document.getElementById('input_fiber');
    TEXT_Fiber.innerHTML = Input.fiber;
}
function InputFiber_Add(addInput) {
    Input.fiber += addInput;
    
    if(Input.fiber < 0)
        Input.fiber = 0;
    if(Input.fiber > Compound.fiber)
        Input.fiber = Compound.fiber;
    
    this.UpdateFiber_Input();
}
// #endregion

// #region Compound : Fuel
function AddFuel(addFuel) {
    Compound.fuel += addFuel;
    this.UpdateFuel();
}
function UpdateFuel() {
    var TEXT_Fuel = document.getElementById('compound_fuel');
    TEXT_Fuel.innerHTML = Compound.fuel;
}
function CompoundItem_Fuel() {
    var treeCompNum = parseInt(Item.tree / 10);
    
    AddItem(eItem.tree, -treeCompNum * 10);
    this.AddFuel(treeCompNum);
    
    if(Input.fuel === 0)
        Input.fuel = Compound.fuel;
    
    this.UpdateFuel_Input();
}
function UpdateFuel_Input() {
    var TEXT_Fuel = document.getElementById('input_fuel');
    TEXT_Fuel.innerHTML = Input.fuel;
}
function InputFuel_Add(addInput) {
    Input.fuel += addInput;
    
    if(Input.fuel < 0)
        Input.fuel = 0;
    if(Input.fuel > Compound.fuel)
        Input.fuel = Compound.fuel;
    
    this.UpdateFuel_Input();
}
// #endregion

// #region Compound
function CompoundItem() {
    this.CompoundItem_Steel();
    this.CompoundItem_Fiber();
    this.CompoundItem_Fuel();
}
// #endregion

// #region Build Rocket
var percent_rocket;
function BuildRocket() {
    var steelDif = 40 - Math.abs(Compound.steel - 40);
    var fiberDif = 30 - Math.abs(Compound.fiber - 30);
    var fuelDif = 30 - Math.abs(Compound.fuel - 30);
    this.percent_rocket = steelDif + fiberDif + fuelDif;
    
    this.UpdatePercent_Rocket();
    
    this.AddSteel(-Input.steel);
    this.AddFiber(-Input.fiber);
    this.AddFuel(-Input.fuel);
    this.ResetInput();
}
function UpdatePercent_Rocket() {
    var TEXT_Rocket = document.getElementById('percent_rocket');
    TEXT_Rocket.innerHTML = this.percent_rocket;
}
function ResetPercent_Rocket() {
    this.percent_rocket = 0;
    this.UpdatePercent_Rocket();
}
// #endregion

// #region Launch Rocket
var result_rocket = false;
function LaunchRocket() {
    var rand = Math.floor(Math.random() * 100) + 1;
    
    if(rand <= this.percent_rocket)
        this.result_rocket = true;
    else
        this.result_rocket = false;
    
    this.ResetPercent_Rocket();
    this.UpdateText_LaunchRocket();
}
function UpdateText_LaunchRocket() {
    var TEXT_Rocket = document.getElementById('result_rocket');
    TEXT_Rocket.innerHTML
    = this.result_rocket ? "발사 성공" : "발사 실패";
}
// #endregion