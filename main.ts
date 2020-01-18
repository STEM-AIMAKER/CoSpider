//% weight=10 color=#1E90FF icon="\uf138"
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

    function addParameter(i: number, len: number): string {
        let str = "+";
          if( i > 9999 )
            i = 9999;
        
        if (i < 10) {
            let k = 1;
            for (k = 1; k < len; k++) {
                str += "0";
            }
            str += i;
        } else if (i < 100) {
            let k = 2;
            for (k = 2; k < len; k++) {
                str += "0";
            }
            str += i;
        } else if (i < 1000 && len == 4) {
            str += "0" + i;
        }
         else if( i >= 1000 )
            str += i;
        
        return str;
    }

    //% blockId=runServo block="run %index servo to angle %angle in %time (MS)"
    //% index.min=1 index.max=8
    //% angle.min=0 angle.max=300
    //% time.min=0 time.max=9999
    export function runServo(index: number, angle: number, time: number): void {
            //AT+1+01+800+090+000#
        if( time > 999 )
            time = 999;
        
        if( angle < 0 )
            angle = 0;
        if( angle > 300 )
            angle = 300;

        angle = (angle * 999) / 300;
        // lock safe angle
        switch( index )
        {
            case 1: // [180-680]
                if( angle < 180 )
                    angle = 180;
                if( angle > 680 )
                    angle = 680;
            break;
            case 2: // [200-900]
                if( angle <200 )
                    angle = 200
                if( angle > 900 )
                    angle = 200
            break;
            case 5: // [200-780]
                if (angle < 200)
                    angle = 200
                if (angle > 780)
                    angle = 780
            break;
            case 6: // 300-840
                if (angle < 300)
                    angle = 300
                if (angle > 840)
                    angle = 840
            break;
            default: // [200-820]
                if (angle < 200)
                    angle = 200
                if (angle > 820)
                    angle = 820
            break;        
        }
        
        let cmd = "AT+1" + addParameter(index,2) + addParameter(angle,3) + addParameter(time,3)+"+000#";
        serial.writeString(cmd);
    }

    //% blockId=runGroup block="run action group |%index number of times %time interval(MS) %interval"
    //% index.min=1 index.max=8
    //% time.min=1 time.max=100
    //% interval.min=0 interval.max=9999
    export function runGroup(index: number, time: number, interval: number): void {
        let cmd = "AT+7" + addParameter(index, 2) + addParameter(time, 3) + addParameter(interval, 4) + "+++#";
        serial.writeString(cmd);
    }

    //% blockId=goForward block="Go Forward"
    export function goForward(): void {
        let cmd = "AT+3+++++++++++++++#";
        serial.writeString(cmd);
    }

    //% blockId=goBack block="Go Back"
    export function goBack(): void {
        let cmd = "AT+4+++++++++++++++#";
        serial.writeString(cmd);
    }

    //% blockId=goLeft block="Go Left"
    export function goLeft(): void {
        let cmd = "AT+5+++++++++++++++#";
        serial.writeString(cmd);
    }

    //% blockId=goRight block="Go Right"
    export function goRight(): void {
        let cmd = "AT+6+++++++++++++++#";
        serial.writeString(cmd);
    }
    
    //% blockId=goStop block="Stop"
    export function goStop(): void {
        let cmd = "AT+8+++++++++++++++#";
        serial.writeString(cmd);
    }
}
