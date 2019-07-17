import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-estado-financiero',
  templateUrl: './estado-financiero.component.html',
  styles: [],
})
export class EstadoFinancieroComponent implements OnInit {
  protected source: string;

  tabii = 0;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.source = params.get('source');
    });
  }
}
