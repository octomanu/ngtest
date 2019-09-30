import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { html } from 'redux/consorcios/preview/preview.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-expensa-preview',
  templateUrl: './expensa-preview.component.html',
  styles: [],
})
export class ExpensaPreviewComponent implements OnInit {
  @Input() id: number;
  @ViewChild('contentToConvert', { static: false })
  contentToConvert: ElementRef;
  content: Observable<SafeHtml>;
  downloading = false;
  constructor(
    private store: Store<AppState>,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.content = this.store
      .select(html)
      .pipe(
        map(contentHtml =>
          this.domSanitizer.bypassSecurityTrustHtml(contentHtml),
        ),
      );
  }

  download() {
    this.downloading = true;
    const data = this.contentToConvert.nativeElement;
    html2canvas(data, {})
      .then(canvas => {
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('sueldo.pdf'); // Generated PDF
        this.downloading = false;
      })
      .catch(error => {
        this.downloading = false;
      });
  }
}
