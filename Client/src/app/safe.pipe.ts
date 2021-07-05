

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(_url: any) {
    if (!_url) { return ''; }
    if (_url) {
      _url = _url.replace('watch?v=', 'embed/');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(_url);
  }

}






















/*import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}*/
