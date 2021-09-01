// #region Open / Close
var Item = {
    metal : 0,
    plastic : 0,
    glass : 0,
    rubber : 0,
    carrot : 0
}
var Compound = {
    core : 0,
    parts : 0,
    fuel : 0
}
var Input = {
    core : 0,
    parts : 0,
    fuel : 0
}
var queue_log;
class NumRabbits {
    constructor() {
        this.working = 0;
        this.together = 2;
    }
    getWorking() {
        return this.working;
    }
    getTogether() {
        return this.together;
    }
    getRemains() {
        return this.together - this.working;
    }
}
var iCurRabbits;
function Open() {
    // :: Reset : Rabbit
    iCurRabbits = new NumRabbits();
    ShowRabbits();

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

    // :: Button : Mouse Over
    SetMouseOver();

    // :: UI
    this.UpdateUI();
    UpdateText_Compound();
}
// #endregion

//#region Rabbits
function ShowRabbits() {
    var doc = document.getElementById("field_rabbit");
    doc.innerHTML = "";
    doc.innerHTML = 
        iCurRabbits.getTogether() == 2 ? "🐇🐇" : 
        iCurRabbits.getTogether() == 3 ? "🐇🐇🐇" : "🐇🐇🐇🐇";
}
//#endregion

//#region MouseOver
function SetMouseOver() {
    var BUTTON_City = document.getElementById("button_city");
    BUTTON_City.addEventListener("mouseover", () => {
        BUTTON_City.style.backgroundColor = "#808080";
    });
    BUTTON_City.addEventListener("mouseleave", () => {
        BUTTON_City.style.backgroundColor = "#000000";
    });

    var BUTTON_Plantation = document.getElementById("button_mountain");
    BUTTON_Plantation.addEventListener("mouseover", () => {
        BUTTON_Plantation.style.backgroundColor = "#808080";
    });
    BUTTON_Plantation.addEventListener("mouseleave", () => {
        BUTTON_Plantation.style.backgroundColor = "#000000";
    });

    var BUTTON_Field = document.getElementById("button_river");
    BUTTON_Field.addEventListener("mouseover", () => {
        BUTTON_Field.style.backgroundColor = "#808080";
    });
    BUTTON_Field.addEventListener("mouseleave", () => {
        BUTTON_Field.style.backgroundColor = "#000000";
    });
}
//#endregion

