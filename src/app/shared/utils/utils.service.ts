import { HostListener, Injectable, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import * as moment from "moment";


@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor(private messageService: MessageService) {}

  emitirSide = new EventEmitter;

  public isMobile() {
    if (/mobi|(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) return true;

    return false;
  }

  public displayName(object: any): string {
    return object && object.name ? object.name : "";
  }

  public filter(name: string, objectList: any): any[] {
    const filterValue = name.toLowerCase();
    return objectList.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  public getLocalDesc(codLocal: number) {
    if (codLocal === 0) {
      return "Interno";
    } else {
      return "Externo";
    }
  }

  public formataData(data: any, formattedDate = "") {
    if (data && data !== "") {
      if (formattedDate) {
        return moment(data, formattedDate).format("DD/MM/YYYY");
      } else {
        return moment(data).format("DD/MM/YYYY");
      }
    } else {
      return "";
    }
  }

  emitEventSide(data:any) {
    this.emitirSide.emit(data);
  }

  public getVencimentoColor(data: any) {
    if (data !== "") {
      if (moment(data, "YYYY-MM-DDTHH:mm").isBefore(moment())) {
        return "#ff9191"; // '#ed6574';
      } else {
        return "#fffcd1"; // '#f2f796';
      }
    }
    return;
  }

  public convertObjToArray(obj: any) {
    let objs = JSON.parse(obj["_body"]);
    if (obj && objs) {
      return Object.keys(objs).map(item => {
        if (objs[item]) {
          let data = objs[item];
          data["id"] = item;
          return data;
        }
      });
    }
    return [];
  }

  public minToHour(minParams: number) {
    let horas = Math.floor(minParams / 60);
    let minutes = minParams % 60;

    return (
      (horas < 10 ? "0" + horas : horas) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes)
    );
  }

  async getUserToken() {
    // let token = await this.afAuth.idToken.pipe(first()).toPromise();
    return "";
  }

  public formatDecimal(valor: number) {
    if (!valor) {
      valor = 0;
    }
    valor = parseFloat(valor.toString());
    return Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL"
    }).format(valor);
  }

  public transformCellPhoneNumber(value: string): any {
    if (value) {
      const regex: RegExp = new RegExp(/(\d{2})(\d{1})(\d{4})(\d{4})/);
      const match = value.match(regex);
      if (match) {
        return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
      } else {
        return value;
      }
    }
    return "";
  }

  public transformPhoneNumber(value: string): any {
    if (value) {
      const regex: RegExp = new RegExp(/(\d{2})(\d{4})(\d{4})/);
      const match = value.match(regex);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      } else {
        return value;
      }
    }
    return "";
  }

  public transformCpf(value: string): any {
    if (value) {
      const regex: RegExp = new RegExp(/(\d{3})(\d{3})(\d{3})(\d{2})/);
      const match = value.match(regex);
      if (match) {
        return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
      } else {
        return value;
      }
    }
    return "";
  }

  public transformCnpj(value: string): any {
    if (value) {
      const regex: RegExp = new RegExp(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/);
      const match = value.match(regex);
      if (match) {
        return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
      } else {
        return value;
      }
    }
    return "";
  }

  public validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public addMessage(
    severity: string,
    summary: string,
    detail: string,
    life = 3000
  ) {
    this.messageService.add({
      severity,
      summary: summary,
      detail: detail,
      life: life
    });
  }

  public getBool(val: string) {
    return !!JSON.parse(String(val).toLowerCase());
  }

  public validateEmail(email: string) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  public getFormControl(formGroup: FormGroup, control: string) {
    return formGroup && formGroup.controls[control]
      ? formGroup.controls[control]
      : null;
  }

  public base64toBlob(base64Data: string, contentType: string) {
    contentType = contentType || "";
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
