// % weight=10 color=#1E90FF icon="\uf138"
namespace cospider {
    
    //% blockId=initSerial block="Init serial port to |TX = %Tx RX=%RX"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    export function initSerial(Tx: SerialPin, Rx: SerialPin): void {
        serial.redirect(Tx, Rx, 115200)
        serial.writeString("AT");
        serial.readString();
        basic.pause(100)
    }

    //% blockId=runGroup block="run action group |%index number of times %time interval(MS) %interval"
    export function runGroup(index: number,time : number, interval: number): void {
        let cmd = "AT+" + index + ",TIME+" + time +",INTERVAL+" + interval;
        serial.writeString(cmd)
    }

}