// #region Reset
function ResetItem() {
    Item.metal = 0;
    Item.plastic = 0;
    Item.glass = 0;
    Item.rubber = 0;
    Item.carrot = 0;

    UpdateUI();
}
function ResetCompound() {
    Compound.core = 0;
    Compound.parts = 0;
    Compound.fuel = 0;
}
function ResetInput() {
    Input.core = 0;
    Input.parts = 0;
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
function GoToPlantation() {
    if(iCurRabbits.getRemains() <= 0) {
        return;
    } else {
        iCurRabbits.working += 1;
    }
    // :: Metal
    var BUTTON_Field = document.getElementById("button_mountain");
    BUTTON_Field.disabled = true;
    BUTTON_Field.style.backgroundColor = "#cccc00";
    this.WaitAndDo(eArea.mountain, () => {

        // :: Rubber
        var rubber = this.GetRandom(1, 3);
        AddItem(eItem.rubber, rubber);
    
        queue_log.enqueue("From Plantation : Rubber : " + rubber);
        UpdateText_Log();

        BUTTON_Field.style.backgroundColor = "#000000";
        BUTTON_Field.disabled = false;

        iCurRabbits.working -= 1;
    });
}
function GoToCity() {
    if(iCurRabbits.getRemains() <= 0) {
        return;
    } else {
        iCurRabbits.working += 1;
    }

    // :: Plastic
    var BUTTON_Field = document.getElementById("button_city");
    BUTTON_Field.disabled = true;
    BUTTON_Field.style.backgroundColor = "#cccc00";
    this.WaitAndDo(eArea.city, () => {

        var metal = this.GetRandom(1, 3);
        AddItem(eItem.metal, metal);
        
        var glass = this.GetRandom(1, 3);
        AddItem(eItem.glass, glass);

        var plastic = this.GetRandom(1, 3);
        AddItem(eItem.plastic, plastic);
    
        queue_log.enqueue("From City : Metal : " + metal 
        + " / Glass : " + glass + " / Plastic : " + plastic);
        UpdateText_Log();

        BUTTON_Field.style.backgroundColor = "#000000";
        BUTTON_Field.disabled = false;

        iCurRabbits.working -= 1;
    });
}
function GoToField() {
    if(iCurRabbits.getRemains() <= 0) {
        return;
    } else {
        iCurRabbits.working += 1;
    }

    // :: Glass
    var BUTTON_Field = document.getElementById("button_river");
    BUTTON_Field.disabled = true;
    BUTTON_Field.style.backgroundColor = "#cccc00";
    this.WaitAndDo(eArea.river, () => {
    
        // :: Carrot
        var carrot = this.GetRandom(1, 3);
        AddItem(eItem.carrot, carrot);
    
        queue_log.enqueue("From Field : Carrot : " + carrot);
        UpdateText_Log();

        BUTTON_Field.style.backgroundColor = "#000000";
        BUTTON_Field.disabled = false;

        iCurRabbits.working -= 1;
    });
}
function GetRandom(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
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
            return 3;
        case eArea.city:
            return 3;
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
    this.UpdateItem(eItem.rubber);
    this.UpdateItem(eItem.carrot);
    
    // :: Compound
    UpdateCompound(eCompound.core);
    UpdateCompound(eCompound.parts);
    UpdateCompound(eCompound.fuel);
    
    // :: Input
    UpdateInput(eCompound.core);
    UpdateInput(eCompound.parts);
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
    rubber : 4,
    carrot : 5
}
const pItem = {
    metal : "item_metal",
    plastic : "item_plastic",
    glass : "item_glass",
    rubber : "item_rubber_tree",
    carrot : "item_tree"
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
        case eItem.rubber:
            Item.rubber += addItem;
            break;
        case eItem.carrot:
            Item.carrot += addItem;
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
        case eItem.rubber:
            return Item.rubber;
        case eItem.carrot:
            return Item.carrot;
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
        case eItem.rubber:
            TEXT_Field = document.getElementById(pItem.rubber);
            break;
        case eItem.carrot:
            TEXT_Field = document.getElementById(pItem.carrot);
            break;
    }
    TEXT_Field.innerHTML = this.GetItem(eType);
}
// #endregion


