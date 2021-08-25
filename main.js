// #region Open / Close
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
var queue_log;
function Open() {
    // :: Reset : Item
    ResetItem();
    
    // :: Reset : Compound
    ResetCompound();
    
    // :: Reset : Input
    ResetInput();
    
    // :: Reset : Percent
    this.percent_rocket = 0;
    
    // :: Log
    queue_log = new Queue();

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
    var metal = this.GetRandom();
    AddItem(eItem.metal, metal);

    // :: Rubber_Tree
    var rubber_tree = this.GetRandom();
    AddItem(eItem.rubber_tree, rubber_tree);

    queue_log.enqueue("From Mountain : Metal : " + metal + " / Rubber_Tree : " + rubber_tree);
    UpdateText_Log();
}
function GoToCity() {
    // :: Plastic
    var plastic = this.GetRandom();
    AddItem(eItem.plastic, this.GetRandom());

    queue_log.enqueue("From City : Plastic : " + plastic);
    UpdateText_Log();
}
function GoToRiver() {
    // :: Glass
    var glass = this.GetRandom();
    AddItem(eItem.glass, glass);

    // :: Tree
    var tree = this.GetRandom();
    AddItem(eItem.tree, tree);

    queue_log.enqueue("From River : Glass : " + glass + " / Tree : " + tree);
    UpdateText_Log();
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
    UpdateCompound(eCompound.steel);
    UpdateCompound(eCompound.fiber);
    UpdateCompound(eCompound.fuel);
    
    // :: Input
    UpdateInput(eCompound.steel);
    UpdateInput(eCompound.fiber);
    UpdateInput(eCompound.fuel);
    
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


//#region Compound
const eCompound = {
    steel : 101,
    fiber : 102,
    fuel : 103
}
const pCompound = {
    steel : "compound_steel",
    fiber : "compound_fiber",
    fuel : "compound_fuel"
}
function GetCompound(eType) {
    switch(eType) {
        case eCompound.steel:
            return Compound.steel;
        case eCompound.fiber:
            return Compound.fiber;
        case eCompound.fuel:
            return Compound.fuel;
    }
}
function AddCompound(eType, addValue) {
    switch(eType) {
        case eCompound.steel:
            Compound.steel += addValue;
            break;
        case eCompound.fiber:
            Compound.fiber += addValue;
            break;
        case eCompound.fuel:
            Compound.fuel += addValue;
            break;
    }
    UpdateCompound(eType);
}
function UpdateCompound(eType) {
    var TEXT_Field;
    switch(eType) {
        case eCompound.steel:
            TEXT_Field = document.getElementById(pCompound.steel);
            break;
        case eCompound.fiber:
            TEXT_Field = document.getElementById(pCompound.fiber);
            break;
        case eCompound.fuel:
            TEXT_Field = document.getElementById(pCompound.fuel);
            break;
    }
    TEXT_Field.innerHTML = this.GetCompound(eType);
}
//#endregion

//#region Input
const pInput = {
    steel : "input_steel",
    fiber : "input_fiber",
    fuel : "input_fuel"
}
function GetInput(eType) {
    switch(eType) {
        case eCompound.steel:
            return Input.steel;
        case eCompound.fiber:
            return Input.fiber;
        case eCompound.fuel:
            return Input.fuel;
    }
}
function AddInput(eType, addValue) {
    switch(eType) {
        case eCompound.steel:
            Input.steel += addValue;
            if(Input.steel < 0)
                Input.steel = 0;
            if(Input.steel > Compound.steel)
                Input.steel = Compound.steel;
            break;
        case eCompound.fiber:
            Input.fiber += addValue;
            if(Input.fiber < 0)
                Input.fiber = 0;
            if(Input.fiber > Compound.fiber)
                Input.fiber = Compound.fiber;
            break;
        case eCompound.fuel:
            Input.fuel += addValue;
            if(Input.fuel < 0)
                Input.fuel = 0;
            if(Input.fuel > Compound.fuel)
                Input.fuel = Compound.fuel;
            break;
    }
    UpdateInput(eType);
}
function UpdateInput(eType) {
    var TEXT_Field;
    switch(eType) {
        case eCompound.steel:
            TEXT_Field = document.getElementById(pInput.steel);
            break;
        case eCompound.fiber:
            TEXT_Field = document.getElementById(pInput.fiber);
            break;
        case eCompound.fuel:
            TEXT_Field = document.getElementById(pInput.fuel);
            break;
    }
    TEXT_Field.innerHTML = this.GetInput(eType);
}
//#endregion

// #region Compound : Steel
function CompoundItem_Steel() {
    var metalCompNum = parseInt(Item.metal / 10);
    
    AddItem(eItem.metal, -metalCompNum * 10);
    AddCompound(eCompound.steel, metalCompNum);
    
    if(Input.steel === 0)
        Input.steel = Compound.steel;
    
    UpdateInput(eCompound.steel);
}
// #endregion

// #region Compound : Fiber
function CompoundItem_Fiber() {
    var plasticCompNum = parseInt(Item.plastic / 10);
    var glassCompNum = parseInt(Item.glass / 10);
    var rubberTreeCompNum = parseInt(Item.rubber_tree / 10);
    
    var min = Math.min(plasticCompNum, glassCompNum, rubberTreeCompNum);
    AddItem(eItem.plastic, -min * 10);
    AddItem(eItem.glass, -min * 10);
    AddItem(eItem.rubber_tree, -min * 10);
    
    AddCompound(eCompound.fiber, min);
    
    if(Input.fiber === 0)
        Input.fiber = Compound.fiber;
    
    UpdateInput(eCompound.fiber);
}
// #endregion

// #region Compound : Fuel
function CompoundItem_Fuel() {
    var treeCompNum = parseInt(Item.tree / 10);
    
    AddItem(eItem.tree, -treeCompNum * 10);
    AddCompound(eCompound.fuel, treeCompNum);
    
    if(Input.fuel === 0)
        Input.fuel = Compound.fuel;
    
    UpdateInput(eCompound.fuel);
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
    
    AddCompound(eCompound.steel, -Input.steel);
    AddCompound(eCompound.fiber, -Input.fiber);
    AddCompound(eCompound.fuel, -Input.fuel);
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

//#region Class
class Queue {
    constructor() {
        this._arr = [];
    }
    copyFrom(arr) {
        this._arr = arr;
    }
    enqueue(item) {
        this._arr.push(item);
        if(this.count() > 5) {
            this.dequeue();
        }
    }
    dequeue() {
        return this._arr.shift();
    }
    count() {
        return this._arr.length;
    }
}
class Stack {
    constructor() {
      this._arr = [];
    }
    push(item) {
      this._arr.push(item);
    }
    pop() {
      return this._arr.pop();
    }
    peek() {
      return this._arr[this._arr.length - 1];
    }
  }
//#endregion

//#region Log
function UpdateText_Log() {
    var TEXT_Field = document.getElementById('field_story');

    var stringData = "";

    // :: Copy
    var copyQueue = new Queue();
    copyQueue.copyFrom(queue_log._arr.slice());

    // :: Change Stack
    var tempStack = new Stack();
    var count = copyQueue.count();
    for(var index = 0; index < count; index++) {
        tempStack.push(copyQueue.dequeue());
    }

    // :: String
    for(var index = 0; index < count; index++) {
        stringData += `<div>${tempStack.pop()}</div>`;
    }

    console.log(stringData);
    TEXT_Field.innerHTML = stringData;
}
//#endregion