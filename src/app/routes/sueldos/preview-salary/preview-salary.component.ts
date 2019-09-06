import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { SueldosService } from '@core/http/sueldos/sueldos.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-preview-salary',
  templateUrl: './preview-salary.component.html',
  styles: [],
})
export class PreviewSalaryComponent implements OnInit {
  @Input() id: number;
  @ViewChild('contentToConvert', { static: false })
  contentToConvert: ElementRef;
  receiptContent: SafeHtml;
  downloading = false;
  constructor(
    private sueldosService: SueldosService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.sueldosService.generateReceipt(this.id).subscribe((resp: any) => {
      this.receiptContent = this.domSanitizer.bypassSecurityTrustHtml(
        resp.data.html,
      );
    });
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
