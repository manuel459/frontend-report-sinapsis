import { Component } from '@angular/core';
import { MessageServicesService } from './services/message-services.service';
import { IRequest } from './interfaces/IRequest';
import { IMessageEstructure } from './interfaces/IMessageEstructure';
import { FormControl } from '@angular/forms';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filterClient: boolean = false;
  foodControl = new FormControl();
  selectedValue: string | any = null;
  value: string  | any;
  estructura: IMessageEstructure[] | any;
  meses = [
    { nombre: "Enero", id: 1 },
    { nombre: "Febrero", id: 2 },
    { nombre: "Marzo", id: 3 },
    { nombre: "Abril", id: 4 },
    { nombre: "Mayo", id: 5 },
    { nombre: "Junio", id: 6 },
    { nombre: "Julio", id: 7 },
    { nombre: "Agosto", id: 8 },
    { nombre: "Septiembre", id: 9 },
    { nombre: "Octubre", id: 10 },
    { nombre: "Noviembre", id: 11 },
    { nombre: "Diciembre", id: 12 }
  ]
  constructor(public messageServices: MessageServicesService) { }

  ngOnInit(): void {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {
      this.ListMessage();
    })
  }

  graficDonut() {
    var pendientes = this.estructura.find((x: { estadoEnvio: number; })=> x.estadoEnvio === 1);
    var enviados = this.estructura.find((x: { estadoEnvio: number; }) => x.estadoEnvio === 2);
    var error = this.estructura.find((x: { estadoEnvio: number; }) => x.estadoEnvio === 3);
    console.log(pendientes);
    console.log(enviados);
    console.log(error);
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Cantidad de mensajes Pendientes', pendientes === undefined ? 0: pendientes.cantidad],
        ['Cantidad de mensajes Enviados', enviados === undefined? 0: enviados.cantidad],
        ['Cantidad de mensajes con Error', error === undefined? 0 : error.cantidad]
      ]
    );

    var options = {
      title: 'Cantidad de Mensajes Activos',
      pieHole: 0.4,
      chartArea: { width: '100%', height: '100%' },
      height: 600,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

  ListMessage(){
    console.log(this.value)
    console.log(this.selectedValue)
    const request :IRequest = { nombreCliente: this.filterClient?this.value:"" , mes: this.selectedValue};
    this.messageServices.messageList(request).subscribe(response => {
      console.log(response);
      this.estructura = response.body;
      console.log(this.estructura);
      this.graficDonut();
    });
  }

  title = 'reporte-sinapsis';
}
