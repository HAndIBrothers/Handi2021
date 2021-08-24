//#region Open / Close
var gold;
var autoGold;

function Open() {
    // :: Reset : Item
    this.metal = 0;
    this.plastic = 0;
    this.glass = 0;
    this.rubber_tree = 0;
    this.tree = 0;
    
    // :: Reset : Compound
    this.comp_steel = 0;
    this.comp_fiber = 0;
    this.comp_fuel = 0;
    
    // :: Reset : Input
    this.input_steel = 0;
    this.input_fiber = 0;
    this.input_fuel = 0;
    
    // :: UI
    this.UpdateUI();
}
//#endregion

// #region Go
function GoToMountain() {
    // :: Metal
    this.AddMetal(this.GetRandom());
    // :: Rubber_Tree
    this.AddRubberTree(this.GetRandom());
}
function GoToCity() {
    // :: Plastic
    this.AddPlastic(this.GetRandom());
}
function GoToRiver() {
    // :: Glass
    this.AddGlass(this.GetRandom());
    // :: Tree
    this.AddTree(this.GetRandom());
}
function GetRandom() {
    return Math.floor(Math.random() * 10) + 1;
}
// #endregion

// #region UI
function UpdateUI() {
    // :: Item
    this.UpdateMetal();
    this.UpdatePlastic();
    this.UpdateGlass();
    this.UpdateRubberTree();
    this.UpdateTree();
    
    // :: Compound
    this.UpdateSteel();
    this.UpdateFiber();
    this.UpdateFuel();
    
    // :: Input
    this.UpdateSteel_Input();
    this.UpdateFiber_Input();
    this.UpdateFuel_Input();
}
// #endregion

// #region Metal
var metal;
function AddMetal(addMetal) {
    this.metal += addMetal;
    this.UpdateMetal();
}
function UpdateMetal() {
    var TEXT_Metal = document.getElementById('item_metal');
    TEXT_Metal.innerHTML = this.metal;
}
// #endregion

// #region Plastic
var plastic;
function AddPlastic(addPlastic) {
    this.plastic += addPlastic;
    this.UpdatePlastic();
}
function UpdatePlastic() {
    var TEXT_Plastic = document.getElementById('item_plastic');
    TEXT_Plastic.innerHTML = this.plastic;
}
// #endregion

// #region Glass
var glass;
function AddGlass(addGlass) {
    this.glass += addGlass;
    this.UpdateGlass();
}
function UpdateGlass() {
    var TEXT_Glass = document.getElementById('item_glass');
    TEXT_Glass.innerHTML = this.glass;
}
// #endregion

// #region Rubber Tree
var rubber_tree;
function AddRubberTree(addRubberTree) {
    this.rubber_tree += addRubberTree;
    this.UpdateRubberTree();
}
function UpdateRubberTree() {
    var TEXT_RubberTree = document.getElementById('item_rubber_tree');
    TEXT_RubberTree.innerHTML = this.rubber_tree;
}
// #endregion

// #region Rubber Tree
var tree;
function AddTree(addTree) {
    this.tree += addTree;
    this.UpdateTree();
}
function UpdateTree() {
    var TEXT_Tree = document.getElementById('item_tree');
    TEXT_Tree.innerHTML = this.tree;
}
// #endregion

// #region Compound : Steel
var comp_steel;
var input_steel;
function AddSteel(addSteel) {
    this.comp_steel += addSteel;
    this.UpdateSteel();
}
function UpdateSteel() {
    var TEXT_Steel = document.getElementById('compound_steel');
    TEXT_Steel.innerHTML = this.comp_steel;
}
function CompoundItem_Steel() {
    var metalCompNum = parseInt(this.metal / 10);
    
    this.AddMetal(-metalCompNum * 10);
    this.AddSteel(metalCompNum);
}
function UpdateSteel_Input() {
    var TEXT_Steel = document.getElementById('input_steel');
    TEXT_Steel.innerHTML = this.input_steel;
}
// #endregion

// #region Compound : Fiber
var comp_fiber;
var input_fiber;
function AddFiber(addFiber) {
    this.comp_fiber += addFiber;
    this.UpdateFiber();
}
function UpdateFiber() {
    var TEXT_Fiber = document.getElementById('compound_fiber');
    TEXT_Fiber.innerHTML = this.comp_fiber;
}
function CompoundItem_Fiber() {
    var plasticCompNum = parseInt(this.plastic / 10);
    var glassCompNum = parseInt(this.glass / 10);
    var rubberTreeCompNum = parseInt(this.rubber_tree / 10);
    
    var min = Math.min(plasticCompNum, glassCompNum, rubberTreeCompNum);
    this.AddPlastic(-min * 10);
    this.AddGlass(-min * 10);
    this.AddRubberTree(-min * 10);
    
    this.AddFiber(min);
}
function UpdateFiber_Input() {
    var TEXT_Fiber = document.getElementById('input_fiber');
    TEXT_Fiber.innerHTML = this.input_fiber;
}
//// 왼쪽 오른쪽 만들기!!!!!!!!!!!!!!!!!!!!!!!
// #endregion

// #region Compound : Fuel
var comp_fuel;
var input_fuel;
function AddFuel(addFuel) {
    this.comp_fuel += addFuel;
    this.UpdateFuel();
}
function UpdateFuel() {
    var TEXT_Fuel = document.getElementById('compound_fuel');
    TEXT_Fuel.innerHTML = this.comp_fuel;
}
function CompoundItem_Fuel() {
    var treeCompNum = parseInt(this.tree / 10);
    
    this.AddTree(-treeCompNum * 10);
    this.AddFuel(treeCompNum);
}
function UpdateFuel_Input() {
    var TEXT_Fuel = document.getElementById('input_fuel');
    TEXT_Fuel.innerHTML = this.input_fuel;
}
// #endregion

// #region Compound
function CompoundItem() {
    this.CompoundItem_Steel();
    this.CompoundItem_Fiber();
    this.CompoundItem_Fuel();
}
// #endregion