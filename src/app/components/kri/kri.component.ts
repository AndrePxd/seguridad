import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ChartType} from "chart.js";


@Component({
  selector: 'app-kri',
  templateUrl: './kri.component.html',
  styleUrls: ['./kri.component.css']
})
export class KriComponent {
  contratoForm: FormGroup;
  contratos: any[] = [];
  incumplimientosPorMotivo: {[key: string]: number} = {};
  public barChartType: ChartType = 'bar';
  public divisor: number = 0;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend = true;
  public barChartLabels: string[] = [];
  public barChartData: {data: number[], label: string}[] = [
    {data: [], label: 'Incumplimientos'}
  ];


  constructor(private fb: FormBuilder) {
    this.contratoForm = this.fb.group({
      fechaVencimiento: ['', Validators.required],
      detalleContrato: ['', Validators.required],
      motivoIncumplimiento: ['', Validators.required],
      valorNumerico: ['', Validators.required]
    });
  }

  onFormSubmit(): void {
    const contrato = this.contratoForm.value;
    this.contratos.push(contrato);

    // Actualiza los totales de incumplimientos por motivo
    if (this.incumplimientosPorMotivo[contrato.motivoIncumplimiento]) {
      this.incumplimientosPorMotivo[contrato.motivoIncumplimiento]++;
    } else {
      this.incumplimientosPorMotivo[contrato.motivoIncumplimiento] = 1;
    }

    // Actualiza el gráfico
    this.barChartLabels = Object.keys(this.incumplimientosPorMotivo);
    this.barChartData[0].data = Object.values(this.incumplimientosPorMotivo);

    // Resetea el formulario
    this.contratoForm.reset();
  }

  calcularTotal(): void {
    const valorNumericoControl = this.contratoForm.get('valorNumerico');

    if (valorNumericoControl) {
      const valorNumerico = +valorNumericoControl.value;

      this.barChartData[0].data = this.barChartData[0].data.map(value => value / valorNumerico);

      this.divisor = this.barChartData[0].data.reduce((a, b) => a + b, 0);
    }
  }

}
