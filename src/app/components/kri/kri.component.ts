import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartType } from "chart.js";

@Component({
  selector: 'app-kri',
  templateUrl: './kri.component.html',
  styleUrls: ['./kri.component.css']
})
export class KriComponent {
  contratoForm: FormGroup;
  contratos: any[] = [];
  incumplimientosPorMotivo: { [key: string]: number } = {};
  public barChartType: ChartType = 'bar';
  public divisor: number = 0;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend = true;
  public barChartLabels: string[] = [];
  public barChartData: { data: number[], label: string }[] = [
    { data: [], label: 'Incumplimientos' }
  ];
  public umbrales = {
    alerta: 0,
    verde: 0,
    amarillo: 0,
    rojo: 0
  };
  public totalColor: string = '';

  constructor(private fb: FormBuilder) {
    this.contratoForm = this.fb.group({
      fechaVencimiento: ['', Validators.required],
      detalleContrato: ['', Validators.required],
      motivoIncumplimiento: ['', Validators.required],
      valorNumerico: ['', Validators.required],
      limiteRojo: ['', Validators.required],
      limiteAmarillo: ['', Validators.required],
      limiteVerde: ['', Validators.required],
      limiteAlerta: ['',Validators.required]// Agrega el control 'limiteRojo' al formulario
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

      const limiteVerde = this.contratoForm.get('limiteVerde')?.value;
      const limiteAmarillo = this.contratoForm.get('limiteAmarillo')?.value;
      const limiteRojo = +this.contratoForm.get('limiteRojo')?.value;

      this.barChartData[0].data = this.barChartData[0].data.map(value => value / valorNumerico);

      this.divisor = this.barChartData[0].data.reduce((a, b) => a + b, 0);

      let flag;

      console.log(this.divisor);

      if (this.divisor <= limiteVerde) {
        flag = 1; // verde
      } else if (this.divisor > limiteVerde && this.divisor <= limiteAmarillo) {
        flag = 2; // amarillo
      } else if (this.divisor > limiteAmarillo) {
        flag = 3; // rojo
      }

      switch (flag) {
        case 1:
          this.totalColor = '#00FF00'; // verde
          break;
        case 2:
          this.totalColor = '#FFFF00'; // amarillo
          break;
        case 3:
          this.totalColor = '#FF0000'; // rojo
          break;
        default:
          console.log("Error: flag no válido"); // En caso de que flag no sea 1, 2, o 3
          break;
      }
    }
  }
}