//#region Compound
const eCompound = {
    core : 101,
    parts : 102,
    fuel : 103
}
const pCompound = {
    core : "compound_core",
    parts : "compound_parts",
    fuel : "compound_fuel"
}
const pCompoundButton = {
    core : "button_comp_core",
    parts : "button_comp_parts",
    fuel : "button_comp_fuel"
}
function GetCompound(eType) {
    switch(eType) {
        case eCompound.core:
            return Compound.core;
        case eCompound.parts:
            return Compound.parts;
        case eCompound.fuel:
            return Compound.fuel;
    }
}
function AddCompound(eType, addValue) {
    switch(eType) {
        case eCompound.core:
            Compound.core += addValue;
            break;
        case eCompound.parts:
            Compound.parts += addValue;
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
        case eCompound.core:
            TEXT_Field = document.getElementById(pCompound.core);
            break;
        case eCompound.parts:
            TEXT_Field = document.getElementById(pCompound.parts);
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
    core : "input_core",
    parts : "input_parts",
    fuel : "input_fuel"
}
function GetInput(eType) {
    switch(eType) {
        case eCompound.core:
            return Input.core;
        case eCompound.parts:
            return Input.parts;
        case eCompound.fuel:
            return Input.fuel;
    }
}
function AddInput(eType, addValue) {
    switch(eType) {
        case eCompound.core:
            Input.core += addValue;
            if(Input.core < 0)
                Input.core = 0;
            if(Input.core > Compound.core)
                Input.core = Compound.core;
            break;
        case eCompound.parts:
            Input.parts += addValue;
            if(Input.parts < 0)
                Input.parts = 0;
            if(Input.parts > Compound.parts)
                Input.parts = Compound.parts;
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
        case eCompound.core:
            TEXT_Field = document.getElementById(pInput.core);
            break;
        case eCompound.parts:
            TEXT_Field = document.getElementById(pInput.parts);
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
    var metalCompNum = parseInt(Item.metal / 15);
    var plasticCompNum = parseInt(Item.plastic / 20);

    var min = Math.min(metalCompNum, plasticCompNum);

    if(min <= 0)
        return;
    
    AddItem(eItem.metal, -min * 15);
    AddItem(eItem.plastic, -min * 20)
    AddCompound(eCompound.core, min);
    
    if(Input.core === 0)
        Input.core = Compound.core;
    
    UpdateInput(eCompound.core);

    queue_log.enqueue("Metal x" + metalCompNum * 15
    + " / Plastic x" + plasticCompNum + " => Steel x" + metalCompNum);
    
    UpdateText_Log();
    UpdateText_Compound();
}
function UpdateText_CompoundSteel() {
    var TEXT_Field = document.getElementById(pCompoundButton.core);
    TEXT_Field.innerHTML
    = "Metal " + Item.metal + "/15" + " : Plastic " + Item.plastic + "/20";

    if(Item.metal >= 15 && Item.plastic >= 20)
        TEXT_Field.style.backgroundColor = "#fd87db";
    else
        TEXT_Field.style.backgroundColor = "#000000";
}
// #endregion

// #region Compound : Fiber
function CompoundItem_Fiber() {
    var glassCompNum = parseInt(Item.glass / 5);
    var rubberTreeCompNum = parseInt(Item.rubber / 10);
    var metalCompNum = parseInt(Item.metal / 5);
    
    var min = Math.min(metalCompNum, glassCompNum, rubberTreeCompNum);

    if(min <= 0)
        return;

    AddItem(eItem.glass, -min * 5);
    AddItem(eItem.rubber, -min * 10);
    AddItem(eItem.metal, -min * 5);
    
    AddCompound(eCompound.parts, min);
    
    if(Input.parts === 0)
        Input.parts = Compound.parts;
    
    UpdateInput(eCompound.parts);

    queue_log.enqueue("Glass x" + min * 5 + " / Rubber Tree x" + min * 10 
    + " / Metal x" + min * 5
    + " => Fiber x" + min);
    
    UpdateText_Log();
    UpdateText_Compound();
}
function UpdateText_CompoundFiber() {
    var TEXT_Field = document.getElementById(pCompoundButton.parts);
    TEXT_Field.innerHTML
    = "Glass " + Item.glass + "/5 | "
    + "Rubber Tree " + Item.rubber + "/10 | "
    + "Metal " + Item.metal + "/5";

    if(Item.glass >= 5
        && Item.rubber >= 10
        && Item.metal >= 5)
        TEXT_Field.style.backgroundColor = "#fd87db";
    else
        TEXT_Field.style.backgroundColor = "#000000";
}
// #endregion

// #region Compound : Fuel
function CompoundItem_Fuel() {
    var treeCompNum = parseInt(Item.carrot / 10);

    if(treeCompNum <= 0)
        return;
    
    AddItem(eItem.carrot, -treeCompNum * 10);
    AddCompound(eCompound.fuel, treeCompNum);
    
    if(Input.fuel === 0)
        Input.fuel = Compound.fuel;
    
    UpdateInput(eCompound.fuel);

    queue_log.enqueue("Carrot x" + treeCompNum * 10 + " => Fuel x" + treeCompNum);
    
    UpdateText_Log();
    UpdateText_Compound();
}
function UpdateText_CompoundFuel() {
    var TEXT_Field = document.getElementById(pCompoundButton.fuel);
    TEXT_Field.innerHTML
    = "Carrot " + Item.carrot + "/" + "10";

    if(Item.carrot >= 10)
        TEXT_Field.style.backgroundColor = "#fd87db";
    else
        TEXT_Field.style.backgroundColor = "#000000";
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
var cNeed = {
    core : 10,
    parts : 20,
    fuel : 15
}
function BuildRocket() {
    // :: 여기 하는 중
    var coreDif = (Input.core / cNeed.core) * 100;
    var partsDif = (Input.parts / cNeed.parts) * 100;
    var fuelDif = (Input.fuel / cNeed.fuel) * 100;
    this.percent_rocket = (coreDif + partsDif + fuelDif) / 3;
    this.percent_rocket = parseInt(this.percent_rocket);
    
    this.UpdatePercent_Rocket();
    
    AddCompound(eCompound.core, -Input.core);
    AddCompound(eCompound.parts, -Input.parts);
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
    
    TEXT_Field.innerHTML = stringData;
}
//#endregion