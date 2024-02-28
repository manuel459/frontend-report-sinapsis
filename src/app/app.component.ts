import { Component } from '@angular/core';
import { MessageServicesService } from './services/message-services.service';
import { IRequest } from './interfaces/IRequest';
import { IMessageEstructure } from './interfaces/IMessageEstructure';
import { CampaniaTsComponent } from './campania.ts/campania.ts.component';
import { MatDialog } from '@angular/material/dialog';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filterClient: boolean = false;
  // SELECTOR DEL MES
  selectedValue: string | any = null;
  // VALOR DEL INPUT NOMBRE DEL CLIENTE
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
  constructor(public messageServices: MessageServicesService, public matDialog: MatDialog) { }

  ngOnInit(): void {
    //inicializar libreria de google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {
      this.ListMessage();
    })
  }

  graficDonut() {
    //ESTABLECER LOS PARAMETROS EN BASE AL RESPONSE DEL METODO LISTMESSAGE
    var pendientes = this.estructura.find((x: { estadoEnvio: number; })=> x.estadoEnvio === 1);
    var enviados = this.estructura.find((x: { estadoEnvio: number; }) => x.estadoEnvio === 2);
    var error = this.estructura.find((x: { estadoEnvio: number; }) => x.estadoEnvio === 3);
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Cantidad de mensajes Enviados', enviados === undefined? 0: enviados.cantidad],
        ['Cantidad de mensajes con Error', error === undefined? 0 : error.cantidad],
        ['Cantidad de mensajes Pendientes', pendientes === undefined ? 0: pendientes.cantidad]
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
    //Inicializar request en base al value (nombre del cliente) y el selectValue (Mes)
    const request :IRequest = { nombreCliente: this.filterClient?this.value:"" , mes: this.selectedValue};
    this.messageServices.messageList(request).subscribe(response => {
      this.estructura = response.body;
      this.graficDonut();
    });
  }

  insertCampania(){
    this.matDialog.open(CampaniaTsComponent,{
      width: "800px"
    }).afterClosed().subscribe(x => {
    });
  }


  title = 'reporte-sinapsis';
}
