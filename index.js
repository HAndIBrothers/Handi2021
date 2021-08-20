//#region Open / Close
var gold;
var autoGold;
function Open() {
    this.gold = 0;
    this.autoGold = 1;
    this.UpdateGold();
}
//#endregion

//#region Add Gold
function AddGold(addGold) {
    this.gold += addGold;
    this.UpdateGold();
} 
var doAuto = false;
var interAuto;
function AddGold_Auto() {
    this.doAuto = !this.doAuto;

    if(this.doAuto) {
        this.interAuto = this.setInterval(() => {
            this.AddGold(this.autoGold);
        }, 100);
    } else {
        clearInterval(this.interAuto);
    }
} 
//#endregion

//#region Update Gold
function UpdateGold() {
    var TEXT_Gold = document.getElementById('item_gold');
    TEXT_Gold.innerHTML = this.gold;
}
//#endregion