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
    
    // :: Reset : Area
    ResetSec(eArea.river);
    ResetSec(eArea.mountain);
    ResetSec(eArea.city);

    // :: Reset : Input
    ResetInput();
    
    // :: Reset : Percent
    this.percent_rocket = 0;
    
    // :: Log
    queue_log = new Queue();

    // :: UI
    this.UpdateUI();
    UpdateText_Compound();
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
const eArea = {
    river : 1,
    mountain : 2,
    city : 3
}
const pAreaSec = {
    river : "field_sec_river",
    mountain : "field_sec_mountain",
    city : "field_sec_city"
}
function GoToMountain() {
    // :: Metal
    var BUTTON_Field = document.getElementById("button_mountain");
    BUTTON_Field.disabled = true;
    this.WaitAndDo(eArea.mountain, () => {
        var metal = this.GetRandom();
        AddItem(eItem.metal, metal);
    
        // :: Rubber_Tree
        var rubber_tree = this.GetRandom();
        AddItem(eItem.rubber_tree, rubber_tree);
    
        queue_log.enqueue("From Mountain : Metal : " + metal + " / Rubber_Tree : " + rubber_tree);
        UpdateText_Log();

        BUTTON_Field.disabled = false;
    });
}
function GoToCity() {
    // :: Plastic
    var BUTTON_Field = document.getElementById("button_city");
    BUTTON_Field.disabled = true;
    this.WaitAndDo(eArea.city, () => {
        var plastic = this.GetRandom();
        AddItem(eItem.plastic, this.GetRandom());
    
        queue_log.enqueue("From City : Plastic : " + plastic);
        UpdateText_Log();

        BUTTON_Field.disabled = false;
    });
}
function GoToRiver() {
    // :: Glass
    var BUTTON_Field = document.getElementById("button_river");
    BUTTON_Field.disabled = true;
    this.WaitAndDo(eArea.river, () => {
        var glass = this.GetRandom();
        AddItem(eItem.glass, glass);
    
        // :: Tree
        var tree = this.GetRandom();
        AddItem(eItem.tree, tree);
    
        queue_log.enqueue("From River : Glass : " + glass + " / Tree : " + tree);
        UpdateText_Log();

        BUTTON_Field.disabled = false;
    });
}
function GetRandom() {
    return Math.floor(Math.random() * 10) + 1;
}
function WaitAndDo(rArea, Do) {
    // 2초 간격으로 메시지를 보여줌
    var index = 0;
    var count = GetSec(rArea);
    SetSec(rArea, count, index);
    let timerId = setInterval(() => {
        index += 1;
        SetSec(rArea, count, index);
        if(index >= count) {
            clearInterval(timerId);
            Do();
            ResetSec(rArea);
        }
    }, 1000);
}
function GetSec(rArea) {
    switch(rArea) {
        case eArea.river:
            return 3;
        case eArea.mountain:
            return 4;
        case eArea.city:
            return 5;
    }
}
function ResetSec(rArea) {
    SetSec(rArea, GetSec(rArea), 0);
}
function SetSec(rArea, count, index) {
    switch(rArea) {
        case eArea.river:
            document.getElementById(pAreaSec.river).innerHTML
            = (count - index) + " sec";
            break;
        case eArea.mountain:
            document.getElementById(pAreaSec.mountain).innerHTML
            = (count - index) + " sec";
            break;
        case eArea.city:
            document.getElementById(pAreaSec.city).innerHTML
            = (count - index) + " sec";
            break;
    }
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
    UpdateText_Compound();
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
const pCompoundButton = {
    steel : "button_comp_steel",
    fiber : "button_comp_fiber",
    fuel : "button_comp_fuel"
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
    
    UpdateText_Log();
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

    queue_log.enqueue("Metal x" + metalCompNum * 10 + " => Steel x" + metalCompNum);
    
    UpdateText_Log();
    UpdateText_Compound();
}
function UpdateText_CompoundSteel() {
    var TEXT_Field = document.getElementById(pCompoundButton.steel);
    TEXT_Field.innerHTML
    = "Metal " + Item.metal + "/" + "10";

    if(Item.metal >= 10)
        TEXT_Field.style.backgroundColor = "#fd87db";
    else
        TEXT_Field.style.backgroundColor = "#ffffff";
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

    queue_log.enqueue("Plastic x" + min * 10 + " / Glass x" + min * 10 + " / Rubber Tree x" + min * 10 
    + " => Fiber x" + min);
    
    UpdateText_Log();
    UpdateText_Compound();
}
function UpdateText_CompoundFiber() {
    var TEXT_Field = document.getElementById(pCompoundButton.fiber);
    TEXT_Field.innerHTML
    = "Plastic " + Item.plastic + "/" + "10" + " | "
    + "Glass " + Item.glass + "/" + "10" + " | "
    + "Rubber Tree " + Item.rubber_tree + "/" + "10";

    if(Item.plastic >= 10
        && Item.glass >= 10
        && Item.rubber_tree >= 10)
        TEXT_Field.style.backgroundColor = "#fd87db";
    else
        TEXT_Field.style.backgroundColor = "#ffffff";
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

    queue_log.enqueue("Tree x" + treeCompNum * 10 + " => Fuel x" + treeCompNum);
    
    UpdateText_Log();
    UpdateText_Compound();
}
function UpdateText_CompoundFuel() {
    var TEXT_Field = document.getElementById(pCompoundButton.fuel);
    TEXT_Field.innerHTML
    = "Tree " + Item.tree + "/" + "10";

    if(Item.tree >= 10)
        TEXT_Field.style.backgroundColor = "#fd87db";
    else
        TEXT_Field.style.backgroundColor = "#ffffff";
}
// #endregion

// #region Compound
function CompoundItem() {
    this.CompoundItem_Steel();
    this.CompoundItem_Fiber();
    this.CompoundItem_Fuel();
}
function UpdateText_Compound() {
    UpdateText_CompoundSteel();
    UpdateText_CompoundFiber();
    UpdateText_CompoundFuel();
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

    queue_log.enqueue("Rocket Built(" + percent_rocket + "%)");
    
    UpdateText_Log();
    UpdateText_Compound();
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

    queue_log.enqueue("Rocket Launched : " + (this.result_rocket ? "발사 성공" : "발사 실패"));
    UpdateText_Log();
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
        stringData += `<div class="text_log">${tempStack.pop()}</div>`;
    }

    console.log(stringData);
    TEXT_Field.innerHTML = stringData;
}
//#endregion